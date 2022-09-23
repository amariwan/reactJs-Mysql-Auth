/**
 * It checks if the email is valid or not
 * @param email - The email address to validate.
 * @returns A function that takes an email as an argument and returns true or false.
 */
let isEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email != null) {
        if (re.test(email)) {
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
            return true;
        }
    }
    // invalid email, maybe show an error to the user.
    return false;
};

/**
 * It checks if the username is valid or not
 * @param username - The username to check.
 * @returns A function that takes in a username and returns a boolean.
 */
let checkUsername = (username) => {
    let re = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
    if (username != null) {
        if (re.test(username)) {
            // this is a valid username
            // call setState({username: username}) to update the username
            // or update the data in redux store.
            return true;
        }
    }
    // invalid username, maybe show an error to the user.
    return false
};

module.exports = {
    isEmail,
    checkUsername
};