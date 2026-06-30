/* ══════════════════════════
   FORM VALIDATION
══════════════════════════ */
const form = document.getElementById('contactForm');

const fields = {
  fullName: { el: document.getElementById('fullName'), err: document.getElementById('err-fullName') },
  email: { el: document.getElementById('email'), err: document.getElementById('err-email') },
  phone: { el: document.getElementById('phone'), err: document.getElementById('err-phone') },
  subject: { el: document.getElementById('subject'), err: document.getElementById('err-subject') },
  message: { el: document.getElementById('message'), err: document.getElementById('err-message') }
};

function setError(field, msg) {
  fields[field].el.classList.add('input-error');
  fields[field].err.textContent = msg;
  fields[field].err.classList.add('show');
}

function clearError(field) {
  fields[field].el.classList.remove('input-error');
  fields[field].err.textContent = '';
  fields[field].err.classList.remove('show');
}

function validateForm() {
  let valid = true;

  // Full Name
  const name = fields.fullName.el.value.trim();
  if (!name) {
    setError('fullName', 'Full name is required');
    valid = false;
  } else if (name.length < 3) {
    setError('fullName', 'Name must be at least 3 characters');
    valid = false;
  } else {
    clearError('fullName');
  }

  // Email
  const email = fields.email.el.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError('email', 'Email is required');
    valid = false;
  } else if (!emailRegex.test(email)) {
    setError('email', 'Enter a valid email address');
    valid = false;
  } else {
    clearError('email');
  }

  // Phone
  const phone = fields.phone.el.value.trim();
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone) {
    setError('phone', 'Phone number is required');
    valid = false;
  } else if (!phoneRegex.test(phone)) {
    setError('phone', 'Enter a valid 10-digit phone number');
    valid = false;
  } else {
    clearError('phone');
  }

  // Subject
  const subject = fields.subject.el.value.trim();
  if (!subject) {
    setError('subject', 'Subject is required');
    valid = false;
  } else {
    clearError('subject');
  }

  // Message
  const message = fields.message.el.value.trim();
  if (!message) {
    setError('message', 'Message is required');
    valid = false;
  } else if (message.length < 10) {
    setError('message', 'Message must be at least 10 characters');
    valid = false;
  } else {
    clearError('message');
  }

  return valid;
}

// Real-time validation as user types
fields.fullName.el.addEventListener('input', () => { if (fields.fullName.el.classList.contains('input-error')) validateForm(); });
fields.email.el.addEventListener('input', () => { if (fields.email.el.classList.contains('input-error')) validateForm(); });
fields.phone.el.addEventListener('input', () => {
  fields.phone.el.value = fields.phone.el.value.replace(/\D/g, '');
  if (fields.phone.el.classList.contains('input-error')) validateForm();
});
fields.subject.el.addEventListener('input', () => { if (fields.subject.el.classList.contains('input-error')) validateForm(); });
fields.message.el.addEventListener('input', () => { if (fields.message.el.classList.contains('input-error')) validateForm(); });

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (validateForm()) {
    showSuccessModal();
    resetForm();
  } else {
    showToast('Please fix the errors in the form');
  }
});

function resetForm() {
  form.reset();
  Object.keys(fields).forEach(f => clearError(f));
}

/* ══════════════════════════
   SUCCESS MODAL
══════════════════════════ */
function showSuccessModal() {
  document.getElementById('successModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
  document.getElementById('successModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('successModal').addEventListener('click', function(e) {
  if (e.target === this) closeSuccessModal();
});

/* ══════════════════════════
   FAQ ACCORDION
══════════════════════════ */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all others
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

/* ══════════════════════════
   NEWSLETTER
══════════════════════════ */
function subscribeNewsletter() {
  const emailInput = document.getElementById('newsletterEmail');
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    showToast('Please enter a valid email address');
    return;
  }
  showToast('Subscribed successfully! 🎉');
  emailInput.value = '';
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

/* ══════════════════════════
   SCROLL ANIMATION
══════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));