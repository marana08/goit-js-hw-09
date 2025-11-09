const formData = {
    email: '',
    message: '',
};

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
    try {
        const parsedData = JSON.parse(savedData);
        formData.email = parsedData.email || '';
        formData.message = parsedData.message || '';

        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
    } catch (error) {
        console.error('Помилка читання даних із localStorage:', error);
    }
}

form.addEventListener('input', event => {
    const { name, value } = event.target;

    formData[name] = value.trimStart();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
    event.preventDefault();

    const { email, message } = formData;

    if (email.trim() === '' || message.trim() === '') {
        alert('Fill please all fields');
        return;
    }

    console.log(formData);

    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData.email = '';
    formData.message = '';
});
