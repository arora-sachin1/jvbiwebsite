document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    searchBtn.addEventListener('click', function() {
        if (searchInput.style.display === 'none' || searchInput.style.display === '') {
            searchInput.style.display = 'inline-block';
            searchInput.focus();
        } else {
            searchInput.style.display = 'none';
        }
    });

    // Accessibility buttons for font size control
    const buttons = document.querySelectorAll('.accessibility-btn');
    const body = document.body;
    let currentFontSize = 16; // default font size in px

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.textContent.trim();
            if (text === 'A+') {
                if (currentFontSize < 24) {
                    currentFontSize += 2;
                    body.style.fontSize = currentFontSize + 'px';
                }
            } else if (text === 'A') {
                currentFontSize = 16;
                body.style.fontSize = currentFontSize + 'px';
            } else if (text === 'A-') {
                if (currentFontSize > 12) {
                    currentFontSize -= 2;
                    body.style.fontSize = currentFontSize + 'px';
                }
            } else if (text === 'Screen Reader') {
                alert('Screen Reader functionality is not implemented yet.');
            }
        });
    });

    // Pagination and filtering combined for Programmes We Offer section
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProgrammeCards = Array.from(document.querySelectorAll('.programme-card'));
    const paginationContainer = document.querySelector('.programmes-pagination');
    const cardsPerPage = 4;
    let currentPage = 0;
    let currentDegree = 'master';
    let filteredCards = [];

    function renderPagination(numPages) {
        paginationContainer.innerHTML = '';
        for (let i = 0; i < numPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i !== 0) dot.classList.add('inactive');
            dot.addEventListener('click', () => {
                showPage(i);
            });
            paginationContainer.appendChild(dot);
        }
    }

    function showPage(page) {
        currentPage = page;
        const start = page * cardsPerPage;
        const end = start + cardsPerPage;
        filteredCards.forEach((card, index) => {
            card.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
        const dots = paginationContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === page) {
                dot.classList.remove('inactive');
            } else {
                dot.classList.add('inactive');
            }
        });
    }

    function filterProgrammes(degree) {
        currentDegree = degree;
        filterButtons.forEach(btn => {
            if (btn.dataset.degree === degree) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        filteredCards = allProgrammeCards.filter(card => card.dataset.degree === degree);
        // Hide all cards initially
        allProgrammeCards.forEach(card => {
            card.style.display = 'none';
        });
        renderPagination(Math.ceil(filteredCards.length / cardsPerPage));
        showPage(0);
    }

    // Initialize
    filterProgrammes(currentDegree);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterProgrammes(button.dataset.degree);
        });
    });

    // Tab functionality for Academic Events section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const infoCards = document.querySelectorAll('.events-section .info-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const degree = button.getAttribute('data-degree');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            infoCards.forEach(card => {
                if (card.getAttribute('data-degree') === degree) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
