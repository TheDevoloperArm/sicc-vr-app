// =================================================================
// 🌟 1. A-FRAME COMPONENTS
// =================================================================

// ทำให้ icon หันหน้าเข้ากล้อง
AFRAME.registerComponent("face-camera", {
  tick: function () {
    // ต้องอ้างอิง DOM ภายใน tick/init เพราะ DOM อาจจะยังไม่พร้อมเมื่อโหลดไฟล์ JS
    const cam = document.querySelector("#cam");
    if (!cam) return;
    // ใช้ THREE.Vector3 เพื่อไม่ให้มีปัญหาเมื่อกล้องอยู่ใน World Space
    this.el.object3D.lookAt(cam.object3D.position);
  },
});

// =================================================================
// 🌟 2. GLOBAL STATE (สถานะส่วนกลาง)
// =================================================================

// ตัวแปร Global สำหรับ Pagination
let currentPopupData = null; // เก็บ Array ของข้อมูล info สำหรับ Hotspot ปัจจุบัน
let currentPageIndex = 0; // ดัชนีหน้าปัจจุบัน (เริ่มต้นที่ 0)

// =================================================================
// 🌟 3. POPUP CONTROL FUNCTIONS
// =================================================================

/**
 * ฟังก์ชันเปิด Popup: กำหนดข้อมูล, ปิดการควบคุมกล้อง, และปิด UI ภายนอก
 * @param {Array<Object>} infoArray - Array ของข้อมูล Hotspot (หลายหน้า)
 */
function openPopup(infoArray) {
  const popupPanel = document.querySelector("#popupPanel");
  const cam = document.querySelector("#cam");

  if (!popupPanel || !infoArray || infoArray.length === 0) {
    if (popupPanel) popupPanel.setAttribute("visible", false);
    return;
  }

  // 1. ตั้งค่าสถานะ
  currentPopupData = infoArray;
  currentPageIndex = 0; // รีเซ็ตไปหน้าแรกเสมอ

  // 🌟 ปิดการควบคุมกล้อง
  if (cam && cam.components["look-controls"]) {
    // ใช้วิธี pause() เพื่อหยุดการทำงานชั่วคราว โดยไม่ล้างสถานะ
    cam.components["look-controls"].pause();
  }

  // 3. ปิดการตอบสนองต่อการคลิก Hotspot และ UI ภายนอกทั้งหมด
  document.querySelectorAll(".hotspot, #ui-menu .clickable").forEach((el) => {
    el.classList.remove("clickable");
  });
  // ต้องกำหนดให้องค์ประกอบหลักที่ไม่ใช่ clickable เป็น no-intersect ด้วย (ทำใน HTML)

  // 4. แสดงเนื้อหาหน้าแรกและจัดการปุ่มต่างๆ
  updatePopupContent();

  // 5. แสดง Popup
  popupPanel.setAttribute("visible", true);
}

/**
 * ฟังก์ชันปิด Popup: ซ่อน Popup, เปิดการควบคุมกล้อง, และเปิด UI ภายนอก
 */
function closePopup() {
  const popupPanel = document.querySelector("#popupPanel");
  const cam = document.querySelector("#cam");

  if (!popupPanel) return;

  // 1. ซ่อน Popup
  popupPanel.setAttribute("visible", false);
  currentPopupData = null; // ล้างสถานะ

  // 🌟 2. เปิดการควบคุมกล้องกลับมา
  if (cam && cam.components["look-controls"]) {
    // ใช้วิธี play() เพื่อเปิดใช้งาน component ที่ถูก pause/removed ชั่วคราว
    cam.components["look-controls"].play();
  }

  // 3. เปิดการตอบสนองต่อการคลิก Hotspot และ UI ภายนอกกลับมา
  document.querySelectorAll(".hotspot, #ui-menu a-image").forEach((el) => {
    el.classList.add("clickable");
  });
}

/**
 * ฟังก์ชันเปลี่ยนหน้า Popup
 * @param {number} delta - ค่าเปลี่ยนหน้า: -1 (ก่อนหน้า), 1 (ถัดไป)
 */
function changePage(delta) {
  if (!currentPopupData) return;

  const totalPages = currentPopupData.length;
  let newIndex = currentPageIndex + delta;

  // จำกัดขอบเขตของดัชนี
  if (newIndex >= 0 && newIndex < totalPages) {
    currentPageIndex = newIndex;
    updatePopupContent();
  }
}

/**
 * ฟังก์ชันอัปเดตเนื้อหา Popup ตามดัชนีปัจจุบัน
 */
