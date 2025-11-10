const passwordInput = document.getElementById('password-input');
const submitButton = document.getElementById('submit-button');
const passwordContainer = document.getElementById('password-container');
const contentContainer = document.getElementById('content-container');
const envelopeCanvas = document.getElementById('envelope-canvas');
const letterContainer = document.getElementById('letter-container');

const correctPassword = '020620';

let isOpening = false;

submitButton.addEventListener('click', () => {
    if (passwordInput.value === correctPassword) {
        passwordContainer.style.display = 'none';
        contentContainer.style.display = 'flex';
        envelopeCanvas.style.opacity = 0;
        fadeIn(envelopeCanvas, 1000);
        drawEnvelope();
    } else {
        passwordInput.classList.add('incorrect-password-highlight');
        setTimeout(() => {
            passwordInput.classList.remove('incorrect-password-highlight');
        }, 500);
        passwordInput.value = '';
    }
});

passwordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitButton.click();
    }
});

envelopeCanvas.addEventListener('click', () => {
    if (!isOpening) {
        isOpening = true;
        openEnvelope();
    }
});

window.addEventListener('resize', () => {
    if (contentContainer.style.display === 'flex') {
        drawEnvelope();
    }
});

function drawEnvelope() {
    const ctx = envelopeCanvas.getContext('2d');
    envelopeCanvas.width = window.innerWidth;
    envelopeCanvas.height = window.innerHeight;
    ctx.clearRect(0, 0, envelopeCanvas.width, envelopeCanvas.height);

    const goldenRatio = 1.618;
    const envelopeWidth = 0.8 * window.innerWidth;
    const envelopeHeight = envelopeWidth / goldenRatio;
    const x = (envelopeCanvas.width / 2) - (envelopeWidth / 2);
    const y = (envelopeCanvas.height / 2) - (envelopeHeight / 2);

    ctx.fillStyle = '#f5deb3';
    ctx.fillRect(x + (envelopeWidth * 0.109375), y + (envelopeHeight * 0.34375), envelopeWidth * 0.78125, envelopeHeight * 0.46875);
    ctx.beginPath();
    ctx.moveTo(x + (envelopeWidth * 0.109375), y + (envelopeHeight * 0.34375));
    ctx.lineTo(x + (envelopeWidth * 0.5), y + (envelopeHeight * 0.65625));
    ctx.lineTo(x + (envelopeWidth * 0.890625), y + (envelopeHeight * 0.34375));
    ctx.closePath();
    ctx.fillStyle = '#d2b48c';
    ctx.fill();
}

const letterContent = {
    "paragraphs": [
        "So you want to feel seen…",
        "but what does that mean?",
        "",
        "Stumped pondering… long have I been",
        "",
        "I want to tell you how I feel",
        "so this, I will try to fulfill",
        "though writing is not my strongest skill:",
        "",
        "I love you",
        "you are my most precious thing",
        "My lover, my friend, my companion…",
        "you are everything to me",
        "",
        "You are beautiful… you are sweet…",
        "you give my life meaning",
        "and you make it worth living",
        "",
        "We may not always get along",
        "and that is mostly my fault",
        "but I know, it is with you where I belong",
        "",
        "As you can see",
        "writing is not for me",
        "but silly as this might be",
        "I am so happy that we’re a we",
    ]
};

function openEnvelope() {
    const showLetter = () => {
        letterContainer.innerHTML = '';

        letterContent.paragraphs.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            letterContainer.appendChild(p);
        });

        envelopeCanvas.style.display = 'none';
        letterContainer.style.display = 'block';
        fadeIn(letterContainer, 500);
    };

    fadeOut(envelopeCanvas, 500, showLetter);
}

function fadeIn(element, duration) {
    let opacity = 0;
    element.style.opacity = opacity;
    const interval = 1000 / 60;
    const increment = interval / duration;

    const animationInterval = setInterval(() => {
        opacity += increment;
        element.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(animationInterval);
        }
    }, interval);
}

function fadeOut(element, duration, callback) {
    let opacity = 1;
    element.style.opacity = opacity;
    const interval = 1000 / 60;
    const decrement = interval / duration;

    const animationInterval = setInterval(() => {
        opacity -= decrement;
        element.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(animationInterval);
            if (callback) callback();
        }
    }, interval);
}
