/**
 * Định dạng giá tiền VNĐ (ví dụ: 15000000 -> "15.000.000 đ")
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(price)
    .replace("₫", "đ");
};

/**
 * Định dạng ngày tháng năm theo chuẩn Việt Nam (ví dụ: "2026-08-01T10:00:00Z" -> "01/08/2026 10:00")
 */
export const formatDate = (dateString: string, includeTime: boolean = true): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    if (!includeTime) {
      return `${day}/${month}/${year}`;
    }

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Lỗi định dạng ngày:", error);
    return dateString;
  }
};

/**
 * Định dạng số điện thoại hiển thị đẹp hơn (ví dụ: 0912345678 -> "0912 345 678")
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};
