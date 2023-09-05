window.addEventListener('load', function () {
    // If the URL path is /signup, fetchUsernames and checkPasswords
    if (window.location.pathname === '/signup') {
        fetchUsernames();
        checkPasswords();
    }

    // Fetch a JSON of usernames already registered
    // Then initialize the checkUniqueness function with allUsers passed through
    async function fetchUsernames() {
        const response = await fetch('/retrieveAllUsers');
        const allUsers = await response.json();
        checkUniqueness(allUsers);
    }

    // On each keypress, loop through the list of usernames retrieved and check uniqueness
    function checkUniqueness(allUsers) {
        const enteredUsername = document.querySelector('input[name="username"]');
        const displayError = document.querySelector('#displayError');

        enteredUsername.addEventListener('keyup', function () {
            const enteredValue = enteredUsername.value.toLowerCase();
            const isUnique = allUsers.every(user => user.username.toLowerCase() !== enteredValue);

            if (!isUnique) {
                displayError.innerHTML = ' - Not unique';
            } else {
                displayError.innerHTML = '';
            }
        });
    }

    function checkPasswords() {
        const firstPassword = document.querySelector('input[name="password"]');
        const secondPassword = document.querySelector('input[name="repeatPassword"]');

        secondPassword.addEventListener('keyup', function () {
            // If values are entered in both password fields, then compare the passwords
            if (firstPassword.value.length !== 0 && secondPassword.value.length > 0) {
                comparePasswordFields();
            }
        });
    }

    function comparePasswordFields() {
        const firstPassword = document.querySelector('input[name="password"]');
        const secondPassword = document.querySelector('input[name="repeatPassword"]');
        const passwordError = document.querySelector('#passwordError');
        const registerBtn = document.querySelector('.registerbtn');

        // Check if both fields are empty or if the passwords match
        if ((firstPassword.value === '' && secondPassword.value === '') || firstPassword.value === secondPassword.value) {
            passwordError.innerHTML = '';
            registerBtn.disabled = false;
        } else {
            passwordError.innerHTML = ' - Passwords do not match!';
            registerBtn.disabled = true;
        }
    }

});
