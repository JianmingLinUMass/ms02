import { EventHub } from '../../../../front-end/ProgressTracking/eventHub/EventHub.js';
import { Events } from '../../../../front-end/ProgressTracking/eventHub/Events.js';
import { BaseComponent } from '../../../../front-end/ProgressTracking/components/BaseComponent/BaseComponent.js'

export class UserBasicMetricsComponent extends BaseComponent{
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserBasicMetricsComponent');

        this.userID = "userID123";
        this.username = "username456";
        this.emailAddress = "aaa@email.edu";
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

        this.#publishStoreBasicMetrics(this.userID);       // store user id as a basic metrics
        this.#publishStoreBasicMetrics(this.username);     // store username as a basic metrics
        this.#publishStoreBasicMetrics(this.emailAddress); // store user email address as a basic metrics

        // *To-Do: enable load basic metrics here, if needed*
    }

    #publishStoreBasicMetrics(basicMetrics) {
        const hub = EventHub.getInstance();
        hub.publish(Events.StoreBasicMetrics, { basicMetrics });
    }
}