const nextBtn = document.getElementById("nextRoomBtn");
      const prevBtn = document.getElementById("prevRoomBtn");
      const homeBtn = document.getElementById("homeRoomBtn");
      const exitBtn = document.getElementById("exitBtn");

      let isLoading = false;
      let rooms = [];
      let currentRoom = 1;
      let totalRooms;

      nextBtn.addEventListener("click", () => {
        const nextRoom = currentRoom + 1 > totalRooms ? 1 : currentRoom + 1;
        loadRoom(nextRoom);
      });

      prevBtn.addEventListener("click", () => {
        const prevRoom = currentRoom - 1 < 1 ? totalRooms : currentRoom - 1;
        loadRoom(prevRoom);
      });

      homeBtn.addEventListener("click", () => {
        if (currentRoom === 1) return;
        loadRoom(1);
      });

      exitBtn.addEventListener("click", () => {
        if (isLoading) return;
        window.location.href = "index.html";
      });

      fetch("rooms.json")
        .then((res) => res.json())
        .then((data) => {
          rooms = data;
          loadRoom(currentRoom);
          totalRooms = data.length;
          console.log("จำนวนห้องทั้งหมด: ", totalRooms);
        });

      function loadRoom(roomId) {
        if (isLoading) return;

        const sky = document.querySelector("#sky");
        const cam = document.querySelector("#cam");
        const loading = document.querySelector("#loading");
        const label = document.querySelector("#roomLabel");

        isLoading = true;
        loading.setAttribute("visible", true);

        const room = rooms.find((r) => r.id === roomId);
        currentRoom = roomId;

        if (!room) {
          alert("ไม่พบห้องนี้");
          return;
        }

        cam.removeAttribute("look-controls");

        sky.setAttribute("src", room.image);

        sky.addEventListener("materialtextureloaded", () => {
          cam.setAttribute("look-controls", "");
          loading.setAttribute("visible", false);
          isLoading = false;
          label.setAttribute(
            "troika-text",
            `value: ${room.name}; color: white;`
          );

          sky.setAttribute("rotation", `0 ${room.y} 0`);

          cam.components["look-controls"].pitchObject.rotation.x = 0;
          cam.components["look-controls"].yawObject.rotation.y = 0;
        });
      }