//Bai 1
const arr = [3, 7, 2, 9, 9, 5];
let max = 0;
let result = 0;

for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
        result = max;
        max = arr[i];
    }
}

console.log(result);

//Bai 2
const words = ["a", "b", "a", "c", "b", "a", "y", "b"];

const uniqueWords = [];
const count = [];

for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const index = uniqueWords.indexOf(word);
    if (index === -1) {
        uniqueWords.push(word);
        count.push(1);
    } else {
        count[index]++;
    }
}

for (let i = 0; i < uniqueWords.length; i++) {
    console.log(`${uniqueWords[i]}: ${count[i]}`);
}

//Bai 3

const num = [1, 2, 3, 4, 6, 2, 3, 4, 1, 5, 6, 7];

let result3 = 1;
let counter = 1;

for (let i = 1; i < num.length; i++) {
    if (num[i] > num[i - 1]) {
        counter++;
    } else {
        if (counter > result3) result3 = counter;
        counter = 1;
    }
}
if (counter > result3) result3 = counter;
console.log(result3);

//Bai 4
const sentence = "hôm nay trời đẹp";
const reverseSentence = sentence.split(" ").reverse().join(" ");
console.log(reverseSentence);

//Bai 5
function isPalindrome(str) {
    let str_skip_space = str.replaceAll(" ", "");
    if (!str_skip_space) {
        return false;
    }
    if (str_skip_space.length === 1) {
        return true;
    }
    for (let i = 0; i <= Math.floor(str_skip_space.length / 2); i++) {
        if (str_skip_space[i] !== str_skip_space.at(-i - 1)) {
            return false;
        }
    }
    return true;
}
isPalindrome("madam"); // → true
isPalindrome(""); // → true
isPalindrome("Toi yeu Viet Nam"); // → false
isPalindrome("aaa bbb bbb aaa"); // → true

//Bai 6
const nums = [2, 7, 11, 15];
const target = 10;

for (let i = 0; i < nums.length / 2; i++) {
    if (nums.indexOf(target - nums[i]) !== -1) {
        console.log(`Index: ${i} và ${nums.indexOf(target - nums[i])}`);
        break;
    }
}
