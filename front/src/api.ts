import io from "socket.io-client";
import axios from "axios";

const webSocketURL = "/";
const URL = "/api";
export const socket = io(webSocketURL, { autoConnect: false });

export async function deco() {
  const config = {
    method: "post",
    url: URL + "/auth/logout",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* File: /back/src/channel/controllers/channel.controller.ts                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

//TODO ownerMakeAdmin

// @Post("/:channelId/owner-make-admin/:userId")
//   @ApiOperation({ summary: "Make a User Admin (Owner privilege)" })
export async function ownerMakeAdmin(
    channelId: number,
    userId: number
) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/owner-make-admin/" + userId,
    withCredentials: true,
  };

  return axios(config).catch(err => {return});
}

//  @Post('/:channelId/admin-quit/:userId')
//  @ApiOperation({ summary: 'Remove a user from a channel (Admin perspective)' })
export async function removeUserAdminFromChannel(
  channelId: number,
  userId: number
) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/admin-quit/" + userId,
    withCredentials: true,
  };

  return axios(config).catch(err => {return});
}

//  @Post('/:channelId/quit/:userId')
//  @ApiOperation({ summary: 'Remove a user from a channel (User perspective)' })
export async function removeUserFromChannel(channelId: number, userId: number) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/quit/" + userId,
    withCredentials: true,
  };

  return axios(config).catch(err => {return});
}

//  @Post('/:channelId/ban/:userId')
//  @ApiOperation({ summary: 'Ban a user from a channel' })
export async function banUserFromChannel(channelId: number, userId: number) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/ban/" + userId,
    withCredentials: true,
  };

  return axios(config).catch(err => {return});
}

//  @Post('/:channelId/unban/:userId')
//  @ApiOperation({ summary: 'Un-Ban a user from a channel' })
export async function unbanUserFromChannel(channelId: number, userId: number) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/unban/" + userId,
    withCredentials: true,
  };

  return axios(config).catch(err => {return});
}

//   @Post('/:channelId/mute/:userId')
//   @ApiOperation({ summary: 'Mute a user from a channel' })
export async function muteUserFromChannel(channelId: number, userId: number) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/mute/" + userId,
    withCredentials: true,
  };

  return axios(config).catch(err => {return});
}

//   @Get('/:channelId/is-muted/:userId')
//   @ApiOperation({ summary: 'Mute a user from a channel' })
export async function isMutedBannedFromChannel(
  channelId: number,
  userId: number
) {
  const config = {
    method: "get",
    url: URL + "/channels/" + channelId + "/is-muted/" + userId,
    withCredentials: true,
  };

  return axios(config).catch(err => {return});
}

/*--------------------------------------------------------------------------------------------------------------------*/

