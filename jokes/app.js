const API_URL = "https://v2.jokeapi.dev/joke/Dark,Pun?type=single";

let joke = ""
const mainContainer = document.querySelector(".main-container");


async function fetchJoke() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        joke = data.joke;
        console.log(data);
        console.log(joke);
        loadJoke();

    } catch (error) {
        console.error("Error in fetching joke: ", error);

    }
}

function loadJoke() {
    mainContainer.innerHTML = `
            <h1 class="main-container" id="title">RANDOM JOKES</h1>
            <br>
            <p id="joke">${joke}</p>
            <br>
            <button class="getjoke" type="button" id="btn" onclick="fetchJoke()">Get a joke.</button>
    `;

}

// fetchJoke();

