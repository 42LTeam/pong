import io from "socket.io-client";
import axios from "axios";

const localhostwebsocket = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + ':8001' : 'http://localhost:8001';
const webSocketURL = localhostwebsocket;

const localhostback = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + ':3000' : 'http://localhost:3000';
const URL = localhostback;
export const socket = io(webSocketURL, { autoConnect: true});

export async function searchUser(search, options: {friendOnly?: boolean, notFriend?: boolean} = {friendOnly: false, notFriend: false}){
    const config = {
        method: 'get',
        url: URL + '/users/search/'  +search,
        data: {
            options
        },
        withCredentials: true,
    };
    return axios(config);
}

export async function getStatus(){
    var config = {
        method: 'get',
        url: URL + '/auth/status',
        withCredentials: true,
    };
    return axios(config);
}

export async function blockUser(blockedId: number){
    var config = {
        method: 'post',
        url: URL + '/block/create',
        withCredentials: true,
        data: {
            blockedId
        }
    };
    return axios(config);
}

export async function updateUserAvatar(id, avatarUrl){
    const config = {
        method: 'put',
        url: URL + '/users/avatar/' + id,
        withCredentials: true,
        data: {
            avatar: avatarUrl
        },
    };
    return await axios(config);
}

export async function updateUserUsername(id, username){
    const config = {
        method: 'put',
        url: URL + '/users/username/' + id,
        withCredentials: true,
        data: {
            username: username
        },
    };
    return await axios(config);
}

export async function getAllUsers(options: {friendOnly?: boolean, notFriend?: boolean} = {friendOnly: false, notFriend: false}){

    const queryParams = Object.entries(options).map((key) => key[0]+'='+key[1]).join('&');
    const config = {
        method: 'get',
        url: URL + '/users?' + queryParams,
        withCredentials: true,

    };
    console.log(config);

    return axios(config);
}

export async function getFriendOfUser(id: number){
    const config = {
        method: 'get',
        url: URL + '/users/friend/' + id,
        withCredentials: true,
    };
    return axios(config);
}

export async function getChannels(){
    const config = {
        method: 'get',
        url: URL + '/channels/channels',
        withCredentials: true,
    };
    return axios(config);
}

export async function getChannelAllMembers(id: number){
    const config = {
        method: 'get',
        url: URL + `/channels/${id}/members`,
        withCredentials: true,
    };
    return axios(config);
}

export async function createChannel(
    data:
        {
            name: string,
            password?: string,
            creatorId: number,
            privated?: boolean,
        }, ){
    const config = {
        method: 'post',
        url: URL + '/channels',
        withCredentials: true,
        data,
    };
    return axios(config);
}

export async function sendChannelInvite(data:
        {
            ids?: number[],
            usernames?: string[],
            channelId: number,
        }, ){
    socket.emit('channel-invite', data);
/*
    const config = {
        method: 'post',
        url: URL + '/channels/invite',
        withCredentials: true,
        data,
    };
    return axios(config);*/
}

export async function getConversation(userId: number) {
    const config = {
        method: 'get',
        url: URL + '/conversation/' + userId,
        withCredentials: true,
    };
    return axios(config);
}

export async function acceptFriendship(id: number){
    const config = {
        method: 'put',
        url: URL + '/friend/friend-request/accept/' + id,
        withCredentials: true,
    };
    return axios(config)
}

export async function removeFriendship(friendId: number){
    const config = {
        method: 'delete',
        url: URL + '/friend/friendship/' + friendId,
        withCredentials: true,
    };
    return axios(config)
}

export async function declineFriendship(id: number){
    const config = {
        method: 'put',
        url: URL + '/friend/friend-request/decline/' + id,
        withCredentials: true,
    };
    return axios(config)
}

export async function authSocketId(clientsocketid: string){
    const config = {
        method: 'get',
        url: URL + '/auth/socketId',
        withCredentials: true,
        headers: {
            clientsocketid
        }
    };
    return axios(config);
}

export async function sendFriendRequest(acceptorId: number){
    const config = {
        method: 'post',
        url: URL + '/friend/friend-request/',
        withCredentials: true,
        data : {
            acceptorId
        }
    };
    console.log(config)
    return axios(config);
}

export async function getChannelLastMessage(channelId: number) {
    const config = {
        method: 'get',
        url: URL + '/message/channel/' + channelId + '/last',
        withCredentials: true,
    };
    return axios(config)
}

export async function getChannelMessages(channelId: number){
    const config = {
        method: 'get',
        url: URL + '/message/channel/' + channelId,
        withCredentials: true,
    };
    return axios(config);
}

export async function readMessage(channelId: number, messageId: number) {
    const config = {
        method: 'post',
        url: URL + '/message/read',
        data: {
            channelId,
            messageId,
        },
        withCredentials: true,
    }
    return axios(config);
}


export async function sendMessageToChannel(channelId: number, content: string){
    socket.emit('new-message', {channelId, content});
   /* const config = {
        method: 'post',
        url: URL + '/message',
        withCredentials: true,
        data:{
            channelId,
            content,
        }
    };
    return axios(config);*/
}

export async function getPath(path: string){
    const config = {
        method: 'get',
        url: URL + path,
        withCredentials: true,
    };
    return axios(config);
}

export async function getUserByID(ID){
    var config = {
        method: 'get',
        url: URL + '/users/' + ID,
        withCredentials: true,
    };
    return axios(config);
}

export async function getUsers(){
    var config = {
        method: 'get',
        url: URL + '/users',
        withCredentials: true,
    };
    return axios(config);
}

export async function searchFriend(name: string){
    const config = {
        method: 'get',
        url: URL + '/users/search/friend/'  +name,
        withCredentials: true,
    };
    return axios(config);
}

export async function getRatioAgainst(id1: number, id2: number){
    const config = {
        method: 'get',
        url: URL + '/match/stats/' + id1 + "/" + id2,
        withCredentials: true,
    };
    return axios(config);
}

export async function getUserMatches(ID){
    var config = {
        method: 'get',
        url: URL + '/users/' + ID + '/matches',
        withCredentials: true,
    };
    return axios(config);
}

export async function getUserMatchesResume(ID){
    var config = {
        method: 'get',
        url: URL + '/users/' + ID + '/matches-resume',
        withCredentials: true,
    };
    return axios(config);
}