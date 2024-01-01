export function NumberTOChinese(num) {
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