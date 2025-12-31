/* ============================================
   ANASTASIA'S NEW YEAR 2026 - JAVASCRIPT
   ============================================ */

// ============================================
// PAGE NAVIGATION
// ============================================

let currentPage = 1;
const totalPages = 6;
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentPageDisplay = document.querySelector('.current-page');

function updateNavigation() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    currentPageDisplay.textContent = currentPage;
}

function goToPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;

    const direction = pageNum > currentPage ? 1 : -1;

    pages.forEach((page, index) => {
        const pageIndex = index + 1;
        page.classList.remove('active', 'prev');

        if (pageIndex === pageNum) {
            page.classList.add('active');
        } else if (pageIndex < pageNum) {
            page.classList.add('prev');
        }
    });

    currentPage = pageNum;
    updateNavigation();

    // Trigger animations for specific pages
    if (currentPage === 2) {
        animateStats();
    }
}

prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToPage(currentPage + 1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPage(currentPage - 1);
    }
});

// ============================================
// STATS ANIMATION (Page 2)
// ============================================

let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * easeOut);

            stat.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

// ============================================
// TIER LIST DRAG & DROP (Page 3)
// ============================================

const gameCards = document.querySelectorAll('.game-card');
const tierGames = document.querySelectorAll('.tier-games');
const gamesPool = document.querySelector('.games-pool');

let draggedCard = null;

gameCards.forEach(card => {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
});

function handleDragStart(e) {
    draggedCard = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedCard = null;

    // Remove drag-over class from all containers
    tierGames.forEach(tier => tier.classList.remove('drag-over'));
    gamesPool.classList.remove('drag-over');
}

// Setup drop zones
[...tierGames, gamesPool].forEach(zone => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('dragenter', handleDragEnter);
    zone.addEventListener('dragleave', handleDragLeave);
    zone.addEventListener('drop', handleDrop);
});

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    if (draggedCard && draggedCard.parentNode !== this) {
        this.appendChild(draggedCard);
    }
}

// Touch support for mobile
gameCards.forEach(card => {
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('touchend', handleTouchEnd);
});

let touchStartX, touchStartY, touchedCard = null;

function handleTouchStart(e) {
    touchedCard = this;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    this.classList.add('dragging');
}

function handleTouchMove(e) {
    if (!touchedCard) return;
    e.preventDefault();

    const touch = e.touches[0];
    touchedCard.style.position = 'fixed';
    touchedCard.style.left = (touch.clientX - 50) + 'px';
    touchedCard.style.top = (touch.clientY - 20) + 'px';
    touchedCard.style.zIndex = '1000';
}

function handleTouchEnd(e) {
    if (!touchedCard) return;

    touchedCard.style.position = '';
    touchedCard.style.left = '';
    touchedCard.style.top = '';
    touchedCard.style.zIndex = '';
    touchedCard.classList.remove('dragging');

    // Find drop target
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropTarget) {
        const tierZone = dropTarget.closest('.tier-games') || dropTarget.closest('.games-pool');
        if (tierZone && tierZone !== touchedCard.parentNode) {
            tierZone.appendChild(touchedCard);
        }
    }

    touchedCard = null;
}

// ============================================
// HARRY POTTER QUIZ (Page 5)
// ============================================

const quizQuestions = [
    {
        question: "Not me, Not Hermione, ____.",
        options: ["U", "Uranus", "You", "Harry"],
        correct: 2, // You
        explanation: ""
    },
    {
        question: "Harry broke into a ____.",
        options: ["House", "House", "House", "House"],
        correct: 0, // All are house!
        explanation: ""
    },
    {
        question: "What did Hermione do to Draco Malfoy in Prisoner of Azkaban?",
        options: ["Slapped him lmao", "Punched him in the face", "Stole his hair", "Brackium Emendo"],
        correct: 1,
        explanation: ""
    },
    {
        question: "How does Draco say 'Potter'?",
        options: ["Potter", "Pottah baby", "PPPPottah", "Mr. Potter Sir"],
        correct: 2,
        explanation: ""
    },
    {
        question: "What is the name of the magical parchment Fred and George gave Harry?",
        options: ["The Moron's Map", "The Marauder's Map", "The Mischief Mama", "Google Maps Hogwarts Version"],
        correct: 1,
        explanation: ""
    },
    {
        question: "What happened to Vernon Dursley?",
        options: ["He stopped dead", "He dopped dead", "He dropped dead", "He cried"],
        correct: 1, // Yes, it's "dopped" 😂
        explanation: ""
    },
    {
        question: "Neville forgot something again, oops. What was it?",
        options: ["His homework", "The password", "Idk man something else", "All of the above"],
        correct: 3,
        explanation: ""
    },
    {
        question: "In Harry Potter and the Philosopher’s Stone, Ron recites a rhyme on the Hogwarts Express. What is the last line of the rhyme?",
        options: ["Make this dumbass rat disappear.", "Let this rat dop dead", "Turn this stupid, fat rat yellow.", "Change this rat to bright red fur."],
        correct: 2,
        explanation: ""
    },
    {
        question: "Who said 'It does not do to dwell on dreams and forget to live'?",
        options: ["Dumbledore", "Harry", "Me, probably", "A fortune cookie"],
        correct: 0,
        explanation: ""
    },
    {
        question: "What does Ron see in the Mirror of Erised?",
        options: ["Food, obviously", "Himself as Head Boy and Quidditch captain", "Hermione 👀", "A giant spider running away"],
        correct: 1,
        explanation: ""
    }
];

