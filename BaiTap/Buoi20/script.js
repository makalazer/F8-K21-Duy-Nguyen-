/*
  BÀI TẬP: VALIDATE FORM ĐĂNG KÝ
  ---------------------------------
  Xem đầy đủ yêu cầu trong file de-bai.md.
  chỉ cần code trong file này. KHÔNG cần sửa index.html / style.css.

  Các id có sẵn trong HTML mà em sẽ cần dùng tới:
    - Input:        fullname, username, email, phone, password, confirm
    - Field (cha):   field-fullname, field-username, field-email,
                      field-phone, field-password, field-confirm
    - Form:          registerForm
    - Kết quả:       result
*/

// ========== BƯỚC 1: Lấy phần tử ==========
// TODO: Lấy thẻ <form id="registerForm"> và thẻ <div id="result">
const form = document.querySelector('#registerForm');
const resultBox = document.querySelector('#result');

// ========== BƯỚC 2: Hàm hiển thị lỗi / hết lỗi ==========

// TODO: Viết hàm showError(fieldName, message)
// - Tìm div cha có id = "field-" + fieldName
// - Thêm class "error" vào div đó, xoá class "success" (nếu có)
// - Set nội dung text cho phần tử ".error-msg" bên trong div đó = message
function showError(fieldName, message) {
  // code ở đây

  const errorField = document.querySelector(`#field-${fieldName}`);
  const errorMessageField = document.querySelector(
    `#field-${fieldName} .error-msg`,
  );
  errorField.classList.remove('success');
  errorField.classList.add('error');
  errorMessageField.innerHTML = message;
}

// TODO: Viết hàm showSuccess(fieldName)
// - Tìm div cha có id = "field-" + fieldName
// - Xoá class "error", thêm class "success"
function showSuccess(fieldName) {
  // code ở đây
  const successField = document.querySelector(`#field-${fieldName}`);
  const errorMessageField = document.querySelector(
    `#field-${fieldName} .error-msg`,
  );
  errorMessageField.innerHTML = null;
  successField.classList.remove('error');
  successField.classList.add('success');
}

// ========== BƯỚC 3: Các hàm validate từng ô ==========
// Mỗi hàm: đọc giá trị input tương ứng, kiểm tra theo quy tắc trong de-bai.md,
// gọi showError() hoặc showSuccess() phù hợp, và PHẢI return true / false.

function validateFullname() {
  // TODO
  // Gợi ý: const value = document.getElementById('fullname').value.trim();
  const value = document.querySelector('#fullname').value.trim();

  if (value.length < 2) {
    showError(
      'fullname',
      value.length === 0
        ? 'không được để trống'
        : 'Họ và tên tối thiểu phải có 2 ký tự không tính khoảng trắng',
    );
    return false;
  }
  showSuccess('fullname');
  return true;
}

function validateUsername() {
  const value = document.querySelector('#username').value.trim();
  const REGEX_USERNAME = /^[a-zA-Z0-9_]{4,16}$/;

  if (value === '') {
    showError('username', 'không được để trống');
    return false;
  }
  if (value.length > 16 || value.length < 4) {
    showError('username', 'Tên đăng nhập chứa từ 4 tới 16 ký tự');
    return false;
  }
  if (!REGEX_USERNAME.test(value)) {
    showError('username', 'Tên đăng nhập chỉ gồm chữ, số, dấu gạch dưới');
    return false;
  }
  showSuccess('username');
  return true;
}

function validateEmail() {
  const value = document.querySelector('#email').value.trim();
  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    showError('email', 'Không được để trống');
    return false;
  }
  if (!REGEX_EMAIL.test(value)) {
    showError('email', 'Email phải có dạng : ai_do@dau_do.gi_do');
    return false;
  }
  showSuccess('email');
  return true;
}

function validatePhone() {
  const value = document.querySelector('#phone').value.trim();
  if (value === '') {
    showError('phone', 'Không được để trống');
    return false;
  }
  if (value[0] !== '0') {
    showError('phone', 'Số điện thoại phải bắt đầu bằng số 0');
    return false;
  }
  if (value.length !== 10) {
    showError('phone', 'Số điện thoại phải có đủ 10 số');
    return false;
  }
  showSuccess('phone');
  return true;
}

function validatePassword() {
  const value = document.querySelector('#password').value;
  const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (value === '') {
    showError('password', 'Không được để trống');
    return false;
  }
  if (value.length < 8) {
    showError('password', 'Mật khẩu tối thiểu 8 ký tự ');
    return false;
  }
  if (!REGEX_PASSWORD.test(value)) {
    showError('password', 'Mật khẩu phải có ít nhất 1 chữ cái, 1 số ');
    return false;
  }
  showSuccess('password');
  return true;
}

function validateConfirm() {
  const valueConfirm = document.querySelector('#confirm').value;
  const valuePassword = document.querySelector('#password').value;
  if (valueConfirm === '') {
    showError('confirm', 'Không được để trống');
    return false;
  }
  if (valueConfirm !== valuePassword) {
    showError('confirm', 'Mật khẩu k khớp');
    return false;
  }
  // Lưu ý: cần lấy giá trị của CẢ 2 ô "password" và "confirm" để so sánh
  showSuccess('confirm');
  return true;
}

// ========== BƯỚC 4: Gắn sự kiện blur ==========
// TODO: Với mỗi input, lắng nghe sự kiện "blur" (mất focus)
// và gọi hàm validate tương ứng.
//
// Gợi ý:
// document.getElementById('fullname').addEventListener('blur', validateFullname);
// (làm tương tự cho 5 ô còn lại)
document.querySelector('#fullname').addEventListener('blur', validateFullname);
document.querySelector('#username').addEventListener('blur', validateUsername);
document.querySelector('#email').addEventListener('blur', validateEmail);
document.querySelector('#phone').addEventListener('blur', validatePhone);
document.querySelector('#password').addEventListener('blur', validatePassword);
document.querySelector('#confirm').addEventListener('blur', validateConfirm);

// ========== BƯỚC 5: Gắn sự kiện submit ==========
// TODO:
// 1. Lắng nghe sự kiện "submit" trên form
// 2. Gọi event.preventDefault() để chặn hành vi mặc định
// 3. Gọi TẤT CẢ 6 hàm validate (không dùng && liên tiếp — xem lý do trong de-bai.md)
// 4. Nếu tất cả đều true -> hiện #result với class "show ok" và nội dung phù hợp
// 5. Nếu có ít nhất 1 false -> hiện #result với class "show fail" và nội dung phù hợp
//
// Gợi ý cấu trúc:
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const checks = [
    validateFullname(),
    validateUsername(),
    validateEmail(),
    validatePassword(),
    validatePhone(),
    validateConfirm(),
  ];
  const isValid = checks.every(Boolean);
  resultBox.classList.add('show');
  resultBox.innerHTML = isValid
    ? '<p>✔ Hợp lệ! Dữ liệu sẵn sàng để gửi lên server.</p>'
    : '<p>✘ Vui lòng sửa các lỗi được đánh dấu đỏ ở trên.</p>';
  resultBox.classList.remove(isValid ? 'fail' : 'ok');
  resultBox.classList.add(isValid ? 'ok' : 'fail');
});
