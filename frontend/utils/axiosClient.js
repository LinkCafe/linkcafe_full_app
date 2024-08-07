import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://10.0.2.2:3333/'
})

axiosClient.interceptors.request.use( async (request) => {
    const token = await AsyncStorage.getItem('token')
    request.headers['token'] = token
    return request
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log(error.response.data);
    if (error.response.status == 401) {
        console.log("Cerrar sesión");
    }
})

export default axiosClient