import { EventHub } from '/ProgressTracking/eventHub/EventHub.js';
import { Events } from '/ProgressTracking/eventHub/Events.js';
import { BaseComponent } from '/ProgressTracking/components/BaseComponent/BaseComponent.js'

export class UserPointMetricsComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserPointMetricsComponent');

        this.level = 0;
        this.pointsFromExercisePage = 0.0;
        this.pointsFromQuizPage = 0.0;
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
        <br><br/>
        <div><b>Current Level:</b>
            <span id="level"></span>
        </div>
        <div><b>Points Earned (from Exercise Page):</b>
            <span id="point-earned-from-exercise-page"></span>
        </div>
        <div><b>Points Earned (from Quiz Page):</b>
            <span id="point-earned-from-quiz-page"></span>
        </div>
        <br><br>`;
    }

    #attachEventListeners() {
        const userLevelSpan = this.#container.querySelector('#level');
        const userPointsFromExercisePageSpan = this.#container.querySelector('#point-earned-from-exercise-page');
        const userPointsFromQuizPageSpan = this.#container.querySelector('#point-earned-from-quiz-page');

        userLevelSpan.innerHTML = this.level;
        userPointsFromExercisePageSpan.innerHTML = this.pointsFromExercisePage;
        userPointsFromQuizPageSpan.innerHTML = this.pointsFromQuizPage;
    }
}