import {ElMessage, ElMessageBox} from "element-plus";
import nprogress from "nprogress";

// 消息提示
export function showMessage(message = '提示内容', type = 'success', customClass = '') {
    return ElMessage({
        type: type,
        message,
        customClass
    })
}

// 弹出确认框
export function showModel(content = '提示内容', type = 'warning', title = '') {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}

// 显示页面加载
export function showPageLoading() {
    nprogress.start()
}
// 隐藏页面加载
export function hidePageLoading() {
    nprogress.done()
}


export function number2Chinese(num) {
    let numList = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    let ten = "十";
    let result = "";
    if (num-10 >= 0) {
        result += ten;
        num -= 10;
    }
    if (num > 0) {
        result += numList[num-1];
    }
    return result;
}


