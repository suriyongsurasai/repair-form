// ✅ URL Web App ของคุณ
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx9BMPUwaJBNixu1tQQVGkkDbuhNPnVaCg0fOLGiFL2ht1plpk8TBL9e9eMy07tZg0XLQ/exec';

// ✅ ดึงฟอร์มและ input
const form = document.getElementById('repairForm');
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');

// ✅ แสดงตัวอย่างรูปภาพ
imageInput.addEventListener('change', () => {
  preview.innerHTML = '';
  [...imageInput.files].slice(0, 5).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.height = '100px';
      img.style.margin = '5px';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// ✅ ฟังก์ชันอัปโหลดไฟล์รูป (base64) ไปยัง Google Drive ผ่าน Apps Script
async function uploadFilesToDrive(files) {
  const urls = [];
  for (const file of files.slice(0, 5)) {
    const reader = new FileReader();
    const base64 = await new Promise(resolve => {
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });

    const response = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        bytes: base64,
        mimeType: file.type,
        filename: file.name
      })
    });

    const url = await response.text();
    urls.push(url);
  }
  return urls;
}

// ✅ ฟังก์ชันส่งข้อมูลทั้งหมดเมื่อกด Submit
form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const formData = new FormData(form);
    const files = [...imageInput.files];
    const fileUrls = await uploadFilesToDrive(files);

    const response = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        department: formData.get('department'),
        issue: formData.get('issue'),
        images: fileUrls
      })
    });

    const result = await response.text();
    alert('✅ ส่งข้อมูลเรียบร้อย:\n' + result);
    form.reset();
    preview.innerHTML = '';
  } catch (err) {
    console.error(err);
    alert('❌ เกิดข้อผิดพลาด: ' + err.message);
  }
});
