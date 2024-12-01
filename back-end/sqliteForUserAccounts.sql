-- SQLite
CREATE TABLE IF NOT EXISTS userAccounts (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_password TEXT NOT NULL,
    user_profile_path TEXT NOT NULL
)

INSERT INTO userAccounts ("username", "user_email", "user_password", "user_profile_path")
VALUES ("username123", "emailaddress456", "password789", "https://github.com/JianmingLinUMass/ms02/blob/main/front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg?raw=true")
