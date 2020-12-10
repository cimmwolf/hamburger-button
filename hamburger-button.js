class HamburgerButton extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const { shadowRoot } = this;

    shadowRoot.innerHTML = `
      <style>
        :host {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 24px;
            transition: transform 300ms linear;
        }

        :host(.opened) { transform: rotateZ(90deg) }

        .icon-bar {
            background: var(--hamburger-button-bar-color, #000);
            padding: var(--hamburger-button-bar-padding, 2px 0);
            width: 100%;
            border-radius: 1px;
            transform-origin: center;
            position: relative;
            top: 0;
            bottom: 0;
            transition: var(--hamburger-button-bar-transition, transform 300ms, opacity 300ms ease-in, top 300ms, bottom 300ms);
        }

        :host(.opened) .first {
            top: 50%;
            bottom: auto;
            transform: translateY(-50%) rotateZ(45deg);
        }

        :host(.opened) .second { opacity: 0; }

        :host(.opened) .third {
            bottom: 50%;
            top: auto;
            transform: translateY(50%) rotateZ(-45deg);
        }
      </style>

      <div class="icon-bar first"></div>
      <div class="icon-bar second"></div>
      <div class="icon-bar third"></div>
    `;

    this.addEventListener('click', this._onTap);
  }

  static get is() {
		return 'hamburger-button';
	}

	static get properties() {
		return { opened: Boolean };
	}

	_onTap() {
    this.opened = !this.opened;
    this.toggleState(this.opened);
		return this.opened;
	}

	toggleState(value) {
		if (value) {
			this.dispatchEvent(new CustomEvent('hamburger-open', {bubbles: true, composed: true}));
			this.classList.add('opened');
		} else {
			this.dispatchEvent(new CustomEvent('hamburger-close', {bubbles: true, composed: true}));
			this.classList.remove('opened');
		}
	}
}

customElements.define(HamburgerButton.is, HamburgerButton);
