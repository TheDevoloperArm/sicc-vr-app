AFRAME.registerComponent('waypoint-manager', {
  schema: {
    roomId: { type: 'int', default: 1 }, // ห้องปัจจุบัน
    dataUrl: { type: 'string', default: 'rooms.json' }, // path ไปยัง JSON
    icon: { type: 'string', default: '#arrowIcon' } // icon ของ waypoint
  },

  init: function () {
    this.loadWaypoints(this.data.roomId);
  },

  loadWaypoints: function (roomId) {
    fetch(this.data.dataUrl)
      .then(res => res.json())
      .then(rooms => {
        const room = rooms.find(r => r.id === roomId);
        if (!room || !room.waypoints) return;

        room.waypoints.forEach(wp => {
          const waypointEl = document.createElement('a-entity');
          waypointEl.setAttribute('class', 'clickable waypoint');
          waypointEl.setAttribute('position', `${wp.x} ${wp.y} ${wp.z}`);
          waypointEl.setAttribute('data-target-room', wp.targetRoom);

          // ไอคอน
          const iconEl = document.createElement('a-image');
          iconEl.setAttribute('src', this.data.icon);
          iconEl.setAttribute('width', 0.4);
          iconEl.setAttribute('height', 0.4);
          iconEl.setAttribute('look-at', '[camera]');
          iconEl.setAttribute('event-set__mouseenter', 'scale: 1.2 1.2 1');
          iconEl.setAttribute('event-set__mouseleave', 'scale: 1 1 1');

          // ชื่อ waypoint
          const labelEl = document.createElement('a-entity');
          labelEl.setAttribute('troika-text', `value: ${wp.label}; fontSize: 0.08; color: yellow`);
          labelEl.setAttribute('position', '0 -0.3 0');

          waypointEl.appendChild(iconEl);
          waypointEl.appendChild(labelEl);

          // Event click → เปลี่ยนห้อง
          waypointEl.addEventListener('click', () => {
            window.location.href = `vr.html?room=${wp.targetRoom}`;
          });

          this.el.appendChild(waypointEl);
        });
      })
      .catch(err => console.error('โหลดข้อมูล waypoints ล้มเหลว', err));
  }
});
