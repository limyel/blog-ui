export function getPages(current, pages) {
    let result = [];
    if (pages <= 10) {
        for (let i = 1; i <= pages; i++) {
            result.push(i);
        }
        return result;
    }
    let previous = current - 1;
    let next = current + 1;
    if (previous <= 3) {
        for (let i = 1; i <= next; i++) {
            result.push(i);
        }
    } else {
        result.push(1, -1);
        result.push(previous, current);
        if (next <= pages - 3) {
            result.push(next);
        }
    }
    if (next > pages - 3) {
        for (let i = next; i <= pages; i++) {
            result.push(i);
        }
    } else {
        result.push(-1);
        result.push(pages);
    }

    return result;
}