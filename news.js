/* ══════════════════════════
   NEWS DATA
══════════════════════════ */
const newsData = [
  { id:1, title:"Google Launches New AI Hiring Platform for Tech Recruiters", category:"Technology", date:"28 June 2026", icon:"fa-google", desc:"Google unveils an AI-powered platform to help companies streamline technical hiring and candidate matching.", full:"Google has officially launched a new AI-driven hiring platform aimed at simplifying technical recruitment for companies of all sizes. The platform uses machine learning to match candidates with job openings based on skills, experience, and project history rather than just keywords. Early adopters report a 40% reduction in time-to-hire. The tool also includes automated skill assessments and bias-reduction features designed to create fairer hiring outcomes. Industry experts believe this could reshape how tech companies approach recruitment in the coming years.", tags:["AI","Technology"], likes:124 },
  { id:2, title:"TCS Hiring 10,000 Freshers Across India This Year", category:"Jobs", date:"27 June 2026", icon:"fa-building", desc:"TCS announces a massive recruitment drive targeting fresh graduates from engineering colleges nationwide.", full:"Tata Consultancy Services has announced plans to hire over 10,000 fresh graduates across India in the current fiscal year. The recruitment drive will focus on candidates from engineering and computer science backgrounds, with roles spanning software development, testing, and cloud infrastructure. Candidates will go through an online assessment followed by technical and HR interviews. TCS stated that this hiring push is part of its strategy to strengthen its talent pipeline amid growing demand for digital transformation services.", tags:["Freshers","Jobs"], likes:312 },
  { id:3, title:"Top 10 In-Demand Skills for Developers in 2026", category:"Career Tips", date:"26 June 2026", icon:"fa-chart-line", desc:"From AI integration to cloud-native development, here are the skills employers are looking for this year.", full:"As the tech industry continues to evolve, certain skills are becoming increasingly valuable to employers. This year's list includes AI/ML integration, cloud-native architecture, React and modern JavaScript frameworks, cybersecurity fundamentals, and DevOps practices. Soft skills like communication and adaptability remain just as critical as technical know-how. Developers who continuously upskill in these areas report significantly better job prospects and salary growth compared to those who don't.", tags:["React","AI"], likes:198 },
  { id:4, title:"How to Crack Technical Interviews: A Complete Guide", category:"Interview", date:"25 June 2026", icon:"fa-comments", desc:"Practical strategies to help you prepare for coding rounds, system design, and behavioral interviews.", full:"Technical interviews can be daunting, but proper preparation makes all the difference. This guide covers the three major rounds most companies use: coding assessments, system design discussions, and behavioral interviews. For coding rounds, practicing data structures and algorithms on platforms like LeetCode is essential. System design interviews require understanding scalability, databases, and trade-offs. Behavioral rounds assess communication and cultural fit, so preparing structured answers using the STAR method can help candidates stand out.", tags:["Freshers"], likes:156 },
  { id:5, title:"Free Online Courses to Boost Your Resume in 2026", category:"Courses", date:"24 June 2026", icon:"fa-book-open", desc:"Explore the best free certifications from Google, Microsoft, and AWS to strengthen your job applications.", full:"Free certifications are a great way to add credibility to your resume without breaking the bank. Google offers free courses in data analytics and IT support, Microsoft provides Azure fundamentals certification, and AWS has cloud practitioner courses available at no cost. These certifications not only build practical skills but also signal to recruiters that you're proactive about learning. Many candidates report receiving more interview callbacks after adding relevant certifications to their profiles.", tags:["RemoteJobs"], likes:89 },
  { id:6, title:"Infosys Announces Walk-in Drive for Software Engineers", category:"Company News", date:"23 June 2026", icon:"fa-building", desc:"Infosys opens walk-in interviews in Chennai and Bangalore for experienced software engineering roles.", full:"Infosys has announced a walk-in interview drive for experienced software engineers in Chennai and Bangalore. The drive targets candidates with 2-6 years of experience in Java, Python, and cloud technologies. Interested candidates need to carry their updated resume and relevant certificates. The company stated this is part of its ongoing effort to scale up its digital engineering teams to meet rising client demand across BFSI and healthcare sectors.", tags:["Jobs"], likes:142 },
  { id:7, title:"Remote Work Jobs Continue to Rise in 2026", category:"Jobs", date:"22 June 2026", icon:"fa-house-laptop", desc:"New survey shows remote and hybrid job postings have grown by 35% compared to last year.", full:"A recent industry survey reveals that remote and hybrid job postings have grown by 35% year-over-year, signaling a continued shift in workplace flexibility. Tech, customer support, and content roles lead the remote job market, with companies citing improved employee satisfaction and access to wider talent pools as key drivers. Job seekers are increasingly prioritizing remote options, with many willing to accept slightly lower pay in exchange for flexibility.", tags:["RemoteJobs"], likes:210 },
  { id:8, title:"React 20 Released with Major Performance Improvements", category:"Technology", date:"21 June 2026", icon:"fa-react", desc:"The latest React version brings faster rendering, smaller bundle sizes, and improved developer tools.", full:"The React team has released version 20, bringing significant performance improvements including faster initial rendering, reduced bundle sizes, and enhanced developer tooling. The update also introduces improved error boundaries and better support for server components. Developers are encouraged to review the migration guide before upgrading existing projects, as some APIs have been deprecated in favor of more efficient alternatives.", tags:["React","JavaScript"], likes:267 },
  { id:9, title:"Mastering Salary Negotiation: Tips That Actually Work", category:"Career Tips", date:"20 June 2026", icon:"fa-hand-holding-dollar", desc:"Learn how to confidently negotiate your salary and benefits package during job offers.", full:"Salary negotiation is a skill many job seekers avoid, often leaving money on the table. Experts recommend researching market rates beforehand, letting the employer state a number first, and focusing on total compensation rather than just base salary. Practicing your pitch and remaining calm and professional throughout the conversation significantly increases the chances of a successful negotiation outcome.", tags:["Freshers"], likes:175 },
  { id:10, title:"Amazon Hiring Drive Opens for Cloud Engineers", category:"Jobs", date:"19 June 2026", icon:"fa-building", desc:"Amazon Web Services is expanding its India team with new openings for cloud infrastructure engineers.", full:"Amazon Web Services has opened a major hiring drive for cloud infrastructure engineers across its India offices. The roles span junior to senior levels, with a focus on AWS certifications, containerization, and DevOps practices. Candidates with hands-on experience in Kubernetes and Terraform are especially encouraged to apply. AWS stated the expansion supports growing enterprise demand for cloud migration services in the region.", tags:["AI"], likes:198 },
  { id:11, title:"Behavioral Interview Questions You Should Practice", category:"Interview", date:"18 June 2026", icon:"fa-comments", desc:"A breakdown of common behavioral questions and how to structure winning answers using the STAR method.", full:"Behavioral interviews assess how candidates handle real workplace situations. Common questions include describing a time you overcame a challenge, handled conflict with a coworker, or led a project under pressure. Using the STAR method—Situation, Task, Action, Result—helps structure clear, compelling answers. Practicing these responses beforehand can significantly boost confidence and clarity during the actual interview.", tags:["Freshers"], likes:133 },
  { id:12, title:"AI Job Market Set to Grow 45% by 2027, Report Finds", category:"Technology", date:"17 June 2026", icon:"fa-robot", desc:"A new industry report projects massive growth in AI-related job roles over the next two years.", full:"A newly published industry report projects that AI-related job roles will grow by 45% by 2027, driven by increasing enterprise adoption of machine learning and automation tools. Roles in highest demand include AI engineers, prompt specialists, and ML operations professionals. The report also notes a growing skills gap, encouraging professionals from adjacent fields to upskill through targeted AI and data science courses.", tags:["AI"], likes:289 }
];

