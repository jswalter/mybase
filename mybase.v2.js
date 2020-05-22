class MyBase {
    /** 项目路径 */
    contextPath = '';

    /** 数字校验正则 */
    numberTest = /^\d+$/;

    /** 英文及数字校验正则 */
    enTest = /^[a-zA-Z0-9]*$/;

    /** 汉字、英文及数字校验正则 */
    cn_enTest = /[^\u4e00-\u9fa5a-zA-Z0-9]/ig;

    /** 简易身份证号校验（可校验15位及18位） */
    idTest = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i;

    /** 手机号码校验正则 */
    phoneTest = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;

    /** 省份区域代号 */
    provinceCodeMap = {
        11: '北京'
        , 12: '天津'
        , 13: '河北'
        , 14: '山西'
        , 15: '内蒙古'
        , 21: '辽宁'
        , 22: '吉林'
        , 23: '黑龙江'
        , 31: '上海'
        , 32: '江苏'
        , 33: '浙江'
        , 34: '安徽'
        , 35: '福建'
        , 36: '江西'
        , 37: '山东'
        , 41: '河南'
        , 42: '湖北'
        , 43: '湖南'
        , 44: '广东'
        , 45: '广西'
        , 46: '海南'
        , 50: '重庆'
        , 51: '四川'
        , 52: '贵州'
        , 53: '云南'
        , 54: '西藏'
        , 61: '陕西'
        , 62: '甘肃'
        , 63: '青海'
        , 64: '宁夏'
        , 65: '新疆'
        , 71: '台湾'
        , 81: '香港'
        , 82: '澳门'
        , 91: '国外'
    };

    /** 构造函数 */
    constructor() {
        this.setContextPath();
        // this.arrRemoveElement();
    }

    /** 设置项目路径 */
    setContextPath() {
        const path = window.document.location.pathname;
        this.contextPath = path.substring(0, path.substr(1).indexOf('/') + 1);
    }

    /** 定义数组删除元素方法 */
    // arrRemoveElement() {
    //     Array.prototype.remove = obj => {
    //         const index = this.indexOf(obj);
    //         if (index > -1)
    //             this.splice(index, 1);
    //     }
    // }

    /**
     * 获取一个随机数字字符串
     * @returns {string} 随机数字符串
     */
    getRandomKey() {
        const random = Math.round(Math.random() * 1000000000)
            , dateKey = new Date().getTime().toString();
        return dateKey + random;
    }

    /**
     * 获取一个UUID（含横杠）
     * @returns {string} uuid字符串
     */
    getUuidWithBar() {
        const s = []
            , hexDigits = '0123456789abcdef';
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4';
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('')
    }

    /**
     * 获取一个UUID（不含横杠）
     * @returns {string} uuid字符串
     */
    getUuidWithoutBar() {
        const uuid = this.getUuidWithBar();
        return uuid.replace(/-/g, '');
    }

    /**
     * 利用JSON克隆一个元素
     * @param {object} obj 待克隆的对象
     * @returns {object} 克隆后的对象
     */
    clone(obj) {
        const temp = JSON.stringify(obj);
        return JSON.parse(temp);
    }

    /**
     * 简化调用jQuery的Ajax请求函数
     * 异步版
     * @param {string} url 接口地址
     * @param {object} data 请求参数
     * @param {Function} success 回调函数
     * @param {Function} error 报错函数
     */
    ajax(url, data, success, error) {
        $.ajax({
            url: url
            , type: 'POST'
            , data: data
            , dataType: 'json'
            , success: success
            , error: error
        });
    }

    /**
     * 简化调用jQuery的Ajax请求函数
     * 同步版
     * @param {string} url 接口地址
     * @param {object} data 请求参数
     * @param {Function} success 回调函数
     * @param {Function} error 报错函数
     */
    ajaxAsync(url, data, success, error) {
        $.ajax({
            url: url
            , type: 'POST'
            , data: data
            , async: false
            , dataType: 'json'
            , success: success
            , error: error
        });
    }

    /**
     * 将json字符串转换为JSON对象
     * @param {string} str 待转换的JSON字符串
     * @returns {JSON} JSON对象
     */
    str2Json(str) {
        try {
            return JSON.parse(str);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * 将JSON对象转换为请求路径的参数
     * @param {JSON} json 待转换的JSON对象
     * @returns {string} 请求参数路径字符串
     */
    json2Url(json) {
        try {
            const tempArr = [];
            for (let i in json) {
                if (json.hasOwnProperty(i)) {
                    const key = encodeURIComponent(i)
                        , value = encodeURIComponent(json[i]);
                    tempArr.push(key + '=' + value);
                }
            }
            return tempArr.join('&');
        } catch (error) {
            console.log(error);
            return '';
        }
    }

    /**
     * 将请求参数路径转换为JSON对象
     * @param {string} url 待转换的请求参数路径
     * @returns {JSON} 包含参数的JSON对象
     */
    url2Json(url) {
        try {
            const params = url.match(/\?([^#]+)/)[1]
                , obj = {}, arr = params.split('&');
            for (let i = 0; i < arr.length; i++) {
                const subArr = arr[i].split('=')
                    , key = decodeURIComponent(subArr[0]);
                obj[key] = decodeURIComponent(subArr[1]);
            }
            return obj;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * 获取字符串后缀
     * @param {string} str 获取字符串的后缀
     * @param {string} suf 后缀标识
     * @returns {string} 字符串后缀
     */
    getSuffixStr(str = '', suf = '.') {
        const index = str.indexOf(suf);
        if (index < 0)
            return str;
        const index1 = str.lastIndexOf(suf)
            , index2 = str.length;
        return str.substring(index1, index2);
    }

    /**
     * 获取字符串前缀
     * @param {string} str 获取字符串的前缀
     * @param {string} pre 前缀标识
     * @returns {string} 字符串前缀
     */
    getPrefixStr(str, pre = '.') {
        const index = str.indexOf(pre);
        if (index < 0)
            return str;
        return str.substring(0, index);
    }

    /**
     * 获取基准时间以前的时间对象
     * @param {number} ago 多久以前
     * @param {number} unit 返回单位
     *                      0-年
     *                      1-月
     *                      2-日
     *                      3-时
     *                      4-分
     *                      5-秒
     * @param {Date} date 基准时间
     * @returns {Date} 返回时间
     */
    getDateAgo(ago, unit = 2, date = new Date()) {
        switch (unit) {
            case 0:
                date.setFullYear(date.getFullYear() - ago);
                break;
            case 1:
                date.setMonth(date.getMonth() - ago);
                break;
            case 2:
                date.setDate(date.getDate() - ago);
                break;
            case 3:
                date.setHours(date.getHours() - ago);
                break;
            case 4:
                date.setMinutes(date.getMinutes() - ago);
                break;
            case 5:
                date.setSeconds(date.getSeconds() - ago);
                break;
            default:
                break;
        }
        return date;
    }

    /**
     * 将时间对象转换为可读日期字符串
     * @param {Date} date 待转换的时间对象
     * @param {string} format 格式化模板
     *                        yyyy-年
     *                        mm-月
     *                        dd-日
     *                        HH-时（含0）
     *                        H-时（不含0）
     *                        hh-时（含0，区分上下午）
     *                        h-时（不含0，区分上下午）
     *                        MM-时（含0）
     *                        M-时（不含0）
     *                        ss-时（含0）
     *                        s-时（不含0）
     * @returns {string} 格式化后的时间字符串
     */
    getDateFormat(date = new Date(), format = 'yyyy-mm-dd HH:MM:ss') {
        const year = date.getFullYear().toString()
            , month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth())
            , day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
            , hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
            , minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            , second = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        format = format.replace('yyyy', year);
        format = format.replace('mm', month);
        format = format.replace('dd', day);
        if (format.indexOf('HH') > 0) {
            format = format.replace('HH', hour);
        } else if (format.indexOf('H') > 0) {
            format = format.replace("H", date.getHours().toString());
        } else if (format.indexOf('hh')) {
            const h = date.getHours() > 12 ? parseInt(hour) - 12 : date.getHours();
            format = format.replace('hh', (h < 10 ? '0' + h : h));
            format += (date.getHours() > 12 ? ' PM' : ' AM');
        } else if (format.indexOf('h')) {
            format = format.replace('h', date.getHours() > 12
                ? (date.getHours() - 12).toString()
                : date.getHours().toString());
            format += (date.getHours() > 12 ? ' PM' : ' AM');
        }
        if (format.indexOf('MM')) {
            format = format.replace('MM', minute);
        } else if (format.indexOf('M')) {
            format = format.replace("M", date.getMinutes().toString());
        }
        if (format.indexOf('ss')) {
            format = format.replace('ss', second);
        } else if (format.indexOf('s')) {
            format = format.replace("s", date.getSeconds().toString());
        }
        return format
    }

    /**
     * 将日期字符串按照模板转换为日期对象
     * @param {string} str 原始日期字符串
     * @param {string} format 格式化模板
     *                        yyyy-年
     *                        mm-月
     *                        dd-日
     *                        HH-时（含0）
     *                        H-时（不含0）
     *                        hh-时（含0，用AM/PM区分上下午）
     *                        h-时（不含0，用AM/PM区分上下午）
     *                        MM-时（含0）
     *                        M-时（不含0）
     *                        ss-时（含0）
     *                        s-时（不含0）
     */
    getDateStrFormat(str, format = 'yyyy-mm-dd HH:MM:ss') {
        const date = new Date()
            , year = format.indexOf('y') >= 0
                ? str.substring(format.indexOf('y'), format.lastIndexOf('y') + 1) : ''
            , month = format.indexOf('m') >= 0
                ? str.substring(format.indexOf('m'), format.lastIndexOf('m') + 1) : ''
            , day = format.indexOf('d') >= 0
                ? str.substring(format.indexOf('d'), format.lastIndexOf('d') + 1) : ''
            , Hour = format.indexOf('H') >= 0
                ? str.substring(format.indexOf('H'), format.lastIndexOf('H') + 1) : ''
            , hour = format.indexOf('h') >= 0
                ? str.substring(format.indexOf('h'), format.lastIndexOf('h') + 1) : ''
            , minute = format.indexOf('M') >= 0
                ? str.substring(format.indexOf('M'), format.lastIndexOf('M') + 1) : ''
            , second = format.indexOf('s') >= 0
                ? str.substring(format.indexOf('s'), format.lastIndexOf('s') + 1) : '';
        if (this.checkStrIsNum(year))
            date.setFullYear(parseInt(year));
        if (this.checkStrIsNum(month))
            date.setMonth(parseInt(month) - 1);
        if (this.checkStrIsNum(day))
            date.setDate(parseInt(day))
        if (this.checkStrIsNum(Hour))
            date.setHours(parseInt(Hour))
        else if (this.checkStrIsNum(hour)) {
            const h = parseInt(hour)
                , trueHour = (str.indexOf('PM') >= 0 && h <= 12)
                    ? (h + 12).toString()
                    : hour;
            date.setHours(parseInt(trueHour));
        }
        if (this.checkStrIsNum(minute))
            date.setMinutes(parseInt(minute));
        if (this.checkStrIsNum(second))
            date.setSeconds(parseInt(second));
        return date;
    }

    /**
     * 判断字符串是否为空（除去空格）
     * @param {string} str 待判断的字符串
     * @returns {boolean} 是否为空
     */
    checkStrNull(str) {
        return (str == null || str.replace(/\s+/g, '') === '');
    }

    /**
     * 判断数组是否为空
     * @param {Array} arr 待判断的数组
     * @returns {boolean} 是否为空
     */
    checkArrNull(arr) {
        return arr == null || arr.length === 0;
    }

    /**
     * 判断字符串是否为纯数字
     * @param {string} str 待判断的字符串
     * @returns {boolean} 是否为纯数字字符串
     */
    checkStrIsNum(str) {
        return !this.checkStrNull(str) && this.numberTest.test(str);
    }

    /**
     * 将字符串缩短至指定长度
     * @param {string} str 待缩短的字符串
     * @param {number} length 最大长度
     * @returns {string} 缩短后的字符串
     */
    longStrFormat(str, length) {
        if (this.checkStrNull(str) || typeof (length) !== 'number') {
            return '';
        } else if (str.length <= length) {
            return str;
        } else {
            return str.substring(0, length) + '...'
        }
    }

    /**
     * 根据ID获取下拉框DOM对象
     * @param {string} id 下拉框对象的ID属性
     * @returns {object} 被选中的option节点DOM对象
     */
    getSelectedOptionById(id) {
        let option = null;
        const select = document.getElementById(id);
        if (select && !this.checkArrNull(select.options)) {
            const index = select.selectedIndex;
            option = select.options[index];
        }
        return option;
    }

    /**
     * 在字符串中间插入字符
     * @param {string} soure 原始字符串
     * @param {number} start 插入点
     * @param {string} newStr 插入字符串
     * @returns {string} 处理后的字符串
     */
    insertStr(soure, start, newStr) {
        return soure.slice(0, start) + newStr + soure.slice(start)
    }

    /**
     * 对纯数字数组进行从小到大的排序
     * @param {Array} arr 被排序数组
     */
    numArrSort(arr) {
        if (!this.checkArrNull(arr))
            arr.sort((a, b) => { return a - b })
    }

    /**
     * 身份证号复杂校验
     * @param {string} idNumber 身份证号字符串
     * @returns {boolean} 是否为有效的身份证号
     */
    isIDCard(idNumber) {
        idNumber = idNumber.toUpperCase();
        // 简易校验
        if (!this.idTest.test(idNumber))
            return false;
        // 省份校验
        const proCode = parseInt(idNumber.substr(0, 2));
        if (this.provinceCodeMap[proCode] == null)
            return false;
        // 出生日期校验
        let regBirth, birthSplit, birth
            , len = idNumber.length;
        if (len === 15) {
            regBirth = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            birthSplit = idNumber.match(regBirth);
            birth = new Date('19' + birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
            return birth.getYear() === Number(birthSplit[2])
                && (birth.getMonth() + 1) === Number(birthSplit[3])
                && birth.getDate() === Number(birthSplit[4]);

        } else if (len === 18) {
            regBirth = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i);
            birthSplit = idNumber.match(regBirth);
            birth = new Date(birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
            if (!(birth.getFullYear() === Number(birthSplit[2])
                && (birth.getMonth() + 1) === Number(birthSplit[3])
                && birth.getDate() === Number(birthSplit[4])))
                return false;
            // 验证校验码
            let valnum, nTemp = 0;
            const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                , arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            for (let i = 0; i < 17; i++) {
                nTemp += idNumber.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            return valnum === idNumber.substr(17, 1);

        }
        return false;
    }

    /**
     * 验证手机号码 
     * [可匹配"(+86)013325656352"，括号可以省略，+号可以省略，(+86)可以省略，
     * 11位手机号前的0可以省略；11位手机号第二位数可以是3、4、5、8中的任意一个]
     * @param {string} phone 手机号码
     * @returns {boolean} 是否为有效的手机号
     */
    isMobilePhoneNumber(phone) {
        return !!phone.match(this.phoneTest);
    }
}