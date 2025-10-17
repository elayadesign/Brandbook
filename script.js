// Brand Book Navigation and Functionality
let currentSection = 'logos';

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const downloadBtns = document.querySelectorAll('.download-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDownloadButtons();
    initializeMobileMenu();
});

// Initialize navigation functionality
function initializeNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get section name from the text content
            const sectionName = this.querySelector('span').textContent.toLowerCase();
            currentSection = sectionName;
            
            // Update content based on selected section
            updateContent(sectionName);
        });
    });
}

// Initialize download button functionality
function initializeDownloadButtons() {
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.textContent.includes('PNG') ? 'PNG' : 'SVG';
            handleDownload(format);
        });
    });
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    // Add mobile menu toggle if needed
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add mobile menu toggle button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background: #4A4458;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
        `;
        
        document.body.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
        });
    }
}

// Update content based on selected section
function updateContent(section) {
    const contentHeader = document.querySelector('.content-header h1');
    const mainContent = document.querySelector('.main-content');
    
    // Hide all existing content sections
    const existingSections = mainContent.querySelectorAll('.content-section, .logo-sections, .typography-content, .color-content, .app-social-content, .profile-content, .imagery-content, .marketing-content, .swags-content');
    existingSections.forEach(section => section.style.display = 'none');
    
    switch(section) {
        case 'logos':
            contentHeader.textContent = 'Main Logo';
            showLogosContent();
            break;
        case 'app / social profile':
            contentHeader.textContent = 'App & Social Profile Assets';
            showAppSocialContent();
            break;
        case 'profile headshots':
            contentHeader.textContent = 'Profile Headshots';
            showProfileContent();
            break;
        case 'typography':
            contentHeader.textContent = 'Typography Guidelines';
            showTypographyContent();
            break;
        case 'color':
            contentHeader.textContent = 'Color Palette';
            showColorContent();
            break;
        case 'imagery':
            contentHeader.textContent = 'Imagery Guidelines';
            showImageryContent();
            break;
        case 'marketing assets':
            contentHeader.textContent = 'Marketing Assets';
            showMarketingContent();
            break;
        case 'swags':
            contentHeader.textContent = 'Swag & Merchandise';
            showSwagsContent();
            break;
        default:
            contentHeader.textContent = 'Brand Book';
            showLogosContent();
    }
}

// Show logos content
function showLogosContent() {
    const mainContent = document.querySelector('.main-content');
    let logosContent = mainContent.querySelector('.logo-sections');
    
    if (!logosContent) {
        logosContent = document.createElement('div');
        logosContent.className = 'logo-sections';
        logosContent.innerHTML = `
            <div class="logo-section-item">
                <div class="upload-area">
                    <div class="upload-icon">
                        <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                    </div>
                </div>
                <div class="download-buttons">
                    <button class="download-btn">
                        <img src="http://localhost:3845/assets/0469ebeaca45b0fd7425a99e3d743795941664bc.svg" alt="Download" width="20" height="20">
                        Download PNG
                    </button>
                    <button class="download-btn">
                        <img src="http://localhost:3845/assets/0469ebeaca45b0fd7425a99e3d743795941664bc.svg" alt="Download" width="20" height="20">
                        Download SVG
                    </button>
                </div>
            </div>
            <div class="logo-section-item">
                <div class="upload-area">
                    <div class="upload-icon">
                        <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                    </div>
                </div>
                <div class="download-buttons">
                    <button class="download-btn">
                        <img src="http://localhost:3845/assets/0469ebeaca45b0fd7425a99e3d743795941664bc.svg" alt="Download" width="20" height="20">
                        Download PNG
                    </button>
                    <button class="download-btn">
                        <img src="http://localhost:3845/assets/0469ebeaca45b0fd7425a99e3d743795941664bc.svg" alt="Download" width="20" height="20">
                        Download SVG
                    </button>
                </div>
            </div>
        `;
        mainContent.appendChild(logosContent);
    }
    
    logosContent.style.display = 'flex';
}

// Show app/social content
function showAppSocialContent() {
    const mainContent = document.querySelector('.main-content');
    let appSocialContent = mainContent.querySelector('.app-social-content');
    
    if (!appSocialContent) {
        appSocialContent = document.createElement('div');
        appSocialContent.className = 'app-social-content';
        appSocialContent.innerHTML = `
            <div class="content-section">
                <h2>App Icons</h2>
                <div class="asset-grid">
                    <div class="asset-item">
                        <div class="upload-area">
                            <div class="upload-icon">
                                <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                            </div>
                        </div>
                        <div class="download-buttons">
                            <button class="download-btn">Download PNG</button>
                            <button class="download-btn">Download SVG</button>
                        </div>
                    </div>
                    <div class="asset-item">
                        <div class="upload-area">
                            <div class="upload-icon">
                                <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                            </div>
                        </div>
                        <div class="download-buttons">
                            <button class="download-btn">Download PNG</button>
                            <button class="download-btn">Download SVG</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-section">
                <h2>Social Media Assets</h2>
                <div class="asset-grid">
                    <div class="asset-item">
                        <div class="upload-area">
                            <div class="upload-icon">
                                <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                            </div>
                        </div>
                        <div class="download-buttons">
                            <button class="download-btn">Download PNG</button>
                            <button class="download-btn">Download SVG</button>
                        </div>
                    </div>
                    <div class="asset-item">
                        <div class="upload-area">
                            <div class="upload-icon">
                                <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                            </div>
                        </div>
                        <div class="download-buttons">
                            <button class="download-btn">Download PNG</button>
                            <button class="download-btn">Download SVG</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        mainContent.appendChild(appSocialContent);
    }
    
    appSocialContent.style.display = 'block';
}