let currentQuestion = 0;
let score = 0;
let quizAnsweredQuestions = [];

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    quizAnsweredQuestions = [];
    showQuestion();
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
}

function showQuestion() {
    const container = document.getElementById('question-container');
    const q = quizQuestions[currentQuestion];

    container.innerHTML = `
        <div class="question">
            <p class="question-text">${currentQuestion + 1}. ${q.question}</p>
            <div class="options">
                ${q.options.map((opt, i) => `
                    <button class="option" data-index="${i}" onclick="selectAnswer(${i})">
                        ${String.fromCharCode(65 + i)}. ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    updateProgress();
}

function selectAnswer(index) {
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.option');

    // Disable all options
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    // Mark selected
    options[index].classList.add('selected');

    // Check if correct
    if (index === q.correct) {
        score++;
        options[index].classList.remove('selected');
        options[index].classList.add('correct');
    } else {
        options[index].classList.add('incorrect');
        options[q.correct].classList.add('correct');
    }

    // Show next question or results after delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function updateProgress() {
    const progressFill = document.getElementById('quiz-progress');
    const currentQ = document.getElementById('current-q');

    const percentage = ((currentQuestion + 1) / quizQuestions.length) * 100;
    progressFill.style.width = percentage + '%';
    currentQ.textContent = currentQuestion + 1;
}

function showResults() {
    document.getElementById('question-container').classList.add('hidden');
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('hidden');

    document.getElementById('final-score').textContent = score;

    let message = '';

    document.getElementById('score-message').textContent = message;
}

function resetQuiz() {
    initQuiz();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
});

// ============================================
// ADDITIONAL INTERACTIVE ELEMENTS
// ============================================

// Add sparkle effect to certain elements on hover
document.querySelectorAll('.achievement, .game-card').forEach(el => {
    el.addEventListener('mouseenter', createSparkle);
});

function createSparkle(e) {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: absolute;
        font-size: 1rem;
        pointer-events: none;
        animation: sparkleAnim 0.6s ease-out forwards;
    `;

    const rect = e.target.getBoundingClientRect();
    sparkle.style.left = (e.clientX - rect.left) + 'px';
    sparkle.style.top = (e.clientY - rect.top) + 'px';

    e.target.style.position = 'relative';
    e.target.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 600);
}

// Add sparkle animation to stylesheet
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(1.5) rotate(180deg) translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// ============================================
// CONFETTI BURST (Final Page)
// ============================================

function createConfettiBurst() {
    const colors = ['#dc143c', '#ffd700', '#ff6b6b', '#ffb3ba', '#ff1744'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: 50%;
            top: 50%;
            opacity: 1;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiBurst 1.5s ease-out forwards;
            --tx: ${(Math.random() - 0.5) * window.innerWidth}px;
            --ty: ${(Math.random() - 0.5) * window.innerHeight}px;
            --rotation: ${Math.random() * 720}deg;
        `;
        confettiContainer.appendChild(confetti);
    }

    // Add burst animation
    const burstStyle = document.createElement('style');
    burstStyle.textContent = `
        @keyframes confettiBurst {
            0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1; }
            100% { 
                transform: translate(
                    calc(-50% + var(--tx)), 
                    calc(-50% + var(--ty))
                ) rotate(var(--rotation)); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(burstStyle);

    setTimeout(() => {
        confettiContainer.remove();
        burstStyle.remove();
    }, 2000);
}

// Trigger confetti when reaching final page
let confettiFired = false;
const originalGoToPage = goToPage;
goToPage = function (pageNum) {
    originalGoToPage(pageNum);
    if (pageNum === 6 && !confettiFired) {
        confettiFired = true;
        setTimeout(createConfettiBurst, 500);
    }
};

// ============================================
// EASTER EGGS
// ============================================

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        createConfettiBurst();
        showEasterEggMessage();
    }
});

function showEasterEggMessage() {
    const msg = document.createElement('div');
    msg.innerHTML = '🎉 You found the secret! I love you, Anastasia! 💕';
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #dc143c, #8b0000);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-family: 'Dancing Script', cursive;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(220, 20, 60, 0.4);
        animation: popIn 0.5s ease-out;
    `;
    document.body.appendChild(msg);

    const popStyle = document.createElement('style');
    popStyle.textContent = `
        @keyframes popIn {
            0% { transform: translate(-50%, -50%) scale(0); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(popStyle);

    setTimeout(() => {
        msg.remove();
        popStyle.remove();
    }, 3000);
}

// Initialize
updateNavigation();
console.log('🎉 Happy New Year 2026, Anastasia! Made with 💕');
