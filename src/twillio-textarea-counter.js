import countCharacters from './countCharacters';
import detectEncoding from './detectEncoding';

const tagName = 'twillio-textarea-counter';
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
  .counter-encoding {
    float: left;
  }
  </style>

  <label for="textareaField">
    <slot name="counter-label"></slot>
  </label>
  <textarea id="textareaField" rows="10"></textarea>
  <div id="counter" class="counter">
    <span class="counter-encoding" aria-label="Encoding">GSM-7</span>
    <span class="counter-value" aria-label="Message length">0</span>
    <span class="counter-separator" aria-hidden="true">/</span>
    <span class="counter-total" aria-hidden="true">160</span>
  </div>
`;

/**
 * Twillio Textarea Counter Class
 * @class TwillioTextareaCounter
 * @extends {HTMLElement}
 */
class TwillioTextareaCounter extends HTMLElement {
  /**
   * Constructor, initialize properties
   */
  constructor() {
    super();
    this.encoding = 'GSM-7';
    this.count = 0;
    this.limit = 160;
  }

  /**
   * Setter for encoding
   * @param {String} value
   */
  set encoding(value) {
    this.setAttribute('encoding', value);
    if (this.counterEncoding) this.counterEncoding.textContent = value;
  }

  /**
   * Getter for encoding
   * @readonly
   * @return {String}
   */
  get encoding() {
    return this.getAttribute('encoding');
  }

  /**
   * Setter for count
   * @param {String} value
   */
  set count(value) {
    if (typeof value !== 'number' || value < 0) return;
    this.setAttribute('count', value);
    if (this.counterValue) this.counterValue.textContent = value;
  }

  /**
   * Getter for count
   * @readonly
   * @return {Number}
   */
  get count() {
    return this.getAttribute('count');
  }

  /**
   * Setter for limit
   * @param {String} value
   */
  set limit(value) {
    if (typeof value !== 'number' || value < 0) return;
    this.setAttribute('limit', value);
    if (this.counterTotal) this.counterTotal.textContent = value;
  }

  /**
   * Getter for limit
   * @readonly
   * @return {Number} limit
   */
  get limit() {
    return this.getAttribute('limit');
  }

  /**
   * Callback that is fired every time your element connects to the DOM,
   * including the first time it is upgraded.
   * It's an opportune moment to set up shadow children and attributes.
   */
  connectedCallback() {
    // Initialize properties that depend on light DOM
    this.encoding = this.getAttribute('encoding') || this.encoding;
    this.limit = this.getAttribute('limit') || this.limit;

    // Check if shadowRoot exists first
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowTextarea = this.shadowRoot.getElementById('textareaField');
      this.counterEncoding = this.shadowRoot.querySelector('.counter-encoding');
      this.counterValue = this.shadowRoot.querySelector('.counter-value');
      this.counterTotal = this.shadowRoot.querySelector('.counter-total');
    }

    // Add listeners
    this._onKeyUp = this._updateCounter.bind(this);
    this.shadowTextarea.addEventListener('keyup', this._onKeyUp, true);
  }

  /**
   * Callback that is fired prior to DOM removal.
   */
  disconnectedCallback() {
    this.shadowTextarea.removeEventListener('keyup', this._onKeyUp, true);
  }

  /**
   * Observed attributes that will trigger the callback.
   * @readonly
   * @static
   */
  static get observedAttributes() {
    return ['encoding', 'limit'];
  }

  /**
   * Will run whenever any of observed attributes change.
   * @param {String} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof TwillioTextareaCounter
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
      const str = this.shadowTextarea.value;
      this.encoding = detectEncoding(str);
      this.count = countCharacters(str, this.encoding);
      this.limit = (this.encoding === 'UCS-2') ? 70 : 160;

      // this.counterValue.textContent = count;
      // this.counterTotal.textContent = this.limit;
    }
  }
}

// This tells the browser that the <twillio-textarea-counter>
const register = () => customElements.define(tagName, TwillioTextareaCounter);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
