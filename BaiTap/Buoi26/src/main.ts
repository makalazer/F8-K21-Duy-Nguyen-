class LibraryItem {
    title: string;
    year: number;
    private isBorrowed: boolean = false;

    constructor(title: string, year: number, isBorrowed: boolean = false) {
        this.title = title;
        this.year = year;
        this.isBorrowed = isBorrowed;
    }
    borrow(): boolean {
        if (this.isBorrowed) {
            return false;
        }
        this.isBorrowed = true;
        return true;
    }

    returnItem(): void {
        this.isBorrowed = false;
    }

    getStatus(): string {
        if (this.isBorrowed) {
            return "Đang được mượn";
        }
        return "Còn trong kho";
    }

    getInfo(): string {
        return `${this.title} ${this.year}`;
    }
}

class Book extends LibraryItem {
    author: string;

    constructor(
        title: string,
        year: number,
        isBorrowed: boolean = false,
        author: string,
    ) {
        super(title, year, isBorrowed);
        this.author = author;
    }
    getInfo(): string {
        return `[Book] ${this.title} - (${this.year}) - Tác giả: ${this.author}`;
    }
}

class Magazine extends LibraryItem {
    issueNumber: number;

    constructor(
        title: string,
        year: number,
        isBorrowed: boolean = false,
        issueNumber: number,
    ) {
        super(title, year, isBorrowed);
        this.issueNumber = issueNumber;
    }
    getInfo(): string {
        return `[Magazine] ${this.title} - (${this.year}) - Số ${this.issueNumber}`;
    }
}

class Library {
    private items: LibraryItem[] = [];
    constructor(items: LibraryItem[]) {
        this.items = items;
    }

    addItem(item: LibraryItem): void {
        this.items.push(item);
    }
    borrowItem(title: string): void {
        const item = this.items.find((item) => item.title == title);
        if (!item) {
            console.log("Item not found");
            return;
        }
        let isBorrowSuccess: boolean = item.borrow();
        console.log(
            isBorrowSuccess
                ? `Mượn thành công ${title}`
                : `Mượn không thành công: ${title}`,
        );
    }
    printAll(): void {
        this.items.forEach((item) => {
            console.log(`${item.getInfo()} - ${item.getStatus()}`);
        });
    }
}

const cleanCode = new Book("Clean Code", 2008, true, "Robert C. Martin");
const dacNhanTam = new Book("Đắc Nhân Tâm", 1935, false, "Dale Carnegie");
const techToday = new Magazine("Tech Today", 2024, false, 12);

let library = new Library([]);

library.addItem(cleanCode);
library.addItem(dacNhanTam);
library.addItem(techToday);

library.borrowItem("Clean Code");
library.printAll();

//Bai 2

interface Payable {
    calculateSalary(): number;
}

abstract class Employee implements Payable {
    protected name: string;
    protected id: number;
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    abstract calculateSalary(): number;
    getInfo(): string {
        return `${this.id} ${this.name} - Lương: ${this.calculateSalary().toLocaleString("en-US")} VNĐ`;
    }
}

class FullTimeEmployee extends Employee {
    baseSalary: number;
    constructor(name: string, id: number, baseSalary: number) {
        super(name, id);
        this.baseSalary = baseSalary;
    }

    calculateSalary(): number {
        return this.baseSalary;
    }
}

class PartTimeEmployee extends Employee {
    hoursWorked: number;
    hourlyRate: number;
    constructor(
        name: string,
        id: number,
        hoursWoked: number,
        hourlyRate: number,
    ) {
        super(name, id);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWoked;
    }

    calculateSalary(): number {
        return this.hourlyRate * this.hoursWorked;
    }
}

const employees: Employee[] = [
    new FullTimeEmployee("Nguyễn Văn An", 1, 15000000),
    new FullTimeEmployee("Trần Thị Bình", 2, 12000000),
    new PartTimeEmployee("Lê Văn Cường", 3, 80, 50000), // 80 * 50000 = 4,000,000
    new PartTimeEmployee("Phạm Thu Dung", 4, 60, 50000), // 60 * 50000 = 3,000,000
];

employees.forEach((employee) => console.log(employee.getInfo()));
