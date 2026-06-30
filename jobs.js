document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. SALARY RANGE SLIDER — live update ===== */
  const salarySlider = document.querySelector('.filter-group input[type="range"]');
  const salaryLabels = document.querySelector('.salary-labels');

  if (salarySlider && salaryLabels) {
    const maxLabel = salaryLabels.querySelector('span:last-child');
    salarySlider.addEventListener('input', () => {
      maxLabel.textContent = '₹' + Number(salarySlider.value).toLocaleString('en-IN');
      filterJobs();
    });
  }

  /* ===== 2. FILTER JOBS BASED ON CHECKBOXES ===== */
  const allCheckboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
  const jobCards = document.querySelectorAll('.job-card');

  allCheckboxes.forEach(cb => cb.addEventListener('change', filterJobs));

  function getCheckedValues(groupTitle) {
    const groups = document.querySelectorAll('.filter-group');
    let target = null;
    groups.forEach(g => {
      const h3 = g.querySelector('h3');
      if (h3 && h3.textContent.trim() === groupTitle) target = g;
    });
    if (!target) return [];
    return Array.from(target.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.parentElement.textContent.trim().toLowerCase());
  }

  function filterJobs() {
    const categories   = getCheckedValues('Job Category');
    const types         = getCheckedValues('Job Type');
    const experiences   = getCheckedValues('Experience');
    const locations      = getCheckedValues('Location');
    const maxSalary      = salarySlider ? Number(salarySlider.value) : Infinity;

    let visibleCount = 0;

    jobCards.forEach(card => {
      const cardText = card.innerText.toLowerCase();
      const salaryText = card.querySelector('.salary')?.textContent || '';
      const salaryNum = Number(salaryText.replace(/[^\d]/g, '')) || 0;

      const matchCategory   = categories.length === 0   || categories.some(c => cardText.includes(c));
      const matchType        = types.length === 0         || types.some(t => cardText.includes(t));
      const matchExperience  = experiences.length === 0    || experiences.some(e => cardText.includes(e));
      const matchLocation    = locations.length === 0      || locations.some(l => cardText.includes(l));
      const matchSalary       = !salarySlider || salaryNum <= maxSalary || salaryNum === 0;

      const isVisible = matchCategory && matchType && matchExperience && matchLocation && matchSalary;

      card.style.display = isVisible ? 'flex' : 'none';
      if (isVisible) visibleCount++;
    });

    updateResultsCount(visibleCount);
  }

  function updateResultsCount(count) {
    const countSpan = document.querySelector('.top-bar h2 span');
    if (countSpan) countSpan.textContent = `(${count} results)`;
  }

  /* ===== 3. TRENDING SKILL TAGS — click to filter ===== */
  const skillTags = document.querySelectorAll('.skills span');
  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const skill = tag.textContent.trim().toLowerCase();
      jobCards.forEach(card => {
        const tagsText = card.querySelector('.job-tags')?.textContent.toLowerCase() || '';
        card.style.display = tagsText.includes(skill) ? 'flex' : 'none';
      });
      updateResultsCount(document.querySelectorAll('.job-card[style*="flex"]').length);
    });
  });

  /* ===== 4. SORT DROPDOWN ===== */
  const sortSelect = document.querySelector('.top-bar select');
  const jobsContent = document.querySelector('.jobs-content');

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const cardsArray = Array.from(jobCards);

      const getSalary = card => Number(card.querySelector('.salary').textContent.replace(/[^\d]/g, '')) || 0;
      const getPostedDays = card => {
        const t = card.querySelector('.job-meta span:nth-child(3)')?.textContent.toLowerCase() || '';
        if (t.includes('today')) return 0;
        const match = t.match(/\d+/);
        return match ? Number(match[0]) : 999;
      };

      let sorted;
      switch (sortSelect.value) {
        case 'Salary: High to Low':
          sorted = cardsArray.sort((a, b) => getSalary(b) - getSalary(a));
          break;
        case 'Salary: Low to High':
          sorted = cardsArray.sort((a, b) => getSalary(a) - getSalary(b));
          break;
        case 'Latest First':
          sorted = cardsArray.sort((a, b) => getPostedDays(a) - getPostedDays(b));
          break;
        default:
          sorted = cardsArray; // Most Relevant — keep original order
      }

      sorted.forEach(card => jobsContent.appendChild(card));
    });
  }

  /* ===== 5. APPLY BUTTON FEEDBACK ===== */
  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Applied ✓';
      btn.style.background = '#28a745';
      btn.disabled = true;
    });
  });

  /* ===== 6. POST JOB / LOGIN BUTTON DEMO ALERTS ===== */
  document.querySelector('.login')?.addEventListener('click', () => {
    alert('Login feature coming soon!');
  });

  document.querySelector('.post-job')?.addEventListener('click', () => {
    alert('Redirecting to job posting form...');
  });

});