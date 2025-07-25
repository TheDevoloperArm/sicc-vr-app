AFRAME.registerComponent('frame-animation', {
    schema: {
        frames: { type: 'array', default: [] }, // Array of image asset IDs or URLs
        frameDuration: { type: 'number', default: 100 }, // Duration for each frame in milliseconds
        autoplay: { type: 'boolean', default: true },
        loop: { type: 'boolean', default: true }
    },

    init: function () {
        this.currentFrame = 0;
        this.lastFrameTime = 0;
        this.isPlaying = this.data.autoplay;

        // Set the initial image
        this.setImage();
    },

    update: function () {
        // If data changes, reset animation
        this.currentFrame = 0;
        this.lastFrameTime = 0;
        this.setImage();
    },

    tick: function (time, deltaTime) {
        if (!this.isPlaying || this.data.frames.length === 0) {
            return;
        }

        if (time - this.lastFrameTime > this.data.frameDuration) {
            this.currentFrame++;
            if (this.currentFrame >= this.data.frames.length) {
                if (this.data.loop) {
                    this.currentFrame = 0;
                } else {
                    this.isPlaying = false; // Stop animation if not looping
                    return;
                }
            }
            this.setImage();
            this.lastFrameTime = time;
        }
    },

    play: function () {
        this.isPlaying = true;
    },

    pause: function () {
        this.isPlaying = false;
    },

    stop: function () {
        this.isPlaying = false;
        this.currentFrame = 0;
        this.setImage();
    },

    setImage: function () {
        const frameSrc = this.data.frames[this.currentFrame];
        if (frameSrc) {
            this.el.setAttribute('src', frameSrc);
        }
    }
});