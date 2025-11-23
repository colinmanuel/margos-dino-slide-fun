class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    resume() {
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    play(type) {
        this.resume();
        switch (type) {
            case 'swap': this.playSwap(); break;
            case 'win': this.playWin(); break;
            case 'fail': this.playFail(); break;
        }
    }

    playSwap() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.1);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

        osc.start(t);
        osc.stop(t + 0.1);
    }

    playWin() {
        const t = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.type = 'triangle';
            osc.frequency.value = freq;

            const start = t + (i * 0.1);
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.2, start + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, start + 0.4);

            osc.start(start);
            osc.stop(start + 0.4);
        });
    }

    playFail() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.linearRampToValueAtTime(50, t + 0.5);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.5);

        osc.start(t);
        osc.stop(t + 0.5);
    }
}

class DinoPuzzle {
    constructor() {
        this.board = document.getElementById('puzzle-board');
        this.timerDisplay = document.getElementById('game-timer');
        this.messageDisplay = document.getElementById('game-message');

        this.state = null;
        this.pieces = [];
        this.gridSize = 3; // Default
        this.timerInterval = null;
        this.currentTime = 0;
        this.currentSwaps = 0;
        this.selectedPiece = null;
        this.isGameOver = false;

        // Audio
        this.audio = {
            swap: new Audio('assets/audio/swap.mp3')
        };
    }

    start(config) {
        this.state = config;
        this.isGameOver = false;
        this.selectedPiece = null;
        this.messageDisplay.classList.add('hidden');

        // Set Grid Size
        switch (config.difficulty) {
            case 'easy': this.gridSize = 3; break;
            case 'medium': this.gridSize = 4; break;
            case 'hard': this.gridSize = 8; break;
        }

        // Setup Board
        this.setupBoard();

        // Setup Limits
        if (config.limitType === 'time') {
            this.currentTime = config.limitValue;
            this.updateTimerDisplay();
            this.startTimer();
        } else {
            this.currentSwaps = config.limitValue;
            this.updateSwapDisplay();
        }
    }

    setupBoard() {
        this.board.innerHTML = '';
        this.board.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        this.board.style.gridTemplateRows = `repeat(${this.gridSize}, 1fr)`;

        this.pieces = [];
        const totalPieces = this.gridSize * this.gridSize;

        // Create pieces
        for (let i = 0; i < totalPieces; i++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.dataset.index = i; // Correct position
            piece.dataset.current = i; // Current position

            // Set background image and position
            piece.style.backgroundImage = `url(${this.state.selectedImage.src})`;
            piece.style.backgroundSize = `${this.gridSize * 100}% ${this.gridSize * 100}%`;

            const row = Math.floor(i / this.gridSize);
            const col = i % this.gridSize;

            piece.style.backgroundPosition = `${(col / (this.gridSize - 1)) * 100}% ${(row / (this.gridSize - 1)) * 100}%`;

            piece.addEventListener('click', () => this.handlePieceClick(piece));

            this.pieces.push(piece);
            this.board.appendChild(piece);
        }

        this.shuffleBoard();
    }

    shuffleBoard() {
        // Simple shuffle for now - ensuring solvability is complex, 
        // but for a swap-any-two puzzle (not sliding empty tile), ANY permutation is solvable by swapping.
        // The requirements describe "swap two squares by clicking them", which implies we can swap ANY two.
        // This is much easier than the 15-puzzle sliding logic.

        for (let i = this.pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swapPiecesInArray(i, j);
        }

        // Re-render order
        this.renderPieces();
    }

    swapPiecesInArray(indexA, indexB) {
        [this.pieces[indexA], this.pieces[indexB]] = [this.pieces[indexB], this.pieces[indexA]];
    }

    renderPieces() {
        this.board.innerHTML = '';
        this.pieces.forEach(piece => this.board.appendChild(piece));
    }

    handlePieceClick(piece) {
        if (this.isGameOver) return;

        if (!this.selectedPiece) {
            // Select first piece
            this.selectedPiece = piece;
            piece.classList.add('selected');
        } else if (this.selectedPiece === piece) {
            // Deselect
            this.selectedPiece.classList.remove('selected');
            this.selectedPiece = null;
        } else {
            // Swap
            this.swapPieces(this.selectedPiece, piece);
            this.selectedPiece.classList.remove('selected');
            this.selectedPiece = null;
        }
    }

    swapPieces(pieceA, pieceB) {
        // Visual swap in DOM
        const indexA = this.pieces.indexOf(pieceA);
        const indexB = this.pieces.indexOf(pieceB);

        this.swapPiecesInArray(indexA, indexB);
        this.renderPieces();

        this.playSound('swap');

        // Decrement swaps if in swap mode
        if (this.state.limitType === 'swaps') {
            this.currentSwaps--;
            this.updateSwapDisplay();
            if (this.currentSwaps <= 0 && !this.checkWin()) {
                this.gameOver(false);
                return;
            }
        }

        this.checkWin();
    }

    checkWin() {
        const isWin = this.pieces.every((piece, index) => {
            return parseInt(piece.dataset.index) === index;
        });

        if (isWin) {
            this.gameOver(true);
        }
        return isWin;
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            this.currentTime--;
            this.updateTimerDisplay();

            if (this.currentTime <= 0) {
                this.gameOver(false);
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const mins = Math.floor(this.currentTime / 60);
        const secs = this.currentTime % 60;
        this.timerDisplay.textContent = `Time: ${mins}:${secs.toString().padStart(2, '0')}`;
    }

    updateSwapDisplay() {
        this.timerDisplay.textContent = `Swaps Left: ${this.currentSwaps}`;
    }

    gameOver(win) {
        this.isGameOver = true;
        if (this.timerInterval) clearInterval(this.timerInterval);

        if (win) {
            window.dispatchEvent(new CustomEvent('dino-game-win'));
            // Alert moved to setTimeout to allow audio to start if handled elsewhere
            setTimeout(() => alert("Great job, Margo! You solved the puzzle!"), 100);
        } else {
            window.dispatchEvent(new CustomEvent('dino-game-lose'));
            setTimeout(() => alert(this.state.limitType === 'time' ? "Time's up, Margo!" : "No swaps left, Margo!"), 100);
        }
    }

    playSound(name) {
        this.soundManager.play(name);
    }
}

window.gameInstance = new DinoPuzzle();
