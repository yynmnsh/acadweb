// Academic Website - Enhanced Authentication System

class AuthenticationManager {
    constructor() {
        this.authKey = 'academicWebsiteAuth';
        this.sessionKey = 'academicWebsiteSession';
        this.attemptsKey = 'academicWebsiteAttempts';
        this.maxAttempts = 5;
        this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
        this.init();
    }

    init() {
        this.setupSecurityMeasures();
        this.checkSession();
    }

    // Enhanced Authentication Methods
    authenticate(username, password) {
        // Check if account is locked
        if (this.isAccountLocked()) {
            const lockoutTime = this.getRemainingLockoutTime();
            throw new Error(`Account locked. Try again in ${Math.ceil(lockoutTime / 60000)} minutes.`);
        }

        // Validate credentials
        const isValid = this.validateCredentials(username, password);
        
        if (isValid) {
            this.clearFailedAttempts();
            this.createSession(username);
            return true;
        } else {
            this.recordFailedAttempt();
            const attempts = this.getFailedAttempts();
            const remaining = this.maxAttempts - attempts.count;
            
            if (remaining <= 0) {
                throw new Error('Account locked due to too many failed attempts.');
            } else {
                throw new Error(`Invalid credentials. ${remaining} attempts remaining.`);
            }
        }
    }

    validateCredentials(username, password) {
        // Enhanced credential validation with hashing simulation
        const validCredentials = [
            { 
                username: 'admin', 
                password: 'academic2024!',
                hash: this.simpleHash('admin:academic2024!')
            },
            { 
                username: 'professor', 
                password: 'research123!',
                hash: this.simpleHash('professor:research123!')
            }
        ];

        const inputHash = this.simpleHash(`${username}:${password}`);
        return validCredentials.some(cred => 
            cred.username === username && cred.hash === inputHash
        );
    }

    simpleHash(input) {
        // Simple hash function for demonstration (in production, use proper hashing)
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(36);
    }

    createSession(username) {
        const sessionData = {
            user: { username },
            created: Date.now(),
            expires: Date.now() + this.sessionTimeout,
            sessionId: this.generateSessionId(),
            lastActivity: Date.now()
        };

        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        this.scheduleSessionCheck();
    }

    generateSessionId() {
        return 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    checkSession() {
        const sessionData = this.getSessionData();
        
        if (!sessionData) {
            return false;
        }

        // Check if session has expired
        if (Date.now() > sessionData.expires) {
            this.destroySession();
            return false;
        }

        // Update last activity
        sessionData.lastActivity = Date.now();
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        
        return true;
    }

    getSessionData() {
        try {
            const data = localStorage.getItem(this.sessionKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    isAuthenticated() {
        return this.checkSession();
    }

    getCurrentUser() {
        const sessionData = this.getSessionData();
        return sessionData ? sessionData.user : null;
    }

    destroySession() {
        localStorage.removeItem(this.sessionKey);
        localStorage.removeItem(this.authKey); // Legacy cleanup
    }

    logout() {
        this.destroySession();
        this.clearFailedAttempts();
        window.location.href = '../index.html';
    }

    // Failed Attempts Management
    recordFailedAttempt() {
        const attempts = this.getFailedAttempts();
        attempts.count++;
        attempts.lastAttempt = Date.now();
        
        if (attempts.count >= this.maxAttempts) {
            attempts.lockedUntil = Date.now() + this.lockoutDuration;
        }
        
        localStorage.setItem(this.attemptsKey, JSON.stringify(attempts));
    }

    getFailedAttempts() {
        try {
            const data = localStorage.getItem(this.attemptsKey);
            return data ? JSON.parse(data) : { count: 0, lastAttempt: 0, lockedUntil: 0 };
        } catch (e) {
            return { count: 0, lastAttempt: 0, lockedUntil: 0 };
        }
    }

    clearFailedAttempts() {
        localStorage.removeItem(this.attemptsKey);
    }

    isAccountLocked() {
        const attempts = this.getFailedAttempts();
        return attempts.lockedUntil > Date.now();
    }

    getRemainingLockoutTime() {
        const attempts = this.getFailedAttempts();
        return Math.max(0, attempts.lockedUntil - Date.now());
    }

    // Security Measures
    setupSecurityMeasures() {
        // Disable right-click context menu
        document.addEventListener('contextmenu', (e) => {
            if (this.isAdminPage()) {
                e.preventDefault();
            }
        });

        // Disable developer tools shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.isAdminPage()) {
                // Disable F12
                if (e.key === 'F12') {
                    e.preventDefault();
                }
                // Disable Ctrl+Shift+I
                if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                    e.preventDefault();
                }
                // Disable Ctrl+Shift+J
                if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                    e.preventDefault();
                }
                // Disable Ctrl+U
                if (e.ctrlKey && e.key === 'u') {
                    e.preventDefault();
                }
            }
        });

