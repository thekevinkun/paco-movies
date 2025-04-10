const roundedToFixed = (input: number, digits: number) => {
    var rounder = Math.pow(10, digits);
    return (Math.round(input * rounder) / rounder).toFixed(digits);
}

export {
    roundedToFixed
}