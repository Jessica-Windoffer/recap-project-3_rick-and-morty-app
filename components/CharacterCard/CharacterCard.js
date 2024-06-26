export default function CharacterCard(card) {
  const list = document.createElement("li");
  list.classList.add("card");

  list.innerHTML = `
    <div class="card__image-container">
        <img
            class="card__image"
            src=${card.image}
            alt=${card.name}
        />
        <div class="card__image-gradient"></div>
        </div>
        <div class="card__content">
        <h2 class="card__title">${card.name}</h2>
        <dl class="card__info">
            <dt class="card__info-title">Status</dt>
            <dd class="card__info-description">${card.status}</dd>
            <dt class="card__info-title">Type</dt>
            <dd class="card__info-description">${card.type}</dd>
            <dt class="card__info-title">Occurrences</dt>
            <dd class="card__info-description">${card.episode.length}</dd>
        </dl>
    </div>`;
  return list;
}
