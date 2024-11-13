import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserBasicMetricsComponent extends BaseComponent{
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserBasicMetricsComponent');

        this.userID = "userID123";
        this.username = "username456";
        this.emailAddress = "email.edu";
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
        this.#container.classList.add('BasicMetrics');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <br>
        <div><b>User ID:</b> 
            <span id="user-id"></span>
        </div>
        <div><b>Username:</b>
            <span id="username">username456</span>
        </div>
        <div><b>Email Address:</b>
            <span id="email-address">email.edu</span>    
        </div>`;
    }

    #attachEventListeners() {
        const userIdSpan = this.#container.querySelector('#user-id');
        const usernameSpan = this.#container.querySelector('#username');
        const userEmailAddressSpan = this.#container.querySelector('#email-address');

        userIdSpan.innerHTML = this.userID;
        usernameSpan.innerHTML = this.username;
        userEmailAddressSpan.innerHTML = this.emailAddress;

        this.#publishStoreUserMetrics(this.userID);       // store user id as an user metrics
        this.#publishStoreUserMetrics(this.username);     // store username as an user metrics
        this.#publishStoreUserMetrics(this.emailAddress); // store user email address as an user metrics

        // *To-Do: enable load user metrics here, if needed*
    }

    #publishStoreUserMetrics(userMetrics) {
        const hub = EventHub.getInstance();
        hub.publish(Events.StoreBasicMetrics, { userMetrics });
    }
}