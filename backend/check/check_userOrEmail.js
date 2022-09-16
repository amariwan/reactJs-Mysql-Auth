/**
 * It checks if the email is valid or not
 * @param email - The email address to validate.
 * @returns A function that takes an email as an argument and returns true or false.
 */
const isEmail = (email) => {
	// don't remember from where i copied this code, but this works.
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email)) {
		// this is a valid email address
		// call setState({email: email}) to update the email
		// or update the data in redux store.
		return true;
	} else {
		// invalid email, maybe show an error to the user.
		return false;
	}
};

/**
 * It checks if the username is valid or not
 * @param username - The username to check.
 * @returns A function that takes in a username and returns a boolean.
 */
const checkUsername = (username) => {
	// don't remember from where i copied this code, but this works.
	let re = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
	if (re.test(username)) {
		// this is a valid username
		// call setState({username: username}) to update the username
		// or update the data in redux store.
		return true;
	} else {
		// invalid username, maybe show an error to the user.
		return false;
	}
};

module.exports = {
	checkUsername,
	isEmail
};