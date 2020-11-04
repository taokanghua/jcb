import request from './request'
import webconfig from '../../web.config';

//url
const baseURL = webconfig.domain;
const api = {
    GetWXConfig: () => request.post(`${baseURL}OAuth2/GetWXConfig`),
}

export default api