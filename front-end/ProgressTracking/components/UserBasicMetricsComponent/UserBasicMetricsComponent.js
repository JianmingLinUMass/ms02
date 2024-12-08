import { EventHub } from '/ProgressTracking/eventHub/EventHub.js';
import { Events } from '/ProgressTracking/eventHub/Events.js';
import { BaseComponent } from '/ProgressTracking/components/BaseComponent/BaseComponent.js'

export class UserBasicMetricsComponent extends BaseComponent{
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserBasicMetricsComponent');

        this.username = "";
        this.emailAddress = "";
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
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <div><b>Username:</b>
            <span id="username">username456</span>
        </div>
        <div><b>Email Address:</b>
            <span id="email-address">email.edu</span>    
        </div>`;
    }

    #attachEventListeners() {
        const usernameSpan = this.#container.querySelector('#username');
        const userEmailAddressSpan = this.#container.querySelector('#email-address');

        usernameSpan.innerHTML = this.username;
        userEmailAddressSpan.innerHTML = this.emailAddress;
    }
}