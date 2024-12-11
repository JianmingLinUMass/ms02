## Contribution Log for Loick Marion

### Time
- **Task**: 
- **Details**:
- **Link to Commit**:

### Time 11/1/2024
- **Task**: Created initial commit of ms3 repository
- **Details**: Crated a frontend folder and a backend folder with html files for each of the pages we talked about. This was done in a seprate repository and then copied over because we didnt initally realize things were to be done in the same repo.
- **Link to Commit**: https://github.com/LoickMarion/Grammargic/commits?author=LoickMarion

### Time 11/1/2024
- **Task**: Assigned ms03 assignments.
- **Details**: Lead a group discussion to decide who would do what during ms03. Our website planning indicated that we wanted to have 6 pages. As we had 7 people, we decide to split the work such that everyone is assigned one web page and will implement features for that page. As we had one more person than webpages, I would start work on the backend and then do a once over  of the front end after people pushed initial commits. 
- **Link to Commit**: N/A

### Time 11/14/2024 (changes pushed 11/15 aafter review with group)
- **Task**: Updated the server.js file
- **Details**: made updates to a javascript file that creates a locally losted http server that hosts our web app. This sets up structure for future backend development in ms04 and facilitates testing front end features.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/da9e982de571e2bd442f0ff6d64394b5f8cfd283#diff-b86135ca4165cfef0af822eb9149634998a6bbbe7a846e4e0461996e99af8953L9

### Time 11/15/2024
- **Task**: Navigation Bar
- **Details**: Added a Navigation Bar to every page so that every page can be easily accessed by the user.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/3a8bdad121e9637287fb7a94ff3a3327dccdaaf0

### Time 11/15/2024
- **Task**: Set up Sqlite Database
- **Details**: I created a sqlite database through npm. I created javascript functions to interact with the database to query items or add items. I integrated the database with the back end.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/f6d57672022f88abd9370818fffa8add6dc8a6a6

### Time 11/15/2024, 11/16/2024
- **Task**: Reorganized front end
- **Details**: Over a series of several commits, I made some adjustments and touch ups to the front end. I created folders for the quizzes and theory sections as those could become several files in the feature. All of the css for the theory page was inside the theory.html file, so i split it into its own css file. In addition, I  fixed a couple of typos (mostly in file paths).
- **Link to Commit**:

### Time 11/15/2024
- **Task**: Connected quizzes page to database
- **Details**: I made a javascript function that queries the database fron the front end. I modified the quizzes html page to have elements update with the result of that function, allowing for the user to see and answer a question from the database.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/481984dd93054158529e71ef4d7f7ff51a621ec2

### Time 11/22/2024
- **Task**: Fixed frontend links
- **Details**: Fixed links/import statements etc in our front end. Most of them were done relatively and didn't work with backend.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/6ca5698981ebb39059e4e93367c5f9da6a989ff7

### Time 11/22/2024
- **Task**: Updated Backend to use ExpressJS
- **Details**: Recreated our server.js file to use ExpressJS to be in line with ms04 requirements.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/d605017236129a7e0404b446ec96fbc053f673b5

### Time 11/29/2024
- **Task**: Updated Database and Backend to Support new Question format.
- **Details**: I put more thought and decided on the final form our questions should be stored in. I then made the encessary adjustemnts to store questions in that format in sqlite and wury from the frontend.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/744598fc81385f853830a713bbdd96c7b65b8730

### Time 12/03/2024
- **Task**: Updated url for the Login pages to work correctly
- **Details**: The login/signup pages were pushed with incorrect urls so I corrected them. I also changed the default page that the webapp loads to from the home page to the login page and I added an event listener for the login button to redirect to the home page.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/2752f280a307c6438d8a21d0de79fa02f97bbe7e

### Time 12/04/2024
- **Task**: fixed some typos in the code.
- **Details**: Made changes to improve spelling/style consistency.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/ccf72365175501afd4d43064eb55746e92702c8f

### Time 12/05/2024
- **Task**: Added more questions to the database.
- **Details**: I created some more questions and added them to our sqlite database so that the quiz and exercise sections have things to pull.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/823d9228c632f2607ad2a893071a8ef81bc7bb4f

### Time 12/05/2024
- **Task**: deleted unused files
- **Details**: I deleted some unused files 
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/c3eca4d287c8afb8a5606a6a6695558b5093bf83

### Time 12/07/2024
- **Task**: Added a friends feature
- **Details**: I implemented a friends feature across all levels of the webapp. I created a .qb file and sql table to hold friends and friend requests. I created javascript methods to interact with the database. I created get/post methods in the express_server.js file to route to the backend from the front end. I modified the front end as needed to send/accept freinds requests and show friends.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/e11ee15edd02cd3ea6c7f405022dc79e18a3d4b6

### Time 12/010/2024
- **Task**: fixed a minor bug with theory db.
- **Details**: There was a minor bug with the theory db not being instantialized, causing the front end to be unable to access the database. I patched it.
- **Link to Commit**: https://github.com/JianmingLinUMass/ms02/commit/834675aa07d13f3987a6d408d04695da33b6f07a
