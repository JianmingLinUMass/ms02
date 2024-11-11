import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserBasicMetricsComponent extends BaseComponent{
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserBasicMetricsComponent');
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
        <div id="TO-DO">User Basic Metrics Component</div>
        <div>User ID: {}</div>
        <div>Username: {}</div>
        <div>Email Address: {}</div>`;
    }

    #attachEventListeners() {

    }
}