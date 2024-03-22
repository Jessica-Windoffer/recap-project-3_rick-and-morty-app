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

// const searchQuery = "";

let page = 1;
let updatedPage = `?page=${page}`;

async function fetchCharacters(param) {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character${param}`
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

nextButton.addEventListener("click", async () => {
  if (page < maxPage) {
    page++;
    updatedPage = `?page=${page}`;
    pagination.textContent = `${page} / ${maxPage}`;
    const data = await fetchCharacters(updatedPage);
    render(data);
  }
});

prevButton.addEventListener("click", async () => {
  if (page > 1) {
    page--;
    updatedPage = `?page=${page}`;
    pagination.textContent = `${page} / ${maxPage}`;
    await fetchCharacters();
    const data = await fetchCharacters(updatedPage);
    render(data);
  }
});

function render(data) {
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

render(data);

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const searchQueryInput = Object.fromEntries(formData);
  const query = `?name=${searchQueryInput.query}`;
  // updatedPage = "";

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
