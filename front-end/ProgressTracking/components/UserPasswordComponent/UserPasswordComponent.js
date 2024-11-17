import { EventHub } from '../../../../front-end/ProgressTracking/eventHub/EventHub.js';
import { Events } from '../../../../front-end/ProgressTracking/eventHub/Events.js';
import { BaseComponent } from '../../../../front-end/ProgressTracking/components/BaseComponent/BaseComponent.js'

export class UserPasswordComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserPasswordComponent');

        this.currentPassword = "password789";
        this.isCurrentlyShowingPassword = false;
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
        this.#container.classList.add('Password');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <div><b>Password:</b>
            <span id="password"></span>
            <button id="show-hide-password-button">Show/Hide</button>
        </div>
        <div><b>New Password:</b>
            <input id="new-password" type="password"></input>
        </div>
        <div><b>Confirm New Password:</b>
            <input id="confirm-new-password" type="password"></input>
        </div>
        <button id="reset-password-button">Reset Password</button>`;
    }

    #attachEventListeners() {
        const userPasswordSpan = this.#container.querySelector('#password');
        const userNewPasswordSpan = this.#container.querySelector('#new-password');
        const userConfirmNewPasswordSpan = this.#container.querySelector('#confirm-new-password');
        
        const showHidePasswordButton = this.#container.querySelector('#show-hide-password-button');
        const resetPasswordButton = this.#container.querySelector('#reset-password-button');

        userPasswordSpan.style.visibility = "hidden";

        userPasswordSpan.innerHTML = this.currentPassword;
        this.#publishStorePasswordMetrics(this.currentPassword);

        showHidePasswordButton.addEventListener('click', () => this.#handleShowHidePasswordButton(userPasswordSpan));
        resetPasswordButton.addEventListener('click', () => this.#handleResetPasswordButton(userPasswordSpan, userNewPasswordSpan, userConfirmNewPasswordSpan));
    }

    #handleShowHidePasswordButton(userPasswordSpan) {
        this.isCurrentlyShowingPassword = !this.isCurrentlyShowingPassword;

        if (!this.isCurrentlyShowingPassword) {
            userPasswordSpan.style.visibility = "hidden";
        } else {
            userPasswordSpan.style.visibility = "visible";
        }
    }

    #handleResetPasswordButton(userPasswordSpan, userNewPasswordSpan, userConfirmNewPasswordSpan) {
        if (userNewPasswordSpan.value === '') {
            alert('Invalid input: "New Password" field cannot be empty!');
            this.#clearInputs(userNewPasswordSpan, userConfirmNewPasswordSpan);
            return
        } else if (userConfirmNewPasswordSpan.value === '') {
            alert('Invalid input: "Confirm New Password" field cannot be empty!');
            this.#clearInputs(userNewPasswordSpan, userConfirmNewPasswordSpan);
            return
        }

        if (userNewPasswordSpan.value !== userConfirmNewPasswordSpan.value) {
            alert('Invalid input: "New Password" field does not equal to "Confirm New Password" field!');
        } else {
            this.currentPassword = userNewPasswordSpan.value;
            userPasswordSpan.innerHTML = this.currentPassword;
            this.#publishClearPasswordMetrics();
            this.#publishStorePasswordMetrics(this.currentPassword);
            this.#publishLoadPasswordMetrics();
        }

        this.#clearInputs(userNewPasswordSpan, userConfirmNewPasswordSpan);
    }

    #publishClearPasswordMetrics() {
        const hub = EventHub.getInstance();
        hub.publish(Events.ClearPasswordMetrics, {});
    }

    #publishStorePasswordMetrics(passwordMetrics) {
        const hub = EventHub.getInstance();
        hub.publish(Events.StorePasswordMetrics, { passwordMetrics });
    }

    #publishLoadPasswordMetrics() {
        const hub = EventHub.getInstance();
        hub.publish(Events.LoadPasswordMetrics, {});
    }

    #clearInputs(userNewPasswordSpan, userConfirmNewPasswordSpan) {
        userNewPasswordSpan.value = '';
        userConfirmNewPasswordSpan.value = '';
    }
}