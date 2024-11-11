document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerBtnContainer = document.getElementById('registerBtnContainer');
    const loginBtnContainer = document.getElementById('loginBtnContainer');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutBtn = document.getElementById('logout');

    // Verificar si el usuario está logueado
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        updateUIForLoggedInUser(loggedInUser);
    }

    // Manejar el registro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.username === username)) {
            alert('El usuario ya existe.');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso');
            $('#registerModal').modal('hide');
        }
    });

    // Manejar el inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', username);
            alert('Inicio de sesión exitoso');
            $('#loginModal').modal('hide');
            updateUIForLoggedInUser(username);
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    // Función para actualizar la interfaz
    function updateUIForLoggedInUser(username) {
        registerBtnContainer.classList.add('d-none');
        loginBtnContainer.classList.add('d-none');
        userMenu.classList.remove('d-none');
        usernameDisplay.textContent = username;
    }

    // Manejar el cierre de sesión
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        alert('Has cerrado sesión');
        location.reload();
    });
});
