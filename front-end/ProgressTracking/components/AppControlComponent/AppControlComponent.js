import { UserProfileComponent } from '../UserProfileComponent/UserProfileComponent.js'
import { UserBasicMetricsComponent } from '../UserBasicMetricsComponent/UserBasicMetricsComponent.js'
import { UserPasswordComponent } from '../UserPasswordComponent/UserPasswordComponent.js'
import { UserNativeLanguageComponent } from '../UserNativeLanguageComponent/UserNativeLanguageComponent.js'
import { UserTargetLanguageComponent } from '../UserTargetLanguageComponent/UserTargetLanguageComponent.js'
import { UserPointMetricsComponent } from '../UserPointMetricsComponent/UserPointMetricsComponent.js'
import { EventHub } from '../../eventHub/EventHub.js'

export class AppControlComponent {
    #container = null;
    #userProfileComponent = null;
    #userBasicMetricsComponent = null;
    #userPasswordComponent = null;
    #userNativeLanguageComponent = null;
    #userTargetLanguageComponent = null;
    #userPointMetricsComponent = null;
    #hub = null;

    constructor() {
        this.#hub = EventHub.getInstance();
        this.#userProfileComponent = new UserProfileComponent();
        this.#userBasicMetricsComponent = new UserBasicMetricsComponent();
        this.#userPasswordComponent = new UserPasswordComponent();
        this.#userNativeLanguageComponent = new UserNativeLanguageComponent();
        this.#userTargetLanguageComponent = new UserTargetLanguageComponent();
        this.#userPointMetricsComponent = new UserPointMetricsComponent();
    }

    render() {
        this.#createContainer();
        this.#setupContentInContainer();
        this.#attachEventListeners();

        this.#userProfileComponent.render();
        this.#userBasicMetricsComponent.render();
        this.#userPasswordComponent.render();
        this.#userNativeLanguageComponent.render();
        this.#userTargetLanguageComponent.render();
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
        <h1>Welcome to the User Page, {username}.</h1>
        <div id="viewContainer"></div>`;
    }

    #attachEventListeners() {
        // Add any buttons/drop-down listener here
    }

    #renderAllOtherComponents() {
        const viewContainer = this.#container.querySelector('#viewContainer');
        viewContainer.innerHTML = '';

        viewContainer.appendChild(this.#userProfileComponent.render());
        viewContainer.appendChild(this.#userBasicMetricsComponent.render());
        viewContainer.appendChild(this.#userPasswordComponent.render());
        viewContainer.appendChild(this.#userNativeLanguageComponent.render());
        viewContainer.appendChild(this.#userTargetLanguageComponent.render());
        viewContainer.appendChild(this.#userPointMetricsComponent.render());
    }
}