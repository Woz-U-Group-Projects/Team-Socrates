const models = require('../models');

/*Entity Action Types:
1: Friend Request, 2: New Friendship, 3: Direct Message,
4: New Thread, 5: New Post ...

*/
const notificationGenService = {
  generate: async function(entity, entityActionType){
    let newGlobal = models.globalNotifications.build({entityActionType: entityActionType});
    newGlobal = this.parseAction(entity, newGlobal);
    await newGlobal.save();
    let notificationArray = await this.buildUserNotifications(entity, newGlobal);
    notificationArray = await models.userNotifications.bulkCreate(notificationArray, {ignoreDuplicates: true})
    this.debugLog(newGlobal, notificationArray);
    return;
  },
  parseAction: function(entity, newGlobal){
    switch (newGlobal.entityActionType){
      case 1: //1: Friend Requests
        newGlobal.actorId = entity.fromUser;
        newGlobal.entityId = entity.requestId;
        break;
      case 2: //2: New Friendship
        newGlobal.actorId = entity.userId;
        newGlobal.entityId = entity.friendId;
        break;
      case 3: //3: Direct Messages
        break;
      case 4: //4: New Thread
        newGlobal.actorId = entity.authorId;
        newGlobal.entityId = entity.threadId;
        break;
      case 5: //5: New Post
        newGlobal.actorId = entity.authorId;
        newGlobal.entityId = entity.postId;
        break;
    }
    return (newGlobal);
  },
  buildUserNotifications: async function(entity, newGlobal){
    /* Initialize variables */
    let sendNotificationsTo = []; // Recipient IDs go here
    const followerNotifications = [2, 4]; // Define Notification Action Filters
    const inGroupActions = [];
    const inThreadActions = [5];
    /* Static Notifications */
    if (newGlobal.entityActionType === 1){ //1: Notification goes to receiver
      sendNotificationsTo.push({recipientId: entity.toUser, notificationId: newGlobal.notificationId});
      return sendNotificationsTo;
    } else if (newGlobal.entityActionType === 2){ //2: Notification goes to original sender and receiver
      sendNotificationsTo.push({recipientId: entity.friendId, notificationId: newGlobal.notificationId});
      sendNotificationsTo.push({recipientId: entity.userId, notificationId: newGlobal.notificationId});
    } else if (newGlobal.entityActionType === 3){ //3. Notification goes to recipient of Direct Message
      
    } 
    /* Dynamic Notifications */
    if (followerNotifications.includes(newGlobal.entityActionType)){
      sendNotificationsTo = await this.addFollowerNotifications(newGlobal, entity, sendNotificationsTo);
    }
    if (inGroupActions.includes(newGlobal.entityActionType)){
      sendNotificationsTo = await this.addMemberNotifications(newGlobal, entity, sendNotificationsTo);
    }
    if (inThreadActions.includes(newGlobal.entityActionType)){
      sendNotificationsTo = await this.addSubscriberNotifications(newGlobal, entity, sendNotificationsTo);
    }
    return sendNotificationsTo;
  },
  addFollowerNotifications: async function(newGlobal, entity, sendNotificationsTo){
    let foundFollowers = await models.userFollows.findAll({where: {followingId: newGlobal.actorId}});
    for (let i = 0; i < foundFollowers.length; i++){
      sendNotificationsTo.push({recipientId: foundFollowers[i].followerId, notificationId: newGlobal.notificationId});
    }
    // If new friendship, followers of both parties should be notified
    if (newGlobal.entityActionType === 2){ 
      foundFollowers = await models.userFollows.findAll({where: {followingId: newGlobal.entityId}});
      for (let i = 0; i < foundFollowers.length; i++){
        sendNotificationsTo.push({recipientId: foundFollowers[i].followerId, notificationId: newGlobal.notificationId});
      }
    }
    return sendNotificationsTo;
  },
  addSubscriberNotifications: async function(newGlobal, entity, sendNotificationsTo){
    let foundSubscribers = await models.threadSubscriptions.findAll({where: {threadId: entity.threadId}});
    for (let i = 0; i < foundSubscribers.length; i++){
      sendNotificationsTo.push({recipientId: foundSubscribers[i].subscriberId, notificationId: newGlobal.notificationId});
    }
    return sendNotificationsTo;
  },
  addMemberNotifications: async function(newGlobal, entity, sendNotificationsTo){
    let foundMembers = await models.groupMembers.findAll({where: {groupId: entity.groupId, muted: false}});
    for (let i = 0; i < foundMembers; i++){
      sendNotificationsTo.push({recipientId: foundMembers[i].memberId, notificationId: newGlobal.notificationId});
    }
    return sendNotificationsTo;
  },
  debugLog: function(newGlobal, notificationsArray){
    console.log('Global Notification:');
    console.log(newGlobal.toJSON());
    console.log('User Notification(s):');
    for (let i = 0; i < notificationsArray.length; i++){
      console.log(`${i}: ${JSON.stringify(notificationsArray[i])}`);
    };
    return;
  }
}

module.exports = notificationGenService