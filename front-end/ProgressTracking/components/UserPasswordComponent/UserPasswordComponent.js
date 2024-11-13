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
        <div id="password">Password: {********} [show]</div>
        <div id="new-password">New Password: {} [show]</div>
        <div id="confirm-new-password">Confirm New Password: {} [show]</div>
        <button id="reset-password-button">Reset Password</button>`;
    }

    #attachEventListeners() {

    }
}