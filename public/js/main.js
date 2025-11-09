function fetchAssets() {
  return new Promise((resolve, reject) => {
    fetch("assets.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const assetsEl = document.querySelector("a-assets");

        // 1. โหลด Images
        data.images.forEach((img) => {
          const imgEl = document.createElement("img");
          imgEl.setAttribute("id", img.id);
          imgEl.setAttribute("src", img.src);
          // จัดการ crossorigin ถ้าจำเป็น
          if (img.src.startsWith("http")) {
            imgEl.setAttribute("crossorigin", "anonymous");
          }
          assetsEl.appendChild(imgEl);
        });

        // 🌟🌟🌟 2. เพิ่มส่วนโหลด Models (ถ้ามี) 🌟🌟🌟
        if (data.models && data.models.length > 0) {
          data.models.forEach((model) => {
            const modelEl = document.createElement("a-asset-item");
            modelEl.setAttribute("id", model.id);
            modelEl.setAttribute("src", model.src);
            assetsEl.appendChild(modelEl);
          });
        }

        resolve();
      })
      .catch((error) => {
        console.error("Error loading assets:", error);
        reject(error);
      });
  });
}

// window.addEventListener("load", adjustUI);
// window.addEventListener("resize", adjustUI);

function adjustUI() {
  // console.log(window.innerWidth);
  const banner = document.querySelector("#ui #title-brand"); // อ้างอิงถึง a-entity ที่มี id="title-brand" ภายใน #ui

  const prevBt = document.querySelector("#prevRoomBtn"); //
  const nextBt = document.querySelector("#nextRoomBtn"); //
  const homeBt = document.querySelector("#homeRoomBtn"); //
  const exitBt = document.querySelector("#exitBtn"); //

  // สำหรับปุ่ม 'Home' และ 'ออก' ที่ยังเป็น plane/text เดิม
  const homePl = document.querySelector("#homePlane"); //
  const exitPl = document.querySelector("#exitPlane"); //

  const homeText = document.querySelector("#homeText"); //
  const exitText = document.querySelector("#exitText"); //

  // สำหรับปุ่ม 'ก่อนหน้า' และ 'ถัดไป' ที่เป็น a-image
  const prevImage = prevBt ? prevBt.querySelector("a-image") : null; //
  const nextImage = nextBt ? nextBt.querySelector("a-image") : null; //

  if (window.innerWidth < 600) {
    // หน้าจอแนวตั้ง
    if (banner) {
      // ตรวจสอบว่า banner มีอยู่จริง
      banner.setAttribute("position", "0 1.5 -2");
      banner.setAttribute("scale", "0.85 0.85 1");
    }

    if (prevBt) prevBt.setAttribute("position", "-0.35 -0.7 0"); // ปรับตำแหน่ง
    if (prevImage) {
      //
      prevImage.setAttribute("width", "0.3"); //
      prevImage.setAttribute("height", "0.3"); // ปรับให้เป็นสี่เหลี่ยมจัตุรัสเพื่อให้เหมาะสมกับ icon 2400x2400px
    }

    if (homeBt) homeBt.setAttribute("position", "0 -0.7 0"); //
    if (homePl) {
      //
      homePl.setAttribute("width", "0.3"); //
      homePl.setAttribute("height", "0.15"); //
    }
    if (homeText) {
      //
      homeText.setAttribute("troika-text", "value: 🏠; fontSize: 0.15;"); //
    }

    if (nextBt) nextBt.setAttribute("position", "0.35 -0.7 0"); // ปรับตำแหน่ง
    if (nextImage) {
      //
      nextImage.setAttribute("width", "0.3"); //
      nextImage.setAttribute("height", "0.3"); // ปรับให้เป็นสี่เหลี่ยมจัตุรัส
    }

    if (exitBt) exitBt.setAttribute("position", "0.7 -0.7 0"); // ปรับตำแหน่ง
    if (exitPl) {
      //
      exitPl.setAttribute("width", "0.3"); //
      exitPl.setAttribute("height", "0.15"); //
    }
    if (exitText) {
      //
      exitText.setAttribute("troika-text", "value: ❌; fontSize: 0.15;"); //
    }
  } else if (window.innerWidth < 1024) {
    // แท็บเล็ตและหน้าจอขนาดกลาง
    if (banner) {
      // ตรวจสอบว่า banner มีอยู่จริง
      banner.setAttribute("position", "-2.3 1.4 -2");
      banner.setAttribute("scale", "1.6 1.6 1");
    }

    if (prevBt) prevBt.setAttribute("position", "-0.5 -0.7 0"); //
    if (prevImage) {
      //
      prevImage.setAttribute("width", "0.4"); //
      prevImage.setAttribute("height", "0.4"); // ปรับให้เป็นสี่เหลี่ยมจัตุรัส
    }

    if (homeBt) homeBt.setAttribute("position", "0 -0.7 0"); //
    if (homePl) {
      //
      homePl.setAttribute("width", "0.4"); //
      homePl.setAttribute("height", "0.2"); //
    }
    if (homeText) {
      //
      homeText.setAttribute("troika-text", "value: 🏠Home; fontSize: 0.09;"); //
    }

    if (nextBt) nextBt.setAttribute("position", "0.5 -0.7 0"); //
    if (nextImage) {
      //
      nextImage.setAttribute("width", "0.4"); //
      nextImage.setAttribute("height", "0.4"); // ปรับให้เป็นสี่เหลี่ยมจัตุรัส
    }

    if (exitBt) exitBt.setAttribute("position", "1 -0.7 0"); //
    if (exitPl) {
      //
      exitPl.setAttribute("width", "0.4"); //
      exitPl.setAttribute("height", "0.2"); //
    }
    if (exitText) {
      //
      exitText.setAttribute("troika-text", "value: ❌ออก; fontSize: 0.09;"); //
    }
  } else {
    // หน้าจอ PC
    if (banner) {
      // ตรวจสอบว่า banner มีอยู่จริง
      banner.setAttribute("position", "-2.5 1.5 -2");
      banner.setAttribute("scale", "1 1 1");
    }

    if (prevBt) prevBt.setAttribute("position", "-0.5 -0.7 0"); //
    if (prevImage) {
      //
      prevImage.setAttribute("width", "0.4"); //
      prevImage.setAttribute("height", "0.4"); // ปรับให้เป็นสี่เหลี่ยมจัตุรัส
    }

    if (homeBt) homeBt.setAttribute("position", "0 -0.7 0"); //
    if (homePl) {
      //
      homePl.setAttribute("width", "0.4"); //
      homePl.setAttribute("height", "0.2"); //
    }
    if (homeText) {
      //
      homeText.setAttribute("troika-text", "value: 🏠Home; fontSize: 0.09;"); //
    }

    if (nextBt) nextBt.setAttribute("position", "0.5 -0.7 0"); //
    if (nextImage) {
      //
      nextImage.setAttribute("width", "0.4"); //
      nextImage.setAttribute("height", "0.4"); // ปรับให้เป็นสี่เหลี่ยมจัตุรัส
    }

    if (exitBt) exitBt.setAttribute("position", "1 -0.7 0"); //
    if (exitPl) {
      //
      exitPl.setAttribute("width", "0.4"); //
      exitPl.setAttribute("height", "0.2"); //
    }
    if (exitText) {
      //
      exitText.setAttribute("troika-text", "value: ❌ออก; fontSize: 0.09;"); //
    }
  }
}
