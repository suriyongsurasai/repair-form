# mobile-repair-form

เว็บฟอร์มสำหรับแจ้งซ่อมออนไลน์ บันทึกข้อมูลลง Google Sheet และอัปโหลดรูปภาพไปยัง Google Drive

## 🔧 การตั้งค่าเริ่มต้น

1. สร้าง Google Sheet และตั้งชื่อชีตเป็น `แจ้งซ่อม` มีหัวตาราง:  
   `วันที่,ชื่อผู้แจ้ง,กลุ่มงาน,ปัญหา,ลิงก์รูป`
2. สร้างโฟลเดอร์ใน Google Drive สำหรับเก็บรูป
3. เปิด Google Apps Script และวางโค้ด `Code.gs` ที่ผมจัดให้ก่อนหน้า
4. ตั้ง `SHEET_ID` และ `FOLDER_ID` ให้ตรงกับของคุณ
5. Deploy Web App:
   - **Execute as**: Me
   - **Who has access**: Anyone
   - คัดลอกลิงก์ Web App ที่ได้ มาแทนค่า `WEBAPP_URL` ใน `script.js`
6. โคลน repo และรัน:
   ```sh
   git clone <repo-url>
   cd mobile-repair-form