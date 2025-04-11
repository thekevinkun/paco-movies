const isNumeric = (value: string) => {
    return /^\d+$/.test(value);
}

const roundedToFixed = (input: number, digits: number) => {
    var rounder = Math.pow(10, digits);
    return (Math.round(input * rounder) / rounder).toFixed(digits);
}

export {
    isNumeric,
    roundedToFixed
}