import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserTargetLanguageComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserTargetLanguageComponent');
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
        this.#container.classList.add('TargetLanguage');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <br><br>
        <div id="TO-DO">User Target Language Component</div>
        <div>Target Language(s):</div>
        <p>*Should have an unordered list of target language here</p>
        <button id="add-target-language-button">Add Target Language</button>`;
    }

    #attachEventListeners() {

    }
}