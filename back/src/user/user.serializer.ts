export class UserSerializer {
  static serialize(user: any): any {
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      xp: user.xp,
      colorball: user.colorball,
    };
  }
  static serializeStatus(user: any): any {
    return {
      id: user.id,
      avatar: user.avatar,
      username: user.username,
      xp: user.xp,
      status: user.status,
      colorball: user.colorball,
      blockList: user.blockList,
      friendList: user.friendList,
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