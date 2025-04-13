const isNumeric = (value: string) => {
    return /^\d+$/.test(value);
}

const toTitleCase = (str: string) => {
    return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

const roundedToFixed = (input: number, digits: number) => {
    var rounder = Math.pow(10, digits);
    return (Math.round(input * rounder) / rounder).toFixed(digits);
}

export {
    isNumeric,
    toTitleCase,
    roundedToFixed
}