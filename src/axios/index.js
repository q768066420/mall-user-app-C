import axios from 'axios';

const request = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
});

request.interceptors.request.use((config) => ({
  ...config,
  params: {
    ...config.params,
    appkey: 'wang_1630561633810',
  },
}));

request.interceptors.response.use((response) => response.data);

export default request;
