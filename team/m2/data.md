# Application Data 

##  Overview

### 1. User Profile

- **Description**: Contains personal information about the user, including account settings and preferences for language learning.
- **Attributes**:
  - `user_id` (string): Unique identifier for each user
  - `username` (string): User's chosen display name
  - `email` (string): User's email address
  - `password` (string): Hashed version of user's password
  - `native_language` (string): User's first language
  - `learning_language` (string): Language the user is learning
  - `proficiency_level` (string): Current level (beginner, intermediate, advanced)
  - `daily_goal_minutes` (integer): Target study time per day
  - `created_at` (timestamp): The date and time when the account was created.
  - `updated_at` (timestamp): The last time the user’s profile was updated.

- **Data Source**: Input from user during account/profile registration.

### 2. Language Progress

- **Description**: Tracks the users progress in the chosen language.
- **Attributes**:
  - `progress_id` (string): A unique identifier for each progress entry.
  - `user_id` (string): The unique identifier of the user making progress.
  - `lesson_id` (string): The identifier for the grammar lesson the user completed.
  - `exercise_score` (float): The score the user received in a specific exercise.
  - `completed_at` (timestamp): The date and time when the user completed the lesson or exercise.
  - `level` (integer): The user’s current skill level in the chosen language.

- **Data Source**: System generated from user interactions with exercises.

### 3. Data Type 3

- **Description**:
- **Attributes**:
- **Data Source**:

### 4. Data Type 4

- **Description**:
- **Attributes**:
- **Data Source**: 

### 5. Data Type 5

- **Description**: 
- **Attributes**:
- **Data Source**: 

## Data Relationships



## Data Sources

