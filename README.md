# Brand Book - Secure Access Portal

A responsive, password-protected website for accessing brand guidelines and assets with admin functionality.

## Features

- 🔐 **Password Protection**: Secure login system with multiple user accounts
- 👑 **Admin Access**: Special admin dashboard for user management and system settings
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, professional interface with smooth animations
- 🔒 **Security Features**: Session management, inactivity timeout, and basic security measures

## Default Login Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full admin dashboard with user management, analytics, and settings

### Regular User Accounts
- **Username**: `user` | **Password**: `user123`
- **Username**: `guest` | **Password**: `guest123`
- **Access**: Standard user access to brand book content

## Getting Started

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Login** using one of the provided credentials
4. **Explore** the brand book portal

## File Structure

```
BrandBook/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and authentication
└── README.md           # This documentation
```

## Features Overview

### Login System
- Secure authentication with username/password
- Error handling for invalid credentials
- Session persistence using localStorage
- Loading states and user feedback

### Admin Dashboard
- User management interface
- Analytics and reporting
- System settings and configuration
- Accessible only to admin users

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Security Features
- Session timeout after inactivity
- Basic client-side security measures
- Console warnings for developers
- Right-click and F12 protection

## Customization

### Adding New Users
Edit the `users` object in `script.js`:

```javascript
const users = {
    'newuser': {
        password: 'newpassword',
        role: 'user', // or 'admin'
        name: 'New User Name'
    }
};
```

### Styling
Modify `styles.css` to match your brand:
- Update color scheme in CSS variables
- Change fonts and typography
- Adjust spacing and layouts
- Add your brand logo

### Content
Update `index.html` to include:
- Your actual brand guidelines
- Links to real assets and documents
- Company-specific information
- Additional features as needed

## Security Considerations

⚠️ **Important**: This is a client-side implementation for demonstration purposes. For production use:

1. **Implement server-side authentication**
2. **Use HTTPS for all communications**
3. **Store passwords securely (hashed)**
4. **Add proper session management**
5. **Implement CSRF protection**
6. **Add rate limiting for login attempts**

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please contact the development team.
