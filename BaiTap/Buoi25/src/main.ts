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
const isHighUsage = (energyUsed: number): boolean => {
    if (energyUsed > 200) {
        return true;
    }
    return false;
};

console.log(
    [
        `Chủ hộ : ${customer1.name} `,
        `Số điện: ${customer1.energyUsed} kWh `,
        `Tiền điện: ${calculateBill(customer1.energyUsed)} đ `,
        `Dùng nhiều điện: ${isHighUsage(customer1.energyUsed) ? "có" : "không"}`,
    ].join("\n"),
);

//Bai 2
interface Student {
    name: string;
    age: number;
    gpa: number;
    phone?: string;
}

const groupStudent: Student[] = [
    { name: "Duy 1", age: 12, gpa: 6.0 },
    { name: "Duy 2", age: 12, gpa: 5.0, phone: "0912345678" },
    { name: "Duy 3", age: 12, gpa: 9.5, phone: "0912098799" },
    { name: "Duy 4", age: 13, gpa: 4.5, phone: "0912345678" },
    { name: "Duy 5", age: 12, gpa: 8.0, phone: "0912345676" },
];

const groupStudent2: Student[] = [
    { name: "Duy 1", age: 12, gpa: 4.0 },
    { name: "Duy 2", age: 12, gpa: 3.0, phone: "0912345678" },
    { name: "Duy 3", age: 12, gpa: 0.5, phone: "0912098799" },
    { name: "Duy 4", age: 13, gpa: 2.5, phone: "0912345678" },
    { name: "Duy 5", age: 12, gpa: 1.0, phone: "0912345676" },
];

const printStudent = (student: Student): void => {
    console.log(
        `Họ tên: ${student.name} | Tuổi: ${student.age} | Điểm: ${student.gpa} | SĐT: ${student.phone ? student.phone : "Chưa cập nhật"}`,
    );
};

groupStudent.forEach((student) => {
    printStudent(student);
});

const getTopStudent = (groupStudent: Student[]): Student | null => {
    if (groupStudent.length == 0) {
        return null;
    }

    return groupStudent.reduce((top, student) =>
        student.gpa > top.gpa ? student : top,
    );
};
console.log(getTopStudent([]));

let topStudent: Student | null = getTopStudent(groupStudent);
if (topStudent) {
    console.log(
        `Học viên có điểm cao nhất là  ${topStudent.name} (${topStudent.gpa})`,
    );
}

const getPassedStudents = (groupStudent: Student[]): Student[] => {
    return groupStudent.filter((student) => {
        return student.gpa >= 5;
    });
};
// console.log(getPassedStudents(groupStudent));
// console.log(getPassedStudents(GroupStudent2));

console.log(
    `Số lượng học viên đạt là : ${getPassedStudents(groupStudent).length}`,
);

const countByAge = (groupStudent: Student[], age: number): number => {
    const counted: Student[] = groupStudent.filter((student) => {
        return student.age === age;
    });
    return counted.length;
};

const age: number = 13;

console.log(`Số học viên ${age} tuổi: ${countByAge(groupStudent, age)}`);

//Bai 3

type Size = "S" | "M" | "L";

interface Drink {
    name: string;
    size: Size;
    quantity: number;
    topping: boolean;
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
    const price: number = getPriceBySize(drink.size) * drink.quantity;
    return drink.topping ? price + 5000 : price;
};

const calculateOrder = (order: Drink[]): number => {
    let result = order.reduce((total, drink) => {
        return total + calculateDrink(drink);
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
        topping: true,
    },
    {
        name: "Trà đào",
        size: "L",
        quantity: 4,
        topping: false,
    },
    {
        name: "Matcha latte",
        size: "S",
        quantity: 3,
        topping: true,
    },
];

order.forEach((drink: Drink) => {
    console.log(
        `${drink.name} (${drink.size}) x${drink.quantity}: ${formatMoney(drink.quantity * calculateDrink(drink))}`,
    );
});

const total: number = calculateOrder(order);
const discount: number = total >= 200000 ? total * 0.1 : 0;
const payment: number = total - discount;

console.log(`Tổng tiền: ${formatMoney(total)}`);
console.log(`Giảm giá: ${formatMoney(discount)}`);
console.log(`Thanh toán: ${formatMoney(payment)}`);
