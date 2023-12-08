# EployeePolls

This project is an application that allows users to create, vote, and see the results of "Would You Rather" questions.

### Setup

Clone the repository
Navigate to the root directory (contains src child directory)
Run `npm i`

### Running the app

Navigate to the root directory.
Run `npm start`

### Notes

1.  The backend is not a database so doesn't persist new polls.   So voting on new polls results in an error as they exist
in the redux store but not in the back end.

2.  There is a secret 'reset' button for testing purposes.   It logs the user out and resets the redux data slices.

3.  Updates are NOT opportunistic by design.