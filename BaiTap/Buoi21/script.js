/*
  BÀI TẬP: TODO LIST BẰNG JAVASCRIPT THUẦN (VANILLA JS)
  ------------------------------------------------------
  HTML và CSS đã có sẵn (index.html, style.css).  KHÔNG cần sửa 2 file đó.
  Nhiệm vụ của bạn là viết code trong file này để app chạy được.

  Đọc kỹ các TODO bên dưới, làm theo THỨ TỰ từ trên xuống dưới.
  Xem chi tiết yêu cầu + gợi ý trong file BAI-TAP.md
*/

// ============================================
// BƯỚC 0: LẤY CÁC PHẦN TỬ DOM CẦN DÙNG
// ============================================
// TODO 0.1: Lấy phần tử <form id="add-form">
const addForm = document.querySelector("#add-form");

// TODO 0.2: Lấy phần tử <input id="todo-input">
const todoInput = document.querySelector("#todo-input");

// TODO 0.3: Lấy phần tử <ul id="todo-list">
const todoListEl = document.querySelector("#todo-list");

// TODO 0.4: Lấy phần tử <p id="empty-state">
const emptyStateEl = document.querySelector("#empty-state");

// TODO 0.5: Lấy phần tử <span id="items-left">
const itemsLeftEl = document.querySelector("#items-left");

// TODO 0.6: Lấy phần tử <button id="clear-completed">
const clearCompletedBtn = document.querySelector("#clear-completed");

// TODO 0.7: Lấy phần tử <div id="filters"> (chứa 3 nút lọc)
const filtersEl = document.querySelector("#filters");

// ============================================
// BƯỚC 1: STATE (DỮ LIỆU CỦA APP)
// ============================================
// Mỗi todo là 1 object dạng: { id: number, text: string, completed: boolean }
//
// TODO 1.1: Khai báo mảng `todos` để lưu danh sách việc cần làm.
//   - Nếu localStorage đã có dữ liệu (key "todos") thì đọc và parse ra dùng lại.
//   - Nếu chưa có thì để mảng rỗng [].
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// TODO 1.2: Khai báo biến `currentFilter` để lưu bộ lọc đang chọn.
//   Giá trị có thể là: "all" | "active" | "completed". Mặc định là "all".
// let currentFilter = "all";
let currentFilter = "all";

// ============================================
// BƯỚC 2: CÁC HÀM XỬ LÝ DỮ LIỆU
// ============================================

// TODO 2.1: Viết hàm saveTodos()
//   - Lưu mảng `todos` vào localStorage (nhớ JSON.stringify).
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// TODO 2.2: Viết hàm addTodo(text)
//   - Tạo 1 object todo mới: { id: ..., text: text, completed: false }
//     (gợi ý: dùng Date.now() làm id cho đơn giản, đảm bảo không trùng)
//   - Thêm vào mảng `todos`
//   - Gọi saveTodos() và render lại danh sách
function addTodo(text) {
    const newTodo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        text: text,
        completed: false,
    };
    todos.push(newTodo);
    saveTodos();
    render();
}

// TODO 2.3: Viết hàm deleteTodo(id)
//   - Lọc bỏ todo có id tương ứng ra khỏi mảng `todos`
//   - Gọi saveTodos() và render lại
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    render();
}

// TODO 2.4: Viết hàm toggleTodo(id)
//   - Tìm todo có id tương ứng, đảo ngược giá trị `completed` (true <-> false)
//   - Gọi saveTodos() và render lại
function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        render();
    }
}

// TODO 2.5: Viết hàm editTodo(id, newText)
//   - Tìm todo có id tương ứng, cập nhật lại `text` = newText
//   - Nếu newText rỗng (sau khi trim) thì có thể xoá todo đó luôn
//   - Gọi saveTodos() và render lại
function editTodo(id, newText) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
        if (newText.trim() === "") {
            deleteTodo(id);
        } else {
            todo.text = newText;
            saveTodos();
            render();
        }
    }
}

// TODO 2.6: Viết hàm clearCompleted()
//   - Lọc bỏ tất cả các todo có completed === true
//   - Gọi saveTodos() và render lại
function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    render();
}

// ============================================
// BƯỚC 3: RENDER (VẼ DANH SÁCH RA MÀN HÌNH)
// ============================================

// TODO 3.1: Viết hàm getFilteredTodos()
//   - Dựa vào `currentFilter`, trả về mảng todos đã được lọc:
//     "all"       -> trả về tất cả
//     "active"    -> chỉ những todo có completed === false
//     "completed" -> chỉ những todo có completed === true
function getFilteredTodos() {
    switch (currentFilter) {
        case "active":
            return todos.filter((todo) => !todo.completed);
        case "completed":
            return todos.filter((todo) => todo.completed);
        default:
            return todos;
    }
}

