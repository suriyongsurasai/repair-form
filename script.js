const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx9BMPUwaJBNixu1tQQVGkkDbuhNPnVaCg0fOLGiFL2ht1plpk8TBL9e9eMy07tZg0XLQ/exec'; // เปลี่ยนเป็น Web App URL

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
      img.style.height = '100px';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

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

form.addEventListener('submit', async e => {
  e.preventDefault();

  try {
    const formData = new FormData(form);
    const fileUrls = await uploadFilesToDrive([...imageInput.files]);

    const data = {
      name: formData.get('name'),
      department: formData.get('department'),
      issue: formData.get('issue'),
      images: fileUrls
    };

    const response = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.text();
    alert("✅ ส่งข้อมูลเรียบร้อย: " + result);
    form.reset();
    preview.innerHTML = '';
  } catch (err) {
    console.error(err);
    alert("❌ เกิดข้อผิดพลาด: " + err.message);
  }
});
