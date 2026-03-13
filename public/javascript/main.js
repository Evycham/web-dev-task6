'use strict';


const scene = document.getElementById('joke');

const defaultJoke = {
    type: "Lustiger Spruch",
    value: "Fehler: Tastatur nicht angeschlossen. Bitte Taste F1 drücken!"
};

window.onload = getJoke;

setInterval(() => {
    getJoke();
}, 60_000)

async function getJoke(){
    try {
        const response = await fetch("/epigrams/random");
        if(!response.ok){
            throw new Error(`Error while getJoke: ${response.statusText} (${response.status})`);
        }
        const joke = await response.json();
        scene.textContent = `${joke.type}: ${joke.value}`;
    } catch (e){
        console.error(e);
        scene.textContent = `Da ein Fehler aufgetreten ist, ist hier ein default Witze: ${defaultJoke.type}: ${defaultJoke.value}`;
    }
}