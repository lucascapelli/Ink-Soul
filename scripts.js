document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'invisible');
        } else {
            backToTop.classList.add('opacity-0', 'invisible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Modal (Booking Success)
    const form = document.querySelector('.booking-form');
    const modal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');
    const modalOk = document.getElementById('modal-ok');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            style: document.getElementById('style').value,
            message: document.getElementById('message').value,
        };

        try {
        const response = await fetch('http://127.0.0.1:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                modal.classList.remove('hidden');
                form.reset();
            } else {
                alert('Erro ao enviar o agendamento. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro na conexão. Tente novamente mais tarde.');
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modalOk.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Galeria
    const galleryItems = [
        { src: 'https://images.unsplash.com/photo-1519340241574-2cec6ef4c9e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80', category: 'realism' },
        { src: 'https://images.unsplash.com/photo-1523205771623-e0d3261e1e57?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80', category: 'tribal' },
        { src: 'https://images.unsplash.com/photo-1579187676396-5c49e8a85e36?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80', category: 'dotwork' },
    ];

    function populateGallery(items) {
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.innerHTML = '';
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item', item.category);
            galleryItem.innerHTML = `<img src="${item.src}" alt="Tattoo" class="w-full h-auto rounded-lg shadow-lg">`;
            galleryContainer.appendChild(galleryItem);
        });
    }

    populateGallery(galleryItems);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
            populateGallery(filteredItems);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // FAQ Toggle
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            content.classList.toggle('hidden');
            button.setAttribute('aria-expanded', !isExpanded);
            const icon = button.querySelector('i');
            icon.classList.toggle('rotate-180');
        });
    });
});
