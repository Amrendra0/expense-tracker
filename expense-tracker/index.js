let currentUser = null;

function showRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showDashboard();
    } else {
        alert('Invalid email or password');
    }
}

function register() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        alert('User already exists');
        return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful, please login');
    showLogin();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLogin();
}

function showDashboard() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadExpenses();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
        currentUser = savedUser;
        showDashboard();
    }
});