//Bai 1
const cart = [
    { name: "Áo thun", price: 150000, quantity: 2 },
    { name: "Quần jean", price: 350000, quantity: 4 },
    { name: "Giày", price: 500000, quantity: 1 },
    { name: "Tất", price: 50000, quantity: 200 },
];

function getTotal(cart) {
    return cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
}

function getMaxTotalItem(cart) {
    return cart.reduce(
        (result, item) => {
            if (result.price * result.quantity < item.price * item.quantity) {
                return item;
            }
            return result;
        },
        { price: 0, quantity: 0 },
    );
}

function showProductsQtyOverOne(cart) {
    cart.map((item) => {
        if (item.quantity > 1) console.log(item);
    });
}

console.log("Tổng giá trị là: ", getTotal(cart));
console.log("Sản phẩm có giá trị lớn nhất là : ", getMaxTotalItem(cart));
showProductsQtyOverOne(cart);

//Bai 2
const student = {
    name: "Minh",
    scores: [8, 7.5, 9, 6, 10, 0, 0],
    // TODO: Viết các method dưới đây
    getAverage: function () {
        let sum = this.scores.reduce((total, score) => {
            return total + score;
        }, 0);
        let averageScores = sum / this.scores.length;
        return +averageScores.toFixed(2);
    },
    getStatus: function () {
        let averageScores = this.getAverage();
        switch (true) {
            case averageScores >= 8:
                return "Giỏi";
            case averageScores >= 6.5:
                return "Khá";
            default:
                return "Trung Bình";
        }
    },
};

console.log(student.getAverage());
console.log(student.getStatus());
console.log(
    `Minh đạt loại ${student.getStatus()} với điểm trung bình ${student.getAverage()}`,
);

//Bài 3
const employees = [
    { id: "E01", name: "An", department: "Sales" },
    { id: "E02", name: "An", department: "Sales" },
    { id: "E03", name: "An", department: "Sales" },
    { id: "E04", name: "Duy", department: "HR" },
    { id: "E05", name: "Bình", department: "IT" },
    { id: "E06", name: "Chi", department: "IT" },
];

const employeesObj = employees.reduce((obj, employe) => {
    obj[employe.id] = employe;
    return obj;
}, {});
console.log(employeesObj);

const employeesArr = Object.values(employeesObj);
console.log(employeesArr);

const department_Employees_Count = employeesArr.reduce((prev, employe) => {
    if (prev[employe.department]) {
        prev[employe.department]++;
    } else {
        prev[employe.department] = 1;
    }
    return prev;
}, {});
console.log(department_Employees_Count);

//Bai 4
const product = {
    name: "Bàn phím cơ",
    price: 890000,
    discount: 30, // %
    // TODO: Viết các method dưới đây
    getFinalPrice: function () {
        return this.price - (this.price * this.discount) / 100;
    },
    showInfo: function () {
        console.log(
            `Bàn phím cơ: giá gốc ${this.price}, giá sau giảm ${this.getFinalPrice()}`,
        );
    },
};

console.log(product.getFinalPrice());

product.showInfo();

//Bai 5
const todos = [
    { task: "Học JavaScript", done: false },
    { task: "Làm bài tập", done: true },
    { task: "Đọc sách", done: false },
    { task: "Thể dục", done: false },
    { task: "Cho heo ăn", done: true },
];

const undoneTask = todos.filter((task) => {
    if (!task.done) return true;
    return false;
});

const taskNameList = todos.map((task) => {
    return task.task;
});

function countDone(todoList) {
    return todoList.reduce((prev, task) => {
        if (task.done) prev++;
        return prev;
    }, 0);
}

function markAsDone(todos, taskName) {
    todos.forEach((element) => {
        if (element.task === taskName) {
            element.done = true;
        }
    });
}

console.log(undoneTask);
console.log(taskNameList);
console.log(countDone(todos));

markAsDone(todos, "Thể dục");
console.log(todos);
