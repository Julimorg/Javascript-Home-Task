document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let isValid = true;

    // Reset error messages
    document.querySelectorAll(".error-message").forEach(e => e.textContent = "");
    document.querySelectorAll("input").forEach(input => input.classList.remove("error"));
    document.getElementById("successMessage").textContent = "";

    // Get input values
    let fullName = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Full Name Validation
    if (fullName === "") {
        document.getElementById("nameError").textContent = "Full Name is required.";
        document.getElementById("fullName").classList.add("error");
        isValid = false;
    }

    // Email Validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email address.";
        document.getElementById("email").classList.add("error");
        isValid = false;
    }

    // Password Validation
    let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters and include an uppercase letter, a number, and a special character.";
        document.getElementById("password").classList.add("error");
        isValid = false;
    }

    // Confirm Password Validation
    if (confirmPassword !== password) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        document.getElementById("confirmPassword").classList.add("error");
        isValid = false;
    }

    // Show success message if all fields are valid
    if (isValid) {
        document.getElementById("successMessage").textContent = "Sign-up successful!";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Password toggle functionality
    passwordToggle.addEventListener('click', function() {
        console.log('clicked');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        confirmPasswordInput.setAttribute('type', type);

        const eyeOpenIcon = this.querySelector('.eyeopen');
        const eyeCloseIcon = this.querySelector('.eyeclose');

        if (type === 'text') {
            eyeOpenIcon.style.display = 'none';
            eyeCloseIcon.style.display = 'inline';
        } else {
            eyeOpenIcon.style.display = 'inline';
            eyeCloseIcon.style.display = 'none';
        }
    });
});