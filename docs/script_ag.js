// Antigravity Cards - Hover on desktop, click on touch devices
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