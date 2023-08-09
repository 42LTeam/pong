import io from "socket.io-client";
import axios from "axios";

const webSocketURL = "http://localhost:8001";
const URL = "http://localhost:3000";
export const socket = io(webSocketURL, { autoConnect: true});

export async function searchUser(search, options = {friendOnly: false}){
    const {friendOnly} = options;

    const config = {
        method: 'get',
        url: URL + '/users/search/' + (friendOnly ? 'friend/' : '') +search,
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
        url: URL + '/users/channels',
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

export async function sendChannelInvite(
    data:
        {
            ids?: number[],
            usernames?: string[],
            channelId: number,
        }, ){
    const config = {
        method: 'post',
        url: URL + '/channels/invite',
        withCredentials: true,
        data,
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
    return axios(config);
}


export async function getChannelMessages(channelId: number){
    const config = {
        method: 'get',
        url: URL + '/message/channel/' + channelId,
        withCredentials: true,
    };
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