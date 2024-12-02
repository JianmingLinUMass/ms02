import { EventHub } from '/ProgressTracking/eventHub/EventHub.js';
import { Events } from '/ProgressTracking/eventHub/Events.js';
import { BaseComponent } from '/ProgressTracking/components/BaseComponent/BaseComponent.js'

export class UserProfileComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserProfileComponent');

        this.imgURL = '';
    }

    render() {
        if (this.#container) return this.#container;

        this.#createContainer();
        this.#setupContentInContainer();
        this.#setupDefaultProfile();
        this.#attachEventListeners();

        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <div><b>User Profile:</b></div>
        <img src="" alt="Default Profile" id="profile-picture">
        <form enctype="multipart/form-data">
            <input type="file" accept="image/*" id="edit-profile-input"/>
        </form>
        <button id="edit-profile-button">Edit Profile</button>

        <br/><br/>
        <div>*Default Profile Picture Attribution*</div>
        <a href="https://www.vecteezy.com/free-vector/default-profile-picture">Default Profile Picture Vectors by Vecteezy</a>
        <br/><br/><br/>`;
    }

    #setupDefaultProfile() {
        this.#container.querySelector('#profile-picture').setAttribute('src', this.imgURL);
    }

    #attachEventListeners() {
        const editProfileButton = this.#container.querySelector('#edit-profile-button');
        const editProfileInput = this.#container.querySelector('#edit-profile-input');

        editProfileButton.addEventListener('click', () => this.#handleProfileEdition(editProfileInput));
    }
    
    #handleProfileEdition(editProfileInput) {
        const file = editProfileInput.files[0];

        if (!file) {
            alert('Please upload a profile image.');
            return;
        }

        // we can only add 'file' object to objectStore since it cannot contain htmlInputElement (editProfileInput)
        this.#clearInputs(editProfileInput);
    }

    #clearInputs(editProfileInput) {
        editProfileInput.value = '';
    }
}