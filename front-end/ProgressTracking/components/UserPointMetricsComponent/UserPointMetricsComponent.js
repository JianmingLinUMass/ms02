import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserPointMetricsComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserPointMetricsComponent');
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
        this.#container.classList.add('PointMetrics');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <br><br>
        <div id="TO-DO">User Point Component</div>
        <div id="level">Level: {}</div>
        <div id="point-earned-from-learn-page">Points Earned (from Learn Page): {}</div>
        <div id="point-earned-from-exercise-page">Points Earned (from Exercise Page): {}</div>
        <br><br>`;
    }

    #attachEventListeners() {

    }
}