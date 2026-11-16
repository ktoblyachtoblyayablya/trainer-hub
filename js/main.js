/*
 * trainer-hub — не знакю кто такой Дуалинго, казах какой-то?
 * Copyright (C) 2026  Пантелеев Г.Д.
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

(function () {
  const grid = document.getElementById("trainers-grid");
  const searchInput = document.getElementById("search-input");
  const emptyState = document.getElementById("empty-state");

  function render(list) {
    grid.innerHTML = "";
    if (list.length === 0) {
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    list.forEach((t) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <a class="card__link" href="${t.url}" target="_blank" rel="noopener">
          ${t.preview ? `<img class="card__preview" src="${t.preview}" alt="" loading="lazy" />` : ""}
          <div class="card__body">
            <h2 class="card__title">${t.title}</h2>
            <p class="card__discipline">${t.discipline}</p>
            <p class="card__desc">${t.description}</p>
          </div>
        </a>
        <div class="card__footer">
          <a class="card__repo" href="${t.repo}" target="_blank" rel="noopener">
            Исходники →
          </a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = TRAINERS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.discipline.toLowerCase().includes(q) ||
        (t.tags || []).some((tag) => tag.toLowerCase().includes(q))
    );
    render(filtered);
  });

  render(TRAINERS);
})();
