import axios from 'axios'
import store from '../store'
import router from '../router'
import progress from '../plugin/progress'
import util from '../plugin/util'
import {Notification} from 'element-ui'

async function request(options = {method, url, header, data, throwError, showError, showProgress, blob, timeout}) {
    let header, response, error;
    
    header = options.header || {};
    if (!header.token)
        header.token = store.state.session;

    if (options.showProgress || !options.hasOwnProperty('showProgress'))
        progress.start();
    
    try {
        let data = {
            method: options.method.trim().toLowerCase(),
            url: "http://27.71.232.111:8101/api" + '/' + options.url,
            headers: header,
        };
        if (data.method === 'get' || data.method === 'delete')
            data.params = options.data || null;
        else
            data.data = options.data || null;
        if (options.blob)
            data.responseType = 'blob';
        if (options.timeout)
            data.timeout = options.timeout;

        response = await axios(data);
        response = response.data;
    } catch (e) {
        error = e;
    }

    if (options.showProgress || !options.hasOwnProperty('showProgress'))
        progress.finish();

    if (error) {
        if (error.response) {
            if (error.response.status === 413) {
                response = {
                    meta: {success: false},
                    error: {message: 'Kích thước request quá lớn. Không thể xử lý'},
                };
            } else {
                response = error.response.data;
            }
        }

        if (!response) {
            response = {
                meta: {success: false},
                error: {message: error.message},
            };
        }

        if (response.error && response.error.code === 'session_invalid') {
            store.commit('clearSession');
            util.showDialog({
                message: 'Phiên đăng nhập của bạn đã hết hạn hoặc bị lỗi. Xin vui lòng đăng nhập lại',
                buttons: [
                    {
                        title: 'Đăng nhập lại',
                        default: true,
                        handler: () => {
                            if (store.state.route.name === 'login') {
                                location.reload();
                            } else {
                                router.push({
                                    path: '/login',
                                    query: {redirect: store.state.route.name === 'login' ? '/' : store.state.route.fullPath}
                                });
                            }
                        }
                    },
                ]
            });
        }

        if (options.showError || !options.hasOwnProperty('showError'))
            Notification({
                type: 'error',
                title: 'Lỗi',
                message: response.error ? response.error.message : 'Lỗi không xác định!',
            });

        if (options.throwError)
            throw error;
    }

    if (typeof response !== 'object')
        response = {
            meta: {success: false},
            error: {message: error.response.statusText}
        };

    if (options.blob)
        return {
            meta: {success: true},
            data: response,
        };

    return response;
}

export default {
    install(Vue) {
        Vue.prototype.$api = this;
    },

    async getConfigLin() {
        // console.log(store.state.session)
        return await process.env.lin_api;
    },

    async get(options) {
        // console.log(store.state.session)
        return await request(Object.assign({method: 'get'}, options));
    },

    async post(options) {
        return await request(Object.assign({method: 'post'}, options));
    },

    async put(options) {
        return await request(Object.assign({method: 'put'}, options));
    },

    async delete(options) {
        return await request(Object.assign({method: 'delete'}, options));
    },


    async getDirectUrl(options) {
         let response, error;

        try {
            let data = {
                method: options.method.trim().toLowerCase(),
                url: options.url,
            };
            if (data.method === 'get')
                data.params = options.data || null;

            response = await axios(data);

        } catch (e) {
            error = e;
        }

        if (error) {
                response = {
                    meta: {success: false},
                    error: {message: error.message || null},
                };
            }

        return response;

        // var xhr = new XMLHttpRequest();

        // xhr.open("GET", urlRequest, true);
        // xhr.withCredentials = true;
        // xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
        // xhr.setRequestHeader('Content-Type', 'application/xml');
        // console.log(xhr.send());
    },

    async postDirectUrl(options) {
         let response, error;

        try {
            let data = {
                url: options.url,
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    admin_authorization: store.state.session,
                },
                data : options.data || null,
            };

            response = await axios(data);

        } catch (e) {
            error = e;
        }

        if (error) {
                response = {
                    meta: {success: false},
                    error: {message: error.message || null},
                };
            }

        return response;
    },
}