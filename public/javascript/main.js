'use strict';

const scene = document.getElementById('joke');

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
        scene.innerHTML = `${joke.type}: ${joke.value}`;
    } catch (e){
        console.error(e);
        scene.innerHTML = `Error: default`;
    }
}