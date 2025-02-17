document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    const progressFill = document.querySelector('.progress-fill');
    const confirmPassword = document.getElementById('confirm-password');

    // Password toggle functionality
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.setAttribute('aria-pressed', type === 'text');
        
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

    // Password requirements checker
    const requirements = {
        length: str => str.length >= 8,
        uppercase: str => /[A-Z]/.test(str),
        number: str => /[0-9]/.test(str),
        special: str => /[^A-Za-z0-9]/.test(str)
    };

    function updateRequirements(password) {
        let metCount = 0;
        Object.entries(requirements).forEach(([requirement, validateFn]) => {
            const element = document.querySelector(`[data-requirement="${requirement}"]`);
            const isMet = validateFn(password);
            element.classList.toggle('met', isMet);
            if (isMet) metCount++;
        });
        return metCount;
    }

    // Progress indicator
    function updateProgress() {
        const fields = ['name', 'email', 'password'];
        const totalFields = fields.length;
        let filledFields = 0;

        fields.forEach(fieldId => {
            const value = document.getElementById(fieldId).value;
            if (value) filledFields++;
        });

        const passwordScore = updateRequirements(passwordInput.value) / 4;
        const progress = ((filledFields / totalFields) * 100) * 0.6 + (passwordScore * 100 * 0.4);
        
        progressFill.style.width = `${progress}%`;
        progressFill.parentElement.setAttribute('aria-valuenow', Math.round(progress));
    }

    // Add input event listeners
    ['name', 'email', 'password'].forEach(fieldId => {
        const input = document.getElementById(fieldId);
        input.addEventListener('input', updateProgress);
        
        // Micro-interactions
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = passwordInput;
        
        let isValid = true;
        
        // Validate each field
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        if (!email.value || !email.value.includes('@')) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        const passwordMetRequirements = Object.values(requirements)
            .every(requirement => requirement(password.value));
            
        if (!passwordMetRequirements) {
            showError(password, 'Please meet all password requirements');
            isValid = false;
        }
        
        if (isValid) {
            const successMessage = document.querySelector('.success-message');
            successMessage.style.display = 'block';
            successMessage.setAttribute('role', 'alert');
            form.reset();
            progressFill.style.width = '0';
            updateRequirements('');
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
         //? Compare Password
         if(confirmPassword.value !== passwordInput.value){
            alert(confirmPassword, 'Password does not match');
        }
    });

    function showError(field, message) {
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
       
        // Add shake animation
        field.classList.add('shake');
        field.addEventListener('animationend', () => {
            field.classList.remove('shake');
        });
        
        field.setAttribute('aria-invalid', 'true');
        
        // Remove error on input
        field.addEventListener('input', function() {
            errorElement.style.display = 'none';
            field.setAttribute('aria-invalid', 'false');
        }, { once: true });
    }
});