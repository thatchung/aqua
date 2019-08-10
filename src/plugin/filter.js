import util from "util";
import moment from "moment/moment";

export default {
    install(Vue) {
        Vue.prototype.$filter = this;

        for (let filterKey in this) {
            if (filterKey === 'install')
                continue;
            Vue.filter(filterKey, this[filterKey]);
        }
    },

    number(value) {
        return Intl.NumberFormat().format(value);
    },

    shortMoney(value) {
        let postfix = '';
        if (value > 1000) {
            value = parseInt(value / 1000);
            postfix = ' K';
        }
        return Intl.NumberFormat().format(value) + postfix;
    },

    formatStringAsciiGood(str){
        str = str.toLowerCase();
        str = str.normalize();

        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/ |-/g, "");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    },

    formatStringAscii(str){
        str = str.toLowerCase();
        str = str.normalize();

        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    },

    toFullTimeText(t){
    var cd = 24 * 60,
        ch = 60,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round(t - d * cd - h * ch),
        pad = function(n){ return n < 10 ? '0' + n : n; };
        if( m === 60 ){
            h++;
            m = 0;
        }
        if( h === 24 ){
            d++;
            h = 0;
        }
        return (d > 0 ? d + " d, " : "") + h + " h, " + m + " m";
    },
    min(value) {
        return `${Intl.NumberFormat().format(value)} phút`;
    },

    meters(value) {
        return `${Intl.NumberFormat().format(value)} mét`;
    },

    money(value) {
        return `${Intl.NumberFormat().format(value)} VNĐ`;
    },

    percent(value) {
        return `${Intl.NumberFormat().format(value)} %`;
    },

    lixi(value) {
        return `${Intl.NumberFormat().format(value)} lixi`;
    },

    delidate(value, timezoneOffset) {
        if (!moment.isMoment(value)) {
            if (Number.isInteger(value))
                value = moment.unix(value);
            else
                value = moment(value);
        }

        if (timezoneOffset === undefined || timezoneOffset === null) {
            if (process.env.deli_socket === 'http://delisocket-dev.lixiapp.com') {
                // return value.subtract(moment().utcOffset(), 'minutes').format('DD-MM-YYYY HH:mm:ss');
                return value.format('DD-MM-YYYY HH:mm:ss');
            }
            else
                return value.format('DD-MM-YYYY HH:mm:ss');
        }
        return value.add(timezoneOffset - moment().utcOffset(), 'minute').format('DD-MM-YYYY HH:mm:ss');
    },

    date(value, timezoneOffset) {
        if (!moment.isMoment(value)) {
            if (Number.isInteger(value))
                value = moment.unix(value);
            else
                value = moment(value);
        }

        if (timezoneOffset === undefined || timezoneOffset === null) {
            if (process.env.deli_socket === 'http://delisocket-dev.lixiapp.com') {
                return value.format('DD-MM-YYYY HH:mm');
                // return value.subtract(moment().utcOffset(), 'minutes').format('DD-MM-YYYY HH:mm');
            }
            else
                return value.format('DD-MM-YYYY HH:mm');
        }
        return value.add(timezoneOffset - moment().utcOffset(), 'minute').format('DD-MM-YYYY HH:mm');
    },

    deliday(value, timezoneOffset) {
        if (!moment.isMoment(value)) {
            if (Number.isInteger(value))
                value = moment.unix(value);
            else
                value = moment(value);
        }

        if (timezoneOffset === undefined || timezoneOffset === null) {
            if (process.env.deli_socket === 'http://delisocket-dev.lixiapp.com') {
                // return value.subtract(moment().utcOffset(), 'minutes').format('DD-MM-YYYY');
                return value.format('DD-MM-YYYY');
            }
            else
                return value.format('DD-MM-YYYY');
        }
        return value.add(timezoneOffset - moment().utcOffset(), 'minute').format('DD-MM-YYYY');
    },

    day(value, timezoneOffset) {
        if (!moment.isMoment(value)) {
            if (Number.isInteger(value))
                value = moment.unix(value);
            else
                value = moment(value);
        }

        if (timezoneOffset === undefined || timezoneOffset === null) {
            if (process.env.deli_socket === 'http://delisocket-dev.lixiapp.com') {
                return value.format('DD-MM-YYYY');
            }
            else
                return value.format('DD-MM-YYYY');
        }
        return value.add(timezoneOffset - moment().utcOffset(), 'minute').format('DD-MM-YYYY');
    },

    delitime(value, timezoneOffset) {
        if (!moment.isMoment(value)) {
            if (Number.isInteger(value))
                value = moment.unix(value);
            else
                value = moment(value);
        }

        if (timezoneOffset === undefined || timezoneOffset === null) {
            if (process.env.deli_socket === 'http://delisocket-dev.lixiapp.com') {
                return value.format('HH:mm');
                // return value.subtract(moment().utcOffset(), 'minutes').format('HH:mm');
            }
            else
                return value.format('HH:mm');
        }
        return value.add(timezoneOffset - moment().utcOffset(), 'minute').format('HH:mm');
    },

    time(value, timezoneOffset) {
        if (!moment.isMoment(value)) {
            if (Number.isInteger(value))
                value = moment.unix(value);
            else
                value = moment(value);
        }

        if (timezoneOffset === undefined || timezoneOffset === null) {
            if (process.env.deli_socket === 'http://delisocket-dev.lixiapp.com') {
                return value.format('HH:mm');
                // return value.subtract(moment().utcOffset(), 'minutes').format('HH:mm');
            }
            else
                return value.format('HH:mm');
        }
        return value.add(timezoneOffset - moment().utcOffset(), 'minute').format('HH:mm');
    },

    stringtofloat(value) {
        // if(value.substr(2,4) === ':30') {
        //     return parseFloat(value) + 7.5;
        // }
        // else
        //     return parseFloat(value) + 7;
        if (process.env.deli_socket === 'http://delisocket-dev.lixiapp.com') {
            if(value.substr(2,4) === ':30') {
                return parseFloat(value) + 0.5;
            }
            else
                return parseFloat(value);
        }
        else {
            if(value.substr(2,4) === ':30') {
                return parseFloat(value) + 0.5;
            }
            else
                return parseFloat(value);

        }
    },

    dateTypeName(value) {
        if (value === 'day')
            return 'Ngày';
        if (value === 'week')
            return 'Tuần';
        if (value === 'month')
            return 'Tháng';
        if (value === 'year')
            return 'Năm';
        if (value === 'hour')
            return 'Giờ';
        if (value === 'minute')
            return 'Phút';
        if (value === 'second')
            return 'Giây';
        return value;
    },

    orderState(value) {
        if (value === 'sale')
            return 'Đang thanh toán';
        if (value === 'complete')
            return 'Thành công';
        if (value === 'payment_expired')
            return 'Thanh toán thất bại';
        if (value === 'user_cancel')
            return 'User hủy giao dịch';
        return value;
    },

    userOrderFeedbackType(value) {
        if (value === 'food')
            return 'Chất lượng món ăn';
        if (value === 'other')
            return 'Khác';
        if (value === 'shipper')
            return 'Đánh giá nhân viên giao hàng';
        if (value === 'ship_price')
            return 'Phí giao hàng';
        if (value === 'ship_speed')
            return 'Tốc độ giao hàng';
        return value;
    },

    orderV2State(value) {
        if (value === 'complete')
            return 'Hoàn thành';
        if (value === 'wait')
            return 'Đang thanh toán';
        if (value === 'suspended')
            return 'Bị đình chỉ';
        if (value === 'deliveried')
            return 'Đã giao hàng';
        return value;
    },

    gatewayType(value) {
        if (value === 'zalo')
            return 'Zalo Pay';
        if (value === 'payoo')
            return 'Payoo';
        if (value === 'vtc')
            return 'VTC Pay';
        if (value === 'lixi')
            return 'LixiApp';
        if (value === 'napas')
            return 'Napas';
        return value;
    },

    gatewayCode(value) {
        if (value === 'lalamove_cod')
            return 'COD';
        if (value === 'CREDIT')
            return 'Thẻ tính dụng';
        if (value === 'CASH')
            return 'Tiền mặt';
        return value;
    },

    orderSolutionState(value) {
        if (!value || value === 'null')
            return 'Chưa xử lý';
        if (value === 'fixed')
            return 'Đã xử lý';
        if (value === 'refund')
            return 'Đã hoàn tiền';
        if (value === 'error')
            return 'Không xử lý được';
        return value;
    },

    categoryCode(value) {
        if (value === 'category')
            return 'Chuyên mục';
        if (value === 'cuisine')
            return 'Nấu ăn';
        if (value === 'district')
            return 'Quận/ Huyện';
        if (value === 'province')
            return 'Tỉnh/ Thành phố';
        return value;
    },

    isDemo(value) {
        if (value === true)
            return 'Cửa hàng kiểm thử';
        if (value === false)
            return 'Cửa hàng thực';
        return value;
    },

    customerStatus(value) {
        if (value === true)
            return 'Hoạt động';
        if (value === false)
            return 'Đã khóa';
        return value;
    },

    receiptState(value) {
        if (value === 'unpaid')
            return 'Chưa thanh toán';
        if (value === 'paid')
            return 'Đã thanh toán';
        return value;
    },

    merchantRequestType(value) {
        if (value === 'menu_update')
            return 'Món đang cập nhật';
        if (value === 'menu_insert')
            return 'Món dang thêm';
        if (value === 'menu_delete')
            return 'Món bị xóa';
        if (value === 'order_out_of_stock')
            return 'Hết món';
        return value;
    },

    merchantRequestState(value) {
        if (value === 'new')
            return 'Mới';
        if (value === 'expired')
            return 'Hết hạn';
        if (value === 'approved')
            return 'Chấp thuận';
        if (value === 'rejected')
            return 'Từ chối';
        return value;
    },

    merchantOrderState(value) {
        if (value === 'new')
            return 'Mới';
        if (value === 'confirmed')
            return 'Merchant xác nhận';
        if (value === 'lixi_confirmed')
            return 'LIXI xác nhận';
        if (value === 'wait_ship')
            return 'Chờ Shiper lấy hàng';
        if (value === 'picked')
            return 'Shiper nhận hàng';
        if (value === 'completed')
            return 'Hoàn tất';
        if (value === 'delayed')
            return 'Merchant trì hoãn';
        if (value === 'canceled')
            return 'Merchant hủy bỏ';
        if (value === 'rejected')
            return 'Merchant từ chối';
        if (value === 'declined')
            return 'Merchant đã từ chối';
        if (value === 'expired')
            return 'Hết hạn';
        return value;
    },

    giftState(value) {
        if (value === 'sale')
            return 'Mới đặt hàng';
        if (value === 'waitting_receive')
            return 'Chờ giao hàng';
        if (value === 'complete')
            return 'Hoàn tất';
        if (value === 'cancel')
            return 'Đã hủy';
        return value;
    },

    userOrderCancelState(value) {
        if (value === 'user_cancel')
            return 'Khách hàng yêu cầu';
        if (value === 'dangerous_user_cancel')
            return 'Không liên hệ được Khách hàng';
        if (value === 'driver_cancel')
            return 'Shipper hủy đơn hàng';
        if (value === 'merchant_cancel')
            return 'Merchant không làm được món';
        if (value === 'other')
            return 'Lý do khác';
        return value;
    },
    //dangerous_user_cancel

    changeOrderState(value) {
        if (value === 'submitted')
            return 'Đơn hàng mới';
        if (value === 'confirmed')
            return 'Đã xác nhận';
        if (value === 'assigned')
            return 'Chuyển giao Merchant';
        if (value === 'picked')
            return 'Shiper nhận hàng';
        if (value === 'completed')
            return 'Hoàn tất đơn hàng';
        if (value === 'canceled')
            return 'Hủy đơn hàng';
        if (value === 'lalamove')
            return 'Tạo lại đơn hàng lalamove';
        if (value === 'merchant_order')
            return 'Tạo lại đơn hàng Merchant';
        if (value === 'delete_lalamove')
            return 'Hủy đơn hàng Lalamove';
        return value;
    },

    userOrderState(value) {
        if (value === 'draft')
            return 'Khởi tạo';
        if (value === 'submitted')
            return 'Mới';
        if (value === 'processing')
            return 'Chế biến';
        if (value === 'confirmed')
            return 'Đã xác nhận';
        if (value === 'assigned')
            return 'Chuyển giao Merchant';
        if (value === 'picked')
            return 'Nhận hàng';
        if (value === 'completed')
            return 'Hoàn tất';
        if (value === 'doing')
            return 'Đang thực hiện';
        if (value === 'new')
            return 'Nhận đơn';
        if (value === 'ready')
            return 'Sẵn sàng';
        if (value === 'going')
            return 'Đang giao';
        if (value === 'cancelled')
            return 'Đã hủy';
        if (value === 'canceled')
            return 'Đã hủy';
        if (value === 'rejected')
            return 'Driver từ chối';
        if (value === 'expired')
            return 'Hết hạn';
        return value;
    },

    merchantState(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'pending')
            return 'Chờ duyệt';
        if (value === 'delete')
            return 'Đã Xóa';
        if (value === 'locked')
            return 'Đã khóa';
        return value;
    },
    

    storeState(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'inactive')
            return 'Không hoạt động';
        if (value === 'paused')
            return 'Tạm ngưng';
        if (value === 'pending')
            return 'Chờ duyệt';
        if (value === 'delete')
            return 'Đã Xóa';
        if (value === 'locked')
            return 'Đã khóa';
        return value;
    },
    

    pirceTypes(value) {
        if (value === 'fixed')
            return 'Cố định';
        if (value === 'percent')
            return 'Tỉ lệ %';
        return value;
    },


    codeServerState(value) {
        if (value === false)
            return 'Code do merchant phát hành';
        if (value === true)
            return 'Code do lixi phát hành';
        return value;
    },


    cautionState(value) {
        if (value === 'completed')
            return 'Đã hoàn thiện';
        if (value === 'incomplete')
            return 'Chưa hoàn thiện';
        return value;
    },

    merchantStatus(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'pending')
            return 'Chờ duyệt';
        if (value === 'delete')
            return 'Đã Xóa';
        if (value === 'locked')
            return 'Đã khóa';
        return value;
    },

    productType(value) {
        if (value === 'evoucher')
            return 'Voucher';
        if (value === 'classic')
            return 'Hàng hóa';
        if (value === 'combo')
            return 'Combo';
        if (value === 'combo_item')
            return 'Combo Item';
        return value;
    },

    productVoucherType(value) {
        if (value === 'merchant')
            return 'Mua từ merchant';
        if (value === 'lixi')
            return 'Lixi tự phát hành';
        if (value === 'merchant_auto')
            return 'Tích hợp tự động từ merchant';
        return value;
    },

    voucherState(value) {
        if (value === 'selled')
            return 'Đã bán';
        if (value === 'merchant_active')
            return 'Đã sử dụng';
        if (value === 'available')
            return 'Còn khả dụng';
        if (value === 'waiting')
            return 'Chờ xử lý';
        return value;
    },

    bannerStatus(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'inactive')
            return 'Đã khóa';
        if (value === 'hidden')
            return 'Tạm ẩn';
        if (value === 'store')
            return 'Cửa hàng';
        if (value === 'article')
            return 'Chủ đề';
        return value;
    },

    productState(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'pause')
            return 'Tạm ngưng';
        if (value === 'paused')
            return 'Tạm ngưng';
        if (value === 'inactive')
            return 'Đã khóa';
        return value;
    },

    boolLink(value) {
        if (value === 'false')
            return null;
        if (value === 'true')
            return 'Có link';
        return value;
    },

    packState(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'deactive')
            return 'Đã khóa';
        return value;
    },

    paymentType(value) {
        if (value === 'cash')
            return 'Tiền mặt';
        if (value === 'lixi')
            return 'Điểm Lixi';
        return value;
    },

    supplierName(value) {
        if (value === 'vtcpay')
            return 'VTC Pay';
        if (value === 'payoo')
            return 'Payoo';
        return value;
    },

    paymentMethod(value) {
        if (value === 'unknown')
            return 'App (cũ)';
        if (value === 'at_store')
            return 'Tiền mặt tại cửa hàng tiện ích';
        if (value === 'bank')
            return 'Thẻ ATM(yêu cầu Internet Banking)';
        if (value === 'cc')
            return 'Thẻ Visa/Master/JCB';
        if (value === 'lixi')
            return 'Sử dụng Lixi';
        if (value === 'cod')
            return 'Tiền mặt tại nhà';
        if (value === 'exchange')
            return 'Giao dịch';
        if (value === 'zalo_pay_cc')
            return 'Ví zalo (Visa/Master Card)';
        if (value === 'zalo_pay_atm')
            return 'Ví zalo (ATM)';
        if (value === 'wallet_zalo')
            return 'Ví zalo (số dư trong ví)';
        if (value === 'wallet_momo')
            return 'Ví momo (số dư trong ví)';
        return value;
    },

    platform(value) {
        if (value === 'unknown')
            return 'Không rõ';
        if (value === 'web')
            return 'Website';
        if (value === 'android')
            return 'Android';
        if (value === 'ios')
            return 'iOS';
        return value;
    },
    
    stageState(value) {
        if (value === 'draft')
            return 'Bản nháp';
        if (value === 'done')
            return 'Hoàn thành';
        if (value === 'process')
            return 'Xử lý';
        if (value === 'new')
            return 'Đang chạy';
        if (value === 'failed')
            return 'Thất bại';
        if (value === 'cancel')
            return 'Hủy bỏ';
        return value;
    },
    
    notificationType(value) {
        if (value === 'admin.add.push')
            return 'Thông báo vào trang chủ';
        if (value === 'admin.promotion.add')
            return 'Thông báo Promotion';
        if (value === 'admin.merchant.add')
            return 'Thông báo merchant';
        if (value === 'admin.link.add - action link')
            return 'Thông báo user';
        if (value === 'admin.code.order')
            return 'Thông báo code';
        if (value === 'admin.notification.survey')
            return 'Thông báo survey cho user';
        if (value === 'voucher.detail')
            return 'Thông báo mở chi tiết voucher';
        return value;
    },

    userLevel(value) {
        if (value === 'enduser')
            return 'người dùng cuối';
        if (value === 'cashier')
            return 'Thu ngân';
        if (value === 'manager')
            return 'Quản lý';
        if (value === 'merchant')
            return 'Merchant';
        if (value === 'staff')
            return 'nhân viên';
        if (value === 'opencheck')
            return 'Opencheck';
        if (value === 'ocmarketing')
            return 'Ocmarketing';
        if (value === 'nextads')
            return 'Nextads';
        return value;
    },

    accountStatus(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'deactive')
            return 'Đã khóa';
        return value;
    },

    parentCategory(value) {
        if (value === '1st_parent')
            return 'Cấp 2';
        if (value === 'child')
            return 'Cấp 1';
        if (value === '2nd_parent')
            return 'Cấp cao';
        return value;
    },

    isShowHome(value) {
        if (value === true)
            return 'Hiển thị';
        if (value === false)
            return 'Không hiển thị';
        return value;
    },

    notificationType(value) {
        if (value === 'admin.merchant.add')
            return 'Thông báo cho Merchant';
        if (value === 'deli_store_detail')
            return 'Thông báo cho cửa hàng Delivery';
        if (value === 'deli_article_detail')
            return 'Thông báo cho chủ đề Delivery';
         if (value === 'admin.user.add')
            return 'Thông báo user';
        return value;
    },

    group_notification(value) {
        if (value === 1)
            return 'User';
        if (value === 5)
            return 'Tester';
        return value;
    },

    categoryState(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'deactive')
            return 'Đã khóa';
        if (value === 'inactive')
            return 'Đã khóa';
        if (value === 'paused')
            return 'Tạm ngưng';
        return value;
    },

    weekday(value) {
        if (value === 1)
            return 'Chủ nhật';
        if (value === 2)
            return 'Thứ hai';
        if (value === 3)
            return 'Thứ ba';
        if (value === 4)
            return 'Thứ tư';
        if (value === 5)
            return 'Thứ năm';
        if (value === 6)
            return 'Thứ sáu';
        if (value === 7)
            return 'Thứ bảy';
        return value;
    },

    categoryType(value) {
        if (value === 'collection')
            return 'Bộ sưu tập';
        if (value === 'exchange')
            return 'Trao đổi';
        return value;
    },

    addonType(value) {
        if (value === 'boolean')
            return 'Chọn có hoặc không';
        if (value === 'number')
            return 'Nhập số lượng';
        return value;
    },

    addonRequired(value) {
        if (value === true)
            return 'Có';
        if (value === false)
            return 'Không';
        return value;
    },

    addonMultichoice(value) {
        if (value === true)
            return 'Có';
        if (value === false)
            return 'Không';
        return value;
    },

    promotionCodeType(value) {
        if (value === 'reduce_percent')
            return 'Giảm phần trăm tổng đơn';
        if (value === 'add_lixi_percent')
            return 'Tặng lixi trên tổng đơn';
        return value;
    },

    promotionCodeState(value) {
        if (value === 'wait')
            return 'Đang tiến hành';
        if (value === 'complete')
            return 'Hoàn tất';
        return value;
    },

    groupAccountStatus(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'deactive')
            return 'Đã khóa';
        return value;
    },

    cancelOrder(value) {
        if (value === 'other')
            return 'Khác';
        return value;
    },

    userClaimStage(value) {
        if (value === 1)
            return 'Mới';
        if (value === 2)
            return 'Đang xử lý';
        if (value === 3)
            return 'Hoàn tất';
        if (value === 4)
            return 'Hủy bỏ';
        return value;
    },

    odooUserPartnerLink(value) {
        return util.format(process.env.odoo_user_partner_link, value);
    },

    odooMerchantLink(value) {
        return util.format(process.env.odoo_merchant_link, value);
    },

    odooProductLink(value) {
        return util.format(process.env.odoo_product_link, value);
    },

    odooOrderLink(value) {
        return util.format(process.env.odoo_order_link, value);
    },

    odooTransactionLink(value) {
        return util.format(process.env.odoo_transaction_link, value);
    },

    productDetailLink(value) {
        return util.format(`/product/detail/${value}`);
    },

    shopPackDetailLink(value) {
        return util.format(`/shop/pack/${value}`);
    },

    bannerLink(value) {
        return util.format(`/shop/banner/${value}`);
    },

    bannerDeliLink(value) {
        return util.format(`/delivery/banner/${value}`);
    },

    merchantTagsLink(value) {
        return util.format(`/shop/merchant/tags/${value}`);
    },

    merchantCategoryLink(value) {
        return util.format(`/shop/merchant/category/${value}`);
    },

    productCategoryLink(value) {
        return util.format(`/shop/category/detail/${value}`);
    },

    deliProductCategoryLink(value,store) {
        return util.format(`/delivery/product/category/detail/${value}/${store}`);
    },

    deliArticleLink(value) {
        return util.format(`/delivery/article/detail/${value}`);
    },

    merchantDetailLink(value) {
        return util.format(`/shop/merchant/detail/${value}`);
    },

    // storeDetailLink(id,name) {
    //     return util.format(`/shop/merchant/store/detail/${id}/${name}`);
    // },

    storeDetailLink(id,mode) {
        return util.format(`/merchant/store/detail/${id}/${mode}`);
    },

    deliveryProductAddonCategoryDetailLink(value,product) {
        return util.format(`/delivery/product/addon/category/detail/${value}/${product}`);
    },

    storeTagDetailLink(value) {
        return util.format(`/delivery/store/tag/detail/${value}`);
    },

    scheduleDetailLink(value) {
        return util.format(`/schedule/detail/${value}`);
    },

    customerDetailLink(value) {
        return util.format(`/shop/customer/detail/${value}`);
    },

    userOrderDetail(value) {
        return util.format(`/delivery/${value}`);
    },

    orderDetail(value) {
        return util.format(`/order/detail/${value}`);
    },

    ticketListlLink(value) {
        return util.format(`/ticket/${value}`);
    },

    flashsaleLink(value) {
        return util.format(`/flashsale/detail/${value}`);
    },

    promotioncodeLink(value) {
        return util.format(`/promotioncode/detail/${value}`);
    },

    bannerWebLink(value) {
        if(value === 'false')
            return ;
        return value;
    },

    bannerMobileLink(value) {
        if(value === 'false')
            return ;
        return value;
    },

    productAppLink(value) {
        return util.format(process.env.product_link_app, value);
    },

    productWebLink(value) {
        return util.format(process.env.product_web_link, value);
    },


    productWebMobileLink(value) {
        return util.format(process.env.product_web_mobile_link, value);
    },

    ticketChanel(name){
        if (nameType === 'hotline')
            return 1;
    },

    ticketType(nameType){
        if (nameType === 'callin')
            return 'User gọi vào';
        if (nameType === 'callout')
            return 'Cs gọi ra';
    },

    callStatus(value){
        if (value === 'preparecall')
            return 'Đang quay số';
        if (value === 'dial')
            return 'Gọi nhỡ';
        // if (value === 'calling')
        //     return 'Đang nghe máy';
        if (value === 'calloff')
            return 'Không nghe máy';
        if (value === 'endcall')
            return 'Kết thúc';
    },

    processStatus(value){
        if (value === 'prepare')
            return 'Chưa xử lý';
        if (value === 'doing')
            return 'Đang xử lý';
        if (value === 'success')
            return 'Thành công';
        if (value === 'fail')
            return 'Thất bại';
    },

    productTrackingGroupBy(value) {
        if (value === 'merchant')
            return 'Merchant';
        if (value === 'product')
            return 'Product';
        if (value === 'create_day')
            return 'Date';
        if (value === 'source')
            return 'Source';
        if (value === 'medium')
            return 'Medium';
        if (value === 'campaign')
            return 'Campaign';
        return value;
    },

    flashsaleState(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'deactive')
            return 'Ngưng hoạt động';
        return value;
    },

    pomotionCodeType(value) {
        if (value === 'reduce_percent')
            return 'REDUCE_PERCENT';
        if (value === 'reduce_value')
            return 'REDUCE_VALUE';
        if (value === 'reduce_ship_percent')
            return 'REDUCE_SHIP_PERCENT';
        if (value === 'reduce_ship_value')
            return 'REDUCE_SHIP_VALUE';
        if (value === 'add_lixi_percent')
            return 'ADD_LIXI_PERCENT';
        if (value === 'add_lixi_value')
            return 'ADD_LIXI_VALUE';
        return value;
    },

    pomotionCodeState(value) {
        if (value === 'active')
            return 'Hoạt động';
        if (value === 'deactive')
            return 'Đã khóa';
        return value;
    },

    pomotionCodePlatform(value) {
        if (value === '1')
            return 'Delivery';
        if (value === '2')
            return 'Evoucher';
        return value;
    },


    trackingProductMerchantLink(value, startDate = null, endDate = null) {
        let queryString = '';
        if (startDate && endDate) {
            queryString = `?startDate=${moment(startDate).startOf('day').unix()}&endDate=${moment(endDate).endOf('day').unix()}`
        }
        return util.format(`/tracking/product/merchant/${value}${queryString}`);
    },

    trackingProductDetailLink(value, startDate = null, endDate = null) {
        let queryString = '';
        if (startDate && endDate) {
            queryString = `?startDate=${moment(startDate).startOf('day').unix()}&endDate=${moment(endDate).endOf('day').unix()}`
        }
        return util.format(`/tracking/product/detail/${value}${queryString}`);
    },
}