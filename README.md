# MERN Challenge: Book Search Engine

Your Challenge this week is emblematic of the fact that most modern websites are driven by two things: data and user demands. This shouldn't come as a surprise, as the ability to personalize user data is the cornerstone of real-world web development today. And as user demands evolve, applications need to be more performant.

This week, you’ll take a fully functioning Google Books API search engine built with a RESTful API, and refactor it to be a GraphQL API built with Apollo Server. The app was built using the MERN stack, with a React front end, MongoDB database, and Node.js/Express.js server and API. It's already set up to allow users to save book searches to the back end.

To fulfill the Challenge, you’ll need to do the following:

• Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

• Modify the existing authentication middleware so that it works in the context of a GraphQL API.

• Create an Apollo Provider so that requests can communicate with an Apollo Server.

• Deploy the application to Heroku.

## Getting Started

In order for this application to use a GraphQL API, you’ll need to refactor the API to use GraphQL on the back end and add some functionality to the front end. The following sections contain details about the files you’ll need to modify on the back end and the front end.

IMPORTANT

Make sure to study the application before building upon it. Better yet, start by making a copy of it. It's already a working application—you're converting it from RESTful API practices to a GraphQL API.

## Back-End Specifications

You’ll need to complete the following tasks in each of these back-end files:

• auth.js: Update the auth middleware function to work with the GraphQL API.

• server.js: Implement the Apollo Server and apply it to the Express server as middleware.

IMPORTANT

Apollo Server recently migrated to Apollo Server 3. This major-version release impacts how Apollo Server interacts in an Express environment. To implement Apollo Server 2 as demonstrated in the activities, you MUST use the following script npm install apollo-server-express@2.15.0 to install Apollo Server 2. Alternately, to migrate to the latest version of Apollo Server, please refer to the Apollo Server Docs on Migrating to Apollo Server 3Links to an external site. and Apollo Server Docs on Implementing Apollo Server Express with v3Links to an external site.. Note that if you are using Apollo Server 3 you are required use await server.start() before calling server.applyMiddleware.

• Schemas directory:

• index.js: Export your typeDefs and resolvers.

• resolvers.js: Define the query and mutation functionality to work with the Mongoose models.

• typeDefs.js: Define the necessary Query and Mutation types:

• Query type:

• me: Which returns a User type.

• Mutation type:

• login: Accepts an email and password as parameters; returns an Auth type.

• addUser: Accepts a username, email, and password as parameters; returns an Auth type.

• saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)

• removeBook: Accepts a book's bookId as a parameter; returns a User type.

• User type:

• \_id

• username

• email

• bookCount

• savedBooks (This will be an array of the Book type.)

• Book type:

• bookId (Not the _id, but the book's id value returned from Google's Book API.)

• authors (An array of strings, as there may be more than one author.)

• description

• title

• image

• link

• Auth type:

• token

• user (References the User type.)

## Front-End Specifications

You'll need to create the following front-end files:

• queries.js: This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

• mutations.js:

• LOGIN_USER will execute the loginUser mutation set up using Apollo Server.

• ADD_USER will execute the addUser mutation.

• SAVE_BOOK will execute the saveBook mutation.

• REMOVE_BOOK will execute the removeBook mutation.

Additionally, you’ll need to complete the following tasks in each of these front-end files:

• App.js: Create an Apollo Provider to make every request work with the Apollo server.

• SearchBooks.js:

• Use the Apollo useMutation() Hook to execute the SAVE_BOOK mutation in the handleSaveBook() function instead of the saveBook() function imported from the API file.

• Make sure you keep the logic for saving the book's ID to state in the try...catch block!

• SavedBooks.js:

• Remove the useEffect() Hook that sets the state for UserData.

• Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.

• Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function that's imported from API file. (Make sure you keep the removeBookId() function in place!)

• SignupForm.js: Replace the addUser() functionality imported from the API file with the ADD_USER mutation functionality.

• LoginForm.js: Replace the loginUser() functionality imported from the API file with the LOGIN_USER mutation functionality.

## User Story

AS AN avid reader I WANT to search for new books to read SO THAT I can keep a list of books to purchase

## Acceptance Criteria

GIVEN a book search engine

WHEN I load the search engine

THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button

WHEN I click on the Search for Books menu option

THEN I am presented with an input field to search for books and a submit button

WHEN I am not logged in and enter a search term in the input field and click the submit button

THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site

WHEN I click on the Login/Signup menu option

THEN a modal appears on the screen with a toggle between the option to log in or sign up

WHEN the toggle is set to Signup

THEN I am presented with three inputs for a username, an email address, and a password, and a signup button

WHEN the toggle is set to Login

THEN I am presented with two inputs for an email address and a password and login button

WHEN I enter a valid email address and create a password and click on the signup button

THEN my user account is created and I am logged in to the site

WHEN I enter my account’s email address and password and click on the login button

THEN I the modal closes and I am logged in to the site

WHEN I am logged in to the site

THEN the menu options change to Search for Books, an option to see my saved books, and Logout

WHEN I am logged in and enter a search term in the input field and click the submit button

THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account

WHEN I click on the Save button on a book

THEN that book’s information is saved to my account

WHEN I click on the option to see my saved books

THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account

WHEN I click on the Remove button on a book

THEN that book is deleted from my saved books list

WHEN I click on the Logout button

THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
