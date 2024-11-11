import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserPasswordComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserPasswordComponent');
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
        this.#container.classList.add('Password');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <div id="TO-DO">User Password Component</div>
        <div>Password: {********} [show]</div>
        <div>New Password: {} [show]</div>
        <div>Confirm New Password: {} [show]</div>
        <button>Reset Password</button>`;
    }

    #attachEventListeners() {

    }
}