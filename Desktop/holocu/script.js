let score = loadScore();
let energy = 150;
const maxEnergy = 150;
const scoreElement = document.getElementById('score');
const goldenImage = document.getElementById('golden-image');
const rankText = document.getElementById('rank-text');
const energyElement = document.getElementById('energy');
const energyBar = document.getElementById('energy-bar');
const bodyElement = document.body;

scoreElement.textContent = score;

function handleClick() {
    if (energy > 0) {
        score++;
        energy--;
        scoreElement.textContent = score;
        energyElement.textContent = energy;
        updateEnergyBar();
        updateRankText(score);
        saveScore(score);
        goldenImage.style.transform = 'scale(0.9)';
        setTimeout(() => {
            goldenImage.style.transform = 'scale(1)';
        }, 100);
    }
}

function updateRankText(score) {
    if (score < 1000) {
        rankText.innerHTML = 'لیگ آب 💧'; // اضافه کردن ایموجی آب
        bodyElement.style.background = 'linear-gradient(180deg, #000000, #00bfff)';
        energyBar.style.backgroundColor = '#00bfff'; /* رنگ نوار شارژ برای لیگ آب */
    } else if (score < 2000) {
        rankText.innerHTML = 'لیگ باد 🌀'; // اضافه کردن ایموجی باد
        bodyElement.style.background = 'linear-gradient(180deg, #000000, #87ceeb)';
        energyBar.style.backgroundColor = '#87ceeb'; /* رنگ نوار شارژ برای لیگ باد */
    } else if (score < 3000) {
        rankText.innerHTML = 'لیگ آتش 🔥'; // اضافه کردن ایموجی آتش
        bodyElement.style.background = 'linear-gradient(180deg, #000000, #ff4500)';
        energyBar.style.backgroundColor = '#ff4500'; /* رنگ نوار شارژ برای لیگ آتش */
    } else {
        rankText.innerHTML = 'لیگ خاک 🌍'; // اضافه کردن ایموجی خاک
        bodyElement.style.background = 'linear-gradient(180deg, #000000, #8b4513)';
        energyBar.style.backgroundColor = '#8b4513'; /* رنگ نوار شارژ برای لیگ خاک */
    }
}

function updateEnergyBar() {
    const energyPercentage = (energy / maxEnergy) * 100;
    energyBar.style.width = energyPercentage + '%';
}

// شارژ انرژی هر دو ثانیه یک واحد تا رسیدن به 150
setInterval(() => {
    if (energy < maxEnergy) {
        energy++;
        energyElement.textContent = energy;
        updateEnergyBar();
    }
}, 2000);

// نمایش پیام خاص وقتی انرژی به 0 رسید
function showSpecialMessage() {
    goldenImage.textContent = "صلوات شما به حد نصاب رسید";
    goldenImage.classList.add('special-message');
    setTimeout(() => {
        goldenImage.textContent = "هولوکاست";
        goldenImage.classList.remove('special-message');
    }, 3000);
}

// نظارت بر انرژی و نمایش پیام خاص
setInterval(() => {
    if (energy === 0) {
        showSpecialMessage();
    }
}, 1000);

// ذخیره‌سازی امتیاز
function saveScore(score) {
    localStorage.setItem('userScore', score);
}

// بازیابی امتیاز
function loadScore() {
    return parseInt(localStorage.getItem('userScore')) || 0;
}

// به‌روزرسانی رنگ پس‌زمینه و متن لیگ هنگام بارگذاری صفحه
updateRankText(score);
updateEnergyBar();
