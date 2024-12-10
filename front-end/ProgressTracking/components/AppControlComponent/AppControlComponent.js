import { UserProfileComponent } from '/ProgressTracking/components/UserProfileComponent/UserProfileComponent.js'
import { UserBasicMetricsComponent } from '/ProgressTracking/components/UserBasicMetricsComponent/UserBasicMetricsComponent.js'
import { UserPasswordComponent } from '/ProgressTracking/components/UserPasswordComponent/UserPasswordComponent.js'
import { UserPointMetricsComponent } from '/ProgressTracking/components/UserPointMetricsComponent/UserPointMetricsComponent.js'
import { FriendComponent } from '/ProgressTracking/components/FriendComponent/FriendComponent.js'
import { EventHub } from '/ProgressTracking/eventHub/EventHub.js'
import { Events } from '/ProgressTracking/eventHub/Events.js';

import { fetchUserAccount, modifyUserAccount, modifyUserPasswordOnly } from '/ProgressTracking/crudOpsOnUserAccountsFrontEnd.js';

import Base64 from "../../base64.js";

export class AppControlComponent {
    #container = null;
    #userProfileComponent = null;
    #userBasicMetricsComponent = null;
    #userPasswordComponent = null;
    #userPointMetricsComponent = null;
    #friendComponent = null;
    #hub = null;

    username = "";
    user_email = "";
    user_password = "";
    user_profile_path = "";
    user_level = 0;
    user_point_exercise = 0.0;
    user_point_quiz = 0.0;

    // Switch user account by changing the values of `value` for `attribute`=username
    attribute = "username"; // we switch account based on username
    value = "u1"; // default username value

    constructor() {
        this.value = localStorage.getItem("storedUsername");

        this.#hub = EventHub.getInstance();
        this.#userProfileComponent = new UserProfileComponent();
        this.#userBasicMetricsComponent = new UserBasicMetricsComponent();
        this.#userPasswordComponent = new UserPasswordComponent();
        this.#userPointMetricsComponent = new UserPointMetricsComponent();
        this.#friendComponent = new FriendComponent(this.value);

        this.addSubscriptions();
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
        viewContainer.appendChild(this.#friendComponent.render());
    }

    setUserAccountInfoToField(username, user_email, user_password, user_profile_path, 
                              user_level, user_point_exercise, user_point_quiz) {
        this.username = username;
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_profile_path = user_profile_path;
        this.user_level = user_level;
        this.user_point_exercise = user_point_exercise;
        this.user_point_quiz = user_point_quiz;

        this.loadUserAccountToFrontEnd();
    }

    async loadUserAccountToFrontEnd() {
        const usernameElement = this.#container.querySelector('#username');
        const userEmailElement = this.#container.querySelector('#email-address');
        const userPasswordElement = this.#container.querySelector('#password');
        const userProfileElement = this.#container.querySelector('#profile-picture');
        const userLevelElement = this.#container.querySelector('#level');
        const userPointExerciseElement = this.#container.querySelector('#point-earned-from-exercise-page');
        const userPointQuizElement = this.#container.querySelector('#point-earned-from-quiz-page');

        usernameElement.innerHTML = this.username;
        userEmailElement.innerHTML = this.user_email;
        userPasswordElement.innerHTML = this.user_password;

        const blob = Base64.convertBase64ToFile(this.user_profile_path); // blob should be a Blob that is converted from user_profile_path (a base64)
        const profilePic = URL.createObjectURL(blob);

        userProfileElement.setAttribute('src', profilePic); // set front-end user profile on user page
        userLevelElement.innerHTML = this.user_level;
        userPointExerciseElement.innerHTML = this.user_point_exercise;
        userPointQuizElement.innerHTML = this.user_point_quiz;
    }

    async modifyProfileInDB(data) { // data should be a File object
        const base64 = await Base64.convertFileToBase64(data); // base64 should be a string that is converted from data

        // Pass the new profile () to the backend, and make modification on userAccounts.db there
        const acc = modifyUserAccount({attributes:["user_profile_path"], values:[base64], attribute:this.attribute, value:this.value});
 
        const thisAppControlComponent = this;
        await acc.then(function(result) {
            console.log('put:', result);
            thisAppControlComponent.setUserAccountInfoToField(result.username, result.user_email, result.user_password, result.user_profile_path, 
                result.user_level, result.user_point_exercise, result.user_point_quiz);
        });
    }

    async modifyPasswordInDB(data) {
        console.log('new password:', data);

        // Pass the new password to the backend, and make modification on userAccounts.db there
        const acc = modifyUserPasswordOnly({attributes:["user_password"], values:[data], attribute:this.attribute, value:this.value});

        const thisAppControlComponent = this;
        await acc.then(function(result) {
            console.log('put:', result);
            thisAppControlComponent.setUserAccountInfoToField(result.username, result.user_email, result.user_password, result.user_profile_path, 
                result.user_level, result.user_point_exercise, result.user_point_quiz);
        });
    }

    subscribe(event, listener) {
        return EventHub.getInstance().subscribe(event, listener);
    }

    addSubscriptions() {
        // profile
        this.subscribe(Events.ModifyProfile, data => {
          this.modifyProfileInDB(data);
        });

        // password
        this.subscribe(Events.ModifyPassword, data => {
            this.modifyPasswordInDB(data);
        });
    }
}