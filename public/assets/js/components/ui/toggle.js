class Toggle {
  constructor(id) {
    this.id = id;
    this.on = false;
  }

  load(turnOn) {
    let element = this.getElement();

    element.addEventListener('click', () => {
      this.on = !this.on;

      if (this.on) {
        element.style.color = getComputedStyle(element).getPropertyValue('--color');
        element.style.backgroundImage = 'radial-gradient(circle farthest-corner at 7.4% 45.1%,  rgba(236,206,251,1) 0%, rgba(205,237,246,1) 45.1%, rgba(227,251,252,1) 78.4%, rgba(230,247,235,1) 90%)';
      }
      else {
        element.style.backgroundImage = 'none';
        element.style.color = 'white';
      }

      this.onChange(this.on);
    });

    element.click();
  }

  getElement() {
    return document.getElementById(this.id);
  }

  onChange(newValue) {
    console.log('#' + this.id + ': new value is', newValue);
  }
}
