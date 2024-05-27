export const validate = (payload) => {
  let newErrors = {};
  if (!payload.phone) {
    newErrors.phone = "Số điện thoại không được để trống.";
  } else if (!payload.phone.match(/^\d+$/)) {
    newErrors.phone = "Số điện thoại phải có dạng số";
  } else if (!payload.phone.match(/^[0-9]{10}$/)) {
    newErrors.phone = "Số điện thoại phải có 10 chữ số.";
  } else if (!payload.phone.match(/^0[0-9]{9}$/)) {
    newErrors.phone = "Số điện thoại phải bắt đầu từ số 0";
  }
  if (!payload.pass) {
    newErrors.pass = "Mật khẩu không được để trống.";
  } else if (payload.pass.length < 6) {
    newErrors.pass = "Mật khẩu phải có ít nhất 6 ký tự.";
  }

  if (!payload.repass) {
    newErrors.repass = "Mật khẩu không được để trống.";
  } else if (payload.repass.length < 6) {
    newErrors.repass = "Mật khẩu phải có ít nhất 6 ký tự.";
  } else if (payload.pass !== payload.repass) {
    newErrors.repass = "Mật khẩu nhập lại phải giống nhau";
  }

  if (!payload.name) {
    newErrors.name = "Tên không được để trống.";
  } else if (payload.name.length < 6) {
    newErrors.name = "Tên phải có ít nhất 6 ký tự.";
  }
  if (!payload.address) {
    newErrors.address = "Địa chỉ không được để trống.";
  }
  if (!payload.email) {
    newErrors.email = "Email không được để trống.";
  } else if (!payload.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    newErrors.email = "Email không hợp lệ.";
  }
  return newErrors;
};
