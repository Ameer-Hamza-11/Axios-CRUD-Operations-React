import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getData = () => {
return api.get('/posts')
}

export const delData = (id)=>{
    return api.delete(`/posts/${id}`)
}


export const addData = (post) => {
    return api.post(`/posts`, post)
}

export const editDataPost = (id,post) => {
    return api.put(`/posts/${id}`, post)
}

