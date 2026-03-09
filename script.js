/**
 * Efeito cosmos - partículas sutis no fundo
 */
(function () {
  const canvas = document.getElementById('cosmos-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  const particleCount = 80;
  const maxRadius = 1.5;
  const minRadius = 0.5;

  function setSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: minRadius + Math.random() * (maxRadius - minRadius),
        opacity: 0.3 + Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')';
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > width) p.speedX *= -1;
      if (p.y < 0 || p.y > height) p.speedY *= -1;
    });

    requestAnimationFrame(drawParticles);
  }

  setSize();
  window.addEventListener('resize', setSize);
  drawParticles();
})();

/**
 * Galeria do projeto: trocar imagem principal ao clicar na thumbnail
 */
(function () {
  const mainImg = document.querySelector('.project-img-main');
  const thumbs = document.querySelectorAll('.project-thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      const img = thumb.querySelector('img');
      if (img && img.src) {
        mainImg.src = img.src;
        mainImg.alt = img.alt || '';
      }
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
    });
  });
})();

/**
 * Lightbox / Galeria modal do projeto
 */
(function () {
  var projectImages = [
    'images/Captura%20de%20tela%202026-02-12%20190828.png',
    'images/Captura%20de%20tela%202026-02-12%20190844.png',
    'images/Captura%20de%20tela%202026-02-12%20190900.png',
    'images/Captura%20de%20tela%202026-02-12%20190919.png'
  ];

  var currentImageIndex = 0;

  var galleryModal = document.getElementById('project-gallery-modal');
  var galleryImage = document.getElementById('gallery-image');
  var galleryCurrent = document.getElementById('gallery-current');
  var galleryTotal = document.getElementById('gallery-total');
  var closeBtn = document.querySelector('.gallery-close');
  var prevBtn = document.querySelector('.gallery-prev');
  var nextBtn = document.querySelector('.gallery-next');
  var overlay = document.querySelector('.gallery-modal-overlay');

  if (!galleryModal || !galleryImage) return;

  galleryTotal.textContent = projectImages.length;

  function openGallery(index) {
    index = index || 0;
    currentImageIndex = index;
    updateGalleryImage();
    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    galleryModal.classList.remove('active');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateGalleryImage() {
    galleryImage.src = projectImages[currentImageIndex];
    galleryCurrent.textContent = currentImageIndex + 1;
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % projectImages.length;
    updateGalleryImage();
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
    updateGalleryImage();
  }

  closeBtn.addEventListener('click', closeGallery);
  overlay.addEventListener('click', closeGallery);
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);

  document.addEventListener('keydown', function (e) {
    if (!galleryModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  document.querySelectorAll('.project-thumbnail').forEach(function (thumb, index) {
    thumb.addEventListener('click', function () {
      openGallery(index);
    });
  });

  var verImagensBtn = document.querySelector('.project-view-btn');
  if (verImagensBtn) {
    verImagensBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openGallery(0);
    });
  }
})();
