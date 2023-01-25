export function hex2rgb(c?: string): string {
    if (!c) {
        return 'rgb(0, 0, 0)';
    }

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return result ?
        `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
        :
        c
}

export function rgb2hex(rgb?: string): string {
    if (!rgb) {
        return '#000000'
    }
    const rgbArr = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgbArr && rgbArr.length === 4) ? "#" +
        ("0" + parseInt(rgbArr[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbArr[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbArr[3], 10).toString(16)).slice(-2) : rgb;
};