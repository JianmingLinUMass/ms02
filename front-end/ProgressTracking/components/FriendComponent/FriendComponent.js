import { EventHub } from '/ProgressTracking/eventHub/EventHub.js';
import { Events } from '/ProgressTracking/eventHub/Events.js';
import { BaseComponent } from '/ProgressTracking/components/BaseComponent/BaseComponent.js';


import { addFriend, removeFriend, getFriends, sendFriendRequest, getFriendRequests, updateFriendRequest} from '/ProgressTracking/crudOpsOnFriendsFrontEnd.js'
export class FriendComponent extends BaseComponent {
    #container = null;

    constructor(username) {
        super();
        this.username = username
        this.loadCSS('FriendComponent');
        this.friends = [];
    }

    render() {
        if (this.#container) return this.#container;

        this.#createContainer();
        this.#setupContentInContainer();
        this.#attachEventListeners();

        this.#loadPendingFriendRequests();
        this.#loadFriendsList()

        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
    }

    #setupContentInContainer() {
        this.#container.innerHTML = `
            <div id="friend-component">
                <h3>Friend Requests</h3>
                <div id="pending-requests-list"></div>
                <h4>Send Friend Request</h4>
                <input type="text" id="friend-username-input" placeholder="Enter username">
                <button id="send-friend-request-btn">Send Request</button>

                <h3>Your Friends</h3>
                <ul id="friends-list">
                    ${this.friends.map(friend => `<li>${friend}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    #attachEventListeners() {
        const sendFriendRequestButton = this.#container.querySelector('#send-friend-request-btn');
        const pendingRequestsList = this.#container.querySelector('#pending-requests-list');

        sendFriendRequestButton.addEventListener('click', () => this.#handleSendFriendRequest());
        pendingRequestsList.addEventListener('click', (event) => this.#handleRespondToFriendRequest(event));
    }

    async #handleSendFriendRequest() {
        const friendUsernameInput = this.#container.querySelector('#friend-username-input');
        const friendUsername = friendUsernameInput.value.trim();

        const sender_name = this.username;  // Assuming `this.username` is the logged-in user's ID
        const receiver_name = friendUsername;
        
        console.log('attempting to send friend request from component')
        await sendFriendRequest(sender_name, receiver_name);

        friendUsernameInput.value = ''; // Clear the input field
    }

    async #handleRespondToFriendRequest(event) {
        const target = event.target;
        // console.log(target)
        if (target.classList.contains('accept-btn') || target.classList.contains('reject-btn')) {
            const senderName = target.dataset.senderName;
            const recipientName = target.dataset.recipientName;

            console.log('Sender:', senderName);
            console.log('Recipient:', recipientName);
    
            const accept = target.classList.contains('accept-btn');
            await updateFriendRequest(senderName, recipientName, accept ? 'accepted' : 'rejected');
    
            // Reload pending requests after responding
            this.#loadPendingFriendRequests();
            this.#loadFriendsList();
        }
    }
    
    

    // Fetch and display pending friend requests
    async #loadPendingFriendRequests() {
        try {
            const requests = await getFriendRequests(this.username); // Assuming `this.username` is the logged-in user's ID
            const pendingRequestsList = this.#container.querySelector('#pending-requests-list');
            
            pendingRequestsList.innerHTML = ''; // Clear the list before updating

            const pendingRequests = requests.filter(request => request.status === 'pending');
    
            if (pendingRequests.length > 0) {
                pendingRequests.forEach(request => {
                    console.log(request);
                    const requestElement = document.createElement('div');
                    requestElement.classList.add('friend-request-item');
                    requestElement.innerHTML = `
                        <span>${request.sender_name} sent you a friend request</span>
                        <button class="accept-btn" 
                            data-sender-name="${request.sender_name}" 
                            data-recipient-name="${this.username}">
                            Accept
                        </button>
                        <button class="reject-btn" 
                            data-sender-name="${request.sender_name}" 
                            data-recipient-name="${this.username}">
                            Reject
                        </button>
                    `;
                    pendingRequestsList.appendChild(requestElement);
                });
            } else {
                pendingRequestsList.innerHTML = '<p>No pending friend requests.</p>';
            }
        } catch (err) {
            console.error('Error loading friend requests:', err);
        }
    }

    async #loadFriendsList() {
        try {
            const friends = await getFriends(this.username); // Fetch friends from the database
            console.log(friends)
            const friendsList = this.#container.querySelector('#friends-list');
            
            friendsList.innerHTML = ''; // Clear the list before updating

            if (friends.length > 0) {
                friends.forEach(friend => {
                    const friendItem = document.createElement('li');
                    friendItem.textContent = friend.friend_name; // Assuming `friend.name` contains the friend's username
                    friendsList.appendChild(friendItem);
                });
            } else {
                friendsList.innerHTML = '<li>You have no friends yet.</li>';
            }
        } catch (err) {
            console.error('Error loading friends list:', err);
        }
    }
    
}
