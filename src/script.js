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