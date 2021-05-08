import axios from 'axios'

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/FilipePfluck/PlantManager'
})

export default api