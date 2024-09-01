// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to load language content
function loadLanguageContent() {
    const lang = getQueryParam('lang') || 'en'; // Default to 'en' if no parameter
    const content = {
        en: {
            title: 'Welcome to MentorCorp',
            home: 'Home',
            services: 'Services',
            magazine: 'Magazine',
            about: 'About_Us',
            contact: 'Contact',
            placeholderName: 'Your Name',
            placeholderEmail: 'Your Email',
            placeholderMessage: 'Your Message',
            submitButton: 'Send Message',
        },
        az: {
            title: 'MentorCorp-a Xoş Gəlmisiniz',
            home: 'Ana_Səhifə',
            services: 'Xidmətlər',
            magazine: 'Jurnal',
            about: 'Haqqımızda',
            contact: 'Əlaqə',
            placeholderName: 'Adınız',
            placeholderEmail: 'Emailiniz',
            placeholderMessage: 'Mesajınız',
            submitButton: 'Mesaj Göndər',
        }
    };

    // Get content for the selected language
    const selectedContent = content[lang] || content.en;

    // Update page content
    try {
        document.title = selectedContent.title;

        // Use optional chaining to prevent errors if elements are not found
        const h1 = document.querySelector('h1');
        if (h1) h1.textContent = selectedContent.title;

        const navHome = document.querySelector('nav .homes');
        if (navHome) navHome.textContent = selectedContent.home;

        const navServices = document.querySelector('nav .services');
        if (navServices) navServices.textContent = selectedContent.services;

        const navMagazine = document.querySelector('nav .magazines');
        if (navMagazine) navMagazine.textContent = selectedContent.magazine;

        const navAbout = document.querySelector('nav .aboutus');
        if (navAbout) navAbout.textContent = selectedContent.about;

        const navContact = document.querySelector('nav .contacts');
        if (navContact) navContact.textContent = selectedContent.contact;

        const inputName = document.querySelector('input#name');
        if (inputName) inputName.setAttribute('placeholder', selectedContent.placeholderName);

        const inputEmail = document.querySelector('input#email');
        if (inputEmail) inputEmail.setAttribute('placeholder', selectedContent.placeholderEmail);

        const textareaMessage = document.querySelector('textarea#message');
        if (textareaMessage) textareaMessage.setAttribute('placeholder', selectedContent.placeholderMessage);

        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) submitButton.textContent = selectedContent.submitButton;

    } catch (error) {
        console.error('Error updating content:', error);
    }
}


// Load content when the page is loaded
window.onload = loadLanguageContent;
document.addEventListener('DOMContentLoaded', () => {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function updateLanguageVisibility() {
        const lang = getQueryParam('lang') || 'en'; // Default to 'en' if no parameter
        const enFlag = document.getElementById('lang-en');
        const azFlag = document.getElementById('lang-az');

        if (lang === 'en') {
            if (enFlag) enFlag.classList.remove('hidden');
            if (azFlag) azFlag.classList.add('hidden');
        } else if (lang === 'az') {
            if (azFlag) azFlag.classList.remove('hidden');
            if (enFlag) enFlag.classList.add('hidden');
        } else {
            // Default case
            if (enFlag) enFlag.classList.remove('hidden');
            if (azFlag) azFlag.classList.remove('hidden');
        }
    }

    updateLanguageVisibility();
});



document.addEventListener('DOMContentLoaded', () => {
    function isMobileDevice() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    function showMobileMessage() {
        if (isMobileDevice()) {
            alert("This site is not available on mobile devices.");
            // Optionally, you can redirect the user or display a message in the page
            // window.location.href = "http://example.com";
            // or
            // document.body.innerHTML = "<p>This site is not available on mobile devices.</p>";
        }
    }

    showMobileMessage();
});


document.addEventListener('DOMContentLoaded', () => {
    function isMobileDevice() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    function showMobileMessage() {
        if (isMobileDevice()) {
            const message = document.createElement('div');
            message.className = 'mobile-message';
            message.innerHTML = "<p>This site is not available on mobile devices.</p>";
            document.body.appendChild(message);
            // Optionally hide the rest of the content
            document.body.style.display = 'none';
        }
    }

    showMobileMessage();
});



