// Menu Component
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
});

function initializeMenu() {
    // Setup submenu toggle
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    hasSubmenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            this.classList.toggle('expanded');
        });
    });

    // Setup menu item activation
    const menuLinks = document.querySelectorAll('.menu-link:not(.has-submenu), .submenu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all menu items
            menuLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');

            // If it's a submenu item, make sure parent menu is expanded
            if (this.classList.contains('submenu-link')) {
                this.closest('.submenu').style.display = 'block';
                this.closest('.menu-item').querySelector('.has-submenu').classList.add('expanded');
            }

            // Get section to display
            const section = this.getAttribute('data-section');
            if (section) {
                loadPage(section);
            }
        });
    });

    // Initialize with dashboard active
    const section = window.location.hash.slice(1) || 'dashboard';
    loadPage(section);
}

function loadPage(section) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.style.display = 'none');

    // Show selected section
    const selectedSection = document.getElementById(section);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Update URL hash
    window.location.hash = '#' + section;
}