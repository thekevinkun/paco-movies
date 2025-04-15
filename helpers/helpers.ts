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

const dedupeResults = (results: any) => {
    return results.filter((result: any, index: number, self: any) => index == self.findIndex((r: any) => r.id === result.id))
}

export {
    isNumeric,
    toTitleCase,
    roundedToFixed,
    dedupeResults
}