AFRAME.registerComponent('pin-toggle', {
    init: function () {
      const pin = this.el;
      const label = pin.querySelector('[troika-text]');
  
      pin.addEventListener('click', () => {
        const isVisible = label.getAttribute('visible');
        label.setAttribute('visible', !isVisible);
      });
    }
  });