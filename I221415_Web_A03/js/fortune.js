const fortunes = [
    "Embrace change; it is the catalyst for your personal growth.",
    "Every step you take towards self-improvement is a victory.",
    "You have the power to shape your own destiny—believe in yourself.",
    "Financial abundance is on its way to you—prepare to receive it!",
    "Wise investments will lead to unexpected prosperity.",
    "A new source of income will soon present itself—stay alert.",
    "Cherish the moments with loved ones; they are the true treasures of life.",
    "A heartfelt conversation with a family member will strengthen your bond.",
    "Your unique style will inspire others—wear it with confidence!",
    "A bold fashion choice will lead to a memorable encounter."
];

function displayFortune() {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    document.getElementById('fortune').textContent = fortunes[randomIndex];
}

document.addEventListener('DOMContentLoaded', displayFortune);
