// Simulated user credentials (in a real app, this would be handled securely on the server)
const validCredentials = {
    username: 'admin',
    password: '1234'
};

// DOM elements
const loginOverlay = document.getElementById('login-overlay');
const loginForm = document.getElementById('login-form');
const signOutBtn = document.getElementById('sign-out-btn');

// Check if user is already logged in
function checkLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Show or hide login overlay based on login status
function updateView() {
    if (checkLoggedIn()) {
        loginOverlay.style.display = 'none';
        signOutBtn.style.display = 'block';
        initializeDashboard();
    } else {
        loginOverlay.style.display = 'flex';
        signOutBtn.style.display = 'none';
    }
}

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validCredentials.username && password === validCredentials.password) {
        localStorage.setItem('isLoggedIn', 'true');
        updateView();
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Handle sign-out
signOutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    updateView();
});

// Simulated IoT devices
const devices = {
    'living-room-light': { status: false, brightness: 50 },
    'bedroom-light': { status: false, brightness: 50 },
    'thermostat': { currentTemp: 72, setTemp: 72 },
    'camera': { status: true }
};

// Update device status
function updateDevice(deviceId, property, value) {
    devices[deviceId][property] = value;
    console.log(`${deviceId} ${property} updated to ${value}`);
}

// Initialize dashboard
function initializeDashboard() {
    // Toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const deviceId = btn.dataset.device;
            devices[deviceId].status = !devices[deviceId].status;
            btn.textContent = devices[deviceId].status ? 'On' : 'Off';
            btn.style.backgroundColor = devices[deviceId].status ? '#4CAF50' : '#f44336';
        });
    });

    // Brightness sliders
    document.querySelectorAll('.slider').forEach(slider => {
        slider.addEventListener('input', () => {
            const deviceId = slider.dataset.device;
            updateDevice(deviceId, 'brightness', slider.value);
        });
    });

    // Thermostat
    const currentTempDisplay = document.getElementById('current-temp');
    const setTempInput = document.getElementById('set-temp');
    const setTempBtn = document.getElementById('set-temp-btn');

    setTempBtn.addEventListener('click', () => {
        const newTemp = parseInt(setTempInput.value);
        if (newTemp >= 60 && newTemp <= 85) {
            updateDevice('thermostat', 'setTemp', newTemp);
            simulateThermostat();
        }
    });

    function simulateThermostat() {
        const currentTemp = devices.thermostat.currentTemp;
        const setTemp = devices.thermostat.setTemp;
        
        if (currentTemp < setTemp) {
            devices.thermostat.currentTemp++;
        } else if (currentTemp > setTemp) {
            devices.thermostat.currentTemp--;
        }
        
        currentTempDisplay.textContent = `${devices.thermostat.currentTemp}°F`;
        
        if (currentTemp !== setTemp) {
            setTimeout(simulateThermostat, 1000);
        }
    }

    // Security Camera
    const cameraFeed = document.getElementById('camera-feed');
    const toggleCamera = document.getElementById('toggle-camera');

    toggleCamera.addEventListener('click', () => {
        devices.camera.status = !devices.camera.status;
        cameraFeed.style.opacity = devices.camera.status ? '1' : '0.2';
        toggleCamera.textContent = devices.camera.status ? 'Turn Off Camera' : 'Turn On Camera';
    });

    // Initial simulation
    simulateThermostat();
}

// Initialize the view
updateView();