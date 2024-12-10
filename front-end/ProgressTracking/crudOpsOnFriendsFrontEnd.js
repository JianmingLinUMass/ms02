// Function to add a friend
async function addFriend(user1_name, user2_name) {
    try {
        const response = await fetch('/friends/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user1_name, user2_name })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Friend added successfully:', result);
        } else {
            console.error('Failed to add friend:', result.message);
        }
    } catch (err) {
        console.error('Error adding friend:', err);
    }
}

// Function to remove a friend
async function removeFriend(user1_name, user2_name) {
    try {
        const response = await fetch('/friends/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user1_name, user2_name })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Friend removed successfully:', result);
        } else {
            console.error('Failed to remove friend:', result.message);
        }
    } catch (err) {
        console.error('Error removing friend:', err);
    }
}

// Function to fetch all friends for a user
async function getFriends(username) {
    console.log("attempting to get friends from frontend", username)

    try {
        const response = await fetch('/friends/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        console.log(response)
        const result = await response.json();
        console.log(result)
        if (response.ok) {
            console.log('Friends fetched successfully:', result);
            return result;
        } else {
            console.error('Failed to fetch friends:', result.message);
        }
    } catch (err) {
        console.error('Error fetching friends:', err);
    }
}

// Function to send a friend request
async function sendFriendRequest(sender_name, receiver_name) {
    console.log('attemptinf to send friend request from frontend')
    try {
        const response = await fetch('/friend-requests/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sender_name, receiver_name })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Friend request sent:', result);
        } else {
            console.error('Failed to send friend request:', result.message);
        }
    } catch (err) {
        console.error('Error sending friend request:', err);
    }
}

// Function to fetch pending friend requests
async function getFriendRequests(username) {
    try {
        const response = await fetch(`/friend-requests/get-all?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Friend requests fetched successfully:', result);
            return result;
        } else {
            console.error('Failed to fetch friend requests:', result.message);
        }
    } catch (err) {
        console.error('Error fetching friend requests:', err);
    }
}

// Function to update the status of a friend request
async function updateFriendRequest(sender_name,recipient_name, newStatus) {
    try {
        const response = await fetch('/friend-requests/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sender_name,recipient_name, newStatus })
        });

        const result = await response.json();
        if (response.ok) {
            console.log(`Friend request ${newStatus} successfully:`, result);
        } else {
            console.error(`Failed to update friend request status:`, result.message);
        }
    } catch (err) {
        console.error('Error updating friend request:', err);
    }
}

export { addFriend, removeFriend, getFriends, sendFriendRequest, getFriendRequests, updateFriendRequest}