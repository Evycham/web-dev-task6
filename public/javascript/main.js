'use strict';

const scene = document.getElementById('joke');
const dialogMenu = document.getElementById('dialog');
const typeInput = document.getElementById('type');
const jokeInput = document.getElementById('joke-input');
const form = document.getElementById('form');

const btnOpen = document.getElementById('btnOpen');
const btnClose = document.getElementById('btnClose');

btnOpen.addEventListener('click', (e) => {
    e.preventDefault();
    dialogMenu.showModal();
});

btnClose.addEventListener('click', (e) => {
    e.preventDefault();
    dialogMenu.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addJoke();
})

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

async function addJoke(){
    let joke = {
        type: typeInput.value,
        value: jokeInput.value
    }

    try {
        let response = await fetch("/epigrams", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(joke)
        });
        if (!response.ok) {
            throw new Error(`Error while addJoke: ${response.statusText} (${response.status})`);
        }
    } catch (err) {
        console.error(err);
    }
}
