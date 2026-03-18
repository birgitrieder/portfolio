function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 *60 *1000)); // Add number of millisecods for days.
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
}

function getCookie(name) {
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        const cookiePair = cookieArray[i].trim().split("=");
        if (cookiePair[0] == name) {
            return cookiePair[1];
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const consentBox = document.getElementById('consentBox');
    const consentButton = document.getElementById('consentButton');

    if(getCookie('ga_consent') === 'true') {
        consentBox.style.display = 'none';
    }

    consentButton.addEventListener('click', () => {
        setCookie('ga_consent', 'true', 1);
        // Box ausblenden
        consentBox.style.display = 'none';
    });
});