const form = document.getElementById('repairForm');
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');

imageInput.addEventListener('change', () => {
  preview.innerHTML = '';
  const files = [...imageInput.files].slice(0, 5);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const files = [...imageInput.files].slice(0, 5);

  // 1. Upload files to Google Drive via Apps Script (custom function needed)
  const fileUrls = await uploadFilesToDrive(files);

  // 2. Submit data to Google Sheet via Apps Script Web App
  const response = await fetch('https://script.google.com/macros/s/AKfycbwDTtXobfi24YlBUxqRuBUcoTP0qGixchr-oythEHZUFLmhynIsfMLgFxGAYnbL8jR72w/exec', {
    method: 'POST',
    body: JSON.stringify({
      name: formData.get('name'),
      department: formData.get('department'),
      issue: formData.get('issue'),
      images: fileUrls
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  alert("ส่งข้อมูลเรียบร้อยแล้ว!");
});