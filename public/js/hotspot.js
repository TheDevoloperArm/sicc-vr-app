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
  const popupText = document.querySelector("#popupText");

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
    icon.setAttribute("src", h.icon);
    icon.setAttribute("width", 0.3);
    icon.setAttribute("height", 0.3);
    icon.setAttribute("face-camera", "");
    icon.setAttribute("event-set__mouseenter", "scale: 1.2 1.2 1");
    icon.setAttribute("event-set__mouseleave", "scale: 1 1 1");

    // Event: กด icon เพื่อเปิด popup กลางจอ
    icon.addEventListener("click", () => {
      const isVisible = popup.getAttribute("visible");
      if (!isVisible) {
        popupText.setAttribute("troika-text", `value: ${h.label}; fontSize: 0.08; color: white; maxWidth: 1.4`);
        popup.setAttribute("visible", true);
      } else {
        popup.setAttribute("visible", false);
      }
    });

    // ข้อความ
    const label = document.createElement("a-entity");
    label.setAttribute( 
      "troika-text",
      `value: ${h.label}; fontSize: 0.1; color: white`
    );
    label.setAttribute("position", "0 -0.3 0");
    label.setAttribute("visible", "false");

    // Event toggle
    hotspotEntity.addEventListener("click", () => {
      const isVisible = label.getAttribute("visible");
      label.setAttribute("visible", !isVisible);
    });

    hotspotEntity.appendChild(icon);
    hotspotEntity.appendChild(label);
    sceneEl.appendChild(hotspotEntity);
  });
}
