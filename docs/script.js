function initFlip() {
    flipCards = document.querySelectorAll('.flip-card-wrapper');
    flipCards.forEach(card => {

        let rotateYFrontValue = 0;
        let rotateYBackValue = -180;

        const flipButtons = card.querySelectorAll('.flip-button');
        flipButtons.forEach(btn => {

            btn.addEventListener('click', () => {
                const front = card.querySelector('.flip-card-front');
                const back = card.querySelector('.flip-card-back');

                rotateYFrontValue += 180;
                rotateYBackValue += 180;

                front.style.transform = `rotateY(${rotateYFrontValue}deg)`;
                back.style.transform = `rotateY(${rotateYBackValue}deg)`;
            });
        });
    });
}

async function createCards() {
    const response = await fetch('./projects.json');
    const projects = await response.json();

    projectsContainer = document.getElementById('projectsContainer');

    projects.forEach(project => {
        // Front side of the card.
        const frontHtml = `
            <div class="flip-card-front">
                <img src="${project.image}" alt="${project.alt}" />
                <h2>${project.title}</h2>
                <p>
                    ${project.text}
                </p>
                <p>${project.year}</p>
                <button class="flip-button">Details</button>
            </div>`;

        // Back side of the card.
        let techHtml = '';
        project.technologies.forEach(t => {
            techHtml += `
                <div><strong>${t.label}:</strong></div>
                <p>${t.value}</p>`;
        })

        const responsibilitiesHtml =
            project.responsibilities.length > 0
                ? `
                <h2>Verantwortlichkeiten</h2>
                <ul>
                    ${project.responsibilities
                        .map(item => `<li>${item}</li>`)
                        .join('')}
                </ul>
                `
                : '';

        const backHtml = `            
            <div class="flip-card-back">
                <div>
                    <h2>Technik</h2>
                    <div class="tech-list">
                        ${techHtml}
                    </div>
                    ${responsibilitiesHtml}
                </div>
                <button class="flip-button">Zurück</button>
            </div>
        `

        // Complete card.
        const cardHtml = `
            <div class="flip-card-wrapper">
                ${frontHtml}
                ${backHtml}
            </div>
        `

        projectsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
}

async function init() {
    await createCards();
    initFlip();
}

init();
