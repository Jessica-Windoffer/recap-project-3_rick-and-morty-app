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

const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters(query = "") {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character${query}`
  );
  if (!response.ok) {
    throw new Error("Not valid");
  }
  const data = await response.json();
  return data;
}

async function render() {
  try {
    const data = await fetchCharacters();
    data.results.forEach((card) => {
      const newCard = CharacterCard(card);
      cardContainer.appendChild(newCard);
    });
  } catch (error) {
    const listElement = document.createElement("li");
    listElement.textContent = "Error";
    cardContainer.appendChild(listElement);
  }
}

render();

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const searchQueryInput = Object.fromEntries(formData);
  const query = `?name=${searchQueryInput.query}`;

  try {
    const data = await fetchCharacters(query);

    data.results.forEach((card) => {
      const newCard = CharacterCard(card);
      cardContainer.appendChild(newCard);
    });
  } catch (error) {
    const listElement = document.createElement("li");
    listElement.textContent = "Error";
    cardContainer.appendChild(listElement);
  }
});
