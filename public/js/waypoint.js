AFRAME.registerComponent("face-camera", {
  tick: function () {
    const cam = document.querySelector("#cam");
    if (cam) {
      this.el.object3D.lookAt(cam.object3D.position);
      this.el.object3D.rotation.y += Math.PI; // แก้กรณีหันหลังให้กล้อง
    }
  }
});


// waypoint.js
function createWaypoints(waypoints) {
  const scene = document.querySelector("a-scene");

  // ลบ waypoint เก่าออกก่อน
  const oldWaypoints = scene.querySelectorAll(".waypoint");
  oldWaypoints.forEach((wp) => wp.parentNode.removeChild(wp));

  // ถ้าไม่มี waypoint ให้จบเลย
  if (!waypoints || waypoints.length === 0) return;

  waypoints.forEach((wp, index) => {
    const waypointEl = document.createElement("a-entity");
    waypointEl.setAttribute("class", "waypoint");
    waypointEl.setAttribute("position", `${wp.x} ${wp.y} ${wp.z}`);

    // ไอคอน
    const iconEl = document.createElement("a-image");
    iconEl.setAttribute("src", "#portIcon");
    iconEl.setAttribute("width", 0.4);
    iconEl.setAttribute("height", 0.4);
    // iconEl.setAttribute("look-at", "#cam");
    iconEl.setAttribute("class", "clickable");
    iconEl.setAttribute("event-set__mouseenter", "scale: 1.2 1.2 1");
    iconEl.setAttribute("event-set__mouseleave", "scale: 1 1 1");
    iconEl.setAttribute("face-camera", "");

    // ป้ายชื่อ
    const labelEl = document.createElement("a-entity");
    labelEl.setAttribute(
      "troika-text",
      `value: ${wp.label}; fontSize: 0.08; color: yellow`
    );
    labelEl.setAttribute("position", "0 -0.3 0");
    labelEl.setAttribute("face-camera", "");

    waypointEl.appendChild(iconEl);
    waypointEl.appendChild(labelEl);

    // Event click → เรียก loadRoom() ที่ประกาศใน vr.html
    waypointEl.addEventListener("click", () => {
      if (typeof loadRoom === "function") {
        loadRoom(wp.targetRoom);
      } else {
        console.error("loadRoom() ไม่ถูกประกาศใน vr.html");
      }
    });

    scene.appendChild(waypointEl);
  });
}
