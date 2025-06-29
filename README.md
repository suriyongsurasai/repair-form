# 📱 แจ้งซ่อมออนไลน์ v2

ฟอร์มแจ้งซ่อมออนไลน์ที่:
- รองรับการส่งข้อมูลเป็น JSON ไปยัง Google Apps Script
- รองรับการอัปโหลดภาพแบบ base64 ทีละภาพ
- ใช้ได้กับ GitHub Pages หรือเว็บไซต์ใด ๆ โดยไม่ติด CORS

## วิธีใช้

1. เปลี่ยน `<<YOUR_WEBAPP_URL>>` ใน script.js ให้เป็น URL ของ Web App ที่คุณ Deploy จาก Google Apps Script
2. เปิด index.html บนเว็บโฮสต์หรือ GitHub Pages
3. กรอกข้อมูลและส่งได้ทันที

> ฝั่ง Apps Script ต้องรองรับการ POST แบบ JSON และการอัปโหลดภาพ base64