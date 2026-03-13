'use strict'


const btnOpen = document.getElementById('btnOpen');
const btnClose = document.getElementById('btnClose');

const dialogMenu = document.getElementById('dialog');
const typeInput = document.getElementById('type');
const jokeInput = document.getElementById('joke-input');
const form = document.getElementById('form');
const messageBox = document.getElementById('message');
const newJoke = document.getElementById('new-joke');

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

async function addJoke(){
    try{
        if(!jokeInput.value || jokeInput.value.trim() === "" || !typeInput.value || typeInput.value === ""){
            throw new Error(`Error while addJoke!`);
        }

        let joke = {
          type: typeInput.value,
          value: jokeInput.value
        }

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
        typeInput.value = '';
        jokeInput.value = '';
        dialogMenu.close();
        showMessage();
        showLastJoke(joke.type, joke.value);
    } catch (err) {
        showMessage(err.message, 'error');
        console.error(err);
        typeInput.value = '';
        jokeInput.value = '';
        }
}

function showMessage(text, type){
    if(type === "error"){
        messageBox.classList.remove('success');
        messageBox.classList.add('error');
        messageBox.innerHTML = text;
    } else {
        messageBox.classList.remove('error');
        messageBox.classList.add('success');
        messageBox.innerHTML = "New joke was added successfully!";
    }
}

function showLastJoke(type, value){
    newJoke.innerHTML = `Your last added joke is: ${type}: ${value}`;
}