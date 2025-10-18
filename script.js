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
    // Show initial content (Logos page)
    showLogosContent();
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
            contentHeader.textContent = '';
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
    let logosContent = mainContent.querySelector('.logos-content');
    
    if (!logosContent) {
        logosContent = document.createElement('div');
        logosContent.className = 'logos-content';
        mainContent.appendChild(logosContent);
    }
    
    // Always clear existing content and start fresh with only plus button
    logosContent.innerHTML = '';
    
    // Create and add the plus button
    const addButton = document.createElement('button');
    addButton.className = 'add-component-btn';
    addButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;
    addButton.addEventListener('click', showAddComponentModal);
    logosContent.appendChild(addButton);
    
    logosContent.style.display = 'block';
}

// Show modal for adding new component
function showAddComponentModal() {
    const modal = document.createElement('div');
    modal.className = 'add-component-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>Add New Logo Variant</h3>
                <div class="form-group">
                    <label for="componentTitle">Component Title:</label>
                    <input type="text" id="componentTitle" placeholder="e.g., Main Logo, App Icons, Social Media" />
                </div>
                <div class="form-group">
                    <label for="variant1Name">First Variant Name:</label>
                    <input type="text" id="variant1Name" placeholder="e.g., Primary, Light, Square" />
                </div>
                <div class="form-group">
                    <label for="variant2Name">Second Variant Name:</label>
                    <input type="text" id="variant2Name" placeholder="e.g., Secondary, Dark, Circle" />
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel">Cancel</button>
                    <button class="btn-add">Add Component</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus on first input
    modal.querySelector('#componentTitle').focus();
    
    // Event listeners
    modal.querySelector('.btn-cancel').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.btn-add').addEventListener('click', () => {
        const title = modal.querySelector('#componentTitle').value.trim();
        const variant1 = modal.querySelector('#variant1Name').value.trim();
        const variant2 = modal.querySelector('#variant2Name').value.trim();
        
        if (title && variant1 && variant2) {
            addLogoVariantComponent(title, variant1, variant2);
            document.body.removeChild(modal);
        } else {
            alert('Please fill in all fields');
        }
    });
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            document.body.removeChild(modal);
        }
    });
}

// Add new logo variant component
function addLogoVariantComponent(title, variant1, variant2) {
    const logosContent = document.querySelector('.logos-content');
    const addButton = logosContent.querySelector('.add-component-btn');
    
    const newComponent = document.createElement('div');
    newComponent.innerHTML = createLogoVariant(title, variant1, variant2);
    
    // Insert before the add button
    logosContent.insertBefore(newComponent, addButton);
    
    // Re-initialize download buttons for the new component
    const newDownloadBtns = newComponent.querySelectorAll('.download-btn');
    newDownloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.textContent.includes('PNG') ? 'PNG' : 'SVG';
            handleDownload(format);
        });
    });
    
    // Initialize upload functionality for the new component
    initializeUploadAreas(newComponent);
}

// Initialize upload areas for a component
function initializeUploadAreas(component) {
    const uploadAreas = component.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        area.addEventListener('click', function() {
            const variant = this.getAttribute('data-variant');
            showUploadModal(variant, this);
        });
    });
}

// Show upload modal
function showUploadModal(variant, uploadArea) {
    const modal = document.createElement('div');
    modal.className = 'upload-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>Upload Image - Variant ${variant}</h3>
                <div class="upload-options">
                    <div class="upload-option">
                        <label for="fileInput" class="upload-file-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                                <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
                                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
                                <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            Upload from Computer
                        </label>
                        <input type="file" id="fileInput" accept="image/*" style="display: none;">
                    </div>
                    <div class="upload-divider">
                        <span>OR</span>
                    </div>
                    <div class="upload-option">
                        <label for="urlInput">Paste Image URL:</label>
                        <input type="url" id="urlInput" placeholder="https://example.com/image.png">
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel">Cancel</button>
                    <button class="btn-upload" disabled>Upload</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const fileInput = modal.querySelector('#fileInput');
    const urlInput = modal.querySelector('#urlInput');
    const uploadBtn = modal.querySelector('.btn-upload');
    const cancelBtn = modal.querySelector('.btn-cancel');
    
    // File input change handler
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            urlInput.value = '';
            uploadBtn.disabled = false;
        }
    });
    
    // URL input change handler
    urlInput.addEventListener('input', function() {
        if (this.value.trim()) {
            fileInput.value = '';
            uploadBtn.disabled = false;
        } else {
            uploadBtn.disabled = true;
        }
    });
    
    // Upload button handler
    uploadBtn.addEventListener('click', function() {
        if (fileInput.files[0]) {
            handleFileUpload(fileInput.files[0], uploadArea);
        } else if (urlInput.value.trim()) {
            handleUrlUpload(urlInput.value.trim(), uploadArea);
        }
        document.body.removeChild(modal);
    });
    
    // Cancel button handler
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            document.body.removeChild(modal);
        }
    });
}

// Handle file upload
function handleFileUpload(file, uploadArea) {
    const reader = new FileReader();
    reader.onload = function(e) {
        displayUploadedImage(e.target.result, uploadArea);
    };
    reader.readAsDataURL(file);
}

// Handle URL upload
function handleUrlUpload(url, uploadArea) {
    // Create a new image to test if URL is valid
    const img = new Image();
    img.onload = function() {
        displayUploadedImage(url, uploadArea);
    };
    img.onerror = function() {
        alert('Invalid image URL. Please check the link and try again.');
    };
    img.src = url;
}

// Display uploaded image
function displayUploadedImage(imageSrc, uploadArea) {
    const uploadIcon = uploadArea.querySelector('.upload-icon');
    const uploadedImage = uploadArea.querySelector('.uploaded-image');
    
    // Hide upload icon and show uploaded image
    uploadIcon.style.display = 'none';
    uploadedImage.style.display = 'block';
    uploadedImage.innerHTML = `<img src="${imageSrc}" alt="Uploaded logo" style="width: 100%; height: 100%; object-fit: contain;">`;
    
    // Add hover effect to show upload icon again
    uploadArea.addEventListener('mouseenter', function() {
        uploadIcon.style.display = 'flex';
        uploadedImage.style.opacity = '0.7';
    });
    
    uploadArea.addEventListener('mouseleave', function() {
        uploadIcon.style.display = 'none';
        uploadedImage.style.opacity = '1';
    });
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

// Logo Variant Component
function createLogoVariant(title, variant1Name, variant2Name) {
    return `
        <div class="logo-variant-component">
            <h2 class="variant-title">${title}</h2>
            <div class="variant-cards">
                <div class="variant-card">
                    <div class="upload-area" data-variant="1">
                        <div class="upload-icon">
                            <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                        </div>
                        <div class="uploaded-image" style="display: none;"></div>
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
                    <div class="variant-label">${variant1Name}</div>
                </div>
                <div class="variant-card">
                    <div class="upload-area" data-variant="2">
                        <div class="upload-icon">
                            <img src="http://localhost:3845/assets/d779e3da5fc195460b43359535871eeca60108f5.svg" alt="Upload" width="40" height="40">
                        </div>
                        <div class="uploaded-image" style="display: none;"></div>
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
                    <div class="variant-label">${variant2Name}</div>
                </div>
            </div>
        </div>
    `;
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
