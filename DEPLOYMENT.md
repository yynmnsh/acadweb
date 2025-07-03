# Deployment Guide - Academic Website with CMS

This guide will walk you through deploying your academic website to GitHub Pages step by step.

## Prerequisites

- GitHub account
- Basic familiarity with GitHub
- Web browser with JavaScript enabled

## Step 1: Create GitHub Repository

1. **Login to GitHub**
   - Go to [github.com](https://github.com)
   - Sign in to your account

2. **Create New Repository**
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name your repository (e.g., `academic-website`, `my-portfolio`, or `your-name.github.io`)
   - Make sure it's set to "Public"
   - Do NOT initialize with README (we'll upload our files)
   - Click "Create repository"

## Step 2: Upload Website Files

### Option A: Using GitHub Web Interface (Recommended for beginners)

1. **Prepare Files**
   - Download/extract all website files to a folder on your computer
   - Ensure you have all files from the `academic-website` directory

2. **Upload Files**
   - In your new GitHub repository, click "uploading an existing file"
   - Drag and drop ALL files and folders from the `academic-website` directory
   - This includes:
     - All HTML files (index.html, about.html, etc.)
     - css/ folder with stylesheets
     - js/ folder with JavaScript files
     - admin-secret-portal/ folder
     - assets/ folder
     - .github/ folder (if present)
     - README.md and other configuration files

3. **Commit Files**
   - Scroll down to "Commit changes"
   - Add commit message: "Initial website deployment"
   - Click "Commit changes"

### Option B: Using Git Command Line

```bash
# Clone your repository
git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name

# Copy all website files to this directory
# (copy all files from academic-website folder)

# Add all files
git add .

# Commit changes
git commit -m "Initial website deployment"

# Push to GitHub
git push origin main
```

## Step 3: Enable GitHub Pages

1. **Go to Repository Settings**
   - In your GitHub repository, click "Settings" tab
   - Scroll down to "Pages" in the left sidebar

2. **Configure Pages**
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" folder
   - Click "Save"

3. **Wait for Deployment**
   - GitHub will show a message that your site is being deployed
   - This usually takes 1-5 minutes
   - You'll see a green checkmark when it's ready

4. **Get Your Website URL**
   - Your website will be available at:
   - `https://yourusername.github.io/repository-name/`
   - GitHub will display this URL in the Pages settings

## Step 4: Access Your Website

### Public Website
- **URL**: `https://yourusername.github.io/repository-name/`
- **Pages Available**:
  - Homepage: `/` or `/index.html`
  - About: `/about.html`
  - Research: `/research.html`
  - Teaching: `/teaching.html`
  - CV: `/cv.html`
  - Contact: `/contact.html`

### Admin Portal
- **URL**: `https://yourusername.github.io/repository-name/admin-secret-portal/login.html`
- **Default Credentials**:
  - Username: `admin`
  - Password: `academic2024!`

> **Important**: Bookmark the admin URL as it's not linked from the public website for security.

## Step 5: First-Time Setup

1. **Login to Admin Portal**
   - Navigate to the admin login URL
   - Use the default credentials above
   - You should see the admin dashboard

2. **Update Site Information**
   - Go to "Site Settings" in the admin sidebar
   - Update your name, university, email, phone, office
   - Save changes

3. **Customize Homepage**
   - Go to "Homepage" in the admin sidebar
   - Update the hero section with your information
   - Add your recent news/updates
   - Save changes

4. **Update About Page**
   - Go to "About Page" in the admin sidebar
   - Write your biography and background
   - Save changes

5. **Add Your Research**
   - Go to "Research" in the admin sidebar
   - Add your publications
   - Include links to PDFs, code, etc.
   - Save changes

6. **Update Teaching Information**
   - Go to "Teaching" in the admin sidebar
   - Add your courses
   - Include descriptions and schedules
   - Save changes

7. **Update Contact Information**
   - Go to "Contact" in the admin sidebar
   - Update your contact details
   - Set office hours
   - Save changes

## Step 6: Security Setup

### Change Default Passwords

1. **Download Repository**
   - Go to your GitHub repository
   - Click "Code" → "Download ZIP"
   - Extract the files

2. **Edit Authentication File**
   - Open `js/auth.js` in a text editor
   - Find the `validCredentials` array (around line 45)
   - Change the username and password:

```javascript
const validCredentials = [
    { 
        username: 'your-new-username', 
        password: 'your-secure-password!',
        hash: this.simpleHash('your-new-username:your-secure-password!')
    }
];
```

3. **Upload Updated File**
   - Go back to your GitHub repository
   - Navigate to `js/auth.js`
   - Click the pencil icon to edit
   - Replace the content with your updated version
   - Commit the changes

### Additional Security Tips

- Use a strong, unique password
- Don't share the admin portal URL publicly
- Regularly backup your content using the export feature
- Consider using a password manager

## Step 7: Content Management

### Adding Publications
1. Login to admin portal
2. Go to Research → Editor
3. Scroll to Publications section
4. Click "Add Publication"
5. Fill in details and save

### Managing Courses
1. Go to Teaching → Editor
2. Scroll to Courses section
3. Click "Add Course"
4. Enter course information and save

### Updating News
1. Go to Homepage → Editor
2. Scroll to Recent News section
3. Click "Add News Item" or edit existing ones
4. Save changes

### Backup Your Content
1. Go to admin dashboard
2. Click "Export Content" in the sidebar
3. Save the downloaded JSON file
4. Store it safely (cloud storage, email to yourself, etc.)

## Troubleshooting

### Common Issues

**Website not loading**
- Check that GitHub Pages is enabled in repository settings
- Ensure all files were uploaded correctly
- Wait a few minutes for deployment to complete

**Admin portal not working**
- Verify the URL is correct: `/admin-secret-portal/login.html`
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled in your browser

**Changes not appearing**
- Content is stored in browser's local storage
- Changes only appear in the browser where you made them
- Use export/import to transfer content between devices

**Forgot admin password**
- Download repository and edit `js/auth.js`
- Update the credentials as shown in Step 6
- Upload the updated file to GitHub

### Getting Help

1. **Check Browser Console**
   - Press F12 to open developer tools
   - Look for error messages in the Console tab

2. **Verify File Structure**
   - Ensure all files and folders are uploaded
   - Check that file paths are correct

3. **Test in Different Browsers**
   - Try Chrome, Firefox, Safari, or Edge
   - Clear browser cache if needed

## Maintenance

### Regular Tasks
- **Weekly**: Check that website is loading correctly
- **Monthly**: Export content as backup
- **Quarterly**: Update any outdated information

### Updates
- Monitor for any GitHub Pages changes
- Keep content fresh and up-to-date
- Regularly review and update publications

## Advanced Customization

### Custom Domain (Optional)
1. Purchase a domain name
2. In GitHub repository settings → Pages
3. Add your custom domain
4. Configure DNS settings with your domain provider

### Analytics (Optional)
- Add Google Analytics code to HTML files
- Monitor website traffic and usage

### SEO Optimization
- Update meta descriptions in HTML files
- Add relevant keywords
- Ensure all images have alt text

---

## Success Checklist

- [ ] Repository created on GitHub
- [ ] All files uploaded successfully
- [ ] GitHub Pages enabled and working
- [ ] Public website accessible
- [ ] Admin portal accessible
- [ ] Successfully logged into admin
- [ ] Site information updated
- [ ] Content customized
- [ ] Admin password changed
- [ ] Content backed up

**Congratulations!** Your academic website is now live and ready to showcase your work to the world! 🎉

---

**Need Help?** Refer to the main README.md file for additional information and troubleshooting tips.

