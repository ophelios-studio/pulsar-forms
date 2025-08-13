export default class PinCode {

    #inputsParents;
    #inputs;

    constructor(name) {
        this.#inputsParents = document.querySelectorAll(".zf-form-control-pins");
        this.#inputs = document.querySelectorAll('input[name="' + name + '"]');
    }

    initialize() {
        document.addEventListener('DOMContentLoaded', () => {
            this.#inputsParents.forEach((input, index) => {
                this.#setAttributes(input);
            });

            this.#inputs.forEach((input, index) => {
                this.#inputListener(input, index);
                this.#inputKeydown(input, index);
                this.#inputPaste(input, index);
            });
        });
    }

    #setAttributes(input) {
        // Set data-attr to be available in the CSS to adjust the content based on the passed pin count
        const pinCount = input.getAttribute('data-pin-count');
        if (pinCount) {
            input.style.setProperty('--pin-count', pinCount);
        }
    }

    #inputListener(input, index) {
        input.addEventListener('input', (event) => {
            const value = event.target.value;
            const nextIndex = index + 1;
            const prevIndex = index - 1;

            // If there's a value and there's another input
            if (value && this.#inputs[nextIndex]) {
                this.#inputs[nextIndex].focus(); // Move focus to the next input
            } else if (!value && this.#inputs[prevIndex]) {
                this.#inputs[prevIndex].focus(); // Move focus to the previous input
            }
        });
    }

    #inputKeydown(input, index) {
        input.addEventListener('keydown', (event) => {
            const keyCode = event.keyCode || event.which;
            const prevIndex = index - 1;

            // Allow 'Enter' to submit the form
            if (keyCode === 13) {
                return false;
            }

            if (!(keyCode >= 48 && keyCode <= 57 || keyCode === 8 || ((event.ctrlKey || event.metaKey) && keyCode === 86))) {
                event.preventDefault();
                return false;
            }

            if (keyCode === 8 && this.#inputs[prevIndex]) {
                if (this.#inputs[index].value !== "") {
                    return true;
                }
                this.#inputs[prevIndex].value = "";
                this.#inputs[prevIndex].focus(); // Move focus to the previous input
            }
        });
    }

    #inputPaste(input, index) {
        input.addEventListener('paste', (event) => {
            event.preventDefault(); // Prevent the default paste behavior

            const pasteData = event.clipboardData.getData('text');
            const filteredData = pasteData.replace(/[^0-9]/g, '');
            const pasteValues = filteredData.split('');

            console.log(pasteValues);

            // Loop through the paste values and fill each input
            pasteValues.forEach((value, pasteIndex) => {
                const inputIndex = index + pasteIndex;

                if (this.#inputs[inputIndex] && value) {
                    this.#inputs[inputIndex].value = value;
                    this.#inputs[inputIndex].focus();

                    // Move focus to the next input if there's another input
                    if (this.#inputs[inputIndex + 1]) {
                        this.#inputs[inputIndex + 1].focus();
                    }
                }
            });
        });
    }
}
