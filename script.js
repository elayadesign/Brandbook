// User credentials (in a real app, these would be stored securely on a server)
const users = {
    'admin': {
        password: 'admin123',
        role: 'admin',
        name: 'Administrator'
    },
    'user': {
        password: 'user123',
        role: 'user',
        name: 'Regular User'
    },
    'guest': {
        password: 'guest123',
        role: 'user',
        name: 'Guest User'
    }
};

// Current user session
let currentUser = null;

// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const mainContent = document.getElementById('mainContent');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');
const adminPanel = document.getElementById('adminPanel');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainContent();
    }

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
});

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Clear previous error messages
    hideError();
    
    // Validate credentials
    if (users[username] && users[username].password === password) {
        currentUser = {
            username: username,
            name: users[username].name,
            role: users[username].role
        };
        
        // Save user session
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Show loading state
        showLoading();
        
        // Simulate login delay
        setTimeout(() => {
            showMainContent();
        }, 1000);
        
    } else {
        showError('Invalid username or password. Please try again.');
    }
}

// Handle logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLoginForm();
}

// Show main content after successful login
function showMainContent() {
    loginContainer.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Update welcome message
    welcomeUser.textContent = `Welcome, ${currentUser.name}!`;
    
    // Show admin panel if user is admin
    if (currentUser.role === 'admin') {
        adminPanel.style.display = 'block';
    } else {
        adminPanel.style.display = 'none';
    }
}

// Show login form
function showLoginForm() {
    loginContainer.style.display = 'block';
    mainContent.style.display = 'none';
    
    // Clear form
    loginForm.reset();
    hideError();
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Show loading state
function showLoading() {
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.textContent;
    loginBtn.innerHTML = '<div class="loading"></div> Logging in...';
    loginBtn.disabled = true;
    
    // Reset button after delay
    setTimeout(() => {
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }, 1000);
}

// Admin functions
function manageUsers() {
    alert('User Management Panel\n\nThis would typically show:\n- List of all users\n- Add/Edit/Delete users\n- Reset passwords\n- Manage permissions');
}

function viewAnalytics() {
    alert('Analytics Dashboard\n\nThis would typically show:\n- Login statistics\n- User activity\n- System usage\n- Performance metrics');
}

function systemSettings() {
    alert('System Settings\n\nThis would typically show:\n- Security settings\n- Password policies\n- System configuration\n- Backup settings');
}

// Security features
function checkSession() {
    // Check if session is still valid (in a real app, this would check with server)
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
        showLoginForm();
        return false;
    }
    return true;
}

// Auto-logout after inactivity (optional)
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (currentUser) {
            alert('Session expired due to inactivity. Please log in again.');
            handleLogout();
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Reset timer on user activity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);

// Initialize inactivity timer
resetInactivityTimer();

// Prevent right-click and F12 (basic security)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+U
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
    }
});

// Console warning
console.log('%cStop!', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is a scam and will give them access to your account.', 'color: red; font-size: 16px;');
