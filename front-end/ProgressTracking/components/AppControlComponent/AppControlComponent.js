import { UserProfileComponent } from '/ProgressTracking/components/UserProfileComponent/UserProfileComponent.js'
import { UserBasicMetricsComponent } from '/ProgressTracking/components/UserBasicMetricsComponent/UserBasicMetricsComponent.js'
import { UserPasswordComponent } from '/ProgressTracking/components/UserPasswordComponent/UserPasswordComponent.js'
import { UserPointMetricsComponent } from '/ProgressTracking/components/UserPointMetricsComponent/UserPointMetricsComponent.js'
import { FriendComponent } from '/ProgressTracking/components/FriendComponent/FriendComponent.js'
import { EventHub } from '/ProgressTracking/eventHub/EventHub.js'
import { Events } from '/ProgressTracking/eventHub/Events.js';

import { fetchUserAccount, modifyUserAccount, modifyUserPasswordOnly } from '/ProgressTracking/crudOpsOnUserAccountsFrontEnd.js';

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

    loadUserAccountToFrontEnd() {
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
        userProfileElement.setAttribute('src', this.user_profile_path);
        userLevelElement.innerHTML = this.user_level;
        userPointExerciseElement.innerHTML = this.user_point_exercise;
        userPointQuizElement.innerHTML = this.user_point_quiz;
    }

    modifyProfileInDB(data) {
        console.log("data:", data);
        this.readURL(data)

        const objectURL = URL.createObjectURL(data);
        console.log("objectURL:", objectURL);

        const attributesToModify = ["user_profile_path"];
        const valuesToModify = [objectURL];
        modifyUserAccount({attributes:attributesToModify, values:valuesToModify, whereAttribute:this.attribute, whereValue:this.value});
    }

    readURL(file) {
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile-picture').src = e.target.result;
            }
            reader.readAsDataURL(file)
        }
    }

    async modifyPasswordInDB(data) {
        console.log('new password:', data);

        // Pass the new password to the backend, and make modification on userAccounts.db there
        const acc = modifyUserPasswordOnly({attributes:["user_password"], values:[data], attribute:this.attribute, value:this.value});
        // await acc.then(function(result) {
        //     console.log('put:', result);
        //     this.setUserAccountInfoToField(result.username, result.user_email, result.user_password, result.user_profile_path, 
        //         result.user_level, result.user_point_exercise, result.user_point_quiz);
        // });
        const thisAppControlComponent = this;
        await acc.then(function(result) {
            console.log('put:', result);
            console.log('thisAppControlComponent:', thisAppControlComponent);
            thisAppControlComponent.setUserAccountInfoToField(result.username, result.user_email, result.user_password, result.user_profile_path, 
                result.user_level, result.user_point_exercise, result.user_point_quiz);
        });
    }

    switchFocusingAccountWithNewUsername(data) {
        console.log('Switching to user account with username:', data);
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

        // listen for new value of username to switch account
        this.subscribe(Events.SwitchFocusingAccountWithNewUsername, data => {
            this.switchFocusingAccountWithNewUsername(data);
        });
    }
}