import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
    }
});


export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);
export const checkUser = (data) => api.post('/api/check-user', data);
export const getUser = (data) => api.post('/api/getUser', data);
export const getName = (data) => api.get(`/api/name?id=${data.id}`, data);
export const logout = () => api.post('/api/logout');
export const createContact = (data) => api.post(`/api/createContact`, data);
export const getContacts = (data) => api.post(`/api/getContacts`, data);
export const httpCreateConversation = (data) => api.post('/api/chat/createConversation', data);
export const getConversations = (data) => api.post('/api/chat/Conversations', data);
export const sendMsg = (data) => api.post('/api/chat/sendMsg', data);
export const getChat = (data) => api.post('/api/chat/getchat', data);

// export const getAllUsers = (data) => api.post('/api/chat/users', data);
// export const getAllMsgs = (data) => api.post('/api/chat/getAllMsgs', data);

// Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    process.env.REACT_APP_API_URL+'/api/refresh',
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);
export default api;
