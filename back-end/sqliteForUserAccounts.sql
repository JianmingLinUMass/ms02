-- SQLite
CREATE TABLE IF NOT EXISTS userAccounts (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_password TEXT NOT NULL,
    user_profile_path TEXT NOT NULL,
    user_level INTEGER NOT NULL,
    user_point_exercise DECIMAL(5, 2) NOT NULL,
    user_point_quiz DECIMAL(5, 2) NOT NULL
);

INSERT INTO userAccounts (username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz)
VALUES ("u1", "ea1@gmail.com", "p1", "https://github.com/JianmingLinUMass/ms02/blob/main/front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg?raw=true", 1, 0, 0)

INSERT INTO userAccounts (username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz)
VALUES ("u2", "ea2@gmail.com", "p2", "https://github.com/JianmingLinUMass/ms02/blob/main/front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg?raw=true", 2, 0, 0)