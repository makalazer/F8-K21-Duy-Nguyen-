//Uncomment to run function

const BASE_URL = `http://localhost:3000`;

//Bai 1
const getAllProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`, { method: "GET" });
    const data = await response.json();
    console.log(data);
};

// getAllProducts();

//Bai 2

const getProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    if (response.status === 404) {
        console.log("Không tìm thấy sản phẩm");
    } else {
        console.log(data);
    }
};

// getProductById(4);

//Bai 3

const getProductById_handleError = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Product not found");
        } else {
            const data = await response.json();
            console.log(data);
        }
    } catch (err) {
        console.log("Error:", err);
    }
};
// getProductById_handleError(3);
// getProductById_handleError(5);

//Bai 4

const createProduct = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.log(err);
    }
};

const newProduct1 = { id: 4, name: "VGA Asus", price: 10000000 };
const newProduct2 = { id: 5, name: "VGA Gigabyte", price: 20000000 };
const newProduct3 = { id: 6, name: "VGA MSI", price: 30000000 };

// createProduct(newProduct1);
// createProduct(newProduct2);
// createProduct(newProduct3);

// getProductById(4);

//Bai 5
const updateProduct = async (id, updateField) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateField),
        });
        if (!response.ok) {
            throw new Error("User not found");
        }
    } catch (err) {
        console.log(err);
    }
};

// updateProduct(4, { discount: 200000 });
// updateProduct(5, { discount: 300000 });

// getProductById(4);

//Bai 6
const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: "DELETE",
        });
    } catch (err) {
        console.log(err);
    }
};
// deleteProduct(4).then(() => {
//     getAllProducts();
// });

//Bai 7
const searchProducts = async (keyword, minPrice, maxPrice) => {
    try {
        const response = await fetch(
            `${BASE_URL}/products?name_like=${keyword}&price_gte=${minPrice}&price_lte=${maxPrice}`,
        );
        if (!response.ok) {
            throw new Error("Product not found");
        } else {
            const data = await response.json();
            console.log("search result:", data);
        }
    } catch (err) {
        console.log(err);
    }
};

// searchProducts("VG", 1000, 20000000);
// searchProducts("VG", 11000000, 20000000);
// searchProducts("VG", 1000000, 40000000);

//Bai8

const getUserWithPosts = async (userId) => {
    try {
        const userResponse = await fetch(`${BASE_URL}/users/${userId}`);
        if (userResponse.ok) {
            const userData = await userResponse.json();
            const postResponse = await fetch(
                `${BASE_URL}/posts?userId=${userId}`,
            );
            if (!postResponse.ok) {
                throw new Error(`Lỗi khi lấy posts của user id = ${userId}`);
            }
            const postData = await postResponse.json();
            const result = { user: userData, post: postData };
            console.log(result);
        } else {
            throw new Error(`Không tìm thấy user id = ${userId}`);
        }
    } catch (err) {
        console.log(err);
    }
};
// getUserWithPosts(1);
// getUserWithPosts(3);

//Bai 9
const getDashboardDataSequential = async () => {
    try {
        const timeStart = Date.now();
        console.time("sequential");
        const productsResponse = await fetch(`${BASE_URL}/products`);
        const products = await productsResponse.json();

        const usersResponse = await fetch(`${BASE_URL}/users`);
        const users = await usersResponse.json();

        const postsResponse = await fetch(`${BASE_URL}/posts`);
        const posts = await postsResponse.json();

        console.timeEnd("sequential");
        const timeEnd = await Date.now();
        console.log("sequential:", timeEnd - timeStart);
    } catch (err) {
        console.log(err);
    }
};

const getDashboardDataParallel = async () => {
    try {
        const timeStart = Date.now();
        console.time("parallel");
        const [productsRes, usersRes, postRes] = await Promise.all([
            fetch(`${BASE_URL}/products`),
            fetch(`${BASE_URL}/users`),
            fetch(`${BASE_URL}/posts`),
        ]);

        const [products, users, orders] = await Promise.all([
            productsRes.json(),
            usersRes.json(),
            postRes.json(),
        ]);

        console.timeEnd("parallel");
        const timeEnd = await Date.now();
        console.log("parallel:", timeEnd - timeStart);
    } catch (err) {
        console.log(err);
    }
};

// (async () => {
//     console.log("Start compare");
//     await getDashboardDataParallel();
//     await getDashboardDataSequential();
//     console.log("End compare");
// })();

// Bai 10 – Mini CRUD

(async () => {
    try {
        console.log("--- Bước 1: Lấy danh sách sản phẩm ---");
        await getAllProducts();

        console.log("--- Bước 2: Thêm một sản phẩm mới ---");
        const newProduct = { id: 7, name: "CPU", price: 5000000 };
        await createProduct(newProduct);

        console.log("Kiểm tra sản phẩm vừa được thêm:");
        await getAllProducts();

        console.log("--- Bước 3: Sửa giá của sản phẩm vừa thêm ---");
        await updateProduct(7, { id: 7, name: "CPU", price: 6000000 });

        console.log("Kiểm tra giá đã được sửa:");
        await getProductById(7);

        console.log("--- Bước 4: Xóa sản phẩm vừa thêm ---");
        await deleteProduct(7);

        console.log("--- Bước 5: Lấy lại danh sách sản phẩm để xác nhận ---");
        await getAllProducts();
    } catch (error) {
        console.log(error.message || error);
    }
})();
