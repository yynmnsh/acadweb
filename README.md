# Academic Website with Built-in CMS

A professional academic portfolio website with an integrated Content Management System (CMS) designed for early-career academics. This website is fully compatible with GitHub Pages and requires no server-side infrastructure.

## Features

### Public Website
- **Professional Design**: Clean, responsive design optimized for academic portfolios
- **Complete Pages**: Home, About, Research, Teaching, CV, and Contact pages
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **SEO Optimized**: Proper meta tags, Open Graph support, and semantic HTML
- **Fast Loading**: Optimized CSS and JavaScript for quick page loads

### Admin CMS
- **Secret Admin Portal**: Accessible via `/admin-secret-portal/login.html`
- **Secure Authentication**: Login system with session management and security features
- **Content Editor**: Rich text editing for all website content
- **Dynamic Management**: Add/edit/remove publications, courses, news items
- **Auto-save**: Automatic saving of changes as you type
- **Backup System**: Export/import content and create backups
- **Preview Mode**: Preview changes before publishing

### GitHub Pages Compatible
- **Static Hosting**: No server required - works with GitHub Pages
- **Local Storage**: Content stored in browser's local storage
- **No Database**: No backend database needed
- **Easy Deployment**: Simple drag-and-drop deployment

## Quick Start

### 1. Download and Setup
1. Download all files to your local computer
2. Upload to a new GitHub repository
3. Enable GitHub Pages in repository settings

### 2. Access Your Website
- **Public Website**: `https://yourusername.github.io/repository-name/`
- **Admin Portal**: `https://yourusername.github.io/repository-name/admin-secret-portal/login.html`

### 3. Login Credentials
**Default Admin Account:**
- Username: `admin`
- Password: `academic2024!`

**Alternative Account:**
- Username: `professor`
- Password: `research123!`

> **Security Note**: Change these credentials by editing the `js/auth.js` file after deployment.

## File Structure

```
academic-website/
├── index.html              # Homepage
├── about.html              # About page
├── research.html           # Research page
├── teaching.html           # Teaching page
├── cv.html                 # CV page
├── contact.html            # Contact page
├── css/
│   ├── main.css           # Main stylesheet
│   └── admin.css          # Admin interface styles
├── js/
│   ├── main.js            # Main website functionality
│   ├── cms.js             # Content management system
│   ├── auth.js            # Authentication system
│   └── content-loader.js  # Dynamic content loading
├── admin-secret-portal/
│   ├── login.html         # Admin login page
│   ├── dashboard.html     # Admin dashboard
│   └── editor.html        # Content editor
├── assets/
│   ├── images/            # Image assets
│   └── documents/         # Document assets
└── README.md              # This file
```

## Customization Guide

### 1. Basic Information
1. Login to the admin portal
2. Go to "Site Settings" in the sidebar
3. Update your name, university, contact information
4. Save changes

### 2. Content Management
- **Homepage**: Edit hero section and recent news
- **About**: Update biography and background
- **Research**: Add publications and research projects
- **Teaching**: Manage courses and teaching information
- **Contact**: Update contact details and office hours

### 3. Adding Publications
1. Go to Research → Editor
2. Scroll to Publications section
3. Click "Add Publication"
4. Fill in title, authors, venue, and links
5. Save changes

### 4. Managing Courses
1. Go to Teaching → Editor
2. Scroll to Courses section
3. Click "Add Course"
4. Enter course details
5. Save changes

## Advanced Configuration

### Changing Login Credentials
Edit `js/auth.js` and modify the `validCredentials` array:

```javascript
const validCredentials = [
    { 
        username: 'your-username', 
        password: 'your-secure-password',
        hash: this.simpleHash('your-username:your-secure-password')
    }
];
```

### Customizing Styles
- Edit `css/main.css` for public website styling
- Edit `css/admin.css` for admin interface styling
- Modify CSS variables at the top of each file for quick color changes

### Adding New Pages
1. Create new HTML file following existing page structure
2. Add navigation link in all HTML files
3. Update `js/content-loader.js` to handle new page content
4. Add editor support in `admin-secret-portal/editor.html`

## Deployment Options

### GitHub Pages (Recommended)
1. Create new GitHub repository
2. Upload all files to repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your site will be available at `https://yourusername.github.io/repository-name/`

### Other Static Hosting
This website works with any static hosting service:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront
- Any web server

## Security Features

### Admin Portal Security
- **Hidden URL**: Admin portal not linked from public pages
- **Authentication**: Username/password protection
- **Session Management**: Automatic logout after inactivity
- **Rate Limiting**: Protection against brute force attacks
- **Account Lockout**: Temporary lockout after failed attempts
- **Developer Tools Protection**: Basic protection against inspection

### Content Security
- **Local Storage**: Content stored securely in browser
- **Backup System**: Regular backup creation and restore
- **Export/Import**: Full content portability
- **Auto-save**: Prevents data loss

## Browser Compatibility

### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Required Features
- Local Storage support
- ES6 JavaScript support
- CSS Grid and Flexbox support

## Troubleshooting

### Common Issues

**Q: I can't access the admin portal**
A: Make sure you're using the correct URL: `/admin-secret-portal/login.html`

**Q: My changes aren't showing on the public site**
A: Content is stored in browser's local storage. Changes only appear in the same browser where you made them.

**Q: I lost my content**
A: Check if you have any backups in the admin panel. Content is browser-specific.

**Q: The website looks broken**
A: Ensure all CSS and JavaScript files are properly uploaded and accessible.

### Data Persistence

**Important**: This CMS stores content in the browser's local storage. This means:
- Content is specific to the browser and device where you edit it
- Clearing browser data will remove your content
- Use the export feature regularly to backup your content
- For multi-device editing, export from one device and import to another

## Support and Maintenance

### Regular Maintenance
1. **Backup Content**: Export content monthly
2. **Update Credentials**: Change default passwords
3. **Monitor Storage**: Check storage usage in admin dashboard
4. **Test Functionality**: Regularly test all features

### Getting Help
- Check browser console for error messages
- Ensure JavaScript is enabled
- Verify all files are uploaded correctly
- Test in different browsers

## License

This project is open source and available under the MIT License. Feel free to modify and customize for your needs.

## Credits

Built with modern web technologies:
- HTML5, CSS3, JavaScript (ES6+)
- No external dependencies
- Responsive design principles
- Accessibility best practices

---

**Happy Academic Portfolioing!** 🎓

For questions or support, please refer to the troubleshooting section or check the browser console for error messages.

