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
};

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
};

export async function getFriendOfUser(id: number){
    const config = {
        method: 'get',
        url: URL + '/users/friend/' + id,
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

export async function getPath(path: string){
    const config = {
        method: 'get',
        url: URL + path,
        withCredentials: true,
    };
    return axios(config);
}