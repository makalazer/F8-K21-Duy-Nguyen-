// Bai 1
const customer1: { name: string; energyUsed: number } = {
    name: "Duy Nguyen",
    energyUsed: 8000,
};

const calculateBill = (energyUsed: number): number => {
    if (energyUsed <= 50) {
        return energyUsed * 1800;
    }
    if (energyUsed <= 100) {
        return 50 * 1800 + (energyUsed - 50) * 2000;
    }
    return 50 * 1800 + 50 * 2000 + (energyUsed - 100) * 2500;
};
const isHighUsage = (energyUsed: number): Boolean => {
    if (energyUsed > 200) {
        return true;
    }
    return false;
};

console.log(
    `Chủ hộ : ${customer1.name} \n`,
    `Số điện: ${customer1.energyUsed} \n`,
    `Tiền điện: ${calculateBill(customer1.energyUsed)} đ \n`,
    `Dùng nhiều điện: ${isHighUsage(customer1.energyUsed) ? "Có" : "Không"}`,
);

//Bai 2
interface Student {
    name: string;
    age: number;
    gpa: number;
    phone?: string;
}

const GroupStudent: Student[] = [
    { name: "Duy 1", age: 12, gpa: 6.0 },
    { name: "Duy 2", age: 12, gpa: 5.0, phone: "0912345678" },
    { name: "Duy 3", age: 12, gpa: 9.5, phone: "0912098799" },
    { name: "Duy 4", age: 13, gpa: 4.5, phone: "0912345678" },
    { name: "Duy 5", age: 12, gpa: 8.0, phone: "0912345676" },
];

const GroupStudent2: Student[] = [
    { name: "Duy 1", age: 12, gpa: 4.0 },
    { name: "Duy 2", age: 12, gpa: 3.0, phone: "0912345678" },
    { name: "Duy 3", age: 12, gpa: 0.5, phone: "0912098799" },
    { name: "Duy 4", age: 13, gpa: 2.5, phone: "0912345678" },
    { name: "Duy 5", age: 12, gpa: 1.0, phone: "0912345676" },
];

const printStudent = (student: Student): void => {
    console.log(
        `Họ tên: ${student.name} | Tuổi: ${student.age} | Điểm: ${student.gpa} | SĐT: ${student.phone ? student.phone : "chưa cập nhật"}`,
    );
};

GroupStudent.forEach((student) => {
    printStudent(student);
});

const getTopStudent = (GroupStudent: Student[]): Student => {
    let result: Student = GroupStudent[0]!;
    GroupStudent.forEach((student) => {
        if (student.gpa > result.gpa) {
            result = student;
        }
    });
    return result;
};
let topStudent: Student = getTopStudent(GroupStudent);
console.log(
    `Học viên có điểm cao nhất là  ${topStudent.name} (${topStudent.gpa})`,
);

const getPassedStudents = (GroupStudent: Student[]): Student[] => {
    return GroupStudent.filter((student) => {
        return student.gpa >= 5;
    });
};
// console.log(getPassedStudents(GroupStudent));
// console.log(getPassedStudents(GroupStudent2));

console.log(
    `Số lượng học viên đạt là : ${getPassedStudents(GroupStudent).length}`,
);

const countByAge = (GroupStudent: Student[], age: number): number => {
    const counted: Student[] = GroupStudent.filter((student) => {
        return student.age === age;
    });
    return counted.length;
};

const age: number = 13;

console.log(`Số học viên ${age} tuổi: ${countByAge(GroupStudent, age)}`);

//Bai 3

type Size = "S" | "M" | "L";

interface Drink {
    name: string;
    size: Size;
    quantity: number;
    toppping: Boolean;
}

const getPriceBySize = (size: Size): number => {
    switch (size) {
        case "S": {
            return 25000;
        }
        case "M": {
            return 30000;
        }
        case "L": {
            return 35000;
        }
    }
};
const calculateDrink = (drink: Drink): number => {
    const price: number = getPriceBySize(drink.size);
    return drink.toppping ? price + 5000 : price;
};

const calculateOrder = (order: Drink[]): number => {
    let result = order.reduce((total, drink) => {
        return total + calculateDrink(drink) * drink.quantity;
    }, 0);
    return result;
};

const formatMoney = (num: number): string => {
    let money: string = num.toLocaleString("vi-VN") + " đ";
    return money;
};

const order: Drink[] = [
    {
        name: "Trà sữa trân châu",
        size: "M",
        quantity: 2,
        toppping: true,
    },
    {
        name: "Trà đào",
        size: "L",
        quantity: 4,
        toppping: false,
    },
    {
        name: "Matcha latte",
        size: "S",
        quantity: 3,
        toppping: true,
    },
];

order.forEach((drink) => {
    console.log(
        `${drink.name} (${drink.size}) x${drink.quantity}: ${formatMoney(drink.quantity * calculateDrink(drink))}`,
    );
});

const total = calculateOrder(order);
const discount = total >= 200000 ? total * 0.1 : 0;
const payment = total - discount;

console.log(`Tổng tiền: ${formatMoney(total)}`);
console.log(`Giảm giá: ${formatMoney(discount)}`);
console.log(`Thanh toán: ${formatMoney(payment)}`);
