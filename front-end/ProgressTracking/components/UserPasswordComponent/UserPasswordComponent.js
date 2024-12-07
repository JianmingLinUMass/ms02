import { EventHub } from '/ProgressTracking/eventHub/EventHub.js';
import { Events } from '/ProgressTracking/eventHub/Events.js';
import { BaseComponent } from '/ProgressTracking/components/BaseComponent/BaseComponent.js'

export class UserPasswordComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserPasswordComponent');

        this.currentPassword = "";
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
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <section id="user-password-section">
        <div><b>Password (encrypted):</b>
            <span id="password"></span>
            <button id="show-hide-password-button">Show/Hide</button>
        </div>
        <div><b>New Password:</b>
            <input id="new-password" type="password"></input>
        </div>
        <div><b>Confirm New Password:</b>
            <input id="confirm-new-password" type="password"></input>
        </div>
        <button id="reset-password-button">Reset Password</button>
        </section>`;
    }

    #attachEventListeners() {
        const userPasswordSpan = this.#container.querySelector('#password');
        const userNewPasswordSpan = this.#container.querySelector('#new-password');
        const userConfirmNewPasswordSpan = this.#container.querySelector('#confirm-new-password');
        
        const showHidePasswordButton = this.#container.querySelector('#show-hide-password-button');
        const resetPasswordButton = this.#container.querySelector('#reset-password-button');

        userPasswordSpan.style.visibility = "hidden";

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
            this.publishModifyPassword(userNewPasswordSpan.value);
        }

        this.#clearInputs(userNewPasswordSpan, userConfirmNewPasswordSpan);
    }

    publishModifyPassword(data) {
        EventHub.getInstance().publish(Events.ModifyPassword, data);
    }

    #clearInputs(userNewPasswordSpan, userConfirmNewPasswordSpan) {
        userNewPasswordSpan.value = '';
        userConfirmNewPasswordSpan.value = '';
    }
}