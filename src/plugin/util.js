import Vue from 'vue'
import ModalInput from '../vue/component/modal-input'
import moment from 'moment'
import router from '../router'
// const socket = null;

export default {
    install(Vue) {
        
        Vue.prototype.$util = this;
    },

    socket : null,

    greatestCommonDivisor(a, b) {
        if (!b)
            return a;

        return this.greatestCommonDivisor(b, a % b);
    },

    formatDate(value, type, timezoneOffset) {
        if (timezoneOffset === undefined || timezoneOffset === null) {
            if (type == 'minute') {
                return moment.unix(value).format('HH:mm');
            } else if (type == 'hour') {
                return moment.unix(value).format('HH:00');
            }else if (type == 'day') {
                return moment.unix(value).format('DD-MM-YYYY');
            }else if (type == 'week') {
                return moment.unix(value).format('DD-MM-YYYY');
            }else if (type == 'month') {
                return moment.unix(value).format('MM-YYYY');
            }else if (type == 'year') {
                return moment.unix(value).format('YYYY');
            }
        }
        return moment.unix(value).add(timezoneOffset - moment().utcOffset(), 'minute').format('DD-MM-YYYY HH:mm');
    },

    formatDay(value, timezoneOffset) {
        if (timezoneOffset === undefined || timezoneOffset === null)
            return moment.unix(value).format('DD-MM-YYYY');
        return moment.unix(value).add(timezoneOffset - moment().utcOffset(), 'minute').format('DD-MM-YYYY');
    },

    formatTime(value, timezoneOffset) {
        if (timezoneOffset === undefined || timezoneOffset === null)
            return moment.unix(value).format('HH:mm');
        return moment.unix(value).add(timezoneOffset - moment().utcOffset(), 'minute').format('HH:mm');
    },

    formatNumber(value) {
        let postfix = '';
        if (value > 1000) {
            value = parseInt(value / 1000);
            postfix = ' K';
        } else if (value > 1000000) {
            value = parseInt(value / 1000000);
            postfix = ' M';
        }
        return Intl.NumberFormat().format(value) + postfix;
    },

    formatNumberDefault(value) {
        return Intl.NumberFormat().format(value);
    },

    urlQueryEncode(data) {
        let result = [];
        for (let key in data)
            result.push(encodeURIComponent(key) + '=' + (data[key] ? encodeURIComponent(data[key]) : ''));
        return result.join('&');
    },

    imageLinkToBase64(link) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.onload = function () {
                try {
                    let canvas = document.createElement('canvas');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    canvas.getContext('2d').drawImage(this, 0, 0);

                    res(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
                } catch (e) {
                    rej(e);
                }
            };
            img.crossOrigin = '*';
            img.src = link;
        })
    },

    imageLinkToBase64_79(link) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.onload = function () {
                try {
                    let canvas = document.createElement('canvas');
                    canvas.width = 770;
                    canvas.height = 1000;
                    canvas.getContext('2d').drawImage(this, 0, 0);

                    res(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
                } catch (e) {
                    rej(e);
                }
            };
            img.crossOrigin = '*';
            img.src = link;
        })
    },

    imageLinkToBase64_11(link) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.onload = function () {
                try {
                    let canvas = document.createElement('canvas');
                    canvas.width = 1024;
                    canvas.height = 1024;
                    canvas.getContext('2d').drawImage(this, 0, 0);

                    res(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
                } catch (e) {
                    rej(e);
                }
            };
            img.crossOrigin = '*';
            img.src = link;
        })
    },

    fileToBase64(file) {
        return new Promise((res, rej) => {
            let reader = new FileReader();

            reader.onload = () => {
                res(reader.result);
            };

            reader.onerror = (error) => {
                rej(error);
            };

            reader.readAsDataURL(file);
        })
    },

    showLalamove(options = {}) {

        return new Promise((res, rej) => {
            Vue.app.$modal.show('dialog', {
                title: options.title,
                text: options.message,
                buttons: [
                    {
                        title: 'Đã hiểu',
                        handler: () => {
                            Vue.app.$modal.hide('dialog');
                            rej('confirm: canceled');
                        }
                    },
                    {
                        title: 'Đi đến',
                        handler: () => {
                            Vue.app.$modal.hide('dialog');
                            // console.log(router)
                            router.push({
                                path: `/delivery/${options.user_order_uuid}`,
                            });
                            res();
                        }
                    },
                ],
            });
        });

    },

    showDialog(options = {}) {
        if (!options.buttons)
            options.buttons = [{title: 'OK', default: true}];

        return new Promise((res, rej) => {
            for (let button of options.buttons) {
                let handler = button.handler;
                if (handler) {
                    button.handler = () => {
                        Vue.app.$modal.hide('dialog');
                        try {
                            handler();
                            res();
                        } catch (e) {
                            rej(e);
                        }
                    };
                } else {
                    button.handler = () => {
                        Vue.app.$modal.hide('dialog');
                        try {
                            res();
                        } catch (e) {
                            rej(e);
                        }
                    }
                }
            }

            Vue.app.$modal.show('dialog', {
                title: options.title,
                text: options.message,
                buttons: options.buttons,
            });
        });

    },

    showConfirm(options = {}) {
        if (typeof options === 'string')
            options = {text: options};

        return new Promise((res, rej) => {
            Vue.app.$modal.show('dialog', {
                title: options.title,
                text: options.text || 'Xác nhận',
                buttons: [
                    {
                        title: 'Có',
                        handler: () => {
                            Vue.app.$modal.hide('dialog');
                            res();
                        }
                    },
                    {
                        title: 'Không',
                        handler: () => {
                            Vue.app.$modal.hide('dialog');
                            rej('confirm: canceled');
                        }
                    },
                ]
            });
        });
    },

    showInput(options = {}) {
        if (typeof options === 'string')
            options = {text: options};

        return new Promise((res, rej) => {
            try {
                Vue.app.$modal.show(ModalInput, {
                    type: options.type,
                    title: options.title || null,
                    text: options.text || null,
                    rules: options.rules,
                    done: (data) => res(data),
                    cancel: () => rej('modal input cancel'),
                }, {
                    clickToClose: false,
                    height: 'auto',
                });
            } catch (e) {
                rej(e);
            }
        });
    },

    checkAccountPermission(permissions) {
        // if (!Vue.app.$store.state.profile || Vue.app.$store.state.profile.permission.length === 0)
        //     return false;

        // if (!Array.isArray(permissions))
        //     return Vue.app.$store.state.profile.permission.includes(permissions);

        // for (let permission of permissions)
        //     if (!Vue.app.$store.state.profile.permission.includes(permission))
        //         return false;

        return true;
    },

    saveFileFromBlob(blobData, fileName) {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([blobData]));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
    },

    async validateForm(component, formName = 'form') {
        return new Promise((res, rej) => {
            component.$refs[formName].validate((valid) => {
                if (valid) res();
                else rej('from validate fail');
            });
        })
    },

    getPercentRemain(obj,current){
        if(!obj.tank_volume || obj.tank_volume  == 0){
            return {
                volume:0,
                have:0,
                left:0,
                percent:0,
            }
        }
        let volume = obj.tank_volume;
        let percent = parseFloat(current / 4096 * 100).toFixed(2) ;
        let have = (volume * percent / 100).toFixed(0);
        let left = volume - have;
        
        if(percent < 0)
            percent = 0;
        if(percent > 100)
            percent = 100;
        return {
            volume:volume,
            have:have,
            left:left,
            percent:percent,
        }

    },

    getTimeRemain(con,current){
        if(con == 0)
            return 0;
        let time = parseFloat(current * 1000 / con * 60).toFixed(0);
        return time;
    },
}