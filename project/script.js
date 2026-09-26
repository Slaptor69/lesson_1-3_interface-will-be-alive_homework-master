"use strict";

const cards = document.querySelectorAll(".collection-card");
const detailsPanel = document.querySelector(".details-panel");
const detailsTitle = document.querySelector("#details-title");
const detailsDescription = document.querySelector("#details-description");
const filterButtons = document.querySelectorAll(".filter-button");
const visibleCount = document.querySelector("#visible-count");
const randomButton = document.querySelector("#random-button");
const resetButton = document.querySelector("#reset-button");
const initialTitle = detailsTitle.textContent;
const initialDescription = detailsDescription.textContent.trim();

function selectCard(card) {
  cards.forEach((item) => {
    const isSelected = item === card;
    item.classList.toggle("collection-card--selected", isSelected);
    item.setAttribute("aria-pressed", String(isSelected));
  });

  detailsTitle.textContent = card.dataset.title;
  detailsDescription.textContent = card.dataset.description;

  detailsPanel.classList.remove("details-panel--pulse");
  // Даём браузеру применить удаление класса перед повторным запуском анимации.
  void detailsPanel.offsetWidth;
  detailsPanel.classList.add("details-panel--pulse");
}

cards.forEach((card) => {
  card.addEventListener("click", () => selectCard(card));
});

function clearSelection() {
  cards.forEach((card) => {
    card.classList.remove("collection-card--selected");
    card.setAttribute("aria-pressed", "false");
  });

  detailsTitle.textContent = initialTitle;
  detailsDescription.textContent = initialDescription;
  detailsPanel.classList.remove("details-panel--pulse");
}

function applyFilter(filter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("filter-button--active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  let count = 0;
  cards.forEach((card) => {
    const isVisible = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("collection-card--hidden", !isVisible);
    if (isVisible) count++;
  });
  visibleCount.textContent = count;

  const selectedCard = document.querySelector(".collection-card--selected");
  if (selectedCard && selectedCard.classList.contains("collection-card--hidden")) {
    clearSelection();
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

randomButton.addEventListener("click", () => {
  const visibleCards = Array.from(cards).filter(
    (card) => !card.classList.contains("collection-card--hidden"),
  );
  if (visibleCards.length === 0) return;

  const selectedCard = document.querySelector(".collection-card--selected");
  const otherCards = visibleCards.filter((card) => card !== selectedCard);
  const options = otherCards.length > 0 ? otherCards : visibleCards;
  const randomIndex = Math.floor(Math.random() * options.length);

  selectCard(options[randomIndex]);
});

applyFilter("all");

resetButton.addEventListener("click", () => {
  applyFilter("all");
  clearSelection();
});
