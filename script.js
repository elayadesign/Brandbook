// Brand Book Navigation and Functionality
let currentSection = 'logos';
let savedData = {
    components: [],
    lastSaved: null
};

// Icon generation functions
function getUploadIcon() {
    return `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="36" rx="8" fill="#E0E0E0" stroke="#CAC4D0" stroke-width="2"/>
        <path d="M20 12v16M12 20h16" stroke="#49454F" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
}

function getDownloadIcon() {
    return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12h14l-7-7-7 7z" fill="#49454F"/>
        <path d="M10 5v10M6 11h8" stroke="#49454F" stroke-width="1" stroke-linecap="round"/>
    </svg>`;
}

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const downloadBtns = document.querySelectorAll('.download-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    initializeNavigation();
    initializeDownloadButtons();
    initializeMobileMenu();
    // Load saved data and wait for it to complete
    await loadSavedData();
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Add</span>
    `;
    addButton.addEventListener('click', showAddComponentDropdown);
    logosContent.appendChild(addButton);
    
    // Restore saved components
    restoreComponents();
    
    // Set up auto-save
    setupAutoSave();
    
    logosContent.style.display = 'block';
}

// Show dropdown for adding new components
function showAddComponentDropdown() {
    const addButton = document.querySelector('.add-component-btn');
    const buttonRect = addButton.getBoundingClientRect();
    
    const dropdown = document.createElement('div');
    dropdown.className = 'add-component-dropdown';
    dropdown.innerHTML = `
        <div class="dropdown-overlay"></div>
        <div class="dropdown-content">
            <div class="dropdown-item" data-type="logo-variant">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M6 6h4v4H6V6z" fill="currentColor"/>
                </svg>
                Logo Variant
            </div>
            <div class="dropdown-item" data-type="do-dont">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Do and Don't
            </div>
            <div class="dropdown-item" data-type="divider">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
                </svg>
                Divider
            </div>
            <div class="dropdown-item" data-type="heading1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2"/>
                </svg>
                Heading 1
            </div>
            <div class="dropdown-item" data-type="heading2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M3 12h12M3 18h8" stroke="currentColor" stroke-width="2"/>
                </svg>
                Heading 2
            </div>
            <div class="dropdown-item" data-type="heading3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M3 12h8M3 18h6" stroke="currentColor" stroke-width="2"/>
                </svg>
                Heading 3
            </div>
        </div>
    `;
    
    document.body.appendChild(dropdown);
    
    // Position the dropdown next to the plus button
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const dropdownRect = dropdownContent.getBoundingClientRect();
    
    // Calculate position - show below the button, centered horizontally
    let top = buttonRect.bottom + 8; // 8px gap below button
    let left = buttonRect.left + (buttonRect.width / 2) - (dropdownRect.width / 2); // Center horizontally
    
    // Ensure dropdown doesn't go off screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust horizontal position if it would go off screen
    if (left < 8) {
        left = 8; // 8px margin from left edge
    } else if (left + dropdownRect.width > viewportWidth - 8) {
        left = viewportWidth - dropdownRect.width - 8; // 8px margin from right edge
    }
    
    // Adjust vertical position if it would go off screen
    if (top + dropdownRect.height > viewportHeight - 8) {
        top = buttonRect.top - dropdownRect.height - 8; // Show above button instead
    }
    
    dropdownContent.style.top = `${top}px`;
    dropdownContent.style.left = `${left}px`;
    
    // Handle dropdown item clicks
    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            document.body.removeChild(dropdown);
            
            switch(type) {
                case 'logo-variant':
                    showAddComponentModal();
                    break;
                case 'do-dont':
                    showAddDoDontModal();
                    break;
                case 'divider':
                    addDivider();
                    break;
                case 'heading1':
                    addHeading(1);
                    break;
                case 'heading2':
                    addHeading(2);
                    break;
                case 'heading3':
                    addHeading(3);
                    break;
            }
        });
    });
    
    // Close dropdown on overlay click
    dropdown.querySelector('.dropdown-overlay').addEventListener('click', () => {
        document.body.removeChild(dropdown);
    });
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
            const format = this.textContent.includes('PNG') ? 'png' : 'svg';
            const variantCard = this.closest('.variant-card');
            const uploadArea = variantCard.querySelector('.upload-area');
            handleLogoDownload(format, uploadArea);
        });
    });
    
    // Initialize upload functionality for the new component
    initializeUploadAreas(newComponent);
    
    // Initialize delete functionality
    initializeDeleteButton(newComponent);
    
    // Save data
    saveData();
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
                <h3>Upload Images - Variant ${variant}</h3>
                <div class="upload-formats">
                    <!-- PNG Upload Section -->
                    <div class="format-section">
                        <h4>PNG Format</h4>
                        <div class="upload-options">
                            <div class="upload-option">
                                <label for="pngFileInput" class="upload-file-btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                                        <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
                                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
                                        <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    Upload PNG from Computer
                                </label>
                                <input type="file" id="pngFileInput" accept=".png,image/png" style="display: none;">
                            </div>
                            <div class="upload-divider">
                                <span>OR</span>
                            </div>
                            <div class="upload-option">
                                <label for="pngUrlInput">Paste PNG URL:</label>
                                <input type="url" id="pngUrlInput" placeholder="https://example.com/image.png">
                            </div>
                        </div>
                    </div>
                    
                    <!-- SVG Upload Section -->
                    <div class="format-section">
                        <h4>SVG Format</h4>
                        <div class="upload-options">
                            <div class="upload-option">
                                <label for="svgFileInput" class="upload-file-btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                                        <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
                                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
                                        <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    Upload SVG from Computer
                                </label>
                                <input type="file" id="svgFileInput" accept=".svg,image/svg+xml" style="display: none;">
                            </div>
                            <div class="upload-divider">
                                <span>OR</span>
                            </div>
                            <div class="upload-option">
                                <label for="svgUrlInput">Paste SVG URL:</label>
                                <input type="url" id="svgUrlInput" placeholder="https://example.com/image.svg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel">Cancel</button>
                    <button class="btn-upload" disabled>Upload Images</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const pngFileInput = modal.querySelector('#pngFileInput');
    const pngUrlInput = modal.querySelector('#pngUrlInput');
    const svgFileInput = modal.querySelector('#svgFileInput');
    const svgUrlInput = modal.querySelector('#svgUrlInput');
    const uploadBtn = modal.querySelector('.btn-upload');
    const cancelBtn = modal.querySelector('.btn-cancel');
    
    // Check if any input has content
    function checkUploadButton() {
        const hasPngFile = pngFileInput.files.length > 0;
        const hasPngUrl = pngUrlInput.value.trim() !== '';
        const hasSvgFile = svgFileInput.files.length > 0;
        const hasSvgUrl = svgUrlInput.value.trim() !== '';
        
        uploadBtn.disabled = !((hasPngFile || hasPngUrl) && (hasSvgFile || hasSvgUrl));
    }
    
    // PNG file input change handler
    pngFileInput.addEventListener('change', function(e) {
        if (e.target.files[0]) {
            pngUrlInput.value = '';
        }
        checkUploadButton();
    });
    
    // PNG URL input change handler
    pngUrlInput.addEventListener('input', function() {
        if (this.value.trim()) {
            pngFileInput.value = '';
        }
        checkUploadButton();
    });
    
    // SVG file input change handler
    svgFileInput.addEventListener('change', function(e) {
        if (e.target.files[0]) {
            svgUrlInput.value = '';
        }
        checkUploadButton();
    });
    
    // SVG URL input change handler
    svgUrlInput.addEventListener('input', function() {
        if (this.value.trim()) {
            svgFileInput.value = '';
        }
        checkUploadButton();
    });
    
    // Upload button handler
    uploadBtn.addEventListener('click', function() {
        const uploads = [];
        
        // Handle PNG upload
        if (pngFileInput.files[0]) {
            uploads.push(handleFileUpload(pngFileInput.files[0], uploadArea, 'png'));
        } else if (pngUrlInput.value.trim()) {
            uploads.push(handleUrlUpload(pngUrlInput.value.trim(), uploadArea, 'png'));
        }
        
        // Handle SVG upload
        if (svgFileInput.files[0]) {
            uploads.push(handleFileUpload(svgFileInput.files[0], uploadArea, 'svg'));
        } else if (svgUrlInput.value.trim()) {
            uploads.push(handleUrlUpload(svgUrlInput.value.trim(), uploadArea, 'svg'));
        }
        
        // Wait for all uploads to complete
        Promise.all(uploads).then(() => {
            document.body.removeChild(modal);
        });
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
function handleFileUpload(file, uploadArea, format) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            storeUploadedImage(e.target.result, uploadArea, format);
            resolve();
        };
        reader.onerror = function() {
            reject('Error reading file');
        };
        reader.readAsDataURL(file);
    });
}

// Handle URL upload
function handleUrlUpload(url, uploadArea, format) {
    return new Promise((resolve, reject) => {
        // Create a new image to test if URL is valid
        const img = new Image();
        img.onload = function() {
            storeUploadedImage(url, uploadArea, format);
            resolve();
        };
        img.onerror = function() {
            alert(`Invalid ${format.toUpperCase()} image URL. Please check the link and try again.`);
            reject('Invalid URL');
        };
        img.src = url;
    });
}

// Store uploaded image data
function storeUploadedImage(imageSrc, uploadArea, format) {
    // Store the image data in the upload area's dataset
    if (!uploadArea.dataset.images) {
        uploadArea.dataset.images = JSON.stringify({});
    }
    
    const images = JSON.parse(uploadArea.dataset.images);
    images[format] = imageSrc;
    uploadArea.dataset.images = JSON.stringify(images);
    
    // Display the uploaded image
    displayUploadedImage(uploadArea);
}

// Display uploaded image
function displayUploadedImage(uploadArea) {
    const uploadIcon = uploadArea.querySelector('.upload-icon');
    const uploadedImage = uploadArea.querySelector('.uploaded-image');
    
    const images = JSON.parse(uploadArea.dataset.images || '{}');
    
    if (Object.keys(images).length > 0) {
        // Hide upload icon and show uploaded image
        uploadIcon.style.display = 'none';
        uploadedImage.style.display = 'block';
        
        // Show the first available image (prefer PNG, then SVG, or uploaded for Do/Don't)
        const imageSrc = images.png || images.svg || images.uploaded;
        uploadedImage.innerHTML = `<img src="${imageSrc}" alt="Uploaded image" style="width: 100%; height: 100%; object-fit: contain;">`;
        
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
                                ${getUploadIcon()}
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
                                ${getUploadIcon()}
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
                                ${getUploadIcon()}
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
                                ${getUploadIcon()}
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
                                ${getUploadIcon()}
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
                                ${getUploadIcon()}
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

// Handle logo download functionality
function handleLogoDownload(format, uploadArea) {
    const images = JSON.parse(uploadArea.dataset.images || '{}');
    const imageSrc = images[format];
    
    if (!imageSrc) {
        showNotification(`No ${format.toUpperCase()} image available for download. Please upload an image first.`);
        return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `logo-${format}.${format}`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success notification
    showNotification(`${format.toUpperCase()} file downloaded successfully!`);
}

// Handle download functionality (legacy)
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

// Show modal for adding Do and Don't component
function showAddDoDontModal() {
    const modal = document.createElement('div');
    modal.className = 'add-component-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>Add Do and Don't Component</h3>
                <div class="form-group">
                    <label for="doDontTitle">Component Title:</label>
                    <input type="text" id="doDontTitle" placeholder="e.g., Color Usage, Typography Rules, etc." />
                </div>
                <div class="form-group">
                    <label for="doText">Do Description:</label>
                    <input type="text" id="doText" placeholder="e.g., Which pairings are accessible?" />
                </div>
                <div class="form-group">
                    <label for="dontText">Don't Description:</label>
                    <input type="text" id="dontText" placeholder="e.g., What should be avoided?" />
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
    modal.querySelector('#doDontTitle').focus();
    
    // Event listeners
    modal.querySelector('.btn-cancel').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.btn-add').addEventListener('click', () => {
        const title = modal.querySelector('#doDontTitle').value.trim();
        const doText = modal.querySelector('#doText').value.trim();
        const dontText = modal.querySelector('#dontText').value.trim();
        
        if (title && doText && dontText) {
            addDoDontComponent(title, doText, dontText);
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

// Add Do and Don't component
function addDoDontComponent(title, doText, dontText) {
    const logosContent = document.querySelector('.logos-content');
    const addButton = logosContent.querySelector('.add-component-btn');
    
    const newComponent = document.createElement('div');
    newComponent.innerHTML = createDoDontComponent(title, doText, dontText);
    
    // Insert before the add button
    logosContent.insertBefore(newComponent, addButton);
    
    // Initialize upload functionality for the new component
    initializeDoDontUploadAreas(newComponent);
    
    // Initialize delete functionality
    initializeDeleteButton(newComponent);
    
    // Save data
    saveData();
}

// Add divider
function addDivider() {
    const logosContent = document.querySelector('.logos-content');
    const addButton = logosContent.querySelector('.add-component-btn');
    
    const divider = document.createElement('div');
    divider.className = 'divider-component';
    divider.innerHTML = `
        <div class="component-header">
            <div class="divider-line"></div>
            <button class="delete-component-btn" title="Delete component">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add delete functionality
    initializeDeleteButton(divider);
    
    // Insert before the add button
    logosContent.insertBefore(divider, addButton);
    
    // Save data
    saveData();
}

