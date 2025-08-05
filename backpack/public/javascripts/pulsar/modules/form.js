export default class Form {

    #formElements;
    #loadingInnerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>';

    static reset(formElement) {
        formElement.removeAttribute("data-zf-submitting");
    }

    constructor(loadingLabel) {
        this.#formElements = document.querySelectorAll('form');
        this.#loadingInnerHTML += " " + loadingLabel;
    }

    preventDoubleSubmission() {
        this.#formElements.forEach(form => {
            const submitButtons = form.querySelectorAll('button[type="submit"]');
            form.addEventListener('submit', (event) => this.#onSubmit(event, submitButtons, form));
            form.addEventListener('keypress', (event) => this.#onKeyPress(event, form));
        });
    }

    autoResizeTextarea() {
        document.addEventListener("DOMContentLoaded", function () {
            const textareas = document.querySelectorAll("textarea.zf-auto-resize");
            textareas.forEach(textarea => {
                const adjustHeight = () => {
                    if (textarea.value !== "") {
                        textarea.style.height = "auto";
                        textarea.style.height = textarea.scrollHeight + "px";
                    }
                };
                adjustHeight();
                textarea.addEventListener("input", adjustHeight);
            });
        });
    }

    #onSubmit(event, submitButtons, form) {
        // If the form is already being submitted, prevent the submission
        if (this.#isFormSubmitting(form)) {
            event.preventDefault();
            return;
        }

        // Set the flag to indicate that the form is being submitted
        form.setAttribute("data-zf-submitting", true);

        // Disable the submit button(s)
        submitButtons.forEach(button => {
            button.setAttribute("data-zf-temporary", button.innerHTML);
            button.innerHTML = this.#loadingInnerHTML;
            button.disabled = true;
        });
    }

    #onKeyPress(event, form) {
        // If the key pressed is Enter and the form is being submitted, prevent the submission
        if (event.key === 'Enter' && this.#isFormSubmitting(form)) {
            event.preventDefault();
            return;
        }
    }

    #isFormSubmitting(formElement) {
        return formElement.getAttribute("data-zf-submitting") || false;
    }
};
