//Bai1
function countVowels(str) {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        if ("aeiouAEIOU".includes(str[i])) {
            ++result;
        }
    }
    //     console.log(result);
    return { result };
}

countVowels("Xin chao cac ban"); // → 6
countVowels("aeiouAEIOU"); // → 6

//Bài 2
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

//Bai 3
function reverseEachWord(str) {
    let words = str.split(" ");
    let result = "";
    for (currentWord of words) {
        for (let i = 0; i < currentWord.length; i++) {
            result = result + currentWord.at(-i - 1);
        }
        result = result + " ";
    }
    //     console.log(result);
    return result;
}

reverseEachWord("Hoc lap trinh"); // → "coH pal hnirt"

//Bai4
function compressString(str) {
    let result = str[0];
    let counter = 1;
    for (let i = 1; i < str.length; i++) {
        if (str[i] === str[i - 1]) {
            counter++;
        } else {
            result = result + String(counter) + str[i];
            counter = 1;
        }
    }
    result = result + String(counter);
    return result.length > str.length ? str : result;
}
compressString("aaabbbcccdd"); // → "a3b3c2d1"
compressString("abc"); // → "abc" (vì nén ra "a1b1c1" dài hơn)

//Bai5

function isAnagram(str1, str2) {
    let str1SkipSpace = str1.replaceAll(" ", "").toLowerCase();
    let str2SkipSpace = str2.replaceAll(" ", "").toLowerCase();

    if (str1SkipSpace.length !== str2SkipSpace.length) {
        return false;
    }
    for (let i = 0; i < str1SkipSpace.length; i++) {
        if (str2SkipSpace.includes(str1SkipSpace[i])) {
            str2SkipSpace.replace(str1SkipSpace[i], "");
        } else {
            return false;
        }
    }
    return true;
}
isAnagram("nghe si", "sinh e"); // → true (nếu cùng tập ký tự)
isAnagram("hello", "world"); // → false
