window.addEventListener("load", adjustUI);
window.addEventListener("resize", adjustUI);

function adjustUI() {
  // console.log(window.innerWidth);
  const ui = document.querySelector("#ui-menu"); // เปลี่ยนจาก #ui เป็น #ui-menu ตาม vr.html
  // const banner = document.querySelector("#title-brand"); // ไม่มีใน vr.html ที่ให้มา
  const prevBt = document.querySelector("#prevRoomBtn");
  const nextBt = document.querySelector("#nextRoomBtn");
  const homeBt = document.querySelector("#homeRoomBtn");
  const exitBt = document.querySelector("#exitBtn");

  // ไม่จำเป็นต้องอ้างอิงถึง plane และ text element โดยตรงแล้ว
  // const prevPl = document.querySelector("#prevPlane");
  // const nextPl = document.querySelector("#nextPlane");
  // const homePl = document.querySelector("#homePlane");
  // const exitPl = document.querySelector("#exitPlane");

  // const prevText = document.querySelector("#prevText");
  // const nextText = document.querySelector("#nextText");
  // const homeText = document.querySelector("##homeText");
  // const exitText = document.querySelector("#exitText");

  // อ้างอิงถึง a-image ภายในแต่ละปุ่ม
  const prevImage = prevBt ? prevBt.querySelector('a-image') : null;
  const nextImage = nextBt ? nextBt.querySelector('a-image') : null;
  const homeImage = homeBt ? homeBt.querySelector('a-image') : null;
  const exitImage = exitBt ? exitBt.querySelector('a-image') : null;


  // ถ้าคุณต้องการปรับขนาดของ UI-menu ทั้งหมด
  if (ui) {
    if (window.innerWidth < 600) {
      // หน้าจอแนวตั้ง
      // ui.setAttribute("position", "0 -0.8 -2"); // ตำแหน่งหลักของ ui-menu ควรกำหนดใน vr.html
      // ui.setAttribute("scale", "0.85 0.85 1"); // ปรับ scale ของ ui-menu ทั้งหมด
      
      // ปรับตำแหน่งปุ่มย่อยและขนาดของ a-image
      if (prevBt) prevBt.setAttribute("position", "-0.35 -0.7 0"); // ปรับตำแหน่งตามความเหมาะสม
      if (prevImage) {
        prevImage.setAttribute("width", "0.3");
        prevImage.setAttribute("height", "0.15"); // ปรับสัดส่วนให้เหมาะสมกับ icon
      }

      if (homeBt) homeBt.setAttribute("position", "0 -0.7 0");
      if (homeImage) {
        homeImage.setAttribute("width", "0.3");
        homeImage.setAttribute("height", "0.15");
      }

      if (nextBt) nextBt.setAttribute("position", "0.35 -0.7 0");
      if (nextImage) {
        nextImage.setAttribute("width", "0.3");
        nextImage.setAttribute("height", "0.15");
      }

      if (exitBt) exitBt.setAttribute("position", "0.7 -0.7 0"); // ปรับตำแหน่งให้ขยับมาทางขวาเพื่อมีที่ว่าง
      if (exitImage) {
        exitImage.setAttribute("width", "0.3");
        exitImage.setAttribute("height", "0.15");
      }

    } else if (window.innerWidth < 1024) {
      // แท็บเล็ตและหน้าจอขนาดกลาง
      // ui.setAttribute("position", "0 -0.8 -2");
      // ui.setAttribute("scale", "1 1 1"); // คืนค่า scale เดิม

      if (prevBt) prevBt.setAttribute("position", "-0.5 -0.7 0");
      if (prevImage) {
        prevImage.setAttribute("width", "0.4");
        prevImage.setAttribute("height", "0.2");
      }

      if (homeBt) homeBt.setAttribute("position", "0 -0.7 0");
      if (homeImage) {
        homeImage.setAttribute("width", "0.4");
        homeImage.setAttribute("height", "0.2");
      }

      if (nextBt) nextBt.setAttribute("position", "0.5 -0.7 0");
      if (nextImage) {
        nextImage.setAttribute("width", "0.4");
        nextImage.setAttribute("height", "0.2");
      }

      if (exitBt) exitBt.setAttribute("position", "1 -0.7 0");
      if (exitImage) {
        exitImage.setAttribute("width", "0.4");
        exitImage.setAttribute("height", "0.2");
      }

    } else {
      // หน้าจอ PC
      // ui.setAttribute("position", "0 -0.8 -2");
      // ui.setAttribute("scale", "1 1 1");

      if (prevBt) prevBt.setAttribute("position", "-0.5 -0.7 0");
      if (prevImage) {
        prevImage.setAttribute("width", "0.4");
        prevImage.setAttribute("height", "0.2");
      }

      if (homeBt) homeBt.setAttribute("position", "0 -0.7 0");
      if (homeImage) {
        homeImage.setAttribute("width", "0.4");
        homeImage.setAttribute("height", "0.2");
      }

      if (nextBt) nextBt.setAttribute("position", "0.5 -0.7 0");
      if (nextImage) {
        nextImage.setAttribute("width", "0.4");
        nextImage.setAttribute("height", "0.2");
      }

      if (exitBt) exitBt.setAttribute("position", "1 -0.7 0");
      if (exitImage) {
        exitImage.setAttribute("width", "0.4");
        exitImage.setAttribute("height", "0.2");
      }
    }
  }
}