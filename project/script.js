"use strict";

const cards = document.querySelectorAll(".collection-card");
const detailsPanel = document.querySelector(".details-panel");
const detailsTitle = document.querySelector("#details-title");
const detailsDescription = document.querySelector("#details-description");

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
