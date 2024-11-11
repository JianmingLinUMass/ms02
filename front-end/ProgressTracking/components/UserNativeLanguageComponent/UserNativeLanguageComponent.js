import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserNativeLanguageComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserNativeLanguageComponent');
    }

    render() {
        if (this.#container) return this.#container;

        this.#createContainer();
        this.#setupContentInContainer();
        this.#attachEventListeners();

        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('NativeLanguage');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <br><br>
        <div id="TO-DO">User Native Language Component</div>
        <div>Native Language(s):</div>
        <div>Add a drop down menu here</div>
        <p>*Should have an unordered list of native language here</p>
        <button>Add Native Language</button>`;
    }

    #attachEventListeners() {

    }
}