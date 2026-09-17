const bakeryItems = [
  { id: 'bread', name: 'Artisan Breads', note: 'Fresh loaves baked in small batches.' },
  { id: 'pastries', name: 'Pastries', note: 'Croissants, muffins, danishes, and seasonal favorites.' },
  { id: 'cakes', name: 'Celebration Cakes', note: 'Custom cakes for birthdays and special events.' }
];

const storageKeys = {
  favorite: 'northStarFavorite',
  customerName: 'northStarCustomerName'
};

const validationMessages = {
  name: 'Please enter at least 2 characters for your name.',
  email: 'Please enter a valid email address, such as name@example.com.',
  details: 'Please provide at least 10 characters about your request.'
};

function showFavorite(itemId) {
  const item = bakeryItems.find(product => product.id === itemId);
  const result = document.getElementById('favorite-result');
  if (!item || !result) return;
  result.textContent = `Your saved favorite: ${item.name}. ${item.note}`;
  document.querySelectorAll('.favorite-button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.item === itemId));
  });
}

function saveFavorite(itemId) {
  localStorage.setItem(storageKeys.favorite, itemId);
  showFavorite(itemId);
}

function loadFavorite() {
  const saved = localStorage.getItem(storageKeys.favorite);
  if (saved) showFavorite(saved);
}

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (error) error.textContent = message;
}

function validateForm(event) {
  const form = event.currentTarget;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const details = document.getElementById('item-details');
  let valid = true;

  setError('name', ''); setError('email', ''); setError('item-details', '');
  if (name.value.trim().length < 2) { setError('name', validationMessages.name); valid = false; }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) { setError('email', validationMessages.email); valid = false; }
  if (details.value.trim().length < 10) { setError('item-details', validationMessages.details); valid = false; }

  if (!valid) { event.preventDefault(); document.getElementById('form-status').textContent = 'Please correct the highlighted fields before submitting.'; return; }
  localStorage.setItem(storageKeys.customerName, name.value.trim());
  event.preventDefault();
  document.getElementById('form-status').textContent = 'Thanks! Your request passed validation and is ready to send.';
}

function loadCustomerName() {
  const name = document.getElementById('name');
  const savedName = localStorage.getItem(storageKeys.customerName);
  if (name && savedName && !name.value) name.value = savedName;
}

function initializeBakerySite() {
  document.querySelectorAll('.favorite-button').forEach(button => button.addEventListener('click', () => saveFavorite(button.dataset.item)));
  loadFavorite();
  loadCustomerName();
  const form = document.getElementById('preorder-form');
  if (form) form.addEventListener('submit', validateForm);
}

document.addEventListener('DOMContentLoaded', initializeBakerySite);
