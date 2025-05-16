window.addEventListener("load", adjustUI);
window.addEventListener("resize", adjustUI);

function adjustUI() {
  // console.log(window.innerWidth);
  const ui = document.querySelector("#ui");
  const banner = document.querySelector("#title-brand");
  const prevBt = document.querySelector("#prevRoomBtn");
  const nextBt = document.querySelector("#nextRoomBtn");
  const homeBt = document.querySelector("#homeRoomBtn");
  const exitBt = document.querySelector("#exitBtn");

  const prevPl = document.querySelector("#prevPlane");
  const nextPl = document.querySelector("#nextPlane");
  const homePl = document.querySelector("#homePlane");
  const exitPl = document.querySelector("#exitPlane");

  const prevText = document.querySelector("#prevText");
  const nextText = document.querySelector("#nextText");
  const homeText = document.querySelector("#homeText");
  const exitText = document.querySelector("#exitText");

  if (window.innerWidth < 600) {
    // หน้าจอแนวตั้ง
    banner.setAttribute("position", "0 1.5 -2");
    banner.setAttribute("scale", "0.85 0.85 1");

    prevBt.setAttribute("position", "-0.25 -0.7 0");
    prevPl.setAttribute("width", "0.2");
    prevPl.setAttribute("height", "0.2");
    prevText.setAttribute("troika-text", "value: ⬅️; fontSize: 0.18;");

    homeBt.setAttribute("position", "0 -0.7 0");
    homePl.setAttribute("width", "0.2");
    homePl.setAttribute("height", "0.2");
    homeText.setAttribute("troika-text", "value: 🏠; fontSize: 0.18;");

    nextBt.setAttribute("position", "0.25 -0.7 0");
    nextPl.setAttribute("width", "0.2");
    nextPl.setAttribute("height", "0.2");
    nextText.setAttribute("troika-text", "value: ➡️; fontSize: 0.18;");

    exitBt.setAttribute("position", "-0.5 -0.7 0");
    exitPl.setAttribute("width", "0.2");
    exitPl.setAttribute("height", "0.2");
    exitText.setAttribute("troika-text", "value: ❌; fontSize: 0.18;");
  } else if (window.innerWidth < 1024) {
    banner.setAttribute("position", "-2.3 1.4 -2");
    banner.setAttribute("scale", "1.6 1.6 1");

    prevBt.setAttribute("position", "-0.5 -0.7 0");
    prevPl.setAttribute("width", "0.4");
    prevPl.setAttribute("height", "0.2");
    prevText.setAttribute("troika-text", "value: ⬅️ก่อนหน้า; fontSize: 0.08;");

    homeBt.setAttribute("position", "0 -0.7 0");
    homePl.setAttribute("width", "0.4");
    homePl.setAttribute("height", "0.2");
    homeText.setAttribute("troika-text", "value: 🏠Home; fontSize: 0.09;");

    nextBt.setAttribute("position", "0.5 -0.7 0");
    nextPl.setAttribute("width", "0.4");
    nextPl.setAttribute("height", "0.2");
    nextText.setAttribute("troika-text", "value: ➡️ถัดไป; fontSize: 0.09;");

    exitBt.setAttribute("position", "1 -0.7 0");
    exitPl.setAttribute("width", "0.4");
    exitPl.setAttribute("height", "0.2");
    exitText.setAttribute("troika-text", "value: ❌ออก; fontSize: 0.09;");
  } else {
    banner.setAttribute("position", "-2.5 1.5 -2");
    banner.setAttribute("scale", "1 1 1");
  }
}
