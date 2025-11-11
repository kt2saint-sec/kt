// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active navigation item
        updateActiveNav(sectionId);
    }
    return false;
}

// Update active navigation item
function updateActiveNav(sectionId) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to current nav item
    const activeItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Track scroll position and update active navigation
window.addEventListener('scroll', () => {
    const sections = ['home', 'about', 'experience', 'certifications', 'payments', 'contacts'];
    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                updateActiveNav(sectionId);
                break;
            }
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav item
    updateActiveNav('home');

    // Prevent default anchor behavior
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            scrollToSection(sectionId);
        });
    });
});