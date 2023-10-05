import axios from 'axios'

export const getChatMessage = () => {
    return axios.get(import.meta.env.VITE_BASE_URL +'/messages/')
}


export const createChatMessage = (reqBody) => {
    return axios.post(import.meta.env.VITE_BASE_URL + '/messages/', reqBody)
}

export const deleteChatMessage = (id) => {
    return axios.delete(import.meta.env.VITE_BASE_URL + `/messages/${id}`) 
}
 

export const deleteAllChatMessage = (array) => {
    return Promise.all(array)
}