// ทำให้ icon หันหน้าเข้ากล้อง
AFRAME.registerComponent('face-camera', {
  tick: function () {
    const cam = document.querySelector('#cam');
    if (!cam) return;
    this.el.object3D.lookAt(cam.object3D.position);
  }
});

// hotspot.js
function createHotspots(hotspots) {
  const sceneEl = document.querySelector("a-scene");
  const popup = document.querySelector("#popupPanel");
  const popupImage = document.querySelector("#popupImage");
  const popupClose = document.querySelector("#popupClose");

  // ลบ Hotspot เดิมก่อนสร้างใหม่
  document.querySelectorAll(".hotspot").forEach(el => el.remove());

  // สร้าง Hotspot ใหม่จากข้อมูล JSON
  hotspots.forEach(h => {
    const hotspotEntity = document.createElement("a-entity");
    hotspotEntity.setAttribute("class", "hotspot clickable");
    hotspotEntity.setAttribute(
      "position",
      `${h.position.x} ${h.position.y} ${h.position.z}`
    );

    // ไอคอน
    const icon = document.createElement("a-image");
    icon.setAttribute("class", "clickable");
    icon.setAttribute("src", h.icon);
    icon.setAttribute("width", 0.3);
    icon.setAttribute("height", 0.3);
    icon.setAttribute("face-camera", "");
    icon.setAttribute("event-set__mouseenter", "scale: 1.2 1.2 1");
    icon.setAttribute("event-set__mouseleave", "scale: 1 1 1");

    // Tooltip (ป้ายชื่อเล็ก ๆ)
    const tooltip = document.createElement("a-entity");
    tooltip.setAttribute("troika-text", `value: ${h.label}; fontSize: 0.05; color: yellow; align: center`);
    tooltip.setAttribute("position", "0 -0.25 0");
    tooltip.setAttribute("visible", "false");
    tooltip.setAttribute("face-camera", "");

    // แสดง tooltip เมื่อ hover
    icon.addEventListener("mouseenter", () => {
      tooltip.setAttribute("visible", "true");
    });
    icon.addEventListener("mouseleave", () => {
      tooltip.setAttribute("visible", "false");
    });

    // คลิกเพื่อเปิด popup
    icon.addEventListener("click", () => {
      popupImage.setAttribute("src", h.popupImage || "");
      popup.setAttribute("visible", true);
    });
    hotspotEntity.appendChild(icon);
    hotspotEntity.appendChild(tooltip);
    sceneEl.appendChild(hotspotEntity);
  });

  // ปุ่มปิด popup
  popupClose.addEventListener("click", () => {
    popup.setAttribute("visible", false);
  });
}
