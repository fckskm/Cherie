document.addEventListener('DOMContentLoaded', function () {

  // ====== Аккордеон ======
  document.querySelectorAll('.acc-head').forEach(h => {
    h.addEventListener('click', () => {
      const body = h.nextElementSibling;
      body.style.display = body.style.display === 'block' ? 'none' : 'block';
    });
  });

  // ====== Переключение темы ======
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    // Загружаем тему из localStorage
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      toggle.textContent = "☀️";
    }

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      toggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ====== Кнопки "Записаться" ======
  document.querySelectorAll('[data-book]').forEach(btn => {
    btn.addEventListener('click', function () {
      const svc = this.dataset.book;
      localStorage.setItem('cherie_preselect_service', svc);
      window.location.href = 'booking.html';
    });
  });

  // ====== Предзаполнение на странице booking.html ======
  if (window.location.pathname.endsWith('booking.html')) {
    const saved = localStorage.getItem('cherie_preselect_service');
    const serviceSelect = document.getElementById('serviceSelect');
    if (saved && serviceSelect) {
      serviceSelect.value = saved;
    }
  }

  // ====== Меню ======
  const menuBtn = document.getElementById('menuToggle');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const nav = document.getElementById('nav');
      nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
  }

  // ====== Бургер-меню ======
  const burgerBtn = document.getElementById('burgerBtn');
  const burgerMenu = document.getElementById('burgerMenu');
  const burgerOverlay = document.getElementById('burgerOverlay');

  if (burgerBtn && burgerMenu && burgerOverlay) {
    const toggleBurger = () => {
      burgerMenu.classList.toggle('active');
      burgerOverlay.classList.toggle('active');
    };

    burgerBtn.addEventListener('click', toggleBurger);
    burgerOverlay.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      burgerOverlay.classList.remove('active');
    });
  }

  // ====== Слайдеры ======
  function initSlider(selector) {
    const slider = document.querySelector(selector);
    if (!slider) return;

    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");

    let index = 0;

    function showSlide(i) {
      slides.forEach(s => s.style.display = "none");
      slides[i].style.display = "block";
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
      });
    }

    showSlide(index);
  }

  initSlider("#slider1");
  initSlider("#slider2");
  initSlider("#slider3");
  initSlider("#slider4");

  // ====== Форма бронирования ======
  const form = document.getElementById("BookingForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const service = document.getElementById("serviceSelect").value;
      const master = document.getElementById("masterSelect").value;
      const date = document.getElementById("bookingDate").value;
      const time = document.getElementById("bookingTime").value;
      const name = document.getElementById("clientName").value.trim();
      const phone = document.getElementById("clientPhone").value.trim();

      if (!service||!name || !phone) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      const booking = { service, master, date, time, name, phone };
      console.log("Новая запись:", booking);

      alert("Запись успешно создана! Проверьте консоль.");
    });
  }

  // ====== Форма отзывов ======
  const reviewForm = document.getElementById('reviewForm');
  const reviewsList = document.getElementById('reviewsList');

  if (reviewForm && reviewsList) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    const renderReviews = () => {
      reviewsList.innerHTML = '';

      reviews.forEach((review) => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';

        reviewItem.innerHTML = `
          <div class="review-header">
            <strong>${review.name}</strong>
            <span class="review-stars">${stars}</span>
          </div>
          <div class="review-text">${review.text}</div>
        `;

        reviewsList.appendChild(reviewItem);
      });
    };

    renderReviews();

    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('reviewName').value.trim();
      const rating = document.getElementById('reviewRating').value;
      const text = document.getElementById('reviewText').value.trim();

      if (!name || !text) return;

      const newReview = { name, rating, text };

      reviews.unshift(newReview);
      localStorage.setItem('reviews', JSON.stringify(reviews));

      renderReviews();
      reviewForm.reset();
    });
  }

  // ====== Форма контактов ======
  const contactForm = document.querySelector(".contacts-row form");
  if (contactForm) {
    const nameInput = contactForm.querySelector("input[placeholder='Имя']");
    const phoneInput = contactForm.querySelector("input[placeholder='Телефон']");
    const messageInput = contactForm.querySelector("textarea");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !message) {
        alert("Пожалуйста, заполните все поля: имя, телефон и сообщение.");
        return;
      }

      alert("Сообщение отправлено! (пока без отправки на сервер)");

      nameInput.value = "";
      phoneInput.value = "";
      messageInput.value = "";
    });
  }

});
