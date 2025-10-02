// script.js

// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. FUNGSI UNTUK EFEK SMOOTH SCROLLING ---
    const navLinks = document.querySelectorAll('.menu ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Mencegah perilaku default (melompat langsung)
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Menggulir halaman ke elemen target dengan halus
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Dikurangi 70px agar tidak tertutup navigasi
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 2. FUNGSI UNTUK HIGHLIGHT MENU AKTIF SAAT SCROLL ---
    const sections = document.querySelectorAll('.section-container, .banner');
    const menuLinks = document.querySelectorAll('.menu a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 75) { // 75 adalah tinggi navigasi + sedikit buffer
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // --- 3. FUNGSI UNTUK ANIMASI FADE-IN SAAT SCROLL ---
    const elementsToAnimate = document.querySelectorAll('.box-item, .perkenalan-card, table');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Elemen akan muncul saat 10% bagiannya terlihat
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Mengganti nama class 'box-item' pada perkenalan menjadi 'perkenalan-card'
    const perkenalanBox = document.querySelector('#perkenalan .box-item');
    if (perkenalanBox) {
        perkenalanBox.classList.add('perkenalan-card');
        perkenalanBox.classList.remove('box-item');
    }

});