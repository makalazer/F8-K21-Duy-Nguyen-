//Bài 1
let n = -7;

// Viết code kiểm tra ở đây

// Thử lại với các giá trị khác: n = -7, n = 0
let result = "Số ";

if (n < 0) {
    result = result + "âm ";
} else if (n > 0) {
    result = result + "dương ";
}

if (n === 0) {
    result = result + "0";
} else {
    if (n % 2 !== 0) {
        result = result + "lẻ";
    } else {
        result = result + "chẵn";
    }
}

console.log(result);

//Bài 2
let a = 0;
let b = 1;
let c = "";
let d = "hello";
let e = null;
let f = undefined;
let g = NaN;
let h = " ";

// Ví dụ với biến a:
if (a) {
    console.log("a là truthy");
} else {
    console.log("a là falsy");
}
if (b) {
    console.log("b là truthy");
} else {
    console.log("b là falsy");
}
if (c) {
    console.log("c là truthy");
} else {
    console.log("c là falsy");
}
if (d) {
    console.log("d là truthy");
} else {
    console.log("d là falsy");
}
if (e) {
    console.log("e là truthy");
} else {
    console.log("e là falsy");
}
if (f) {
    console.log("f là truthy");
} else {
    console.log("f là falsy");
}
if (g) {
    console.log("g là truthy");
} else {
    console.log("g là falsy");
}
if (h) {
    console.log("h là truthy");
} else {
    console.log("h là falsy");
}

// Làm tương tự với các biến còn lại: b, c, d, e, f, g, h

//Bài 3
let diem = 4;

// Viết các điều kiện if/else if/else ở đây
if (!diem || diem === 0) {
    console.log("Chưa có điểm");
} else {
    switch (true) {
        case diem < 0 || diem > 10: {
            console.log("Điểm không hợp lệ");
            break;
        }
        case diem >= 9: {
            console.log("Xuất sắc");
            break;
        }
        case diem >= 7: {
            console.log("Giỏi");
            break;
        }
        case diem >= 5: {
            console.log("Trung bình");
            break;
        }
        default: {
            console.log("Yếu");
            break;
        }
    }
}

//Bài 4
for (let i = 1; i <= 50; i++) {
    // Viết điều kiện kiểm tra ở đây
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
        continue;
    }
    if (i % 3 === 0) {
        console.log("Fizz");
        continue;
    }
    if (i % 5 === 0) {
        console.log("Buzz");
        continue;
    }
    console.log(i);
}

//Bài 5
let y = 179;
let isPrime = true;

// Xử lý trường hợp đặc biệt: n <= 1 thì không phải số nguyên tố
if (y <= 1) {
    isPrime = false;
} else {
    for (let i = 2; i < y ** 0.5; i++) {
        // Kiểm tra n có chia hết cho i không
        if (y % i === 0) isPrime = false;
    }
}
if (isPrime) {
    console.log("y là số nguyên tố");
} else {
    console.log("y không là số nguyên tố");
}

// In kết quả dựa vào isPrime
