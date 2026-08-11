//Bai 1

function Product(name, price, quantity) {
  this.name = name;
  this.price = price;
  this.quantity = quantity;

  this.getTotal = function () {
    return this.price * this.quantity;
  };
}

const product1 = new Product('Product 1', 10, 2);
const product2 = new Product('Product 2', 5, 3);
console.log(product1.getTotal()); // Output: 20
console.log(product2.getTotal()); // Output: 15

console.log(product1.getTotal === product2.getTotal);

//Bai 2

class Employee {
  constructor(name, baseSalary) {
    this.name = name;
    this.baseSalary = baseSalary;
  }
}

class Manager extends Employee {
  constructor(name, baseSalary, bonus) {
    super(name, baseSalary);
    this.bonus = bonus;
  }

  getSalary = function () {
    return this.baseSalary + this.bonus;
  };
}

const manager1 = new Manager('John', 5000, 1000);
console.log(manager1.getSalary()); // Output: 6000

//Bai 3

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(obj1 === obj2); // Output: false  because they are different objects in memory

const deepEqual = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (let key in obj1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!deepEqual(obj1[key], obj2[key])) return false;
    } else {
      if (obj1[key] !== obj2[key]) return false;
    }
  }
  return true;
};

console.log(deepEqual(obj1, obj2)); // Output: true  because they have the same structure and values

//Bai 4

const original = {
  name: 'Alice',
  address: {
    city: 'Hanoi',
    zip: '10000',
  },
};

const clone1 = { ...original };
const clone2 = Object.assign({}, original);

clone1.address.city = 'HCM';
console.log(clone1); //city = HCM
console.log(original); //city = HCM

const clone3 = structuredClone(original);
const clone4 = JSON.parse(JSON.stringify(original));

clone3.address.city = 'DaNang';
clone4.address.city = 'Hue';
console.log('Clone 3', clone3);
console.log('Clone 3', clone4);
console.log(original);

//Bai 5
const user = {
  id: 1,
  name: 'Bình',
  contact: {
    email: 'binh@example.com',
    phone: '0909123456',
  },
  hobbies: ['reading', 'coding', 'gaming', 'tennis'],
};

const user2 = {
  id: 2,
  name: 'Bình',
  age: 20,
  contact: {
    email: 'binh@example.com',
    phone: '0909123456',
  },
  hobbies: ['reading', 'coding', 'gaming', 'cooking'],
};

const {
  name,
  age = 18,
  contact: { email, phone },
  hobbies: [hobby1, hobby2, ...restHobbies],
} = user;

console.log(name);
console.log(email);
console.log(phone);
console.log(age);
console.log(hobby1, hobby2);
console.log(restHobbies);