// Add heading
function addHeading(level) {
    const logosContent = document.querySelector('.logos-content');
    const addButton = logosContent.querySelector('.add-component-btn');
    
    const heading = document.createElement('div');
    heading.className = `heading-component heading-${level}`;
    heading.innerHTML = `
        <div class="component-header">
            <h${level} contenteditable="true" class="editable-heading">Heading ${level}</h${level}>
            <button class="delete-component-btn" title="Delete component">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add delete functionality
    initializeDeleteButton(heading);
    
    // Insert before the add button
    logosContent.insertBefore(heading, addButton);
    
    // Save data
    saveData();
}

// Logo Variant Component
function createLogoVariant(title, variant1Name, variant2Name) {
    return `
        <div class="logo-variant-component">
            <div class="component-header">
                <h2 class="variant-title" contenteditable="true">${title}</h2>
                <button class="delete-component-btn" title="Delete component">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="variant-cards">
                <div class="variant-card">
                    <div class="upload-area" data-variant="1">
                        <div class="upload-icon">
                            <img src="assets/upload-icon.svg" alt="Upload" width="40" height="40">
                        </div>
                        <div class="uploaded-image" style="display: none;"></div>
                    </div>
                    <div class="download-buttons">
                        <button class="download-btn">
                            ${getDownloadIcon()}
                            Download PNG
                        </button>
                        <button class="download-btn">
                            ${getDownloadIcon()}
                            Download SVG
                        </button>
                    </div>
                    <div class="variant-label" contenteditable="true">${variant1Name}</div>
                </div>
                <div class="variant-card">
                    <div class="upload-area" data-variant="2">
                        <div class="upload-icon">
                            <img src="assets/upload-icon.svg" alt="Upload" width="40" height="40">
                        </div>
                        <div class="uploaded-image" style="display: none;"></div>
                    </div>
                    <div class="download-buttons">
                        <button class="download-btn">
                            ${getDownloadIcon()}
                            Download PNG
                        </button>
                        <button class="download-btn">
                            ${getDownloadIcon()}
                            Download SVG
                        </button>
                    </div>
                    <div class="variant-label" contenteditable="true">${variant2Name}</div>
                </div>
            </div>
        </div>
    `;
}

// Do and Don't Component
function createDoDontComponent(title, doText, dontText) {
    return `
        <div class="do-dont-component">
            <div class="component-header">
                <h2 class="do-dont-title" contenteditable="true">${title}</h2>
                <button class="delete-component-btn" title="Delete component">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="do-dont-cards">
                <div class="do-dont-card do-card">
                    <div class="do-dont-upload-area" data-type="do">
                        <div class="upload-icon">
                            ${getUploadIcon()}
                        </div>
                        <div class="uploaded-image" style="display: none;"></div>
                    </div>
                    <div class="do-dont-button do-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Do
                    </div>
                    <div class="do-dont-text" contenteditable="true">${doText}</div>
                </div>
                <div class="do-dont-card dont-card">
                    <div class="do-dont-upload-area" data-type="dont">
                        <div class="upload-icon">
                            ${getUploadIcon()}
                        </div>
                        <div class="uploaded-image" style="display: none;"></div>
                    </div>
                    <div class="do-dont-button dont-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Don't
                    </div>
                    <div class="do-dont-text" contenteditable="true">${dontText}</div>
                </div>
            </div>
        </div>
    `;
}

// Initialize Do and Don't upload areas
function initializeDoDontUploadAreas(component) {
    const uploadAreas = component.querySelectorAll('.do-dont-upload-area');
    
    uploadAreas.forEach(area => {
        area.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showDoDontUploadModal(type, this);
        });
    });
}

// Show Do and Don't upload modal
function showDoDontUploadModal(type, uploadArea) {
    const modal = document.createElement('div');
    modal.className = 'upload-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>Upload Image - ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <div class="upload-options">
                    <div class="upload-option">
                        <label for="doDontFileInput" class="upload-file-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                                <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
                                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
                                <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            Upload from Computer
                        </label>
                        <input type="file" id="doDontFileInput" accept="image/*" style="display: none;">
                    </div>
                    <div class="upload-divider">
                        <span>OR</span>
                    </div>
                    <div class="upload-option">
                        <label for="doDontUrlInput">Paste Image URL:</label>
                        <input type="url" id="doDontUrlInput" placeholder="https://example.com/image.png">
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel">Cancel</button>
                    <button class="btn-upload" disabled>Upload Image</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const fileInput = modal.querySelector('#doDontFileInput');
    const urlInput = modal.querySelector('#doDontUrlInput');
    const uploadBtn = modal.querySelector('.btn-upload');
    const cancelBtn = modal.querySelector('.btn-cancel');
    
    // Check if any input has content
    function checkUploadButton() {
        const hasFile = fileInput.files.length > 0;
        const hasUrl = urlInput.value.trim() !== '';
        uploadBtn.disabled = !(hasFile || hasUrl);
    }
    
    // File input change handler
    fileInput.addEventListener('change', function(e) {
        if (e.target.files[0]) {
            urlInput.value = '';
        }
        checkUploadButton();
    });
    
    // URL input change handler
    urlInput.addEventListener('input', function() {
        if (this.value.trim()) {
            fileInput.value = '';
        }
        checkUploadButton();
    });
    
    // Upload button handler
    uploadBtn.addEventListener('click', function() {
        if (fileInput.files[0]) {
            handleDoDontFileUpload(fileInput.files[0], uploadArea);
        } else if (urlInput.value.trim()) {
            handleDoDontUrlUpload(urlInput.value.trim(), uploadArea);
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

// Handle Do and Don't file upload
function handleDoDontFileUpload(file, uploadArea) {
    const reader = new FileReader();
    reader.onload = function(e) {
        displayDoDontUploadedImage(e.target.result, uploadArea);
    };
    reader.readAsDataURL(file);
}

// Handle Do and Don't URL upload
function handleDoDontUrlUpload(url, uploadArea) {
    const img = new Image();
    img.onload = function() {
        displayDoDontUploadedImage(url, uploadArea);
    };
    img.onerror = function() {
        alert('Invalid image URL. Please check the link and try again.');
    };
    img.src = url;
}

// Display Do and Don't uploaded image
function displayDoDontUploadedImage(imageSrc, uploadArea) {
    const uploadIcon = uploadArea.querySelector('.upload-icon');
    const uploadedImage = uploadArea.querySelector('.uploaded-image');
    
    // Store the image data in the dataset for saving
    if (!uploadArea.dataset.images) {
        uploadArea.dataset.images = JSON.stringify({});
    }
    
    const images = JSON.parse(uploadArea.dataset.images);
    images.uploaded = imageSrc; // Store as 'uploaded' for Do and Don't
    uploadArea.dataset.images = JSON.stringify(images);
    
    // Hide upload icon and show uploaded image
    uploadIcon.style.display = 'none';
    uploadedImage.style.display = 'block';
    uploadedImage.innerHTML = `<img src="${imageSrc}" alt="Uploaded image" style="width: 100%; height: 100%; object-fit: contain;">`;
    
    // Add hover effect to show upload icon again
    uploadArea.addEventListener('mouseenter', function() {
        uploadIcon.style.display = 'flex';
        uploadedImage.style.opacity = '0.7';
    });
    
    uploadArea.addEventListener('mouseleave', function() {
        uploadIcon.style.display = 'none';
        uploadedImage.style.opacity = '1';
    });
    
    // Save data after image upload
    saveData();
}

// Initialize delete button functionality
function initializeDeleteButton(component) {
    const deleteBtn = component.querySelector('.delete-component-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this component?')) {
                component.remove();
                saveData(); // Save after deletion
            }
        });
    }
}

// Save data to Firebase
async function saveData() {
    const logosContent = document.querySelector('.logos-content');
    if (!logosContent) return;
    
    const components = [];
    const componentElements = logosContent.querySelectorAll('.logo-variant-component, .do-dont-component, .divider-component, .heading-component');
    
    componentElements.forEach((element, index) => {
        const componentData = {
            id: `component_${Date.now()}_${index}`,
            type: element.className.split(' ')[0], // Get the first class name
            html: element.outerHTML,
            timestamp: Date.now()
        };
        
        // Extract specific data based on component type
        if (element.classList.contains('logo-variant-component')) {
            const title = element.querySelector('.variant-title').textContent;
            const variant1Label = element.querySelector('.variant-card:first-child .variant-label').textContent;
            const variant2Label = element.querySelector('.variant-card:last-child .variant-label').textContent;
            
            // Extract image data from upload areas
            const uploadAreas = element.querySelectorAll('.upload-area');
            const imageData = {};
            uploadAreas.forEach((area, index) => {
                if (area.dataset.images) {
                    try {
                        imageData[`variant${index + 1}`] = JSON.parse(area.dataset.images);
                    } catch (error) {
                        console.error('Error parsing image data:', error);
                    }
                }
            });
            
            componentData.data = { title, variant1Label, variant2Label, imageData };
        } else if (element.classList.contains('do-dont-component')) {
            const title = element.querySelector('.do-dont-title').textContent;
            const doText = element.querySelector('.do-card .do-dont-text').textContent;
            const dontText = element.querySelector('.dont-card .do-dont-text').textContent;
            
            // Extract image data from upload areas
            const uploadAreas = element.querySelectorAll('.do-dont-upload-area');
            const imageData = {};
            uploadAreas.forEach((area, index) => {
                if (area.dataset.images) {
                    try {
                        const type = area.dataset.type || `area${index}`;
                        imageData[type] = JSON.parse(area.dataset.images);
                    } catch (error) {
                        console.error('Error parsing image data:', error);
                    }
                }
            });
            
            componentData.data = { title, doText, dontText, imageData };
        } else if (element.classList.contains('heading-component')) {
            const headingText = element.querySelector('.editable-heading').textContent;
            const headingLevel = element.querySelector('.editable-heading').tagName.toLowerCase();
            componentData.data = { headingText, headingLevel };
        }
        
        components.push(componentData);
    });
    
    savedData.components = components;
    savedData.lastSaved = Date.now();
    
    try {
        // Try Firebase first, fallback to localStorage
        if (window.firebaseDB && window.firebaseDoc && window.firebaseSetDoc) {
            const docRef = window.firebaseDoc(window.firebaseDB, 'brandbook', 'data');
            await window.firebaseSetDoc(docRef, savedData);
            console.log('Data saved to Firebase successfully');
            showSaveStatus('Saved to cloud', 'success');
        } else {
            // Fallback to localStorage
            localStorage.setItem('brandbook_data', JSON.stringify(savedData));
            console.log('Data saved to localStorage (Firebase not available)');
            showSaveStatus('Saved locally', 'success');
        }
    } catch (error) {
        console.error('Error saving data:', error);
        // Fallback to localStorage
        try {
            localStorage.setItem('brandbook_data', JSON.stringify(savedData));
            showSaveStatus('Saved locally (cloud failed)', 'warning');
        } catch (localError) {
            showSaveStatus('Save failed', 'error');
        }
    }
}

// Load data from Firebase
async function loadSavedData() {
    console.log('Starting to load data...');
    console.log('Firebase available:', !!(window.firebaseDB && window.firebaseDoc && window.firebaseGetDoc));
    
    try {
        // Try Firebase first
        if (window.firebaseDB && window.firebaseDoc && window.firebaseGetDoc) {
            console.log('Attempting to load from Firebase...');
            const docRef = window.firebaseDoc(window.firebaseDB, 'brandbook', 'data');
            const docSnap = await window.firebaseGetDoc(docRef);
            
            if (docSnap.exists()) {
                savedData = docSnap.data();
                console.log('Data loaded from Firebase successfully:', savedData);
                showSaveStatus('Loaded from cloud', 'success');
                return;
            } else {
                console.log('No data found in Firebase');
            }
        } else {
            console.log('Firebase not available, using localStorage');
        }
        
        // Fallback to localStorage
        const stored = localStorage.getItem('brandbook_data');
        if (stored) {
            savedData = JSON.parse(stored);
            console.log('Data loaded from localStorage:', savedData);
            showSaveStatus('Loaded locally', 'info');
        } else {
            console.log('No data found in localStorage');
            savedData = { components: [], lastSaved: null };
        }
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to localStorage
        try {
            const stored = localStorage.getItem('brandbook_data');
            if (stored) {
                savedData = JSON.parse(stored);
                console.log('Fallback: Data loaded from localStorage:', savedData);
                showSaveStatus('Loaded locally (cloud failed)', 'warning');
            } else {
                savedData = { components: [], lastSaved: null };
                console.log('No data found anywhere');
            }
        } catch (localError) {
            console.error('LocalStorage error:', localError);
            savedData = { components: [], lastSaved: null };
            showSaveStatus('Load failed', 'error');
        }
    }
}

// Restore uploaded images in components
function restoreComponentImages(component, componentIndex) {
    // Get the component data by index
    const componentData = savedData.components[componentIndex];
    
    console.log('Restoring images for component:', componentIndex, componentData);
    
    if (!componentData || !componentData.data || !componentData.data.imageData) {
        console.log('No image data found for component:', componentIndex);
        return;
    }
    
    // Find all upload areas in the component
    const uploadAreas = component.querySelectorAll('.upload-area, .do-dont-upload-area');
    console.log('Found upload areas:', uploadAreas.length);
    
    uploadAreas.forEach((uploadArea, index) => {
        let imageData = null;
        
        // Get the appropriate image data based on component type
        if (component.classList.contains('logo-variant-component')) {
            const variantKey = `variant${index + 1}`;
            imageData = componentData.data.imageData[variantKey];
            console.log(`Logo variant ${variantKey} image data:`, imageData);
        } else if (component.classList.contains('do-dont-component')) {
            const type = uploadArea.dataset.type || `area${index}`;
            imageData = componentData.data.imageData[type];
            console.log(`Do/Don't ${type} image data:`, imageData);
            // For Do and Don't, check if there's an 'uploaded' key
            if (imageData && imageData.uploaded) {
                imageData = { uploaded: imageData.uploaded };
            }
        }
        
        if (imageData && Object.keys(imageData).length > 0) {
            console.log('Restoring image data:', imageData);
            // Store the image data in the dataset
            uploadArea.dataset.images = JSON.stringify(imageData);
            // Display the uploaded image - use the appropriate function based on component type
            if (component.classList.contains('do-dont-component')) {
                // For Do/Don't components, use the specific function
                const imageSrc = imageData.uploaded || imageData.png || imageData.svg;
                if (imageSrc) {
                    displayDoDontUploadedImage(imageSrc, uploadArea);
                }
            } else {
                // For logo variant components, use the general function
                displayUploadedImage(uploadArea);
            }
        } else {
            console.log('No image data to restore for upload area:', index);
        }
    });
}

