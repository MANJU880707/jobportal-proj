/* ===== 0. AUTO-FILTER FROM CATEGORY PAGE (via URL ?category=...) ===== */
(function filterByCategoryParam() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (!category) return;

  const cards = document.querySelectorAll('.job-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const matches = card.getAttribute('data-category') === category;
    card.style.display = matches ? 'flex' : 'none';
    if (matches) visibleCount++;
  });

  const countSpan = document.querySelector('.top-bar h2 span');
  if (countSpan) countSpan.textContent = `(${visibleCount} results)`;

  const heading = document.querySelector('.top-bar h2');
  if (heading) {
    const niceName = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    heading.childNodes[0].textContent = `${niceName} Jobs `;
  }
})();