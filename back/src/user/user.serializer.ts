export class UserSerializer {
  static serialize(user: any): any {
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      xp: user.xp,
    };
  }
  static serializeStatus(user: any): any {
    return {
      id: user.id,
      status: user.status,
    };
  }
  static serializeColorball(user: any): any {
    return {
      id: user.id,
      colorball: user.colorball,
    };
  }
  static serializeFriendship(userFriendship) {
    return {
      id: userFriendship.id,
      username: userFriendship.username,
      avatar: userFriendship.avatar,
      friendShipId: userFriendship.friendShipId,
    };
  }

}