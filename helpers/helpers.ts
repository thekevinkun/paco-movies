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

const convertRuntime = (n: number) => {
    var hours = Math.trunc(n / 60);
    var minutes = n % 60;
    return hours +"h"+ " " + minutes + "m";
}

const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const calculateAge = (date: string) => {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

const dedupeResults = (results: any) => {
    return results.filter((result: any, index: number, self: any) => index == self.findIndex((r: any) => r.id === result.id))
}

export {
    isNumeric,
    toTitleCase,
    roundedToFixed,
    convertRuntime,
    formatCurrency,
    calculateAge,
    dedupeResults
}