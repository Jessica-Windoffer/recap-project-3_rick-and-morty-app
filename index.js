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
const searchQuery = "";

let page = 1;

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Not valid");
  }
  const data = await response.json();
  return data;
}

const data = await fetchCharacters();

const maxPage = data.info.pages;

pagination.textContent = `${page} / ${maxPage}`;

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    pagination.textContent = `${page} / ${maxPage}`;
    fetchCharacters();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    pagination.textContent = `${page} / ${maxPage}`;
    fetchCharacters();
  }
});

function render() {
  try {
    data.results.forEach((card) => {
      const newCard = CharacterCard(card);
      cardContainer.appendChild(newCard);
    });
  } catch (error) {
    const listElement = document.createElement("li");
    listElement.textContent = Error;
    cardContainer.appendChild(listElement);
  }
}

render();