export async function searchUser(
  search,
  options: { friendOnly?: boolean; notFriend?: boolean } = {
    friendOnly: false,
    notFriend: false,
  }
) {
  const config = {
    method: "get",
    url: URL + "/users/search/" + search,
    data: {
      options,
    },
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getStatus() {
  const config = {
    method: "get",
    url: URL + "/auth/status",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function blockUser(blockedId: number) {
  const config = {
    method: "post",
    url: URL + "/block/create",
    withCredentials: true,
    data: {
      blockedId,
    },
  };
  return axios(config).catch(err => {return});
}

export async function unblockUser(blockedId: number) {
  const config = {
    method: "delete",
    url: URL + "/block/remove",
    withCredentials: true,
    data: {
      blockedId,
    },
  };
  return axios(config).catch(err => {return});
}

export async function updateUserAvatar(id, avatarUrl) {
  const config = {
    method: "put",
    url: URL + "/users/avatar/",
    withCredentials: true,
    data: {
      avatar: avatarUrl,
    },
  };
  return axios(config);
}

export async function updateUserUsername(id, username) {
  const config = {
    method: "put",
    url: URL + "/users/username/",
    withCredentials: true,
    data: {
      username: username,
    },
  };
  return axios(config);
}

export async function getAllUsers(
  options: { friendOnly?: boolean; notFriend?: boolean } = {
    friendOnly: false,
    notFriend: false,
  }
) {
  const queryParams = Object.entries(options)
    .map((key) => key[0] + "=" + key[1])
    .join("&");
  const config = {
    method: "get",
    url: URL + "/users?" + queryParams,
    withCredentials: true,
  };


  return axios(config).catch(err => {return});
}

export async function getFriendOfUser(id: number) {
  const config = {
    method: "get",
    url: URL + "/users/friend/" + id,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getChannels() {
  const config = {
    method: "get",
    url: URL + "/channels/channels",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getPublicChannels(userId: number) {
  const config = {
    method: "get",
    url: URL + "/channels/public-channels/" + userId,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getChannelAllMembers(id: number) {
  if (Number.isNaN(id) || id === null) {
    return ;
  }
  const config = {
    method: "get",
    url: URL + `/channels/${id}/members`,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function editChannel(channelId: number, data: {
  name?: string;
  password?: string;
  privated?: boolean;
}) {
  const config = {
    method: "post",
    url: URL + "/channels/edit/" + channelId,
    withCredentials: true,
    data,
  };
  return axios(config).catch(err => {return});
}

export async function createChannel(data: {
  name: string;
  passworded: boolean;
  password?: string;
  privated?: boolean;
  conv?: boolean;
}) {
  const config = {
    method: "post",
    url: URL + "/channels",
    withCredentials: true,
    data,
  };
  return axios(config).catch(err => {return});
}

export async function sendChannelInvite(data: {
  ids?: number[];
  usernames?: string[];
  channelId: number;
}) {
  socket.emit("channel-invite", data);
}

export async function getConversation(userId: number) {
  const config = {
    method: "get",
    url: URL + "/conversation/" + userId,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function get2fa() {
  const config = {
    method: "get",
    url: URL + "/auth/doubleAuth",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function remove2fa() {
  const config = {
    method: "get",
    url: URL + "/auth/deactivate-doubleAuth",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function set2fa(token: string) {

  const config = {
    method: "post",
    url: URL + "/auth/doubleAuth",
    withCredentials: true,
    data: {
      token,
    },
  };
  return axios(config).catch(err => {return});
}

export async function acceptFriendship(id: number) {
  const config = {
    method: "put",
    url: URL + "/friend/friend-request/accept/" + id,
    withCredentials: true,
  };
  try {
    const response = await axios(config).catch(err => {return});
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Bad request:", error.response.data);
      alert("There was an issue getting the conversation. Please try again.");
    } else {
      console.error("Unexpected error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  }
}

export async function removeFriendship(friendId: number) {
  const config = {
    method: "delete",
    url: URL + "/friend/friendship/" + friendId,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function declineFriendship(id: number) {
  const config = {
    method: "put",
    url: URL + "/friend/friend-request/decline/" + id,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function authSocketId(clientsocketid: string) {
  const config = {
    method: "get",
    url: URL + "/auth/socketId",
    withCredentials: true,
    headers: {
      clientsocketid,
    },
  };
  return axios(config).catch(err => {return});
}

export async function sendFriendRequest(acceptorId: number) {
  const config = {
    method: "post",
    url: URL + "/friend/friend-request/",
    withCredentials: true,
    data: {
      acceptorId,
    },
  };

  return axios(config).catch(err => {return});
}

export async function getChannelLastMessage(channelId: number) {
  const config = {
    method: "get",
    url: URL + "/message/channel/" + channelId + "/last",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getChannelMessages(channelId: number) {
  const config = {
    method: "get",
    url: URL + "/message/channel/" + channelId,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function readMessage(channelId: number, messageId: number) {
  const config = {
    method: "post",
    url: URL + "/message/read",
    data: {
      channelId,
      messageId,
    },
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function sendMessageToChannel(channelId: number, content: string) {
  socket.emit("new-message", { channelId, content });
}

export async function getPath(path: string) {
  const config = {
    method: "get",
    url: URL + path,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getUserByID(ID) {
  const config = {
    method: "get",
    url: URL + "/users/" + ID,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getUsers() {
  const config = {
    method: "get",
    url: URL + "/users",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function searchFriend(name: string) {
  const config = {
    method: "get",
    url: URL + "/users/search/friend/" + name,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getRatioAgainst(id1: number, id2: number) {
  const config = {
    method: "get",
    url: URL + "/match/stats/" + id1 + "/" + id2,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function getUserMatches(ID) {
  const config = {
    method: "get",
    url: URL + "/users/" + ID + "/matches",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function uploadUserAvatar(id, file) {
  const formData = new FormData();
  formData.append("avatar", file);

  const config = {
    method: "post",
    url: `${URL}/users/avatar-upload/`,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  return axios(config).catch(err => {return});
}

export async function getUserMatchesResume(ID) {
  const config = {
    method: "get",
    url: URL + "/users/" + ID + "/matches-resume",
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function setChannelPassword(
  channelId: number,
  newPassword: string
) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/set-password",
    data: {
      password: newPassword,
    },
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function updateUserColorball(id: number, color: string) {
  const config = {
    method: "put",
    url: URL + "/users/colorball/",
    withCredentials: true,
    data: {
      colorball: color,
    },
  };
  return axios(config).catch(err => {return});
}

export async function getUserColorball(id: number) {
  const config = {
    method: "get",
    url: URL + "/colorball/" + id,
    withCredentials: true,
  };
  return axios(config).catch(err => {return});
}

export async function validateChannelPassword(
  channelId: number,
  inputPassword: string
) {
  const config = {
    method: "post",
    url: `${URL}/channels/${channelId}/validate-password`,
    data: {
      password: inputPassword,
    },
    withCredentials: true,
  };
  const response = await axios(config).catch(err => {return});
  return response.data.isValid;
}

export async function joinChannel(channelId: number) {
    const config = {
      method: "post",
    url: `${URL}/channels/${channelId}/join`,
    withCredentials: true,
  };
  const response = await axios(config).catch(err => {return});
  return response.data;
}
