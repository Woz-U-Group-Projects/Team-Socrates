const models = require('../models');

const notificationGenService = {
  globalFilter: async function(entity, entityActionType){
    console.log('global filter')
    let newGlobal = models.globalNotifications.build({entityActionType: entityActionType});
    switch (entityActionType){
      case 1: //Friend Requests
        this.friendRequest(entity, newGlobal);
        break;
      case 2: //Accepted Request
      break;
      case 3: //New Thread
      break;
      case 4: //New Post
      break;
    }
    return;
  },
  friendRequest: async function(entity, newGlobal){
    newGlobal.actorId = entity.fromUser;
    newGlobal.entityId = entity.requestId;
    await newGlobal.save();
    console.log(newGlobal.toJSON());
    newNotification = await models.userNotifications.create({notificationId: newGlobal.notificationId, recipientId: entity.toUser});
    console.log(newNotification.toJSON());
    return;
  },
  action2: async function(entity, newGlobal){

  },
  action3: async function(entity, newGlobal){

  },
  action4: async function(entity, newGlobal){

  },
}

module.exports = notificationGenService