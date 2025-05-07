import type { CreditItem, MediaItem } from "@types";

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
    const rounder = Math.pow(10, digits);
    return (Math.round(input * rounder) / rounder).toFixed(digits);
}

const convertRuntime = (n: number) => {
    const hours = Math.trunc(n / 60);
    const minutes = n % 60;
    return hours +"h"+ " " + minutes + "m";
}

const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const calculateAge = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

const dedupeResults = (results: CreditItem[] | MediaItem[]) => {
    return results.filter((result, index: number, self) => index == self.findIndex((r) => r.id === result.id))
}

const slugify = (text: string): string => {
    return text
      .normalize("NFD")                      // Normalize accented characters (e.g., é → e + ́)
      .replace(/[\u0300-\u036f]/g, "")       // Remove diacritical marks
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")           // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, "");              // Trim hyphens from start/end
}

export {
    isNumeric,
    toTitleCase,
    roundedToFixed,
    convertRuntime,
    formatCurrency,
    calculateAge,
    dedupeResults,
    slugify
}