function updatePopupContent() {
  if (!currentPopupData || currentPopupData.length === 0) return;

  const currentInfo = currentPopupData[currentPageIndex];
  const totalPages = currentPopupData.length;

  // อ้างอิง DOM ภายใน
  const popupImage = document.querySelector("#popupImage");
  const popupText = document.querySelector("#popupText");
  const pageCounter = document.querySelector("#pageCounter");
  const prevBtn = document.querySelector("#prevPageBtn");
  const nextBtn = document.querySelector("#nextPageBtn");

  // 1. ตั้งค่ารูปภาพและข้อความ
  popupImage.setAttribute("src", currentInfo.img);
  popupText.setAttribute(
    "troika-text",
    "value",
    currentInfo.text || "ไม่มีข้อมูล"
  );

  // 2. ตั้งค่าตัวนับหน้า
  pageCounter.setAttribute(
    "troika-text",
    "value",
    `หน้า ${currentPageIndex + 1} / ${totalPages}`
  );

  // 3. จัดการปุ่มเปลี่ยนหน้า (ซ่อน/แสดง)
  if (totalPages > 1) {
    prevBtn.setAttribute("visible", currentPageIndex > 0);
    nextBtn.setAttribute("visible", currentPageIndex < totalPages - 1);
  } else {
    prevBtn.setAttribute("visible", false);
    nextBtn.setAttribute("visible", false);
  }
}

// =================================================================
// 🌟 4. HOTSPOT CREATION
// =================================================================

/**
 * ฟังก์ชันสร้าง Hotspots
 * @param {Array<Object>} hotspots - Array ของข้อมูล Hotspot จาก JSON
 */
function createHotspots(hotspots) {
  const sceneEl = document.querySelector("a-scene");
  const popupPanel = document.querySelector("#popupPanel");
  const popupClose = document.querySelector("#popupClose");
  const prevBtn = document.querySelector("#prevPageBtn");
  const nextBtn = document.querySelector("#nextPageBtn");

  // ลบ Hotspot เดิมก่อนสร้างใหม่
  document.querySelectorAll(".hotspot").forEach((el) => el.remove());

  // 🌟🌟🌟 จัดการ Event Listeners (ผูกแค่ครั้งเดียว) 🌟🌟🌟
  if (popupPanel && !popupPanel.hasAttribute("listeners-added")) {
    prevBtn.addEventListener("click", () => changePage(-1));
    nextBtn.addEventListener("click", () => changePage(1));

    // ผูกปุ่มปิด: ต้องเรียกใช้ closePopup() ที่มีฟังก์ชันเปิดกล้องคืนมา
    popupClose.addEventListener("click", closePopup);

    popupPanel.setAttribute("listeners-added", true);
  }

  // สร้าง Hotspot ใหม่จากข้อมูล JSON
  hotspots.forEach((h) => {
    // ... (โค้ดสร้าง hotspotEntity, icon, tooltip) ...
    const hotspotEntity = document.createElement("a-entity");
    hotspotEntity.setAttribute("class", "hotspot clickable");
    hotspotEntity.setAttribute(
      "position",
      `${h.position.x} ${h.position.y} ${h.position.z}`
    );
    const icon = document.createElement("a-entity");
    icon.setAttribute("class", "clickable");
    icon.setAttribute("geometry", "primitive: plane; height: 0.3; width: 0.3;");

    // 1. กำหนด Material และ src (ภาพ Sprite Sheet)
    // Component นี้จะเข้ามาควบคุม map นี้
    icon.setAttribute(
      "material",
      `shader: flat; 
         src: ${h.icon}; 
         transparent: true; 
         side: double;`
    );

    // 2. ใช้งาน 'spritesheet-animation' (Component ที่คุณส่งมา)
    // **ข้อควรระวัง: 'frameDuration' ใน Component นี้ใช้หน่วยเป็น "วินาที" (Seconds)**
    icon.setAttribute(
      "spritesheet-animation",
      `rows: 2; 
         columns: 10; 
         lastFrameIndex: 14; 
         frameDuration: 0.1; 
         loop: true;`
      // 0.1 วินาที = 100 มิลลิวินาที (10 เฟรมต่อวินาที)
      // lastFrameIndex: 18 (คือเฟรมที่ 0 ถึง 18 = ทั้งหมด 19 เฟรม)
    );

    // const icon = document.createElement("a-image");
    // icon.setAttribute("class", "clickable");
    // icon.setAttribute("src", h.icon);
    // icon.setAttribute("width", 0.3);
    // icon.setAttribute("height", 0.3);

    icon.setAttribute("face-camera", "");
    icon.setAttribute("event-set__mouseenter", "scale: 1.2 1.2 1");
    icon.setAttribute("event-set__mouseleave", "scale: 1 1 1");

    const tooltip = document.createElement("a-entity");
    tooltip.setAttribute(
      "troika-text",
      `value: ${h.label}; fontSize: 0.05; color: yellow; align: center`
    );
    tooltip.setAttribute("position", "0 -0.25 0");
    tooltip.setAttribute("visible", "false");
    tooltip.setAttribute("face-camera", "");

    // แสดง/ซ่อน tooltip
    icon.addEventListener("mouseenter", () =>
      tooltip.setAttribute("visible", "true")
    );
    icon.addEventListener("mouseleave", () =>
      tooltip.setAttribute("visible", "false")
    );

    hotspotEntity.appendChild(icon);
    hotspotEntity.appendChild(tooltip);

    // คลิกเพื่อเปิด popup
    icon.addEventListener("click", () => {
      // เรียกใช้ openPopup และส่งข้อมูล info Array เข้าไป
      openPopup(h.info);
    });

    sceneEl.appendChild(hotspotEntity);
  });
}
