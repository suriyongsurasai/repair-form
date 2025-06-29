const WEBAPP_URL = '<<YOUR_WEBAPP_URL>>'; // เปลี่ยนเป็น URL ของ Google Apps Script Web App

const form = document.getElementById('repairForm');
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');

imageInput.addEventListener('change', () => {
  preview.innerHTML = '';
  [...imageInput.files].slice(0, 5).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(form);
  [...imageInput.files].slice(0, 5).forEach(file => {
    formData.append("files", file);
  });

  try {
    const res = await fetch(WEBAPP_URL, {
      method: "POST",
      body: formData,
    });
    const result = await res.text();
    alert("✅ ส่งข้อมูลสำเร็จ: " + result);
    form.reset();
    preview.innerHTML = '';
  } catch (err) {
    alert("❌ เกิดข้อผิดพลาด: " + err.message);
  }
});