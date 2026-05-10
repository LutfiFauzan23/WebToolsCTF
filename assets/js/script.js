/* ============================================
   BURGER MENU & SIDEBAR TOGGLE
   ============================================ */

const burgerMenu = document.getElementById('burgerMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
    burgerMenu.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

burgerMenu.addEventListener('click', toggleSidebar);

// Close sidebar when clicking overlay
overlay.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar when clicking a link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            burgerMenu.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

/* ============================================
   ACTIVE NAV ITEM TRACKING
   ============================================ */

function setActiveNavItem() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(currentPath) || 
            (currentPath === '/' && item.getAttribute('href') === 'index.html')) {
            item.classList.add('active');
        }
    });
}

setActiveNavItem();

/* ============================================
   COPY BUTTON FUNCTIONALITY
   ============================================ */

function initializeCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const codeBlock = this.parentElement.querySelector('.command-code');
            const text = codeBlock.textContent;

            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = '✓ Copied';
                this.classList.add('copied');

                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                this.textContent = 'Error';
            });
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeCopyButtons);

/* ============================================
   SEARCH & FILTER FUNCTIONALITY
   ============================================ */

function initializeSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const commandBlocks = document.querySelectorAll('.command-block');

        commandBlocks.forEach(block => {
            const title = block.querySelector('.command-title')?.textContent.toLowerCase() || '';
            const description = block.querySelector('.command-description')?.textContent.toLowerCase() || '';
            const code = block.querySelector('.command-code')?.textContent.toLowerCase() || '';
            const tags = Array.from(block.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase()).join(' ');

            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) || 
                           code.includes(searchTerm) || 
                           tags.includes(searchTerm);

            if (matches || searchTerm === '') {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeSearch);

/* ============================================
   TAG FILTERING
   ============================================ */

function initializeTagFiltering() {
    const tags = document.querySelectorAll('.tag:not(.tag-filter)');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const filterTag = this.textContent.toLowerCase().trim();
            const commandBlocks = document.querySelectorAll('.command-block');

            commandBlocks.forEach(block => {
                const blockTags = Array.from(block.querySelectorAll('.tag'))
                    .map(t => t.textContent.toLowerCase().trim());

                if (blockTags.includes(filterTag)) {
                    block.classList.remove('hidden');
                } else {
                    block.classList.add('hidden');
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeTagFiltering);

/* ============================================
   KEYBOARD SHORTCUTS
   ============================================ */

document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + K for search focus
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to close sidebar
    if (event.key === 'Escape') {
        if (sidebar.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
});

/* ============================================
   SMOOTH SCROLL
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ============================================
   CONSOLE LOG
   ============================================ */

console.log('%cCTF Notes', 'color: #58a6ff; font-size: 20px; font-weight: bold;');
console.log('%cYour personal cybersecurity knowledge base', 'color: #c9d1d9; font-size: 14px;');
console.log('%cKeyboard shortcuts:\n• Ctrl+K (or Cmd+K): Focus search\n• Escape: Close sidebar', 'color: #f78166; font-size: 12px;');
