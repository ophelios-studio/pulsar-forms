export default class Password {

    #passwordFieldId;
    #passwordField;
    #passwordStrengthIndicator;

    constructor(passwordFieldId) {
        this.#passwordFieldId = passwordFieldId;
        this.#passwordField = document.getElementById(passwordFieldId);
    }

    enableStrengthIndicator() {
        this.#passwordStrengthIndicator = document.querySelector(".zf-password-strength[for='" + this.#passwordFieldId + "']");
        if (this.#passwordStrengthIndicator !== null) {
            this.#passwordField.addEventListener('input', () => {
                this.#updatePasswordStrengthIndicator();
            });
        }
    }

    enableVisibilityToggle() {
        const toggleButton = document.querySelector("#" + this.#passwordFieldId + " + span .zf-password-toggle");
        if (toggleButton !== null) {
            const toggleIcon = toggleButton.querySelector("i");
            toggleButton.addEventListener('click', () => {
                const type = this.#passwordField.getAttribute('type');
                if (type === 'text') {
                    this.#passwordField.setAttribute('type', 'password');
                    toggleIcon.classList.remove("bi-eye");
                    toggleIcon.classList.add("bi-eye-slash");
                } else {
                    this.#passwordField.setAttribute('type', 'text');
                    toggleIcon.classList.remove("bi-eye-slash");
                    toggleIcon.classList.add("bi-eye");
                }
            });
        }
    }

    #updatePasswordStrengthIndicator() {
        const password = this.#passwordField.value;
        const progressBar = this.#passwordStrengthIndicator.querySelector(".progress-bar");
        const passwordLength = password.length;

        // Calculate password strength score based on regex checks
        let passwordStrength = 0;
        if (password.match(/[a-z]/)) {
            passwordStrength += 1;
        }
        if (password.match(/[A-Z]/)) {
            passwordStrength += 1;
        }
        if (password.match(/[0-9]/)) {
            passwordStrength += 1;
        }
        if (password.match(/[^a-zA-Z0-9]/)) {
            passwordStrength += 1;
        }
        if (passwordLength >= 8 && passwordStrength >= 3) {
            passwordStrength += 1;
        }
        if (passwordLength >= 12 && passwordStrength >= 4) {
            passwordStrength += 1;
        }
        if (passwordLength >= 16 && passwordStrength >= 5) {
            passwordStrength += 1;
        }

        // Update the password strength indicator
        let strengthClass = '';
        if (passwordStrength <= 1) {
            strengthClass = 'bg-danger';
        } else if (passwordStrength <= 3) {
            strengthClass = 'bg-warning';
        } else if (passwordStrength <= 5) {
            strengthClass = 'bg-primary';
        } else {
            strengthClass = 'bg-success';
        }

        const progressPercent = (passwordStrength / 6) * 100;
        progressBar.classList.remove('bg-danger', 'bg-warning', 'bg-primary', 'bg-success');
        progressBar.classList.add(strengthClass);
        progressBar.style.width = progressPercent + "%";
    }
}