let likedNews = new Set();
let bookmarkedNews = new Set();
let likeCounts = {};
newsData.forEach(n => likeCounts[n.id] = n.likes);

const featuredId = 2;
let currentModalId = null;

/* ══════════════════════════
   STATE
══════════════════════════ */
let currentPage = 1;
const perPage = 6;
let activeCategory = '';
let activeTag = '';

/* ══════════════════════════
   FILTER LOGIC
══════════════════════════ */
function getFilteredNews() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const catDrop = document.getElementById('catSelect').value;
  const searchBy = document.querySelector('input[name="searchBy"]:checked').value;
  const cat = activeCategory || catDrop;

  return newsData.filter(n => {
    let matchSearch = true;
    if (search) {
      if (searchBy === 'title') {
        matchSearch = n.title.toLowerCase().includes(search);
      } else {
        matchSearch = n.title.toLowerCase().includes(search) ||
          n.desc.toLowerCase().includes(search) ||
          n.tags.some(t => t.toLowerCase().includes(search));
      }
    }
    const matchCat = !cat || n.category === cat;
    const matchTag = !activeTag || n.tags.includes(activeTag);
    return matchSearch && matchCat && matchTag;
  });
}

/* ══════════════════════════
   RENDER
══════════════════════════ */
function render() {
  const filtered = getFilteredNews();
  const totalPages = Math.ceil(filtered.length / perPage);
  currentPage = Math.min(currentPage, Math.max(1, totalPages));
  const paged = filtered.slice((currentPage-1)*perPage, currentPage*perPage);

  const grid = document.getElementById('news-grid');
  grid.innerHTML = paged.length
    ? paged.map(n => cardHTML(n)).join('')
    : `<div class="no-results"><i class="fa-solid fa-newspaper"></i>No news articles found. Try a different search or category.</div>`;

  document.getElementById('resultCount').textContent = `${filtered.length} articles`;
  renderPagination(totalPages);
}

