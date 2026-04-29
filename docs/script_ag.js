async function createCards() {
    const response = await fetch('./projects.json');
    const projects = await response.json();
    const projectsContainer = document.getElementById('projectsContainer');

    projects.forEach(project => {
        const techItems = project.technologies
            .map(t => `<li><strong>${t.label}:</strong> ${t.value}</li>`)
            .join('');

        const responsibilitiesHtml = project.responsibilities && project.responsibilities.length > 0
            ? `<h2>Verantwortlichkeiten</h2>
               <ul>${project.responsibilities.map(item => `<li>${item}</li>`).join('')}</ul>`
            : '';

        const cardHtml = `
            <div class="ag-card-wrapper">
                <div class="ag-card-inner">
                    <div class="ag-card-front glass-panel">
                        <div class="card-image-wrapper">
                            <img src="${project.image}" alt="${project.alt}" />
                        </div>
                        <div class="card-content">
                            <h2>${project.title}</h2>
                            <p>${project.text}</p>
                            <div class="card-meta">${project.year}</div>
                        </div>
                    </div>
                    <div class="ag-card-back glass-panel">
                        <div class="back-content">
                            <section class="back-column">
                                <h2>Technische Details</h2>
                                <ul>
                                    ${techItems}
                                </ul>
                                ${responsibilitiesHtml}
                            </section>
                        </div>
                    </div>
                </div>
            </div>`;

        projectsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
}

function initAntigravityCards() {
    const agCards = Array.from(document.querySelectorAll('.ag-card-wrapper'));
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function setCardFlipped(card, flipped) {
        const inner = card.querySelector('.ag-card-inner');
        card.isFlipped = flipped;
        inner.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }

    function resetOtherCards(currentCard) {
        agCards.forEach(card => {
            if (card !== currentCard && card.isFlipped) {
                setCardFlipped(card, false);
            }
        });
    }

    agCards.forEach(card => {
        card.isFlipped = false;

        if (supportsHover) {
            card.addEventListener('mouseenter', () => {
                resetOtherCards(card);
                setCardFlipped(card, true);
            });

            card.addEventListener('mouseleave', () => {
                setCardFlipped(card, false);
            });
        }

        card.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.flip-button');
            if (clickedButton) {
                return;
            }

            if (supportsHover) {
                return;
            }

            resetOtherCards(card);
            setCardFlipped(card, !card.isFlipped);
        });
    });
}

async function init() {
    await createCards();
    initAntigravityCards();
}

init();