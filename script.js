//get all needed requirements
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const proceedBtn = document.getElementById('proceedBtn');
const requirementCheckbox = document.getElementById('allRequirementsMet');
const messageDiv = document.getElementById('message');
const strengthText = document.getElementById('strength-text');
const strengthBar = document.querySelector('.strength-bar');
const suggestionsList = document.getElementById('suggestions-list');

// requirement elements
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqLowercase = document.getElementById('req-lowercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

//requirement checker
let requirements = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
};

//special characters
const specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";
//check if requirements met
function checkPassword(password) {
    requirements.length = false;
    requirements.uppercase = false;
    requirements.lowercase = false;
    requirements.number = false;
    requirements.special = false;
    
    // length-8 characters
    if (password.length >= 8) {
        requirements.length = true;
    }
    //uppercase
    if (/[A-Z]/.test(password)) {
        requirements.uppercase = true;
    }
    //lowercase
    if (/[a-z]/.test(password)) {
        requirements.lowercase = true;
    }
    //number
    if (/[0-9]/.test(password)) {
        requirements.number = true;
    }
    //Special character

    for (let i = 0; i < password.length; i++) {
        if (specialChars.includes(password[i])) {
            requirements.special = true;
            break;
        }
    }
    
    return requirements;
}

function updateRequirementDisplay() {
    if (requirements.length) {
        reqLength.innerHTML = '✅ At least 8 characters';
        reqLength.style.color = '#4caf50';
    } else {
        reqLength.innerHTML = '❌ At least 8 characters';
        reqLength.style.color = '#f44336';
    }
    
    if (requirements.uppercase) {
        reqUppercase.innerHTML = '✅ At least 1 uppercase letter (A-Z)';
        reqUppercase.style.color = '#4caf50';
    } else {
        reqUppercase.innerHTML = '❌ At least 1 uppercase letter (A-Z)';
        reqUppercase.style.color = '#f44336';
    }
    
    if (requirements.lowercase) {
        reqLowercase.innerHTML = '✅ At least 1 lowercase letter (a-z)';
        reqLowercase.style.color = '#4caf50';
    } else {
        reqLowercase.innerHTML = '❌ At least 1 lowercase letter (a-z)';
        reqLowercase.style.color = '#f44336';
    }
    
    if (requirements.number) {
        reqNumber.innerHTML = '✅ At least 1 number (0-9)';
        reqNumber.style.color = '#4caf50';
    } else {
        reqNumber.innerHTML = '❌ At least 1 number (0-9)';
        reqNumber.style.color = '#f44336';
    }
    
    if (requirements.special) {
        reqSpecial.innerHTML = '✅ At least 1 special character (!@#$%^&*)';
        reqSpecial.style.color = '#4caf50';
    } else {
        reqSpecial.innerHTML = '❌ At least 1 special character (!@#$%^&*)';
        reqSpecial.style.color = '#f44336';
    }
}

function calculateStrength() {
    let metCount = 0;
    
    // Count how many requirements are met
    if (requirements.length) metCount++;
    if (requirements.uppercase) metCount++;
    if (requirements.lowercase) metCount++;
    if (requirements.number) metCount++;
    if (requirements.special) metCount++;
    
    let strengthLevel = '';
    let barWidth = '0%';
    let barColor = '';
    
    if (metCount === 0 || metCount === 1) {
        strengthLevel = 'Very Weak';
        barWidth = '20%';
        barColor = '#f44336'; // Red
    } else if (metCount === 2) {
        strengthLevel = 'Weak';
        barWidth = '40%';
        barColor = '#ff9800'; // Orange
    } else if (metCount === 3) {
        strengthLevel = 'Medium';
        barWidth = '60%';
        barColor = '#ffc107'; // Yellow
    } else if (metCount === 4) {
        strengthLevel = 'Strong';
        barWidth = '80%';
        barColor = '#4caf50'; // Light Green
    } else {
        strengthLevel = 'Very Strong';
        barWidth = '100%';
        barColor = '#2e7d32'; // Dark Green
    }
    
    // Update the strength meter
    strengthText.innerHTML = `Password strength: ${strengthLevel}`;
    strengthBar.style.width = barWidth;
    strengthBar.style.backgroundColor = barColor;
    strengthBar.style.transition = 'width 0.3s ease';
    
    return metCount;
}

