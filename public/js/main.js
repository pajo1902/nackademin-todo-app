const submitButton = document.getElementById('submitButton')
const apiPath = 'http://localhost:3001';

submitButton.addEventListener('click', async e => {
    e.preventDefault();

    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    console.log(user)
    fetch(`${apiPath}/users/auth/login`, 
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.message === 'Success') {
                window.location.href = '/dashboard.html'
            }
            console.log(res)
        })
})