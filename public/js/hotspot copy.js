AFRAME.registerComponent('pin-toggle', {
    schema: {
        hotspotData: { type: 'string', default: '{}' }
    },
    init: function () {
        var el = this.el;
        var data = this.data;
        var detailPanel = document.querySelector('#detailPanel');
        var detailTitleText = document.querySelector('#detailTitleText'); // ใหม่: สำหรับ Title
        var detailImageDisplay = document.querySelector('#detailImageDisplay'); // ใหม่: สำหรับรูปภาพ
        var detailText = document.querySelector('#detailText'); // สำหรับ Text รายละเอียด
        var closeButton = document.querySelector('#closeDetailBtn');

        console.log("Raw hotspotData (string from A-Frame schema):", data.hotspotData);

        try {
            this.hotspot = JSON.parse(data.hotspotData);
            console.log("Parsed hotspot object:", this.hotspot);
        } catch (e) {
            console.error("Error parsing hotspotData:", e);
            this.hotspot = {}; // ตั้งค่าเป็น object เปล่าเพื่อป้องกัน error ถ้านำไปใช้ต่อ
        }

        // Function เพื่อซ่อนทุกอย่างใน detailPanel ก่อนแสดงผลใหม่
        const hideAllDetailContent = () => {
            detailTitleText.setAttribute('visible', 'false');
            detailImageDisplay.setAttribute('visible', 'false');
            detailText.setAttribute('visible', 'false');
            detailImageDisplay.setAttribute('src', ''); // ล้างรูปภาพเก่า
            detailTitleText.setAttribute('troika-text', 'value: ;'); // ล้าง Title
            detailText.setAttribute('troika-text', 'value: ;'); // ล้าง Text
        };

        // Event listener สำหรับการคลิก Hotspot
        el.addEventListener('click', () => {
            var textEntity = el.querySelector('[troika-text]');
            if (textEntity) {
                textEntity.setAttribute('visible', 'false'); // ซ่อน tooltip text
            }

            hideAllDetailContent(); // ซ่อนเนื้อหาเดิมทั้งหมดก่อน

            if (this.hotspot.linkToRoom) {
                // ถ้ามี linkToRoom ให้เปลี่ยนห้อง
                if (typeof loadRoom === 'function') {
                    detailPanel.setAttribute('visible', 'false'); // ซ่อน detailPanel ถ้ากำลังเปลี่ยนห้อง
                    loadRoom(this.hotspot.linkToRoom);
                } else {
                    console.warn("loadRoom function not found. Cannot navigate to room.");
                }
            } else if (this.hotspot.detailImage) {
                // ถ้ามี detailImage ให้แสดงรูปภาพ
                if (this.hotspot.detailTitle) {
                    detailTitleText.setAttribute('troika-text', `value: ${this.hotspot.detailTitle};`);
                    detailTitleText.setAttribute('visible', 'true');
                }
                detailImageDisplay.setAttribute('src', this.hotspot.detailImage);
                detailImageDisplay.setAttribute('visible', 'true');
                detailPanel.setAttribute('visible', 'true');
            } else if (this.hotspot.detail) {
                // ถ้ามีแค่ detail (text)
                detailText.setAttribute('troika-text', `value: ${this.hotspot.detail};`);
                detailText.setAttribute('visible', 'true');
                detailPanel.setAttribute('visible', 'true');
            } else {
                // ถ้าไม่มีทั้ง detailImage และ detail, ซ่อน panel
                detailPanel.setAttribute('visible', 'false');
            }
        });

        // Event listener สำหรับปุ่มปิด detail panel
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                detailPanel.setAttribute('visible', 'false');
                hideAllDetailContent(); // ล้างเนื้อหาเมื่อปิด
            });
        }

        // Event listeners สำหรับ Hotspot image เพื่อแสดง/ซ่อนข้อความเล็กๆ (Tooltip)
        var hotspotImage = el.querySelector('a-image');
        if (hotspotImage) {
            hotspotImage.addEventListener('mouseenter', () => {
                var textEntity = el.querySelector('[troika-text]');
                if (textEntity) {
                    textEntity.setAttribute('visible', 'true');
                }
            });
            hotspotImage.addEventListener('mouseleave', () => {
                var textEntity = el.querySelector('[troika-text]');
                if (textEntity) {
                    // ซ่อนข้อความเล็กๆ เมื่อเมาส์ออกไป และ detailPanel ไม่ได้เปิดอยู่
                    if (!detailPanel.getAttribute('visible')) { // ตรวจสอบว่า panel ไม่ได้แสดงอยู่
                        textEntity.setAttribute('visible', 'false');
                    }
                }
            });
        }
    }
});