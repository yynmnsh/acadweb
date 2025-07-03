// Academic Website CMS - Content Management System

class AcademicCMS {
    constructor() {
        this.storageKey = 'academicWebsiteContent';
        this.authKey = 'academicWebsiteAuth';
        this.defaultContent = this.getDefaultContent();
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadContent();
        this.checkAuth();
        this.setupEventListeners();
    }

    // Authentication Methods
    checkAuth() {
        const authData = localStorage.getItem(this.authKey);
        if (authData) {
            try {
                const auth = JSON.parse(authData);
                if (auth.expires > Date.now()) {
                    this.currentUser = auth.user;
                    return true;
                }
            } catch (e) {
                console.log('Invalid auth data');
            }
        }
        return false;
    }

    login(username, password) {
        // Simple authentication - in production, this would be more secure
        const validCredentials = [
            { username: 'admin', password: 'academic2024!' },
            { username: 'professor', password: 'research123!' }
        ];

        const user = validCredentials.find(cred => 
            cred.username === username && cred.password === password
        );

        if (user) {
            const authData = {
                user: { username: user.username },
                expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            };
            localStorage.setItem(this.authKey, JSON.stringify(authData));
            this.currentUser = authData.user;
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem(this.authKey);
        this.currentUser = null;
        window.location.href = '../index.html';
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Content Management Methods
    loadContent() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.content = JSON.parse(stored);
            } catch (e) {
                this.content = this.defaultContent;
            }
        } else {
            this.content = this.defaultContent;
            this.saveContent();
        }
    }

    saveContent() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.content));
    }

    getContent(page = null) {
        if (page) {
            return this.content[page] || {};
        }
        return this.content;
    }

    updateContent(page, data) {
        if (!this.content[page]) {
            this.content[page] = {};
        }
        this.content[page] = { ...this.content[page], ...data };
        this.saveContent();
        return true;
    }

    // Default content structure
    getDefaultContent() {
        return {
            site: {
                title: 'Dr. Academic Name',
                subtitle: 'Assistant Professor of Computer Science',
                university: 'University Name',
                email: 'academic@university.edu',
                phone: '(555) 123-4567',
                office: 'Room 456, Academic Building',
                profileImage: 'assets/images/profile.jpg'
            },
            index: {
                title: 'Dr. Academic Name',
                subtitle: 'Assistant Professor of Computer Science',
                description: 'Welcome to my academic portfolio. I am a passionate researcher and educator specializing in artificial intelligence, machine learning, and computational methods.',
                recentNews: [
                    {
                        date: 'December 2024',
                        title: 'New Paper Accepted at ICML 2025',
                        summary: 'Our paper on "Ethical Considerations in Large Language Models" has been accepted for publication.'
                    },
                    {
                        date: 'November 2024',
                        title: 'Received NSF Grant',
                        summary: 'Awarded a $500,000 NSF grant to investigate bias mitigation techniques in machine learning algorithms.'
                    }
                ]
            },
            about: {
                title: 'About Me',
                subtitle: 'Academic Journey & Background',
                biography: `
                    <p>I am an Assistant Professor in the Department of Computer Science at University Name, where I lead research in artificial intelligence, machine learning, and computational ethics. My work focuses on developing responsible AI systems that can benefit society while minimizing potential harms.</p>
                    <p>Before joining University Name, I completed my Ph.D. in Computer Science at Stanford University, where I was advised by Dr. Jane Smith. My doctoral research explored the intersection of machine learning and healthcare, with a particular emphasis on developing algorithms that are both accurate and interpretable for medical applications.</p>
                `
            },
            research: {
                title: 'Research',
                subtitle: 'Publications, Projects & Expertise',
                description: 'My research focuses on developing ethical and interpretable AI systems that can benefit society.',
                publications: [
                    {
                        title: 'Towards Ethical AI: A Comprehensive Framework for Bias Detection and Mitigation',
                        authors: 'Academic Name, Jane Smith, Robert Johnson',
                        venue: 'Journal of Artificial Intelligence Research, 2024',
                        links: [
                            { text: 'PDF', url: '#' },
                            { text: 'Code', url: '#' },
                            { text: 'Cite', url: '#' }
                        ]
                    }
                ]
            },
            teaching: {
                title: 'Teaching',
                subtitle: 'Inspiring the Next Generation of Computer Scientists',
                description: 'I am passionate about making complex computer science concepts accessible and engaging.',
                courses: [
                    {
                        title: 'CS 4780: Introduction to Machine Learning',
                        semester: 'Spring 2025',
                        level: 'Undergraduate',
                        description: 'A comprehensive introduction to machine learning covering supervised and unsupervised learning.'
                    }
                ]
            },
            contact: {
                title: 'Contact Me',
                subtitle: 'Let\'s Connect and Collaborate',
                description: 'I\'m always interested in discussing research opportunities and collaborations.',
                contactInfo: {
                    email: 'academic@university.edu',
                    phone: '(555) 123-4567',
                    'office-hours': 'MW 2-4 PM, F 10-12 PM',
                    office: 'Room 456, Academic Building'
                }
            }
        };
    }

    // Content editing methods
    createRichTextEditor(container, content = '') {
        const editor = document.createElement('div');
        editor.className = 'rich-text-editor';
        editor.innerHTML = `
            <div class="editor-toolbar">
                <button type="button" data-command="bold" title="Bold"><strong>B</strong></button>
                <button type="button" data-command="italic" title="Italic"><em>I</em></button>
                <button type="button" data-command="underline" title="Underline"><u>U</u></button>
                <button type="button" data-command="insertUnorderedList" title="Bullet List">•</button>
                <button type="button" data-command="insertOrderedList" title="Numbered List">1.</button>
                <button type="button" data-command="createLink" title="Link">🔗</button>
            </div>
            <div class="editor-content" contenteditable="true">${content}</div>
        `;

        // Add toolbar functionality
        const toolbar = editor.querySelector('.editor-toolbar');
        const contentArea = editor.querySelector('.editor-content');

        toolbar.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                e.preventDefault();
                const command = e.target.dataset.command;
                
                if (command === 'createLink') {
                    const url = prompt('Enter URL:');
                    if (url) {
                        document.execCommand(command, false, url);
                    }
                } else {
                    document.execCommand(command, false, null);
                }
                contentArea.focus();
            }
        });

        container.appendChild(editor);
        return contentArea;
    }

    // Export/Import functionality
    exportContent() {
        const dataStr = JSON.stringify(this.content, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'academic-website-content.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    importContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    this.content = imported;
                    this.saveContent();
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }

    // Backup functionality
    createBackup() {
        const backup = {
            content: this.content,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        const backups = JSON.parse(localStorage.getItem('academicWebsiteBackups') || '[]');
        backups.unshift(backup);
        
        // Keep only last 10 backups
        if (backups.length > 10) {
            backups.splice(10);
        }
        
        localStorage.setItem('academicWebsiteBackups', JSON.stringify(backups));
        return backup;
    }

    getBackups() {
        return JSON.parse(localStorage.getItem('academicWebsiteBackups') || '[]');
    }

    restoreBackup(timestamp) {
        const backups = this.getBackups();
        const backup = backups.find(b => b.timestamp === timestamp);
        
        if (backup) {
            this.content = backup.content;
            this.saveContent();
            return true;
        }
        return false;
    }

    // Utility methods
    setupEventListeners() {
        // Auto-save functionality
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('cms-field')) {
                clearTimeout(this.autoSaveTimer);
                this.autoSaveTimer = setTimeout(() => {
                    this.autoSave();
                }, 2000);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('cms-form')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
    }

    autoSave() {
        if (this.isAuthenticated()) {
            this.saveContent();
            this.showNotification('Content auto-saved', 'success');
        }
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const page = form.dataset.page;
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        this.updateContent(page, data);
        this.showNotification('Content updated successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.cms-notification');
        existing.forEach(n => n.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `cms-notification cms-notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Preview functionality
    previewChanges() {
        // Save current content to temporary storage
        localStorage.setItem('academicWebsitePreview', JSON.stringify(this.content));
        
        // Open preview in new tab
        window.open('../index.html?preview=true', '_blank');
    }

    // Statistics and analytics
    getContentStats() {
        const stats = {
            totalPages: Object.keys(this.content).length,
            lastModified: new Date().toISOString(),
            contentSize: JSON.stringify(this.content).length,
            publications: this.content.research?.publications?.length || 0,
            courses: this.content.teaching?.courses?.length || 0,
            newsItems: this.content.index?.recentNews?.length || 0
        };
        return stats;
    }
}

// Initialize CMS when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.academicCMS = new AcademicCMS();
});

// Add CSS for rich text editor
const editorStyles = document.createElement('style');
editorStyles.textContent = `
    .rich-text-editor {
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        overflow: hidden;
    }
    
    .editor-toolbar {
        background: #f3f4f6;
        padding: 0.5rem;
        border-bottom: 1px solid #d1d5db;
        display: flex;
        gap: 0.25rem;
    }
    
    .editor-toolbar button {
        padding: 0.25rem 0.5rem;
        border: 1px solid #d1d5db;
        background: white;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
    }
    
    .editor-toolbar button:hover {
        background: #e5e7eb;
    }
    
    .editor-content {
        padding: 1rem;
        min-height: 200px;
        outline: none;
    }
    
    .editor-content:focus {
        background: #fafafa;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(editorStyles);