// Restore components from saved data
function restoreComponents() {
    const logosContent = document.querySelector('.logos-content');
    if (!logosContent || !savedData.components.length) return;
    
    // Clear existing components (but keep the add button)
    const addButton = logosContent.querySelector('.add-component-btn');
    logosContent.innerHTML = '';
    if (addButton) {
        logosContent.appendChild(addButton);
    }
    
    // Restore each component
    savedData.components.forEach((componentData, index) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = componentData.html;
        const component = tempDiv.firstElementChild;
        
        // Insert before the add button
        logosContent.insertBefore(component, addButton);
        
        // Re-initialize functionality based on component type
        if (component.classList.contains('logo-variant-component')) {
            initializeUploadAreas(component);
            initializeDeleteButton(component);
            // Re-initialize download buttons
            const downloadBtns = component.querySelectorAll('.download-btn');
            downloadBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const format = this.textContent.includes('PNG') ? 'png' : 'svg';
                    const variantCard = this.closest('.variant-card');
                    const uploadArea = variantCard.querySelector('.upload-area');
                    handleLogoDownload(format, uploadArea);
                });
            });
            // Restore uploaded images
            restoreComponentImages(component, index);
        } else if (component.classList.contains('do-dont-component')) {
            initializeDoDontUploadAreas(component);
            initializeDeleteButton(component);
            // Restore uploaded images
            restoreComponentImages(component, index);
        } else if (component.classList.contains('divider-component') || component.classList.contains('heading-component')) {
            initializeDeleteButton(component);
        }
    });
}

