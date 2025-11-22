// App State
const state = {
    currentScreen: 'home-screen',
    selectedImage: null,
    difficulty: null, // 'easy', 'medium', 'hard'
    limitType: 'time', // 'time' or 'swaps'
    limitValue: 120, // seconds or count
};

// DOM Elements
const screens = document.querySelectorAll('.screen');
const imageGrid = document.getElementById('image-selection-grid');
const limitToggleBtns = document.querySelectorAll('.toggle-btn');
const limitOptions = document.querySelectorAll('.limit-options');
const limitOptionBtns = document.querySelectorAll('.btn-option');

// Constants
const IMAGES = [
    { id: 'dino1', src: 'assets/images/dino1.png', label: 'Volcano Dino' },
    { id: 'dino2', src: 'assets/images/dino2.png', label: 'Forest Family' },
    { id: 'dino3', src: 'assets/images/dino3.png', label: 'Jungle Friends' },
    { id: 'dino4', src: 'assets/images/dino4.png', label: 'Dino Battle' },
];

// Initialization
function initApp() {
    renderImageSelection();
    setupNavigation();
    setupLimitSelection();
}

// Render Image Selection Grid
function renderImageSelection() {
    imageGrid.innerHTML = IMAGES.map(img => `
        <div class="image-card" data-id="${img.id}" data-src="${img.src}">
            <img src="${img.src}" alt="${img.label}">
            <span>${img.label}</span>
        </div>
    `).join('');

    document.querySelectorAll('.image-card').forEach(card => {
        card.addEventListener('click', () => {
            state.selectedImage = {
                id: card.dataset.id,
                src: card.dataset.src
            };
            navigateTo('difficulty-screen');
        });
    });
}

// Navigation
function navigateTo(screenId) {
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.remove('hidden');
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        }
    });
    state.currentScreen = screenId;

    if (screenId === 'game-screen') {
        startGame();
    }
}

function setupNavigation() {
    // Back buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.target);
        });
    });

    // Home buttons
    document.querySelectorAll('.btn-home').forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo('home-screen');
        });
    });

    // Difficulty Selection
    document.querySelectorAll('[data-difficulty]').forEach(btn => {
        btn.addEventListener('click', () => {
            state.difficulty = btn.dataset.difficulty;
            navigateTo('limit-screen');
        });
    });
}

// Limit Selection Logic
function setupLimitSelection() {
    // Toggle between Time and Swaps
    limitToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            limitToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            state.limitType = btn.dataset.mode;
            
            limitOptions.forEach(opt => {
                if (opt.id === `${state.limitType}-options`) {
                    opt.classList.remove('hidden');
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                    opt.classList.add('hidden');
                }
            });
        });
    });

    // Select Limit Value
    limitOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Visual feedback
            limitOptionBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            state.limitValue = parseInt(btn.dataset.limit);
            
            // Small delay to show selection before starting
            setTimeout(() => {
                navigateTo('game-screen');
            }, 300);
        });
    });
}

// Start Game Bridge
function startGame() {
    if (window.gameInstance) {
        window.gameInstance.start(state);
    } else {
        console.error("Game module not loaded");
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', initApp);
