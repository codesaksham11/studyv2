const card = document.querySelector(".card");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const flipBtn = document.getElementById("flip-btn");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const refreshBtn = document.getElementById("refresh-btn");

let flashcards = [];
let currentIndex = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadFlashcards() {
    const selectedChapters = JSON.parse(localStorage.getItem("selectedChapters") || "[]");
    flashcards = [];

    selectedChapters.forEach(({ subject, chapter }) => {
        const script = document.createElement("script");
        script.src = `flashcards/${subject.toLowerCase()}/${chapter.toLowerCase().replace(/ /g, "-")}.js`;
        script.onload = () => {
            flashcards = flashcards.concat(window[`${subject}_${chapter.replace(/ /g, "_")}`]);
            if (flashcards.length > 0) displayCard();
        };
        document.body.appendChild(script);
    });
}

function displayCard() {
    if (flashcards.length === 0) return;
    const { front: f, back: b } = flashcards[currentIndex];
    front.innerHTML = typeof f === "string" ? f : `<img src="${f}" alt="Front">`;
    back.innerHTML = typeof b === "string" ? b : `<img src="${b}" alt="Back">`;
    card.classList.remove("flipped");
}

flipBtn.addEventListener("click", () => {
    card.classList.toggle("flipped");
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard();
});

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

refreshBtn.addEventListener("click", () => {
    flashcards = shuffle([...flashcards]);
    currentIndex = 0;
    displayCard();
});

loadFlashcards();
