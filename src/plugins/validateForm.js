export default {
    install(Vue) {
        Vue.prototype.$validateForm = function(element) {
            const inputs = element.querySelectorAll('input');
            let validatedInputs = 0;
            for (let i = 0; i < inputs.length; i++) {
                const currentInput = inputs[i];
                if (currentInput.required && currentInput.value.length > 0) {
                    validatedInputs += 1;
                } else {
                    currentInput.classList.add('error-field');
                    return false
                }
            }
            if (validatedInputs === inputs.length) {
                inputs.forEach(element => {
                    element.classList.remove('error-field');
                })
                return true;
            }
        }
    }
}