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

### 3. Grammar Lessons

- **Description**: Contains educational content for grammar concepts
- **Attributes**:
  - `title` (string): Name of the lesson
  - `content` (JSON): Structured lesson content including:

    - `explanation` (text)
    - `examples` (array)
    - `usage_rules` (array)
    - `common_mistakes` (array)

  - `lesson_id` (string): Unique identifier for each lesson
  - `language` (string): Language this lesson applies to
  - `level` (string): Difficulty level of the lesson
  - `category` (string): Grammar category (e.g., verb tenses, pronouns)
- **Data Source**: Curated educational content created by us

### 4. Interactive Exercises 

- **Description**: Interactive exercises that allow users to practice grammar skills.
- **Attributes**:
  - `exercise_id` (string): A unique identifier for each exercise.
  - `lesson_id` (string): The lesson to which the exercise is linked.
  - `exercise_type` (string): The type of exercise (e.g., multiple-choice, fill-in-the-blank).
  - `questions` (JSON): The set of questions and possible answers.
  - `correct_answers` (JSON): The set of correct answers for evaluation.
  - `created_at` (timestamp): The date and time the exercise was added.

- **Data Source**: Curated content aligned with lesson materials

### 5. User Activity

- **Description**: Tracks daily user engagement and activity
- **Attributes**:
  - `activity_id` (string): Unique identifier for activity entry
  - `user_id` (string): Associated user
  - `date` (date): Activity date
  - `minutes_practiced` (integer): Total practice time
  - `lessons_completed` (array): Lessons completed that day
  - `exercises_complete` (array): Exercises completed that day
  - `points_earned` (integer): Daily points earned

- **Data Source**: System generated based on user interaction

## Data Relationships
User to Lessons: Many-to-many (users can access multiple lessons, lessons can be accessed by multiple users)
Lessons to Exercises: One-to-many (each lesson has multiple exercises)
User to Progress: One-to-many (user has progress records for each completed lesson)
User to Activity: One-to-many (user has multiple activity records)



## Data Sources
User-Input Data: Includes user profiles, lesson progress, and input from completing exercises.
System-Generated Data: Lessons, exercises generated and updated by the system based on user interactions.
Administrator-Generated Data: New grammar lessons and exercises are added by administrators or content creators.
