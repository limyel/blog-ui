import {NumberTOChinese} from "./NumberUtil.js";

export function showTimeShort(timeStamp) {
    let date = new Date(timeStamp);
    let ts = date.getTime();
    ts /= 1000;
    let now = new Date() / 1000;
    let delta = parseInt((now - ts) / 60);
    if (delta >= 0 && delta < 10)
        return '刚刚';
    else if (delta >= 10 && delta < 60)
        return delta + ' 分钟前';
    else if (delta >= 60 && delta < 60 * 24)
        return parseInt(delta / 60) + ' 小时前';
    else if (delta >= 60 * 24 && delta < 60 * 24 * 30)
        return parseInt(delta / 60 / 24) + ' 天前';
    else if (delta >= 60 * 24 * 30 && delta < 60 * 24 * 365)
        return parseInt(delta / 60 / 24 / 30) + ' 个月前'
    else if (delta >= 60 * 24 * 365)
        return parseInt(delta / 60 / 24 / 365) + ' 年前'
}

export function showDayDelta(timestamp) {
    let date = new Date(timestamp);
    let ts = date.getTime();
    ts /= 1000;
    let now = new Date() / 1000;
    let delta = parseInt((now - ts) / 60);
    if (delta >= 0 && delta < 10)
        return '刚刚';
    else if (delta >= 10 && delta < 60)
        return delta + ' 分钟前';
    else if (delta >= 60 && delta < 60 * 24)
        return parseInt(delta / 60) + ' 小时前';
    else if (delta >= 60 * 24)
        return parseInt(delta / 60 / 24) + ' 天前';
}

export function showTimeDetail(timeStamp) {
    let ts = new Date(timeStamp);
    return ts.getFullYear() + "-" + (ts.getMonth()+1) + "-" + ts.getDate() + " " + ts.getHours() + ": " + ts.getMinutes();
}

export function showMonthDay(timeStamp) {
    let ts = new Date(timeStamp);
    let day = ts.getDate();
    if (day / 10 === 0) {
        day = '0' + day;
    }
    return (ts.getMonth()+1) + '-' + day;
}

export function showMonthDayLocal(timestamp) {
    let ts = new Date(timestamp);
    return NumberTOChinese(ts.getMonth()+1) + "月 " + ts.getDate() + " 日";
}

export function showYearMonthDay(timestamp) {
    let ts = new Date(timestamp);
    return ts.getFullYear() + "/" + (ts.getMonth()+1) + "/" + ts.getDate();
}