// Auto-save functionality
function setupAutoSave() {
    // Save on any content change
    document.addEventListener('input', function(e) {
        if (e.target.contentEditable === 'true' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            clearTimeout(window.autoSaveTimeout);
            window.autoSaveTimeout = setTimeout(saveData, 1000); // Save after 1 second of inactivity
        }
    });
    
    // Save on component addition/deletion
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const logosContent = document.querySelector('.logos-content');
                if (logosContent && mutation.target.contains(logosContent)) {
                    clearTimeout(window.autoSaveTimeout);
                    window.autoSaveTimeout = setTimeout(saveData, 500);
                }
            }
        });
    });
    
    const logosContent = document.querySelector('.logos-content');
    if (logosContent) {
        observer.observe(logosContent, { childList: true, subtree: true });
    }
}

// Show save status
function showSaveStatus(message, type) {
    // Remove existing status
    const existingStatus = document.querySelector('.save-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create status indicator
    const status = document.createElement('div');
    status.className = `save-status save-${type}`;
    status.textContent = message;
    status.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 8px 16px;
        border-radius: 6px;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 500;
        z-index: 1000;
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50; color: white;' : 
          type === 'warning' ? 'background: #FF9800; color: white;' :
          type === 'info' ? 'background: #2196F3; color: white;' :
          'background: #f44336; color: white;'}
    `;
    
    document.body.appendChild(status);
    
    // Remove after 2 seconds
    setTimeout(() => {
        if (status.parentNode) {
            status.style.opacity = '0';
            setTimeout(() => {
                if (status.parentNode) {
                    status.remove();
                }
            }, 300);
        }
    }, 2000);
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