        // Monitor for developer tools
        this.monitorDevTools();

        // Setup session timeout warning
        this.setupSessionWarning();
    }

    isAdminPage() {
        return window.location.pathname.includes('admin-secret-portal');
    }

    monitorDevTools() {
        let devtools = { open: false };
        
        setInterval(() => {
            if (this.isAdminPage()) {
                const threshold = 200;
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    if (!devtools.open) {
                        devtools.open = true;
                        console.clear();
                        console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
                        console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 16px;');
                        console.log('%cUnauthorized access to this admin panel is prohibited.', 'color: red; font-size: 16px;');
                        
                        // Optional: Log security event
                        this.logSecurityEvent('devtools_opened');
                    }
                } else {
                    devtools.open = false;
                }
            }
        }, 500);
    }

    setupSessionWarning() {
        // Warn user 5 minutes before session expires
        const warningTime = 5 * 60 * 1000; // 5 minutes
        
        setInterval(() => {
            const sessionData = this.getSessionData();
            if (sessionData && this.isAdminPage()) {
                const timeUntilExpiry = sessionData.expires - Date.now();
                
                if (timeUntilExpiry <= warningTime && timeUntilExpiry > 0) {
                    this.showSessionWarning(Math.ceil(timeUntilExpiry / 60000));
                }
            }
        }, 60000); // Check every minute
    }

    showSessionWarning(minutesRemaining) {
        if (document.getElementById('session-warning')) return; // Already shown
        
        const warning = document.createElement('div');
        warning.id = 'session-warning';
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f59e0b;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10001;
            max-width: 300px;
        `;
        
        warning.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 0.5rem;">Session Expiring Soon</div>
            <div style="font-size: 0.875rem; margin-bottom: 1rem;">
                Your session will expire in ${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}. 
                Click to extend your session.
            </div>
            <button onclick="authManager.extendSession()" style="
                background: white; 
                color: #f59e0b; 
                border: none; 
                padding: 0.5rem 1rem; 
                border-radius: 0.25rem; 
                cursor: pointer;
                font-weight: 500;
            ">Extend Session</button>
        `;
        
        document.body.appendChild(warning);
        
        // Auto-remove after 30 seconds if not clicked
        setTimeout(() => {
            if (document.getElementById('session-warning')) {
                warning.remove();
            }
        }, 30000);
    }

    extendSession() {
        const sessionData = this.getSessionData();
        if (sessionData) {
            sessionData.expires = Date.now() + this.sessionTimeout;
            sessionData.lastActivity = Date.now();
            localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
            
            // Remove warning
            const warning = document.getElementById('session-warning');
            if (warning) warning.remove();
            
            // Show confirmation
            this.showNotification('Session extended successfully', 'success');
        }
    }

    scheduleSessionCheck() {
        // Check session every 5 minutes
        setInterval(() => {
            if (this.isAdminPage() && !this.checkSession()) {
                alert('Your session has expired. You will be redirected to the login page.');
                window.location.href = 'login.html';
            }
        }, 5 * 60 * 1000);
    }

    // Security Logging
    logSecurityEvent(event, details = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event,
            details,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // In a real implementation, this would send to a server
        console.log('Security Event:', logEntry);
        
        // Store locally for demo purposes
        const logs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
        logs.push(logEntry);
        
        // Keep only last 100 entries
        if (logs.length > 100) {
            logs.splice(0, logs.length - 100);
        }
        
        localStorage.setItem('securityLogs', JSON.stringify(logs));
    }

    getSecurityLogs() {
        return JSON.parse(localStorage.getItem('securityLogs') || '[]');
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.auth-notification');
        existing.forEach(n => n.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `auth-notification auth-notification-${type}`;
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

    // Password Validation
    validatePasswordStrength(password) {
        const requirements = {
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumbers: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        const score = Object.values(requirements).filter(Boolean).length;
        
        return {
            score,
            requirements,
            strength: score < 3 ? 'weak' : score < 5 ? 'medium' : 'strong'
        };
    }

    // Rate Limiting
    checkRateLimit(action, limit = 10, window = 60000) {
        const key = `rateLimit_${action}`;
        const now = Date.now();
        
        let attempts = JSON.parse(localStorage.getItem(key) || '[]');
        
        // Remove old attempts outside the window
        attempts = attempts.filter(timestamp => now - timestamp < window);
        
        if (attempts.length >= limit) {
            return false; // Rate limit exceeded
        }
        
        // Record this attempt
        attempts.push(now);
        localStorage.setItem(key, JSON.stringify(attempts));
        
        return true; // Within rate limit
    }
}

// Initialize authentication manager
document.addEventListener('DOMContentLoaded', function() {
    window.authManager = new AuthenticationManager();
});

// Add CSS animations
const authStyles = document.createElement('style');
authStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(authStyles);

