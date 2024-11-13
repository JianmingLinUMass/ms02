import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserPointMetricsComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserPointMetricsComponent');

        this.level = 1;
        this.pointsFromLearnPage = 10.1;
        this.pointsFromExercisePage = 8.3;
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
        <div><b>Current Level:</b>
            <span id="level"></span>
        </div>
        <div><b>Points Earned (from Learn Page):</b>
            <span id="point-earned-from-learn-page"></span>
        </div>
        <div><b>Points Earned (from Exercise Page):</b>
            <span id="point-earned-from-exercise-page"></span>
        </div>
        <br><br>`;
    }

    #attachEventListeners() {
        const userLevelSpan = this.#container.querySelector('#level');
        const userPointsFromLearnPageSpan = this.#container.querySelector('#point-earned-from-learn-page');
        const userPointsFromExercisePageSpan = this.#container.querySelector('#point-earned-from-exercise-page');

        userLevelSpan.innerHTML = this.level;
        userPointsFromLearnPageSpan.innerHTML = this.pointsFromLearnPage;
        userPointsFromExercisePageSpan.innerHTML = this.pointsFromExercisePage;

        this.#publishStorePointMetrics(this.level);                  // store user level as a point metrics
        this.#publishStorePointMetrics(this.pointsFromLearnPage);    // store user points earned from learn page as a point metrics
        this.#publishStorePointMetrics(this.pointsFromExercisePage); // store user points earned from learn page as a point metrics

        // *To-Do: enable load point metrics here, if needed*
    }

    #publishStorePointMetrics(pointMetrics) {
        const hub = EventHub.getInstance();
        hub.publish(Events.StoreBasicMetrics, { pointMetrics });
    }
}