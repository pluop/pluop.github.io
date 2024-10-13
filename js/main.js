// Global variable to keep track of the current language
let currentLang = 'fr'; // Default language is French

// Switch language on button click
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = button.getAttribute('data-lang');
            currentLang = lang; // Set the global language
            switchLanguage(lang);
        });
    });
});

function switchLanguage(lang) {
    // Update all custom-text elements in the content
    const elements = document.querySelectorAll('.custom-text');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.textContent = text; 
        }
    });

    // Immediately update the title and description for the current section in view
    updateTitleAndDescriptionOnScroll();

    // Update the project list (top-right) with the new language
    updateProjectNav(lang);
}

// CHANGEMENT DU TITRE AVEC LE SCROLL
window.addEventListener('scroll', function() {
    updateTitleAndDescriptionOnScroll();
});

function updateTitleAndDescriptionOnScroll() {
    const sections = document.querySelectorAll('section');
    const title = document.getElementById('project-title');
    const description = document.getElementById('project-description');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 0 && rect.bottom > 0) {
            const newTitle = section.getAttribute(`data-title-${currentLang}`);
            const newShortDescription = section.getAttribute(`data-short-desc-${currentLang}`);
            
            // Fallback to French (default) if the selected language attributes are missing
            const fallbackTitle = section.getAttribute('data-title');
            const fallbackShortDescription = section.getAttribute('data-short-desc');

            // Set the title and description based on the current language, or fallback to French
            title.textContent = newTitle || fallbackTitle;
            description.textContent = newShortDescription || fallbackShortDescription;
        }
    });
}

// Update the project navigation (top-right) with the selected language
function updateProjectNav(lang) {
    const sections = document.querySelectorAll('section');
    const projectNav = document.getElementById('project-nav');
    projectNav.innerHTML = ''; // Clear the existing rows

    sections.forEach((section, index) => {
        const projectTitle = section.getAttribute(`data-title-${lang}`) || section.getAttribute('data-title');
        const projectDescription = section.getAttribute(`data-description-${lang}`) || section.getAttribute('data-description');
        const projectDate = section.getAttribute('data-date');

        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = projectDate;
        row.appendChild(dateCell);

        const titleCell = document.createElement('td');
        titleCell.textContent = projectTitle;
        row.appendChild(titleCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = projectDescription;
        row.appendChild(descriptionCell);

        row.addEventListener('click', function() {
            const targetSection = sections[index];
            const offsetTop = targetSection.offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });

        projectNav.appendChild(row);
    });
}

// Initial content load (default language)
window.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const title = document.getElementById('project-title');
    const description = document.getElementById('project-description');
    
    if (sections.length > 0) {
        title.textContent = sections[0].getAttribute('data-title');
        description.textContent = sections[0].getAttribute('data-short-desc');
    }

    // Create the initial project navigation (top-right)
    updateProjectNav(currentLang);
});
