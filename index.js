import CharacterCard from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch("https://rickandmortyapi.com/api/character");
  if (!response.ok) {
    throw new Error("Not valid");
  }
  const data = await response.json();
  return data;
}

const data = await fetchCharacters();
console.log(data.results[0].name);

function render() {
  try {
    data.results.forEach((card) => {
      const newCard = CharacterCard(card);
      cardContainer.appendChild(newCard);
    });
  } catch (error) {
    listElement = document.createElement("li");
    listElement.textContent = "Not valid.";
    cardContainer.appendChild(listElement);
  }
}

render();
