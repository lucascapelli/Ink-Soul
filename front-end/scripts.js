document.addEventListener('DOMContentLoaded', () => {
    console.log('Ink Soul - Estúdio de Tatuagem iniciado');
    
    // ==================== NAVEGAÇÃO ====================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuBtn.innerHTML = mobileMenu.classList.contains('hidden') 
                ? '<i class="fas fa-bars text-xl"></i>' 
                : '<i class="fas fa-times text-xl"></i>';
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            });
        });
    }
    
    // ==================== SCROLL ANIMATIONS ====================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-accent');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-accent');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Progress Bar
    const progressBar = document.getElementById('progress-bar');
    
    function updateProgressBar() {
        if (!progressBar) return;
        
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    }
    
    window.addEventListener('scroll', updateProgressBar);
    
    // Back to Top
    const backToTop = document.getElementById('back-to-top');
    
    function toggleBackToTop() {
        if (!backToTop) return;
        
        if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'invisible');
            backToTop.classList.add('opacity-100');
        } else {
            backToTop.classList.add('opacity-0', 'invisible');
            backToTop.classList.remove('opacity-100');
        }
    }
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // ==================== COUNTER ANIMATION ====================
    const counters = document.querySelectorAll('.counter');
    
    function startCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }
    
    function initCounters() {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    startCounter(counter);
                }
            }
        });
    }
    
    window.addEventListener('scroll', initCounters);
    initCounters();
    
    // ==================== GALLERY ====================
    const galleryItems = [
        { 
            src: 'imgs/realistictatoo1.jpeg', 
            category: 'realism',
            title: 'Retrato Realista',
            artist: 'Ana "Raven" Silva',
            description: 'Trabalho em preto e cinza com altos contrastes'
        },
        { 
            src: 'imgs/tribal1.jpg', 
            category: 'tribal',
            title: 'Design Tribal Maori',
            artist: 'Carlos "Koi" Mendes',
            description: 'Padrões tradicionais com significado espiritual'
        },
        { 
            src: 'imgs/pontilhismo1.jpg', 
            category: 'dotwork',
            title: 'Geometria em Pontos',
            artist: 'Lúcia "Dot" Santos',
            description: 'Técnica de pontilhismo com precisão milimétrica'
        },
        { 
            src: 'imgs/aquarela1.webp', 
            category: 'watercolor',
            title: 'Aquarela Moderna',
            artist: 'Lúcia "Dot" Santos',
            description: 'Efeito de tinta aguada com cores vibrantes'
        },
        { 
            src: 'imgs/realistictatoo2.webp', 
            category: 'realism',
            title: 'Realismo Animal',
            artist: 'Ana "Raven" Silva',
            description: 'Detalhes impressionantes em retrato animal'
        },
        { 
            src: 'imgs/pontilhismo2.webp', 
            category: 'dotwork',
            title: 'Mandala em Pontilhismo',
            artist: 'Lúcia "Dot" Santos',
            description: 'Design simétrico com milhares de pontos'
        },
        { 
            src: 'imgs/aquarela2.webp', 
            category: 'watercolor',
            title: 'Aquarela Colorida',
            artist: 'Lúcia "Dot" Santos',
            description: 'Transição suave de cores e texturas'
        },
        { 
            src: 'imgs/tribal2.webp', 
            category: 'tribal',
            title: 'Tribal Tradicional',
            artist: 'Carlos "Koi" Mendes',
            description: 'Linhas fluidas e padrões ancestrais'
        },
        { 
            src: 'imgs/realistictatoo3.png', 
            category: 'realism',
            title: 'Retrato em Preto e Branco',
            artist: 'Ana "Raven" Silva',
            description: 'Contraste perfeito e profundidade emocional'
        }
    ];

    // Estado da galeria
    let currentFilter = 'all';
    let isLoading = false;

    // 🔄 Função setupGalleryItemHover Atualizada
    function setupGalleryItemHover(galleryItem) {
        const img = galleryItem.querySelector('img');
        const overlay = galleryItem.querySelector('.absolute.inset-0.bg-gradient-to-t');
        const infoOverlay = galleryItem.querySelector('.absolute.bottom-0');
        const description = galleryItem.querySelector('.absolute.bottom-0 p.text-sm');
        const quickViewBtn = galleryItem.querySelector('.quick-view-btn');
        
        galleryItem.addEventListener('mouseenter', () => {
            img.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            img.style.transform = 'scale(1.12)';
            
            if (overlay) {
                overlay.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                overlay.style.opacity = '1';
            }
            
            if (infoOverlay) {
                infoOverlay.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                infoOverlay.style.transform = 'translateY(0)';
            }
            
            if (description) {
                setTimeout(() => {
                    description.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
                    description.style.opacity = '1';
                }, 200);
            }
            
            if (quickViewBtn) {
                quickViewBtn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                quickViewBtn.style.opacity = '1';
                quickViewBtn.style.transform = 'scale(1)';
            }
        });
        
        galleryItem.addEventListener('mouseleave', () => {
            img.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            img.style.transform = 'scale(1)';
            
            if (overlay) {
                overlay.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                overlay.style.opacity = '0';
            }
            
            if (infoOverlay) {
                infoOverlay.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                infoOverlay.style.transform = 'translateY(100%)';
            }
            
            if (description) {
                description.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                description.style.opacity = '0';
            }
            
            if (quickViewBtn) {
                quickViewBtn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                quickViewBtn.style.opacity = '0';
                quickViewBtn.style.transform = 'scale(0)';
            }
        });
    }

    // ==================== GALLERY FILTERS COM ANIMAÇÕES ====================
    function setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const loadingElement = document.getElementById('gallery-loading');
        const galleryContainer = document.querySelector('.gallery-container');
        const emptyElement = document.getElementById('gallery-empty');
        
        console.log('Configurando filtros... Botões encontrados:', filterButtons.length);
        
        filterButtons.forEach(button => {
            button.addEventListener('click', async function() {
                if (isLoading) return;
                
                const filter = this.getAttribute('data-filter');
                if (currentFilter === filter) return;
                
                console.log('Filtro clicado:', filter);
                
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-gradient-to-r', 'from-accent', 'to-accent-light', 'text-primary');
                    btn.classList.add('bg-secondary', 'text-white', 'border', 'border-white/10');
                });
                
                this.classList.remove('bg-secondary', 'text-white', 'border', 'border-white/10');
                this.classList.add('active', 'bg-gradient-to-r', 'from-accent', 'to-accent-light', 'text-primary');
                
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                await transitionToFilter(filter, galleryContainer, loadingElement, emptyElement);
                currentFilter = filter;
            });
        });
    }

    // ==================== TRANSITION TO FILTER COM ANIMAÇÕES OTIMIZADAS ====================
    async function transitionToFilter(filter, galleryContainer, loadingElement, emptyElement) {
        isLoading = true;
        
        // 1. FASE: Fade out da galeria atual
        if (galleryContainer) {
            galleryContainer.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            galleryContainer.style.opacity = '0';
            galleryContainer.style.transform = 'translateY(20px)';
        }
        
        await wait(400);
        
        // 2. FASE: Mostrar estado de carregamento
        if (loadingElement) {
            loadingElement.style.display = 'block';
            loadingElement.style.opacity = '0';
            loadingElement.style.transition = 'opacity 0.3s ease';
            setTimeout(() => loadingElement.style.opacity = '1', 10);
        }
        
        await wait(300);
        
        // 3. FASE: Filtrar itens
        let filteredItems = (filter === 'all') ? galleryItems : galleryItems.filter(item => item.category === filter);
        console.log('Itens filtrados:', filteredItems.length);
        
        // 4. FASE: Limpar e preparar nova galeria
        if (galleryContainer) {
            galleryContainer.innerHTML = '';
            // Estado inicial para animação de entrada
            galleryContainer.style.opacity = '0';
            galleryContainer.style.transform = 'translateY(20px)';
            // Force reflow para garantir que o browser registre o estado inicial
            void galleryContainer.offsetWidth;
        }
        
        if (emptyElement) emptyElement.classList.add('hidden');
        
        if (filteredItems.length === 0) {
            if (loadingElement) loadingElement.style.display = 'none';
            if (emptyElement) {
                emptyElement.classList.remove('hidden');
                emptyElement.style.opacity = '0';
                emptyElement.style.transition = 'opacity 0.5s ease';
                setTimeout(() => emptyElement.style.opacity = '1', 10);
            }
            isLoading = false;
            return;
        }
        
        // Popular galeria com animação sequencial
        await populateGalleryWithAnimation(filteredItems, galleryContainer);
        
        // 5. FASE: Esconder loading e mostrar nova galeria
        if (loadingElement) {
            loadingElement.style.opacity = '0';
            setTimeout(() => loadingElement.style.display = 'none', 300);
        }
        
        if (galleryContainer) {
            // Garantir reflow antes de animar container
            void galleryContainer.offsetWidth;
            galleryContainer.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                galleryContainer.style.opacity = '1';
                galleryContainer.style.transform = 'translateY(0)';
            }, 30);
        }
        
        isLoading = false;
    }

    // ==================== POPULATE GALLERY WITH ANIMATION ====================
    async function populateGalleryWithAnimation(items, galleryContainer) {
        if (!galleryContainer) return;
        
        galleryContainer.style.display = 'grid';
        
        const batchSize = 3;
        const delayBetweenBatches = 100;
        
        for (let i = 0; i < items.length; i += batchSize) {
            const batch = items.slice(i, i + batchSize);
            
            batch.forEach((item, batchIndex) => {
                const galleryItem = createGalleryElement(item, i + batchIndex);
                galleryContainer.appendChild(galleryItem);
            });
            
            await animateBatch(galleryContainer, i, batchSize);
            
            if (i + batchSize < items.length) {
                await wait(delayBetweenBatches);
            }
        }
    }

    // ==================== ANIMATE BATCH COM REFLOW FORÇADO ====================
    async function animateBatch(galleryContainer, startIndex, batchSize) {
        const items = galleryContainer.querySelectorAll('.gallery-item');
        
        // Força reflow para que os estilos iniciais (opacity:0; transform:...) "peguem"
        void galleryContainer.offsetWidth;
        
        for (let i = startIndex; i < Math.min(startIndex + batchSize, items.length); i++) {
            const item = items[i];
            const delay = (i - startIndex) * 80;
            
            // Usar requestAnimationFrame + setTimeout para acionar transição de forma confiável
            requestAnimationFrame(() => {
                setTimeout(() => {
                    item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                    
                    // Leve "spring" (opcional)
                    setTimeout(() => {
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                }, delay);
            });
            
            setupGalleryItemHover(item);
            
            const quickViewBtn = item.querySelector('.quick-view-btn');
            if (quickViewBtn) {
                // Evitar múltiplos listeners: remover antes (segurança)
                quickViewBtn.replaceWith(quickViewBtn.cloneNode(true));
                const newBtn = item.querySelector('.quick-view-btn');
                newBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showImageModal(
                        newBtn.getAttribute('data-src'),
                        newBtn.getAttribute('data-title'),
                        newBtn.getAttribute('data-artist'),
                        newBtn.getAttribute('data-description')
                    );
                });
            }
        }
        
        await wait(batchSize * 80 + 300);
    }

    // Criar elemento da galeria com animação
    function createGalleryElement(item, index) {
        const galleryItem = document.createElement('div');
        
        galleryItem.innerHTML = `
            <div class="gallery-item rounded-2xl overflow-hidden cursor-pointer group relative" 
                 data-category="${item.category}"
                 style="opacity: 0; transform: translateY(30px) scale(0.95);">
                <div class="relative overflow-hidden h-64 lg:h-80">
                    <img src="${item.src}" 
                         alt="${item.title}" 
                         class="w-full h-full object-cover transition-transform duration-700"
                         loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500"></div>
                    
                    <div class="absolute top-4 left-4">
                        <span class="inline-block px-3 py-1 bg-accent/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full">
                            ${getCategoryName(item.category)}
                        </span>
                    </div>
                    
                    <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full transition-transform duration-500">
                        <h4 class="text-lg font-bold mb-1">${item.title}</h4>
                        <p class="text-accent text-sm mb-2">Por: ${item.artist}</p>
                        <p class="text-white text-sm opacity-0 transition-opacity duration-700">${item.description}</p>
                    </div>
                </div>
                
                <div class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500">
                    <button class="quick-view-btn w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center scale-0 transition-transform duration-500"
                            data-src="${item.src}"
                            data-title="${item.title}"
                            data-artist="${item.artist}"
                            data-description="${item.description}">
                        <i class="fas fa-search-plus text-primary"></i>
                    </button>
                </div>
            </div>
        `;
        
        return galleryItem.firstElementChild;
    }

    // Helper function para aguardar
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Helper para nome da categoria
    function getCategoryName(category) {
        const categories = {
            'realism': 'Realismo',
            'tribal': 'Tribal',
            'dotwork': 'Pontilhismo',
            'watercolor': 'Aquarela'
        };
        return categories[category] || category;
    }

    // ==================== MODAL DE IMAGEM ====================
    function showImageModal(src, title, artist, description) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="relative max-w-6xl w-full max-h-[90vh]">
                <button class="modal-close absolute -top-12 right-0 text-white text-2xl hover:text-accent transition-colors z-10">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="bg-gradient-to-br from-primary to-secondary rounded-2xl overflow-hidden shadow-2xl">
                    <div class="grid lg:grid-cols-2 gap-0">
                        <div class="relative h-80 lg:h-auto">
                            <img src="${src}" 
                                 alt="${title}" 
                                 class="w-full h-full object-cover">
                            <div class="absolute top-4 left-4">
                                <span class="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full">
                                    ${getCategoryFromTitle(title)}
                                </span>
                            </div>
                        </div>
                        
                        <div class="p-8">
                            <h3 class="text-2xl font-bold mb-2">${title}</h3>
                            <p class="text-accent mb-4">Artista: ${artist}</p>
                            <p class="text-gray-300 mb-6">${description}</p>
                            
                            <div class="space-y-4">
                                <div>
                                    <h4 class="font-bold mb-2 text-sm uppercase tracking-wider text-gray-400">Técnica</h4>
                                    <p class="text-white">${getTechniqueDetails(getCategoryFromTitle(title))}</p>
                                </div>
                                
                                <div>
                                    <h4 class="font-bold mb-2 text-sm uppercase tracking-wider text-gray-400">Tempo de Execução</h4>
                                    <p class="text-white">${getExecutionTime(getCategoryFromTitle(title))}</p>
                                </div>
                                
                                <div class="pt-6 border-t border-white/10">
                                    <a href="#contact" 
                                       class="inline-flex items-center justify-center bg-gradient-to-r from-accent to-accent-light text-primary font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300">
                                        <i class="fas fa-calendar-alt mr-2"></i>
                                        Agendar Sessão Similar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeModal = () => modal.remove();
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        const handleEscKey = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        
        document.addEventListener('keydown', handleEscKey);
        
        const observer = new MutationObserver(() => {
            if (!document.body.contains(modal)) {
                document.removeEventListener('keydown', handleEscKey);
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true });
    }

    // Funções auxiliares
    function getCategoryFromTitle(title) {
        if (title.toLowerCase().includes('realismo') || title.toLowerCase().includes('retrato') || title.toLowerCase().includes('animal')) return 'Realismo';
        if (title.toLowerCase().includes('tribal') || title.toLowerCase().includes('maori')) return 'Tribal';
        if (title.toLowerCase().includes('pontilhismo') || title.toLowerCase().includes('geometria') || title.toLowerCase().includes('mandala')) return 'Pontilhismo';
        if (title.toLowerCase().includes('aquarela')) return 'Aquarela';
        return 'Realismo';
    }

    function getTechniqueDetails(category) {
        const techniques = {
            'Realismo': 'Realismo fotográfico com sombreamento avançado',
            'Tribal': 'Linhas fluidas e padrões geométricos tradicionais',
            'Pontilhismo': 'Pontilhismo preciso com espaçamento milimétrico',
            'Aquarela': 'Efeito de tinta aguada com transições suaves'
        };
        return techniques[category] || 'Técnica personalizada';
    }

    function getExecutionTime(category) {
        const times = {
            'Realismo': '8-12 horas (múltiplas sessões)',
            'Tribal': '4-8 horas',
            'Pontilhismo': '6-10 horas',
            'Aquarela': '5-9 horas'
        };
        return times[category] || 'Variável conforme complexidade';
    }

    // Inicializar galeria
    function initGallery() {
        console.log('Inicializando galeria...');
        
        const galleryContainer = document.querySelector('.gallery-container');
        const loadingElement = document.getElementById('gallery-loading');
        
        if (galleryContainer && loadingElement) {
            loadingElement.style.display = 'none';
            populateGalleryWithAnimation(galleryItems, galleryContainer);
        }
        
        setupGalleryFilters();
        
        const preloadImages = () => {
            galleryItems.forEach(item => {
                const img = new Image();
                img.src = item.src;
            });
        };
        
        preloadImages();
    }
    
    // ==================== FAQ ====================
    const faqButtons = document.querySelectorAll('.faq-btn');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
            
            faqButtons.forEach(otherBtn => {
                if (otherBtn !== button) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('i');
                    
                    otherContent.classList.add('hidden');
                    otherIcon.classList.remove('rotate-180');
                }
            });
        });
    });
    
    // ==================== FORMULÁRIO ====================
    const form = document.querySelector('.booking-form');
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOk = document.getElementById('modal-ok');
    
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const style = document.getElementById('style').value;
            const message = document.getElementById('message').value;
            const artist = document.getElementById('artist')?.value || '';

            // Validação básica
            if (!name || !email || !phone || !style || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const data = {
                name,
                email,
                phone,
                style,
                message,
                artist,
                date: new Date().toISOString()
            };

            try {
                const response = await fetch('http://127.0.0.1:5000/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    if (modal) modal.classList.remove('hidden');
                    form.reset();
                } else {
                    alert('Erro ao enviar o formulário.');
                }

            } catch (err) {
                console.error(err);
                alert('Erro de conexão com o servidor.');
            }
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (modal) modal.classList.add('hidden');
        });
    }
    
    if (modalOk) {
        modalOk.addEventListener('click', () => {
            if (modal) modal.classList.add('hidden');
        });
    }
    
    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // ==================== PARTÍCULAS ====================
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        document.body.prepend(particlesContainer);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, var(--accent), var(--light));
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: float ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg); }
                50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(180deg); }
                75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==================== INICIALIZAÇÃO PRINCIPAL ====================
    initGallery();
    createParticles();
    
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('Ink Soul - Estúdio de Tatuagem carregado com sucesso!');
});

// Inicialização final após carregamento completo
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 100);
        });
    }, 500);
});