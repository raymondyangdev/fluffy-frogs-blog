
# Fluffy Frogs

Fluffy Frogs is a vibrant gardening blogsite designed to connect gardening enthusiasts, share experiences, and offer valuable insights into cultivating various crops and plants. This web application allows users to explore a wide range of articles covering different vegetables and plants. Users can not only read articles but also contribute by submitting their own gardening-related content. 

Additionally, they can engage in discussions by commenting on articles written by other users. Fluffy Frogs provides users with the flexibility to edit and delete their own comments and articles, creating a collaborative and informative gardening community.


## Main Features
- **User Account Creation**: Users can create new accounts, providing a unique username, password (with confirmation), real name, date of birth, and a brief description about themselves.

- **Username Availability Check**: During account creation, users are immediately informed if the chosen username is already taken, without the need to submit the form.

- **Password Security**: Passwords are securely hashed and salted before storage in the database, ensuring user account security.

- **Avatar Selection**: Users can choose from a set of predefined avatar icons to represent themselves when creating an account.

- **Login and Logout**: Users can log in and log out of their accounts.

- **Article Management**: Logged-in users can add new articles, as well as edit or delete their existing articles.

- **Article Listing**: Users can browse a list of all articles, and if logged in, they can also view a list of their own articles.

- **WYSIWYG Editor**: When authoring articles, a text editor with WYSIWYG support is provided, allowing users to create rich content with ease. Images can be placed within articles and stored as files on the server.

## Extra Features
- **Comments**: We have implemented a robust commenting system that allows users to engage in discussions effectively. Users can post, edit, and delete their comments, promoting an interactive community.

- **Weather Display Widget**: Our web application includes a weather display widget that provides users with real-time weather information relevant to their gardening activities. This feature enhances the gardening experience by offering weather-related insights.

- **Advanced Search Functionality**: We have extended the search functionality beyond initial intentions. Users can now search for gardening articles using various criteria, making it easier to find specific content of interest.

## Database Details
To run the web application successfully, the database file should be named `project-database.db`. Please execute the SQL commands provided in the `project-database-init-script.sql` script to ensure the presence of essential data. While the web application will function without this data, it is crucial for a complete user experience.

## Pre-Running Instructions
Before running Fluffy Frogs, ensure that you have installed the necessary dependencies using `npm install`.

## Running Instructions
To launch the web application, simply `run npm start`. No additional setup is required to run the application other than initialising the database as mentioned earlier.

## Existing User Accounts
To access Fluffy Frogs and explore existing content, you can use the following username/password combinations:

Username: user1 - Password: pa55word
Username: user2 - Password: pa55word

## Contributors
- [ayan235](https://github.com/ayan235)

- [jbut093](https://github.com/jbut093)

- [k8tmarie](https://github.com/k8tmarie)