// App State
const state = {
    currentScreen: 'home-screen',
    selectedImage: null,
    difficulty: null, // 'easy', 'medium', 'hard'
    limitType: 'time', // 'time' or 'swaps'
    limitValue: 120, // seconds or count
};

// Background Music Manager
const bgm = {
    home: new Audio('assets/audio/app-background-music.mp3'),
    game: new Audio('assets/audio/app-gameplay-background-music.mp3'),
    success: new Audio('assets/audio/success.mp3'),
    fail: new Audio('assets/audio/fail.mp3'),
    current: null,

    init() {
        this.home.loop = true;
        this.game.loop = true;
        this.home.volume = 0.5;
        this.game.volume = 0.4;
        this.success.volume = 0.6;
        this.fail.volume = 0.6;
    },

    play(track) {
        if (this.current === track) return;

        // Fade out current
        if (this.current) {
            this.current.pause();
            this.current.currentTime = 0;
        }

        this.current = track;
        track.play().catch(e => console.log("Audio play failed (autoplay policy?)", e));
    },

    playHome() {
        this.play(this.home);
    },

    playGame() {
        this.play(this.game);
    },

    playWinSequence() {
        if (this.current) this.current.pause();
        this.current = null;

        this.success.currentTime = 0;
        this.success.play().then(() => {
            this.success.onended = () => {
                this.playHome();
            };
        }).catch(e => console.error("Success sound failed", e));
    },

    playFailSequence() {
        if (this.current) this.current.pause();
        this.current = null;

        this.fail.currentTime = 0;
        this.fail.play().then(() => {
            this.fail.onended = () => {
                this.playHome();
            };
        }).catch(e => console.error("Fail sound failed", e));
    }
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
    bgm.init();
    renderImageSelection();
    setupNavigation();
    setupLimitSelection();
    setupGameEvents();

    // Start music on first interaction
    document.body.addEventListener('click', () => {
        if (!bgm.current) bgm.playHome();
    }, { once: true });
}

function setupGameEvents() {
    window.addEventListener('dino-game-win', () => {
        bgm.playWinSequence();
    });

    window.addEventListener('dino-game-lose', () => {
        bgm.playFailSequence();
    });
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
        bgm.playGame();
        startGame();
    } else if (screenId === 'home-screen') {
        bgm.playHome();
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
