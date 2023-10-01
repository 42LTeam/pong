import io from "socket.io-client";
import axios from "axios";
import {sendNotificationError} from "./components/Errors/PopupError";

const webSocketURL = "/";
const URL = "/api";
export const socket = io(webSocketURL, { autoConnect: false });

export async function deco() {
  const config = {
    method: "post",
    url: URL + "/auth/logout",
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors de la déconnection d'un.e utilisateur.rice. deco")
  })
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

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors de la promotion d'un.e utilisateur.rice d'un channel. ownerMakeAdmin")
  })
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

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du kick d'un.e utilisateur.rice d'un channel. removeUserAdminFromChannel")
  })
}

//  @Post('/:channelId/quit/:userId')
//  @ApiOperation({ summary: 'Remove a user from a channel (User perspective)' })
export async function removeUserFromChannel(channelId: number, userId: number) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/quit/" + userId,
    withCredentials: true,
  };

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du retrait d'un.e utilisateur.rice d'un channel. removeUserFromChannel")
  })
}

//  @Post('/:channelId/ban/:userId')
//  @ApiOperation({ summary: 'Ban a user from a channel' })
export async function banUserFromChannel(channelId: number, userId: number) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/ban/" + userId,
    withCredentials: true,
  };

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du bannissement d'un.e utilisateur.rice. banUserFromChannel")
  })
}

//  @Post('/:channelId/unban/:userId')
//  @ApiOperation({ summary: 'Un-Ban a user from a channel' })
export async function unbanUserFromChannel(channelId: number, userId: number) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/unban/" + userId,
    withCredentials: true,
  };

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du débannissement d'un.e utilisateur.rice. isUserMutedFromChannel")
  })
}

//   @Post('/:channelId/mute/:userId')
//   @ApiOperation({ summary: 'Mute a user from a channel' })
export async function muteUserFromChannel(channelId: number, userId: number) {
  const config = {
    method: "post",
    url: URL + "/channels/" + channelId + "/mute/" + userId,
    withCredentials: true,
  };

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors de censure temporaire d'un.e utilisateur.rice. muteUserFromChannel")
  })
}

export async function isUserMutedFromChannel(
    channelId: number,
    userId: number
) {
  const config = {
    method: "get",
    url: URL + "/channels/" + channelId + "/is-muted/" + userId,
    withCredentials: true,
  };

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du check d'un.e utilisateur.rice muet.te. isUserMutedFromChannel")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors de la recherche d'un.e utilisateur.rice. searchUser")
  })
}

export async function getStatus() {
  const config = {
    method: "get",
    url: URL + "/auth/status",
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du status d'un.e utilisateur.rice. getStatus")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du blocage d'un.e utilisateur.rice ciblé.e. blockUser")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du déblocage d'un utilisateur ciblé. unblockUser")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du changement de l'avatar de l'utilisateur. updateUserAvatar")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du changement du nom de l'utilisateur. updateUserUsername")
  })
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


  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du chargement des utilisateurs. getAllUsers")
  })
}

export async function getFriendOfUser(id: number) {
  const config = {
    method: "get",
    url: URL + "/users/friend/" + id,
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du chargement des ami.e.s d'un utilisateur. getFriendOfUser")
  })
}

export async function getChannels() {
  const config = {
    method: "get",
    url: URL + "/channels/channels",
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du chargement des channels. getChannels")
  })
}

export async function getPublicChannels(userId: number) {
  const config = {
    method: "get",
    url: URL + "/channels/public-channels/" + userId,
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du chargement des channels publics. getPublicChannels")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du chargement des membres du channel, T'es probablement ban du channel. getChannelAllMembers")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors de l'édition du channel. editChannel")
  })
}

export async function createChannel(data: {
  name: string;
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors de la création du channel. createChannel")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du chargement de la conversation. getConversation")
  })
}

export async function get2fa() {
  const config = {
    method: "get",
    url: URL + "/auth/doubleAuth",
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du chargement de la 2FA. get2fa")
  })
}

export async function remove2fa() {
  const config = {
    method: "get",
    url: URL + "/auth/deactivate-doubleAuth",
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors du retrait de la 2FA. remove2fa")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur lors de la définition de la 2FA. set2fa")
  })
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
      sendNotificationError("❌ Erreur le chargement de la conversation. acceptFriendship")
    } else {
      console.error("Unexpected error:", error.message);
      sendNotificationError("❌ Erreur inattendue. acceptFriendship")

    }
  }
}

export async function removeFriendship(friendId: number) {
  const config = {
    method: "delete",
    url: URL + "/friend/friendship/" + friendId,
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur la fin de l'amitié. removeFriendship")
  })
}

export async function declineFriendship(id: number) {
  const config = {
    method: "put",
    url: URL + "/friend/friend-request/decline/" + id,
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur au refus de la demande d'ami.e. declineFriendship")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur à l'authentification de la socketId. authSocketId")
  })
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

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur à l'envoi d'une demande d'ami.e. sendFriendRequest")
  })
}

export async function getChannelLastMessage(channelId: number) {
  const config = {
    method: "get",
    url: URL + "/message/channel/" + channelId + "/last",
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur au chargement des derniers messages. getChannelLastMessage")
  })
}

export async function getChannelMessages(channelId: number) {
  const config = {
    method: "get",
    url: URL + "/message/channel/" + channelId,
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur au chargement des messages. getChannelMessages")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur au chargement des messages. readMessage")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur dans l'accès au path. getPath")
  })
}

export async function getUserByID(ID) {
  const config = {
    method: "get",
    url: URL + "/users/" + ID,
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur dans la recherche d'ami.e.s. searchFriend")
  })
}

export async function searchFriend(name: string) {
  const config = {
    method: "get",
    url: URL + "/users/search/friend/" + name,
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur dans la recherche d'ami.e.s. searchFriend")
  })
}

export async function getRatioAgainst(id1: number, id2: number) {
  const config = {
    method: "get",
    url: URL + "/match/stats/" + id1 + "/" + id2,
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Impossible de récupérer le ratio contre un adversaire. getRatioAgainst")
  })
}

export async function getUserMatches(ID) {
  const config = {
    method: "get",
    url: URL + "/users/" + ID + "/matches",
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Impossible de récupérer les matchs de l'utilisateur. getUserMatches")
  })
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

  return axios(config).catch( () => {
    sendNotificationError("❌ Erreur dans le téléchargement de l'avatar (fichier taille max | fichier non image). uploadUserAvatar")
  })
}

export async function getUserMatchesResume(ID) {
  const config = {
    method: "get",
    url: URL + "/users/" + ID + "/matches-resume",
    withCredentials: true,
  };
  return axios(config).catch( () => {
    sendNotificationError("❌ Impossible de récupérer les résumés des matchs. getUserMatchesResume()")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Mot de passe invalide. setChannelPassword")
  })
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
  return axios(config).catch( () => {
    sendNotificationError("❌ Error dans l'actualisation de la couleur de la balle. updateUserColorball")
  });
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
  const response = await axios(config).catch( () => {
    sendNotificationError("❌ Mot de passe invalide. validateChannelPassword")
  })
  return response.data.isValid;
}

export async function joinChannel(channelId: number) {
  const config = {
    method: "post",
    url: `${URL}/channels/${channelId}/join`,
    withCredentials: true,
  };
  const response = await axios(config).catch( () => {
    sendNotificationError("T'es banni toi 🤡. joinChannel")
  })

  return response.data;
}
