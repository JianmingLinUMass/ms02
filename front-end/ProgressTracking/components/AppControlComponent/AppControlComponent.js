import { UserProfileComponent } from '/ProgressTracking/components/UserProfileComponent/UserProfileComponent.js'
import { UserBasicMetricsComponent } from '/ProgressTracking/components/UserBasicMetricsComponent/UserBasicMetricsComponent.js'
import { UserPasswordComponent } from '/ProgressTracking/components/UserPasswordComponent/UserPasswordComponent.js'
import { UserPointMetricsComponent } from '/ProgressTracking/components/UserPointMetricsComponent/UserPointMetricsComponent.js'
import { EventHub } from '/ProgressTracking/eventHub/EventHub.js'

export class AppControlComponent {
    #container = null;
    #userProfileComponent = null;
    #userBasicMetricsComponent = null;
    #userPasswordComponent = null;
    #userPointMetricsComponent = null;
    #hub = null;

    user_id = 0;
    username = "";
    user_email = "";
    user_password = "";
    user_profile_path = "";
    user_level = 0;
    user_point_exercise = 0.0;
    user_point_quiz = 0.0;

    constructor(user_id, username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz) {
        this.#hub = EventHub.getInstance();
        this.#userProfileComponent = new UserProfileComponent();
        this.#userBasicMetricsComponent = new UserBasicMetricsComponent();
        this.#userPasswordComponent = new UserPasswordComponent();
        this.#userPointMetricsComponent = new UserPointMetricsComponent();

        this.user_id = user_id;
        this.username = username;
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_profile_path = user_profile_path;
        this.user_level = user_level;
        this.user_point_exercise = user_point_exercise;
        this.user_point_quiz = user_point_quiz;
    }

    render() {
        this.#createContainer();
        this.#setupContentInContainer();
        this.#attachEventListeners();
        this.#renderAllOtherComponents();

        this.loadUserAccountToFrontEnd();

        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <h1 id="welcome-note">Welcome to the User Page!</h1>
        <div id="viewContainer"></div>`;
    }

    #attachEventListeners() {
    }

    #renderAllOtherComponents() {
        const viewContainer = this.#container.querySelector('#viewContainer');
        viewContainer.innerHTML = '';

        viewContainer.appendChild(this.#userProfileComponent.render());
        viewContainer.appendChild(this.#userBasicMetricsComponent.render());
        viewContainer.appendChild(this.#userPasswordComponent.render());
        viewContainer.appendChild(this.#userPointMetricsComponent.render());
    }

    loadUserAccountToFrontEnd() {
        const userIdElement = this.#container.querySelector('#user-id');
        const usernameElement = this.#container.querySelector('#username');
        const userEmailElement = this.#container.querySelector('#email-address');
        const userPasswordElement = this.#container.querySelector('#password');
        const userProfileElement = this.#container.querySelector('#profile-picture');
        const userLevelElement = this.#container.querySelector('#level');
        const userPointExerciseElement = this.#container.querySelector('#point-earned-from-exercise-page');
        const userPointQuizElement = this.#container.querySelector('#point-earned-from-quiz-page');

        userIdElement.innerHTML = this.user_id;
        usernameElement.innerHTML = this.username;
        userEmailElement.innerHTML = this.user_email;
        userPasswordElement.innerHTML = this.user_password;
        userProfileElement.setAttribute('src', this.user_profile_path);
        userLevelElement.innerHTML = this.user_level;
        userPointExerciseElement.innerHTML = this.user_point_exercise;
        userPointQuizElement.innerHTML = this.user_point_quiz;
    }
}