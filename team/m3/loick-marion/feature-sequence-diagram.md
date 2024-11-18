Chosen Feature: Quiz, in quizzes page

Description: added functionality to the existing quiz that allows the user to answer questions pulled from a database.

Sequence Diagram:
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Start Quiz
    Frontend->>Backend: Request question
    Backend->>Database: Fetch question and answer
    Database-->>Backend: Return question and answer
    Backend-->>Frontend: Send question and answer
    Frontend-->>User: Display question

    User->>Frontend: Submit answer
    Frontend: Compare user answer with correct answer
    Frontend-->>User: Display result (Correct/Incorrect)
```