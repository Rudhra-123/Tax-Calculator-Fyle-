document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tax-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        const income = document.getElementById('income');
        const extraIncome = document.getElementById('extra-income');
        const age = document.getElementById('age');
        const deductions = document.getElementById('deductions');

        if (isNaN(income.value) || income.value === '') {
            showError(income, 'Please enter a valid income amount.');
        } else {
            hideError(income);
        }

        if (isNaN(extraIncome.value) || extraIncome.value === '') {
            showError(extraIncome, 'Please enter a valid extra income amount.');
        } else {
            hideError(extraIncome);
        }

        if (age.value === '') {
            showError(age, 'Please select an age group.');
        } else {
            hideError(age);
        }

        if (isNaN(deductions.value) || deductions.value === '') {
            showError(deductions, 'Please enter a valid deductions amount.');
        } else {
            hideError(deductions);
        }

        if (!isNaN(income.value) && !isNaN(extraIncome.value) && age.value !== '' && !isNaN(deductions.value)) {
            // Calculate tax deduction
            const totalIncome = parseFloat(income.value) + parseFloat(extraIncome.value);
            const totalDeductions = parseFloat(deductions.value);
            const ageGroup = age.value;

            let tax = 0;
            if (totalIncome - totalDeductions > 800000) {
                switch (ageGroup) {
                    case '<40':
                        tax = 0.3 * (totalIncome - totalDeductions - 800000);
                        break;
                    case '>=40&<60':
                        tax = 0.4 * (totalIncome - totalDeductions - 800000);
                        break;
                    case '>=60':
                        tax = 0.1 * (totalIncome - totalDeductions - 800000);
                        break;
                    default:
                        break;
                }
            }

            // Store results in sessionStorage
            sessionStorage.setItem('totalIncome', `£${totalIncome.toFixed(2)}`);
            sessionStorage.setItem('tax', `£${tax.toFixed(2)}`);

            // Redirect to next page
            window.location.href = 'next-page.html';
        }
    }

    function showError(inputField, errorMessage) {
        inputField.nextElementSibling.style.display = 'inline';
        inputField.nextElementSibling.nextElementSibling.innerText = errorMessage;
        inputField.classList.add('error');
    }

    function hideError(inputField) {
        inputField.nextElementSibling.style.display = 'none';
        inputField.nextElementSibling.nextElementSibling.innerText = '';
        inputField.classList.remove('error');
    }
});