// TODO 3.2: Viết hàm render()
//   Đây là hàm QUAN TRỌNG NHẤT, được gọi lại mỗi khi dữ liệu thay đổi.
//   - Xoá hết nội dung cũ trong todoListEl (todoListEl.innerHTML = "")
//   - Lấy danh sách đã lọc bằng getFilteredTodos()
//   - Với mỗi todo trong danh sách:
//       + Tạo 1 thẻ <li class="todo-item"> (có thể dùng createElement
//         hoặc "sao chép" #todo-item-template bằng .content.cloneNode(true))
//       + Set data-id = todo.id
//       + Nếu todo.completed === true thì thêm class "is-completed"
//       + Gán text vào phần tử .todo-item__text
//       + Gắn sự kiện click cho nút .todo-item__check -> gọi toggleTodo(todo.id)
//       + Gắn sự kiện click cho nút .todo-item__delete -> gọi deleteTodo(todo.id)
//       + Gắn sự kiện click (hoặc dblclick) cho .todo-item__edit -> cho phép
//         sửa text (gợi ý: dùng prompt() cho đơn giản, hoặc biến span
//         thành input để sửa inline nếu muốn nâng cao hơn)
//       + Append <li> vào todoListEl
//   - Hiện/ẩn emptyStateEl tuỳ vào danh sách rỗng hay không (thêm/bỏ class "is-visible")
//   - Gọi updateItemsLeft() để cập nhật số lượng việc còn lại
function render() {
    todoListEl.innerHTML = "";
    const filteredTodos = getFilteredTodos();
    filteredTodos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.className = "todo-item";
        todoItem.setAttribute("data-id", todo.id);
        if (todo.completed) {
            todoItem.classList.add("is-completed");
        }
        todoItem.innerHTML = `
         <button
          class="todo-item__check"
          aria-label="Đánh dấu hoàn thành"
        ></button>
            <span class="todo-item__text">${todo.text}</span>
          <button class="todo-item__edit" aria-label="Sửa">✎</button>
        <button class="todo-item__delete" aria-label="Xoá">✕</button>
        `;
        todoListEl.appendChild(todoItem);
        const checkBtn = todoItem.querySelector(
            `[data-id="${todo.id}"] .todo-item__check`,
        );
        checkBtn.addEventListener("click", () => {
            toggleTodo(todo.id);
        });
        const deleteBtn = todoItem.querySelector(
            `[data-id="${todo.id}"] .todo-item__delete`,
        );
        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo.id);
        });
        const editBtn = todoItem.querySelector(
            `[data-id="${todo.id}"] .todo-item__edit`,
        );
        editBtn.addEventListener("click", () => {
            const newText = prompt("Sửa nội dung công việc:", todo.text);
            console.log(newText);
            if (newText !== null) {
                todo.text = newText.trim();
                if (todo.text === "") {
                    deleteTodo(todo.id);
                } else {
                    saveTodos();
                    render();
                }
            }
        });
    });
    emptyStateEl.classList.toggle("is-visible", filteredTodos.length === 0);
    updateItemsLeft();
}

// TODO 3.3: Viết hàm updateItemsLeft()
//   - Đếm số lượng todo có completed === false
//   - Cập nhật text của itemsLeftEl, ví dụ: "3 việc còn lại"
//   - Lưu ý số ít/nhiều nếu muốn (VD: "1 việc còn lại" vs "2 việc còn lại")
function updateItemsLeft() {
    const itemsLeft = todos.filter((todo) => !todo.completed).length;
    itemsLeftEl.textContent = `${itemsLeft} việc còn lại`;
}

// ============================================
// BƯỚC 4: GẮN SỰ KIỆN (EVENT LISTENERS)
// ============================================

// TODO 4.1: Lắng nghe sự kiện "submit" trên addForm
//   - preventDefault() để form không load lại trang
//   - Lấy giá trị từ todoInput, .trim() để bỏ khoảng trắng thừa
//   - Nếu rỗng thì không làm gì cả (return)
//   - Gọi addTodo(text)
//   - Xoá trắng todoInput sau khi thêm xong
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text === "") return;
    addTodo(text);
    todoInput.value = "";
});

// TODO 4.2: Lắng nghe sự kiện "click" trên clearCompletedBtn
//   - Gọi clearCompleted()
clearCompletedBtn.addEventListener("click", () => {
    clearCompleted();
});

// TODO 4.3: Lắng nghe sự kiện "click" trên filtersEl (event delegation)
//   - Kiểm tra xem phần tử được click có phải là nút .filters__btn không
//   - Nếu đúng: đọc data-filter của nút đó, gán vào currentFilter
//   - Bỏ class "is-active" khỏi tất cả các nút, thêm "is-active" vào nút vừa bấm
//   - Gọi render() lại để áp dụng bộ lọc mới
filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filters__btn");
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    filtersEl
        .querySelectorAll(".filters__btn")
        .forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    render();
});

// ============================================
// BƯỚC 5: KHỞI CHẠY APP
// ============================================

// TODO 5.1: Hiển thị ngày hôm nay vào phần tử #today-date (không bắt buộc, làm cho đẹp)
//   Gợi ý: dùng đối tượng Date + toLocaleDateString("vi-VN", {...})
const todayDateEl = document.querySelector("#today-date");
const today = new Date();
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};
todayDateEl.textContent = today.toLocaleDateString("vi-VN", options);

// TODO 5.2: Gọi render() một lần khi tải trang để hiển thị dữ liệu ban đầu
//   (nếu đã có todos lưu trong localStorage từ trước)
render();