function generateSuggestions() {
    let suggestions = [];
    
    if (!requirements.length) {
        suggestions.push('Add at least 3 more characters to reach 8 characters total');
    }
    
    if (!requirements.uppercase) {
        suggestions.push('Add at least one uppercase letter (A-Z)');
    }
    
    if (!requirements.lowercase) {
        suggestions.push('Add at least one lowercase letter (a-z)');
    }
    
    if (!requirements.number) {
        suggestions.push('Add at least one number (0-9)');
    }
    
    if (!requirements.special) {
        suggestions.push(`Add at least one special character from: ${specialChars.substring(0, 15)}...`);
    }
    
    // Example suggestions for a strong password
    if (requirements.length && requirements.uppercase && requirements.lowercase && 
        requirements.number && requirements.special) {
        suggestions.push('✓ Your password meets all requirements!');
        suggestions.push('Consider making it longer (12+ characters) for extra security');
        suggestions.push('Avoid using common words or personal information');
    }
    
    // Display suggestions
    if (suggestions.length === 0) {
        suggestionsList.innerHTML = '<li>Great! Your password is strong!</li>';
    } else {
        suggestionsList.innerHTML = suggestions.map(s => `<li>💡 ${s}</li>`).join('');
    }
}

function allRequirementsMet() {
    return requirements.length && requirements.uppercase && 
           requirements.lowercase && requirements.number && requirements.special;
}

function updateControls() {
    const allMet = allRequirementsMet();
    
    if (allMet) {
        requirementCheckbox.disabled = false;
        messageDiv.innerHTML = '<p style="color: #4caf50;">✓ All requirements met! Check the box to proceed.</p>';
    } else {
        requirementCheckbox.disabled = true;
        requirementCheckbox.checked = false;
        proceedBtn.disabled = true;
        messageDiv.innerHTML = '<p style="color: #f44336;"> Please meet all password requirements to proceed.</p>';
    }
    
    // Check if checkbox is checked
    if (requirementCheckbox.checked && allMet) {
        proceedBtn.disabled = false;
        messageDiv.innerHTML = '<p style="color: #4caf50;">✓ Ready to proceed! Your password is strong and secure.</p>';
    } else if (allMet) {
        proceedBtn.disabled = true;
    }
}

function handlePasswordInput() {
    const password = passwordInput.value;
    
    if (password === '') {
        // Reset everything if password is empty
        requirements.length = false;
        requirements.uppercase = false;
        requirements.lowercase = false;
        requirements.number = false;
        requirements.special = false;
        
        updateRequirementDisplay();
        calculateStrength();
        generateSuggestions();
        updateControls();
        return;
    }
    
    // Check the password requirements
    checkPassword(password);
    
    // Update the display
    updateRequirementDisplay();
    calculateStrength();
    generateSuggestions();
    updateControls();
}
//show/hide password
function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type');
    
    if (type === 'password') {
        passwordInput.setAttribute('type', 'text');
        togglePasswordBtn.innerHTML = 'Hide';
    } else {
        passwordInput.setAttribute('type', 'password');
        togglePasswordBtn.innerHTML = 'Show';
    }
}

function handleCheckboxChange() {
    if (requirementCheckbox.checked && allRequirementsMet()) {
        proceedBtn.disabled = false;
        messageDiv.innerHTML = '<p style="color: #4caf50;">✓ Password confirmed! You may proceed.</p>';
    } else {
        proceedBtn.disabled = true;
        if (allRequirementsMet()) {
            messageDiv.innerHTML = '<p style="color: #ff9800;">Please check the box to confirm your password meets requirements.</p>';
        }
    }
}

function handleProceed() {
    if (requirementCheckbox.checked && allRequirementsMet()) {
        messageDiv.innerHTML = '<p style="color: #4caf50;">Password accepted. You can now proceed.</p>';
        const container = document.querySelector('.container');
        container.style.transform = 'scale(1.02)';
        setTimeout(() => {
            container.style.transform = 'scale(1)';
        }, 300);
        
    } else {
        messageDiv.innerHTML = '<p style="color: #f44336;">❌ Please ensure all requirements are met and confirm with checkbox.</p>';
    }
}

passwordInput.addEventListener('input', handlePasswordInput);

togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

requirementCheckbox.addEventListener('change', handleCheckboxChange);

proceedBtn.addEventListener('click', handleProceed);

function initialize() {
    passwordInput.value = '';
    handlePasswordInput();
    
    togglePasswordBtn.innerHTML = 'Show';
    proceedBtn.disabled = true;
    requirementCheckbox.disabled = true;
    requirementCheckbox.checked = false;
    
    console.log('Password Strength Checker initialized');
}

initialize();