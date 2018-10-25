/**
 * Note: precision不是保留的小数点后面的位数, 而是计算的精度
 * 如果需要获取计算值的保留小数位数请使用numberFormat()
 */
export const doDecimalSafeMath = (a, operation, b, precision) => {
    a = isNaN(a) ? 0 : Number(a || 0);
    b = isNaN(b) ? 0 : Number(b || 0);
    function decimalLength(numStr) {
        const pieces = numStr.toString().split('.');
        if (!pieces[1]) {
            return 0;
        }
        return pieces[1].length;
    }
    // Figure out what we need to multiply by to make everything a whole number
    precision = precision || Math.pow(10, Math.max(decimalLength(a), decimalLength(b)));
    a = Math.round(a * precision);
    b = Math.round(b * precision);
    // Figure out which operation to perform.
    let operator;
    switch (operation.toLowerCase()) {
        case '-':
            operator = function (a1, b1) { return a1 - b1; };
            break;
        case '+':
            operator = function (a1, b1) { return a1 + b1; };
            break;
        case '*':
        case 'x':
            precision = precision * precision;
            operator = function (a1, b1) { return a1 * b1; };
            break;
        case '÷':
        case '/':
            precision = 1;
            operator = function (a1, b1) { return a1 / b1; };
            break;
        // Let us pass in a function to perform other operations.
        default:
            operator = operation;
    }
    const result = operator(a, b);
    // Remove our multiplier to put the decimal back.
    return (result / precision);
};
/**
 * Addition
 * @param {String|Number} num1
 * @param {String|Number} num2
 * @param {Number} precision
 * @return {Number}
 */
export const numAdd = (num1, num2, precision) => {
    return doDecimalSafeMath(num1, '+', num2, precision);
};
/**
 * subtraction
 * @param {String|Number} num1
 * @param {String|Number} num2
 * @param {Number} precision
 * @return {Number}
 */
export const numSub = (num1, num2 = 0, precision) => {
    return doDecimalSafeMath(num1, '-', num2, precision);
};
/**
 * multiplication
 * @param {String|Number} num1
 * @param {String|Number} num2
 * @param {Number} precision
 * @return {Number}
 *
 */
export const numMulti = (num1, num2 = 0, precision) => {
    return doDecimalSafeMath(num1, '*', num2, precision);
};
/**
 * division
 * @param {String|Number} num1
 * @param {String|Number} num2
 * @param {Number} precision
 * @return {Number}
 */
export const numDiv = (num1, num2 = 0, precision) => {
    return doDecimalSafeMath(num1, '/', num2, precision);
};
export const amtToArr = (number, formatBit) => {
    formatBit = formatBit || 2;
    let amtArr = [];
    if (number && !isNaN(number)) {
        number = Number(number);
        amtArr = number.toFixed(formatBit).split('.');
        amtArr[0] = amtArr[0] + '.';
    }
    else {
        amtArr[0] = '0.';
        amtArr[1] = '00';
    }
    return amtArr;
};
/**
 * Formats a number with grouped thousands
 * @param {String|Number} number
 * @param {Number} decimals
 * @param {String} dec_point
 * @param {String} thousands_sep
 */
export const numberFormat = (number, decimals = 0, dec_point = '.', thousands_sep = ',', useRound = false) => {
    const n = !isFinite(+number) ? 0 : +number;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const approximateFn = Math[`${useRound ? 'round' : 'floor'}`];
    let s = '';
    const toFixedFix = function (n1, prec1) {
        const k = Math.pow(10, prec1);
        return '' + numDiv(approximateFn(numMulti(n1, k)), k);
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + approximateFn(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec_point);
};
