export default function hexToRgb(hex: `#${string}`) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) throw new Error(`Not a valid hex string`);
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return {
        r,
        g,
        b,
        toString() {
            return `rgb(${r},${g},${b})`;
        },
    };
}
