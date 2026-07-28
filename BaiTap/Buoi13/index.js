//Bai 1
function add(a, b) {
    return a + b;
}
function multiply(a, b) {
    return a * b;
}

// viết hàm ở đây
function calculate(a, b, callBack) {
    return callBack(a, b);
}

calculate(3, 4, add); // 7
calculate(3, 4, multiply); // 12

//Bai 2
// viết hàm ở đây
let i = 0;
function createCounter() {
    return () => {
        return ++i;
    };
}
const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3

//Bai 3

// viết hàm ở đây
function repeatTimes(n, callBack) {
    for (let i = 0; i <= n; i++) {
        callBack(i);
    }
}
repeatTimes(5, (index) => {
    console.log(`Lần thứ ${index}`);
});
// In ra: Lần thứ 0, Lần thứ 1, ..., Lần thứ 4

//Bai 4
// viết hàm ở đây
function createGreeter(greeting) {
    return function (name) {
        console.log(`${greeting}, ${name}!`);
    };
}

const greetVi = createGreeter("Xin chào");
const greetEn = createGreeter("Hello");

greetVi("An"); // "Xin chào, An!"
greetEn("An"); // "Hello, An!"

//Bai 5
// viết hàm ở đây
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const fetchDataMock = (id, callBack) => {
    setTimeout(
        () => {
            if (id <= 0) {
                callBack("Invalid ID", null);
            } else {
                callBack(null, `Sample Data for ID ${id}`);
            }
        },
        getRandomArbitrary(1000, 5000),
    );
};
fetchDataMock(5, (error, data) => {
    if (error) return console.log("Error:", error);
    console.log("Data:", data);
});

fetchDataMock(-1, (error, data) => {
    if (error) return console.log("Error:", error); // phải in ra lỗi
});

for (let i = 1; i <= 3; i++) {
    fetchDataMock(i, (error, data) => {
        if (error) {
            console.log("Error:", error);
            return;
        }

        console.log(data);
    });
}

//Bai 6
function createAccount(initialBalance) {
    // code ở đây
    let balance = initialBalance;
    let depositCounter = 0;
    let withdrawCounter = 0;
    return function (action, amount) {
        switch (action) {
            case "deposit": {
                balance += amount;
                depositCounter++;
                // console.log("Balance : ", balance);
                break;
            }
            case "withdraw": {
                if (balance < amount) {
                    console.log("Insufficient balance");
                    break;
                } else {
                    balance -= amount;
                    withdrawCounter++;
                    // console.log("Balance : ", balance);
                }
                break;
            }
            case "history": {
                return `Deposits: ${depositCounter}, Withdrawals: ${withdrawCounter}`;

                break;
            }
            case "balance": {
                return balance;
                break;
            }
            default: {
                break;
            }
        }
    };
}

const account = createAccount(200000);

account("deposit", 50000);
account("deposit", 5500);

account("withdraw", 30000);
account("withdraw", 3000);
console.log(account("balance")); // 120000

account("withdraw", 999999); // phải báo lỗi "Insufficient balance", không cho rút âm
console.log(account("history"));
