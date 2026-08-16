//Bai1

function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age >= 18) {
            resolve("Đủ tuổi ");
        } else {
            reject("Không đủ tuổi ");
        }
    });
}

checkAge(20)
    .then((message) => {
        console.log("resolve");
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });

checkAge(12)
    .then((message) => {
        console.log("resolve");

        console.log(message);
    })
    .catch((error) => {
        console.log("reject");
        console.log(error);
    });

//Bai 2
function apiSimulates(id) {
    return new Promise((resolve) => {
        console.log("Đang chờ 1...");
        setTimeout(() => {
            const user = [
                { id: 1, name: "User1" },
                { id: 2, name: "User2" },
                { id: 3, name: "User3" },
            ];
            console.log("Đang chờ 2...");
            resolve(
                user.find((user) => {
                    return user.id === id;
                }),
            );
        }, 1000);
    });
}

apiSimulates(2)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
    });

//Bai 3

function layDonHang(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const orders = [
                { id: 1, sanPham: "Áo thun" },
                { id: 2, sanPham: "Quần Tây" },
            ];
            resolve(
                orders.find((order) => {
                    return order.id === id;
                }),
            );
        }, 1000);
    });
}

function tinhTien(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const prices = [
                { id: 1, price: 200000 },
                { id: 2, price: 300000 },
            ];
            resolve(
                prices.find((price) => {
                    return order.id === price.id;
                }),
            );
        }, 1500);
    });
}

function apDungGiamGia(price) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(price.price * 0.9);
        }, 500);
    });
}

layDonHang(2)
    .then((order) => {
        console.log(order);
        return tinhTien(order);
    })
    .then((price) => {
        console.log(price);
        return apDungGiamGia(price);
    })
    .then((total) => {
        console.log(total);
    });

//Bai 4

function layDiemToan() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(8);
        }, 1000);
    });
}
function layDiemVan() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(7);
        }, 2000);
    });
}
function layDiemAnh() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(9);
        }, 3000);
    });
}

Promise.all([layDiemToan(), layDiemVan(), layDiemAnh()]).then(
    ([diemToan, diemVan, diemAnh]) => {
        console.log("Điểm Toán là", diemToan);
        console.log("Điểm Văn là", diemVan);
        console.log("Điểm Anh là", diemAnh);
    },
);

//Bai 5

function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 800);
    });
}

function fetchPost(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, title: `Post ${id}` });
        }, 600);
    });
}

function fetchComment(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Lỗi mạng khi lấy comment ${id}`));
        }, 1000);
    });
}

Promise.all([fetchUser(), fetchPost(), fetchComment()])
    .then(([user, post, comment]) => {
        console.log(user, post, comment);
    })
    .catch((err) => {
        console.log("Promise reject:", err);
    });

Promise.allSettled([fetchUser(), fetchPost(), fetchComment()]).then(
    ([user, post, comment]) => {
        console.log("allSettled");
        console.log(user, post, comment);
        console.log("Status Api user", user.status);
        console.log("Status Api post", post.status);
        console.log("Status Api comment", comment.status);
    },
);
