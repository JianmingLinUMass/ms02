import { UserProfileComponent } from '../UserProfileComponent/UserProfileComponent.js'
import { UserBasicMetricsComponent } from '../UserBasicMetricsComponent/UserBasicMetricsComponent.js'
import { UserPasswordComponent } from '../UserPasswordComponent/UserPasswordComponent.js'
import { UserPointMetricsComponent } from '../UserPointMetricsComponent/UserPointMetricsComponent.js'
import { EventHub } from '../../eventHub/EventHub.js'

export class AppControlComponent {
    #container = null;
    #userProfileComponent = null;
    #userBasicMetricsComponent = null;
    #userPasswordComponent = null;
    #userPointMetricsComponent = null;
    #hub = null;

    constructor() {
        this.#hub = EventHub.getInstance();
        this.#userProfileComponent = new UserProfileComponent();
        this.#userBasicMetricsComponent = new UserBasicMetricsComponent();
        this.#userPasswordComponent = new UserPasswordComponent();
        this.#userPointMetricsComponent = new UserPointMetricsComponent();
    }

    render() {
        this.#createContainer();
        this.#setupContentInContainer();
        this.#attachEventListeners();

        this.#userProfileComponent.render();
        this.#userBasicMetricsComponent.render();
        this.#userPasswordComponent.render();
        this.#userPointMetricsComponent.render();

        this.#renderAllOtherComponents();

        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('AppControl');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <h1 id="welcome-note">Welcome to the User Page!</h1>
        <div id="viewContainer"></div>`;
    }

    #attachEventListeners() {
        // const homeButton = this.#container.querySelector('.home-button');
        // homeButton.addEventListener('click', () => document.location.href="../home-page.html");
    }

    #renderAllOtherComponents() {
        const viewContainer = this.#container.querySelector('#viewContainer');
        viewContainer.innerHTML = '';

        viewContainer.appendChild(this.#userProfileComponent.render());
        viewContainer.appendChild(this.#userBasicMetricsComponent.render());
        viewContainer.appendChild(this.#userPasswordComponent.render());
        viewContainer.appendChild(this.#userPointMetricsComponent.render());
    }
}