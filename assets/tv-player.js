class EightiesTV extends HTMLElement {
  connectedCallback() {
    this.staticVideo = this.querySelector('.tv-static');
    this.channels = Array.from(this.querySelectorAll('.tv-channel'));
    this.index = 0;

    this.prevButton = this.querySelector('.tv-control--prev');
    this.nextButton = this.querySelector('.tv-control--next');

    this.prevButton?.addEventListener('click', () => this.changeChannel(this.index - 1));
    this.nextButton?.addEventListener('click', () => this.changeChannel(this.index + 1));

    this.channels.forEach((video) => {
      video.addEventListener('ended', () => this.changeChannel(this.index + 1));
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
    });

    this.showChannel(0);
  }

  showStatic(show) {
    if (!this.staticVideo) return;
    if (show) {
      this.setAttribute('data-show-static', '');
      this.staticVideo.currentTime = 0;
      this.staticVideo.play();
    } else {
      this.removeAttribute('data-show-static');
      this.staticVideo.pause();
    }
  }

  showChannel(index) {
    this.channels.forEach((video, i) => {
      video.classList.toggle('active', i === index);
      if (i === index) {
        video.currentTime = 0;
        video.play();
      } else {
        video.pause();
      }
    });
    this.index = index;
  }

  changeChannel(newIndex) {
    newIndex = (newIndex + this.channels.length) % this.channels.length;
    this.showStatic(true);
    setTimeout(() => {
      this.showStatic(false);
      this.showChannel(newIndex);
    }, 500);
  }
}

customElements.define('eighties-tv-component', EightiesTV);
