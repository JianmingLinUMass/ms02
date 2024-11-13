import { EventHub } from '../../eventHub/EventHub.js';
import { Events } from '../../eventHub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js'

export class UserProfileComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('UserProfileComponent');
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
        this.#container.classList.add('Profile');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
        <div><b>User Profile:</b></div>
        <img src="../../front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg" alt="Default Profile" id="profile-picture">
        <form enctype="multipart/form-data">
            <input type="file" accept="image/*" id="edit-profile-input"/>
        </form>
        <button id="edit-profile-button">Edit Profile</button>

        <br/><br/>
        <div>*Default Profile Picture Attribution*</div>
        <a href="https://www.vecteezy.com/free-vector/default-profile-picture">Default Profile Picture Vectors by Vecteezy</a>
        <br/><br/>`;
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
        this.#publishClearProfile();
        this.#publishStoreProfile(file);
        this.#publishLoadProfile();
        this.#clearInputs(editProfileInput);
    }

    #publishClearProfile() {
        const hub = EventHub.getInstance();
        hub.publish(Events.ClearProfile, {});
    }

    #publishStoreProfile(file) {
        const hub = EventHub.getInstance();
        hub.publish(Events.StoreProfile, { file });
    }

    #publishLoadProfile() {
        const hub = EventHub.getInstance();
        hub.publish(Events.LoadProfile, {});
    }

    #clearInputs(editProfileInput) {
        editProfileInput.value = '';
    }
}