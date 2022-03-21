import { EntityActionType } from '../enums/entityActionType';

export class UserNotification {
  readStatus: boolean;
  globalNotification: {
    entityId: number;
    entityActionType: EntityActionType;
    notificationId: number;
    actor: {
      userId: number;
      screenName: string;
    };
  };
}
