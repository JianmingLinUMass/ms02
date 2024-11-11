import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserProfileComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserProfileComponent');
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
        this.#container.classList.add('Profile');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <div id="TO-DO">User Profile Component</div>
        <div>User Profile: [edit]</div>
        <div>*Should have the user profile located on top of the page</div>
        <div>
            *Upon clicking on the [edit] button, the user can choose to upload a new profile.
        </div>
        <br/><br/>`;
    }

    #attachEventListeners() {

    }
}