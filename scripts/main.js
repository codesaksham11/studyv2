const subjects = {
    Chemistry: [
        "Atomic structure", "Classification of elements", "Chemical bonding and shape", "Oxidation reduction",
        "States of matter", "Chemical equilibrium", "Hydrogen", "Oxygen", "Nitrogen", "Halogen", "Carbon",
        "Phosphorus", "Sulphur", "Metallurgy", "Alkali earth metal", "Alkaline earth metal", "Sodium postassium pump",
        "Sodium glucose pump", "Basic inorganic", "Isomerism", "Alkane", "Alkene", "Alkyne", "Benzene",
        "Manufacturing of chemicals", "Fertilizer", "Foreign element"
    ],
    Physics: [
        "Kinematics", "Dynamics", "Work energy and power", "Circular motion", "Gravitaion", "Elasticity",
        "Heat and temperature", "Thermal expansion", "Rate of heat flow", "Quantity of heat energy", "Ideal gas",
        "Reflection if curve mirror", "Refraction and plane surface", "Refraction through prism", "Lenses",
        "Dispersion", "Electric charge", "Electric field", "Potential energy", "Capacitor", "Nuclear physics",
        "Direct current (DC)", "Solids", "Recent trend in physics"
    ],
    Nepali: ["Author"],
    English: ["Authors", "Word meaning"],
    Math: [
        "Logic and set", "Real number", "Function", "Curve sketching", "Sequence and series", "Matrix",
        "Qadratic", "Complex number", "Trigonometry", "Analytical Geometry", "Coordinate in space", "Vectors",
        "Statistics", "Limit", "Derivate", "Integration", "Numerical computation", "Numerical integration",
        "Statistics", "Dynamic"
    ],
    Biology: [
        "Bio molecules", "Cell", "Fungi", "Lichen", "Algae", "Bryophyta", "Pteridophytes", "Gymnosperm",
        "Angiosperms", "Monera", "Virus", "Ecosystem", "Ecological adaptation", "Ecological imbalances",
        "Vegetation", "Life and it's orgin", "Evidence of evolution", "Theories of evolution", "Human evolution",
        "Protista", "Animlia", "Earthworm", "Frog", "Animal adaptation", "Animal behaviour", "Environmental pollution",
        "Conservativation biology", "Wildlife"
    ]
};

const container = document.getElementById("subjects-container");
const startBtn = document.getElementById("start-btn");

Object.keys(subjects).forEach(subject => {
    const subjectDiv = document.createElement("div");
    subjectDiv.className = "subject";
    subjectDiv.innerHTML = `<h2>${subject}</h2>`;
    
    subjects[subject].forEach(chapter => {
        const chapterDiv = document.createElement("div");
        chapterDiv.className = "chapter";
        chapterDiv.innerHTML = `
            <input type="checkbox" id="${subject}-${chapter}" name="${chapter}">
            <label for="${subject}-${chapter}">${chapter}</label>
        `;
        subjectDiv.appendChild(chapterDiv);
    });
    
    container.appendChild(subjectDiv);
});

document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const checked = document.querySelectorAll("input[type='checkbox']:checked").length > 0;
        startBtn.disabled = !checked;
    });
});

startBtn.addEventListener("click", () => {
    const selectedChapters = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
        .map(cb => ({
            subject: cb.id.split("-")[0],
            chapter: cb.name
        }));
    localStorage.setItem("selectedChapters", JSON.stringify(selectedChapters));
    window.location.href = "flashcards.html";
});