// Show profile content
function showProfileContent() {
    const mainContent = document.querySelector('.main-content');
    let profileContent = mainContent.querySelector('.profile-content');
    
    if (!profileContent) {
        profileContent = document.createElement('div');
        profileContent.className = 'profile-content';
        profileContent.innerHTML = `
            <div class="content-section">
                <h2>Profile Headshots</h2>
                <div class="asset-grid">
                    <div class="asset-item">
                        <div class="upload-area">
                            <div class="upload-icon">
                                <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                            </div>
                        </div>
                        <div class="download-buttons">
                            <button class="download-btn">Download JPG</button>
                            <button class="download-btn">Download PNG</button>
                        </div>
                    </div>
                    <div class="asset-item">
                        <div class="upload-area">
                            <div class="upload-icon">
                                <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                            </div>
                        </div>
                        <div class="download-buttons">
                            <button class="download-btn">Download JPG</button>
                            <button class="download-btn">Download PNG</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        mainContent.appendChild(profileContent);
    }
    
    profileContent.style.display = 'block';
}

// Show typography content
function showTypographyContent() {
    const mainContent = document.querySelector('.main-content');
    let typographyContent = mainContent.querySelector('.typography-content');
    
    if (!typographyContent) {
        typographyContent = document.createElement('div');
        typographyContent.className = 'typography-content';
        typographyContent.innerHTML = `
            <div class="content-section">
                <h2>Font Families</h2>
                <div class="font-examples">
                    <div class="font-example">
                        <h3>Inter</h3>
                        <p style="font-family: 'Inter', sans-serif;">The primary font for headings and UI elements</p>
                    </div>
                    <div class="font-example">
                        <h3>Roboto</h3>
                        <p style="font-family: 'Roboto', sans-serif;">The secondary font for body text and descriptions</p>
                    </div>
                </div>
            </div>
        `;
        mainContent.appendChild(typographyContent);
    }
    
    typographyContent.style.display = 'block';
}

// Show color content
function showColorContent() {
    const mainContent = document.querySelector('.main-content');
    let colorContent = mainContent.querySelector('.color-content');
    
    if (!colorContent) {
        colorContent = document.createElement('div');
        colorContent.className = 'color-content';
        colorContent.innerHTML = `
            <div class="content-section">
                <h2>Brand Colors</h2>
                <div class="color-palette">
                    <div class="color-item">
                        <div class="color-swatch" style="background-color: #4A4458;"></div>
                        <div class="color-info">
                            <h4>Primary</h4>
                            <p>#4A4458</p>
                        </div>
                    </div>
                    <div class="color-item">
                        <div class="color-swatch" style="background-color: #1D1B20;"></div>
                        <div class="color-info">
                            <h4>Text</h4>
                            <p>#1D1B20</p>
                        </div>
                    </div>
                    <div class="color-item">
                        <div class="color-swatch" style="background-color: #49454F;"></div>
                        <div class="color-info">
                            <h4>Secondary</h4>
                            <p>#49454F</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        mainContent.appendChild(colorContent);
    }
    
    colorContent.style.display = 'block';
}

// Handle download functionality
function handleDownload(format) {
    // In a real application, this would trigger actual file downloads
    console.log(`Downloading ${format} file for ${currentSection} section`);
    
    // Show download notification
    showNotification(`Downloading ${format} file...`);
    
    // Simulate download delay
    setTimeout(() => {
        showNotification(`${format} file downloaded successfully!`);
    }, 1000);
}

// Show notification
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4A4458;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .content-section {
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }
    
    .font-examples {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 16px;
    }
    
    .font-example h3 {
        font-size: 18px;
        margin-bottom: 8px;
        color: #1D1B20;
    }
    
    .font-example p {
        font-size: 16px;
        color: #49454F;
        line-height: 1.5;
    }
    
    .color-palette {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 16px;
    }
    
    .color-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
    }
    
    .color-swatch {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        border: 1px solid #E0E0E0;
    }
    
    .color-info h4 {
        font-size: 16px;
        margin-bottom: 4px;
        color: #1D1B20;
    }
    
    .color-info p {
        font-size: 14px;
        color: #49454F;
        font-family: 'Roboto', monospace;
    }
`;
document.head.appendChild(style);
