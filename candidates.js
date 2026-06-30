/* ══════════════════════════════════════
   CANDIDATES PAGE — candidates.js
   Features: Live Search, Skill/Exp/Edu/Avail Filter,
   Sort, Pagination, View Profile Modal, Bookmark
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── ELEMENT REFS ── */
  const grid          = document.getElementById('candidatesGrid');
  const allCards      = [...document.querySelectorAll('.cand-card')];
  const noResults     = document.getElementById('noResults');
  const candCount     = document.getElementById('candCount');

  // Search inputs
  const skillSearch   = document.getElementById('skillSearch');
  const locationSearch= document.getElementById('locationSearch');
  const expSearch     = document.getElementById('expSearch');
  const searchBtn     = document.getElementById('searchBtn');

  // Sidebar checkboxes
  const skillCBs      = document.querySelectorAll('.filter-block input[type="checkbox"]:not([data-group])');
  const expCBs        = document.querySelectorAll('input[data-group="exp"]');
  const eduCBs        = document.querySelectorAll('input[data-group="edu"]');
  const availCBs      = document.querySelectorAll('input[data-group="avail"]');

  // Quick skill tag buttons
  const skillTagBtns  = document.querySelectorAll('.skill-tag-filter');

  // Sort
  const sortBy        = document.getElementById('sortBy');

  // Pagination
  const CARDS_PER_PAGE = 6;
  let currentPage      = 1;

  // Clear filters
  const clearFiltersBtn = document.getElementById('clearFilters');

  // Modal
  const modal          = document.getElementById('profileModal');
  const modalClose     = document.getElementById('modalClose');

  /* ─────────────────────────────────────
     STATE
  ───────────────────────────────────── */
  let state = {
    skillQuery:    '',
    locationQuery: '',
    expDropdown:   '',
    skills:        [],   // checked skills
    exps:          [],
    edus:          [],
    avails:        [],
    sort:          'default',
  };

  let bookmarked = new Set(JSON.parse(localStorage.getItem('jh_bookmarks') || '[]'));

  /* ─────────────────────────────────────
     FILTER ENGINE
  ───────────────────────────────────── */
  function applyFilters() {
    let visible = allCards.filter(card => {
      const cardSkills   = card.dataset.skills.toLowerCase();
      const cardName     = card.dataset.name.toLowerCase();
      const cardRole     = card.dataset.role.toLowerCase();
      const cardLoc      = card.dataset.location.toLowerCase();
      const cardExp      = card.dataset.exp;
      const cardEdu      = card.dataset.edu;
      const cardAvail    = card.dataset.avail;

      // 1. Skill/name search query
      const skillQ = state.skillQuery.toLowerCase();
      if (skillQ && !cardSkills.includes(skillQ) && !cardName.includes(skillQ) && !cardRole.includes(skillQ)) {
        return false;
      }

      // 2. Location search
      const locQ = state.locationQuery.toLowerCase();
      if (locQ && !cardLoc.includes(locQ)) return false;

      // 3. Experience dropdown
      if (state.expDropdown && cardExp !== state.expDropdown) return false;

      // 4. Skill checkboxes (card must have ALL checked skills)
      if (state.skills.length > 0) {
        const hasAll = state.skills.every(s => cardSkills.includes(s));
        if (!hasAll) return false;
      }

      // 5. Exp checkboxes (any match)
      if (state.exps.length > 0 && !state.exps.includes(cardExp)) return false;

      // 6. Edu checkboxes
      if (state.edus.length > 0 && !state.edus.includes(cardEdu)) return false;

      // 7. Avail checkboxes
      if (state.avails.length > 0 && !state.avails.includes(cardAvail)) return false;

      return true;
    });

    // Sort
    visible = sortCards(visible);

    // Hide all first
    allCards.forEach(c => c.classList.add('hidden'));

    // Pagination
    const totalPages = Math.max(1, Math.ceil(visible.length / CARDS_PER_PAGE));
    if (currentPage > totalPages) currentPage = 1;

    const start = (currentPage - 1) * CARDS_PER_PAGE;
    const pageCards = visible.slice(start, start + CARDS_PER_PAGE);

    pageCards.forEach(c => c.classList.remove('hidden'));

    // Count
    const count = visible.length;
    candCount.textContent = `(${count} result${count !== 1 ? 's' : ''})`;

    // No results
    noResults.style.display = count === 0 ? 'block' : 'none';

    // Pagination UI
    renderPagination(totalPages);
  }

  /* ─────────────────────────────────────
     SORT
  ───────────────────────────────────── */
  function sortCards(cards) {
    const sorted = [...cards];
    switch (state.sort) {
      case 'name':
        sorted.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        break;
      case 'exp-asc':
        sorted.sort((a, b) => +a.dataset.expNum - +b.dataset.expNum);
        break;
      case 'exp-desc':
        sorted.sort((a, b) => +b.dataset.expNum - +a.dataset.expNum);
        break;
      default:
        // Featured first
        sorted.sort((a, b) => {
          const af = a.classList.contains('featured') ? 0 : 1;
          const bf = b.classList.contains('featured') ? 0 : 1;
          return af - bf;
        });
    }
    return sorted;
  }

  /* ─────────────────────────────────────
     PAGINATION RENDER
  ───────────────────────────────────── */
  function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) {
      pagination.style.display = 'none';
      return;
    }
    pagination.style.display = 'flex';

    // Prev
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pg-btn';
    prevBtn.id = 'prevBtn';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) { currentPage--; applyFilters(); scrollToGrid(); }
    });
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = 'pg-btn' + (i === currentPage ? ' active' : '');
      btn.dataset.page = i;
      btn.textContent = i;
      btn.addEventListener('click', () => {
        currentPage = i;
        applyFilters();
        scrollToGrid();
      });
      pagination.appendChild(btn);
    }

    // Next
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pg-btn';
    nextBtn.id = 'nextBtn';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) { currentPage++; applyFilters(); scrollToGrid(); }
    });
    pagination.appendChild(nextBtn);
  }

  function scrollToGrid() {
    document.querySelector('.cand-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ─────────────────────────────────────
     READ CHECKBOX STATE
  ───────────────────────────────────── */
  function readCheckboxes() {
    state.skills = [...skillCBs].filter(c => c.checked).map(c => c.value);
    state.exps   = [...expCBs].filter(c => c.checked).map(c => c.value);
    state.edus   = [...eduCBs].filter(c => c.checked).map(c => c.value);
    state.avails = [...availCBs].filter(c => c.checked).map(c => c.value);
  }

  /* ─────────────────────────────────────
     SEARCH BAR
  ───────────────────────────────────── */
  searchBtn.addEventListener('click', () => {
    state.skillQuery    = skillSearch.value.trim();
    state.locationQuery = locationSearch.value.trim();
    state.expDropdown   = expSearch.value;
    currentPage = 1;
    applyFilters();
  });

  // Live search on skill input
  skillSearch.addEventListener('input', () => {
    state.skillQuery = skillSearch.value.trim();
    currentPage = 1;
    applyFilters();
  });

  locationSearch.addEventListener('input', () => {
    state.locationQuery = locationSearch.value.trim();
    currentPage = 1;
    applyFilters();
  });

  /* ─────────────────────────────────────
     SIDEBAR FILTERS
  ───────────────────────────────────── */
  [...skillCBs, ...expCBs, ...eduCBs, ...availCBs].forEach(cb => {
    cb.addEventListener('change', () => {
      readCheckboxes();
      currentPage = 1;
      applyFilters();
    });
  });

  /* ─────────────────────────────────────
     QUICK SKILL TAG FILTER
  ───────────────────────────────────── */
  skillTagBtns.forEach(tag => {
    tag.addEventListener('click', () => {
      const skill = tag.dataset.skill;

      // Toggle active visual
      const isActive = tag.classList.contains('active');
      tag.classList.toggle('active', !isActive);

      // Sync with sidebar checkbox
      const matchCB = [...skillCBs].find(cb => cb.value === skill);
      if (matchCB) {
        matchCB.checked = !isActive;
      }

      readCheckboxes();
      currentPage = 1;
      applyFilters();
    });
  });

  /* ─────────────────────────────────────
     SORT
  ───────────────────────────────────── */
  sortBy.addEventListener('change', () => {
    state.sort = sortBy.value;
    currentPage = 1;
    applyFilters();
  });

  /* ─────────────────────────────────────
     CLEAR FILTERS
  ───────────────────────────────────── */
  clearFiltersBtn.addEventListener('click', () => {
    // Reset all inputs
    skillSearch.value    = '';
    locationSearch.value = '';
    expSearch.value      = '';

    [...skillCBs, ...expCBs, ...eduCBs, ...availCBs].forEach(cb => cb.checked = false);
    skillTagBtns.forEach(t => t.classList.remove('active'));
    sortBy.value = 'default';

    state = {
      skillQuery: '', locationQuery: '', expDropdown: '',
      skills: [], exps: [], edus: [], avails: [],
      sort: 'default',
    };

    currentPage = 1;
    applyFilters();
  });

  /* ─────────────────────────────────────
     BOOKMARK
  ───────────────────────────────────── */
  function setupBookmarks() {
    allCards.forEach(card => {
      const name = card.dataset.name;
      const btn  = card.querySelector('.bookmark-btn');

      // Restore saved state
      if (bookmarked.has(name)) btn.classList.add('bookmarked');

      btn.addEventListener('click', e => {
        e.stopPropagation();
        const saved = btn.classList.toggle('bookmarked');
        if (saved) {
          bookmarked.add(name);
          btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
        } else {
          bookmarked.delete(name);
          btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
        }
        localStorage.setItem('jh_bookmarks', JSON.stringify([...bookmarked]));
      });
    });
  }

  /* ─────────────────────────────────────
     VIEW PROFILE MODAL
  ───────────────────────────────────── */
  function openModal(card) {
    const name     = card.dataset.name;
    const role     = card.dataset.role;
    const location = card.dataset.location;
    const edu      = card.querySelector('.cand-edu').textContent.trim();
    const exp      = card.querySelector('.cand-exp').textContent.trim();
    const about    = card.dataset.about;
    const email    = card.dataset.email;
    const phone    = card.dataset.phone;
    const avatarSrc= card.querySelector('.cand-avatar img').src;

    // Populate modal
    document.getElementById('modalName').textContent    = card.querySelector('h3').textContent;
    document.getElementById('modalRole').textContent    = role;
    document.getElementById('modalLocation').innerHTML  = `<i class="fa-solid fa-location-dot"></i> ${capitalise(location)}`;
    document.getElementById('modalEdu').innerHTML       = `<i class="fa-solid fa-graduation-cap"></i> ${edu.replace('', '').trim()}`;
    document.getElementById('modalExp').innerHTML       = `<i class="fa-solid fa-briefcase"></i> ${exp.replace('', '').trim()}`;
    document.getElementById('modalAbout').textContent   = about;

    const emailEl = document.getElementById('modalEmail');
    emailEl.href  = `mailto:${email}`;
    emailEl.querySelector('span').textContent = email;

    const phoneEl = document.getElementById('modalPhone');
    phoneEl.href  = `tel:${phone.replace(/\s/g, '')}`;
    phoneEl.querySelector('span').textContent = phone;

    document.getElementById('modalAvatar').innerHTML = `<img src="${avatarSrc}" alt="${name}">`;

    // Bookmark sync
    const mbBtn = document.getElementById('modalBookmark');
    if (bookmarked.has(name)) {
      mbBtn.classList.add('bookmarked');
      mbBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Saved';
    } else {
      mbBtn.classList.remove('bookmarked');
      mbBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Save';
    }

    mbBtn.onclick = () => {
      const cardBookmarkBtn = card.querySelector('.bookmark-btn');
      const saved = mbBtn.classList.toggle('bookmarked');
      if (saved) {
        bookmarked.add(name);
        mbBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Saved';
        cardBookmarkBtn.classList.add('bookmarked');
        cardBookmarkBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
      } else {
        bookmarked.delete(name);
        mbBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Save';
        cardBookmarkBtn.classList.remove('bookmarked');
        cardBookmarkBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      }
      localStorage.setItem('jh_bookmarks', JSON.stringify([...bookmarked]));
    };

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach view profile click
  allCards.forEach(card => {
    card.querySelector('.view-profile-btn').addEventListener('click', e => {
      e.stopPropagation();
      openModal(card);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ─────────────────────────────────────
     HELPERS
  ───────────────────────────────────── */
  function capitalise(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  }

  /* ─────────────────────────────────────
     INIT
  ───────────────────────────────────── */
  setupBookmarks();
  applyFilters();

});