import {countCharacters} from './utils';

const tagName = 'vanilla-textarea-counter';
const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
    width: 100%;
  }
  textarea {
    width: 100%;
  }
  .counter {
    width: 100%;
    text-align: right;
  }
  </style>

  <label for="textField">
    <slot name="counter-label"></slot>
  </label>
  <textarea id="textField"></textarea>
  <div id="counter" class="counter">
    <span id="counter__value">0</span>
    <span id="counter__separator">/</span>
    <span id="counter__total">180</span>
  </div>
`;

/**
 * Vanilla Textarea Counter Class
 *
 * @class VanillaTextareaCounter
 * @extends {HTMLElement}
 */
class VanillaTextareaCounter extends HTMLElement {
  /**
   *Creates an instance of VanillaTextareaCounter.
   * @memberof VanillaTextareaCounter
   */
  constructor() {
    super();
    this.encoding = 'GSM-7';
    this.limit = 160;
  }

  /**
   * Setter for [encoding]
   *
   * @memberof VanillaTextareaCounter
   * @param {String} value
   */
  set encoding(value) {
    this.setAttribute('encoding', value);
  }

  /**
   * Getter for [encoding]
   *
   * @readonly
   * @memberof VanillaTextareaCounter
   * @return {String} encoding
   */
  get encoding() {
    return this.getAttribute('encoding');
  }

  /**
   * Setter for [limit]
   *
   * @memberof VanillaTextareaCounter
   * @param {String} value
   */
  set limit(value) {
    if (typeof value !== 'number' || value < 0) return;
    this.setAttribute('limit', value);
  }

  /**
   * Getter for [limit]
   *
   * @readonly
   * @memberof VanillaTextareaCounter
   * @return {Number} limit
   */
  get limit() {
    return this.getAttribute('limit');
  }

  /**
   * connectedCallback is fired every time your element connects to the DOM,
   * including the first time it is upgraded.
   * It's an opportune moment to set up shadow children and attributes.
   *
   * @memberof VanillaTextareaCounter
   */
  connectedCallback() {
    // Initialize properties that depend on light DOM
    this.encoding = this.getAttribute('encoding') || this.encoding;
    this.limit = this.getAttribute('limit') || this.limit;

    // Check if shadowRoot exists first
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowTextarea = this.shadowRoot.getElementById('textField');
      this.counterValue = this.shadowRoot.getElementById('counter__value');
      this.counterTotal = this.shadowRoot.getElementById('counter__total');
    }

    // Add listeners
    this._onKeyUp = this._updateCounter.bind(this);
    this.shadowTextarea.addEventListener('keyup', this._onKeyUp, true);

    // Setup the counter.
    this.counterValue.textContent = 0;
    this.counterTotal.textContent = this.limit;
  }

  /**
   * dicsonnectedCallback is fired prior to DOM removal.
   *
   * @memberof VanillaTextareaCounter
   */
  disconnectedCallback() {
    this.shadowTextarea.removeEventListener('keyup', this._onKeyUp, true);
  }

  /**
   * Observed attributes that will trigger the callback.
   *
   * @readonly
   * @static
   * @memberof VanillaTextareaCounter
   */
  static get observedAttributes() {
    return ['encoding', 'limit'];
  }

  /**
   * Will run whenever any of observed attributes change.
   *
   * @param {String} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof VanillaTextareaCounter
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  /**
   *
   *
   * @param {*} e
   * @memberof VanillaTextareaCounter
   */
  _updateCounter(e) {
    console.log(e, this.shadowTextarea);

    /**
     * @TODO
     *
     * KeyDown:
     * - detect key encoding
     * - validate key with encoding
     *   -> true attach listener for keyup once
     *   -> false preventDefault + validation error
     *
     * KeyUp:
     * - update counter
     */

    if (this.shadowTextarea) {
      const count = countCharacters(this.shadowTextarea.value, 'GSM-7');
      this.counterValue.textContent = count;
    }
  }
}

// This tells the browser that the <vanilla-textarea-counter>
const register = () => customElements.define(tagName, VanillaTextareaCounter);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
