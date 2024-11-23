export function formatNumber(number: number) {
    let output = ``;

    const b = 1 * 10 ** 9;
    const m = 10 * 10 ** 6;
    const hk = 100 * 10 ** 3;
    const lk = 10 * 10 ** 3;

    if (number >= b) {
        output = (number / b).toFixed(2) + "B";
    } else if (number >= m) {
        let num = (number / (m / 10)).toFixed(1);
        output = (num.endsWith('.0') ? num.substring(0, num.indexOf('.')) : num) + "M";
    } else if (number >= hk) {
        output = (number / (hk / 100)).toFixed(0) + "K";
    } else if (number >= lk) {
        output = (number / (lk / 10)).toFixed(2) + "K";
    } else {
        output = number.toString();
    }
    
    return output;
}