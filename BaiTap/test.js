const NGUONG1 = 1;
const NGUONG2 = 5;
const NGUONG3 = 120;

let total = 15000;

let soKMdi = 125;

if (1 < soKMdi && soKMdi <= NGUONG2) {
    total += (soKMdi - 1) * 13500;
} else {
    total = total + 13500 * 4 + (soKMdi - 5) * 11000;
}
if (soKMdi > NGUONG3) {
    total *= 0.9;
}

console.log("tong tien:", total);