function cardHTML(n) {
  const liked = likedNews.has(n.id);
  const saved = bookmarkedNews.has(n.id);
  return `
  <div class="news-card">
    <div class="news-img-wrap">
      <div class="img-placeholder"><i class="fa-solid ${n.icon}"></i></div>
      <span class="cat-badge">${n.category}</span>
      <button class="like-btn ${liked ? 'liked' : ''}" onclick="toggleLike(${n.id}, this, event)">
        <i class="fa-${liked ? 'solid' : 'regular'} fa-heart"></i>
      </button>
    </div>
    <div class="news-body">
      <span class="news-date"><i class="fa-regular fa-calendar"></i> ${n.date}</span>
      <h3>${n.title}</h3>
      <p class="desc">${n.desc}</p>
      <div class="news-footer">
        <button class="read-more-btn" onclick="openModal(${n.id})">Read More <i class="fa-solid fa-arrow-right"></i></button>
        <button class="bookmark-btn ${saved ? 'saved' : ''}" onclick="toggleBookmark(${n.id}, this, event)">
          <i class="fa-${saved ? 'solid' : 'regular'} fa-bookmark"></i>
        </button>
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════
   PAGINATION
══════════════════════════ */
function renderPagination(totalPages) {
  const pg = document.getElementById('pagination');
  if (totalPages <= 1) { pg.innerHTML = ''; return; }
  let html = `<button class="page-btn arrow" onclick="changePage(${currentPage-1})" ${currentPage===1?'disabled':''}>
    <i class="fa-solid fa-chevron-left"></i></button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="changePage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn arrow" onclick="changePage(${currentPage+1})" ${currentPage===totalPages?'disabled':''}>
    <i class="fa-solid fa-chevron-right"></i></button>`;
  pg.innerHTML = html;
}

function changePage(p) {
  const total = Math.ceil(getFilteredNews().length / perPage);
  if (p < 1 || p > total) return;
  currentPage = p;
  render();
  window.scrollTo({top: document.querySelector('.news-container').offsetTop - 100, behavior:'smooth'});
}

/* ══════════════════════════
   CATEGORY / TAG / SEARCH
══════════════════════════ */
function selectCategory(el, cat) {
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  activeCategory = cat;
  document.getElementById('catSelect').value = cat;
  currentPage = 1;
  render();
}

function filterByTag(el, tag) {
  document.querySelectorAll('.tag-chip').forEach(t => t.classList.remove('active'));
  if (activeTag === tag) {
    activeTag = '';
  } else {
    activeTag = tag;
    el.classList.add('active');
  }
  currentPage = 1;
  render();
}

function searchTrend(term) {
  document.getElementById('searchInput').value = term;
  currentPage = 1;
  render();
  window.scrollTo({top: document.querySelector('.news-container').offsetTop - 100, behavior:'smooth'});
}

function applyFilters() {
  const catDrop = document.getElementById('catSelect').value;
  activeCategory = catDrop;
  document.querySelectorAll('.cat-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.cat === catDrop);
  });
  currentPage = 1;
  render();
}

document.getElementById('searchInput').addEventListener('input', () => { currentPage = 1; render(); });
document.querySelectorAll('input[name="searchBy"]').forEach(r => r.addEventListener('change', () => render()));

/* ══════════════════════════
   LIKE / BOOKMARK (cards)
══════════════════════════ */
function toggleLike(id, btn, e) {
  e.stopPropagation();
  if (likedNews.has(id)) {
    likedNews.delete(id);
    likeCounts[id]--;
    btn.classList.remove('liked');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  } else {
    likedNews.add(id);
    likeCounts[id]++;
    btn.classList.add('liked');
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    showToast('Added to liked news!');
  }
}

function toggleBookmark(id, btn, e) {
  e.stopPropagation();
  if (bookmarkedNews.has(id)) {
    bookmarkedNews.delete(id);
    btn.classList.remove('saved');
    btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
    showToast('Removed from saved news!');
  } else {
    bookmarkedNews.add(id);
    btn.classList.add('saved');
    btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
    showToast('News saved!');
  }
}

/* ══════════════════════════
   MODAL — READ MORE
══════════════════════════ */
function openModal(id) {
  const n = newsData.find(x => x.id === id);
  currentModalId = id;
  document.getElementById('modal-img').innerHTML = `<i class="fa-solid ${n.icon}"></i>`;
  document.getElementById('modal-cat').textContent = n.category;
  document.getElementById('modal-date').textContent = n.date;
  document.getElementById('modal-title').textContent = n.title;
  document.getElementById('modal-text').textContent = n.full;

  const liked = likedNews.has(id);
  const likeBtn = document.getElementById('modal-like-btn');
  likeBtn.classList.toggle('liked', liked);
  likeBtn.innerHTML = `<i class="fa-${liked?'solid':'regular'} fa-heart"></i> <span id="modal-like-count">${likeCounts[id]}</span> Likes`;

  const saved = bookmarkedNews.has(id);
  const bmBtn = document.getElementById('modal-bookmark-btn');
  bmBtn.innerHTML = `<i class="fa-${saved?'solid':'regular'} fa-bookmark"></i> ${saved ? 'Saved' : 'Save'}`;

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  render(); // refresh cards to reflect like/bookmark changes
}

document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

function toggleLikeModal() {
  const id = currentModalId;
  const liked = likedNews.has(id);
  if (liked) { likedNews.delete(id); likeCounts[id]--; }
  else { likedNews.add(id); likeCounts[id]++; showToast('Added to liked news!'); }
  const likeBtn = document.getElementById('modal-like-btn');
  likeBtn.classList.toggle('liked', !liked);
  likeBtn.innerHTML = `<i class="fa-${!liked?'solid':'regular'} fa-heart"></i> <span>${likeCounts[id]}</span> Likes`;
}

function toggleBookmarkModal() {
  const id = currentModalId;
  const saved = bookmarkedNews.has(id);
  if (saved) { bookmarkedNews.delete(id); showToast('Removed from saved news!'); }
  else { bookmarkedNews.add(id); showToast('News saved!'); }
  const bmBtn = document.getElementById('modal-bookmark-btn');
  bmBtn.innerHTML = `<i class="fa-${!saved?'solid':'regular'} fa-bookmark"></i> ${!saved ? 'Saved' : 'Save'}`;
}

/* ══════════════════════════
   FEATURED CARD CLICK
══════════════════════════ */
const featuredNews = newsData.find(n => n.id === featuredId);
document.getElementById('featuredTitle').textContent = featuredNews.title;

/* ══════════════════════════
   NEWSLETTER
══════════════════════════ */
function subscribe() {
  const email = document.getElementById('newsletterEmail').value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email!');
    return;
  }
  showToast('Subscribed successfully! 🎉');
  document.getElementById('newsletterEmail').value = '';
}

/* ══════════════════════════
   TOAST
══════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Init
render();