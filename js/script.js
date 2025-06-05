/**
 * script.js - Lógica principal para Jalpan de mi Corazón
 * Gestiona Service Worker, menú fijo, scroll suave, animaciones,
 * clima, comentarios y carga de datos desde Firestore para todos los apartados.
 */

// 🔹 REGISTRO DEL SERVICE WORKER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(reg => console.log('✅ Registro de SW exitoso', reg))
        .catch(err => console.warn('❌ Error al registrar el SW', err));
}

// 🔹 INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    // 🔸 MENÚ FIJO Y PLACEHOLDER
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Crear placeholder para evitar salto de contenido
        const placeholder = document.createElement('div');
        placeholder.classList.add('menu-placeholder');
        navbar.insertAdjacentElement('afterend', placeholder);
        const navbarHeight = navbar.offsetHeight;

        // Identificar la sección actual desde las clases del body
        const sectionClasses = document.body.classList;
        let currentSection = null;
        const sections = [
            'unidad',
            'misiones',
            'huapango',
            'gastronomia',
            'presa',
            'tancama',
            'naturaleza'
        ];
        sections.forEach(section => {
            if (sectionClasses.contains(`section-${section}`)) {
                currentSection = section;
            }
        });

        // Aplicar menú fijo para todas las páginas (excepto index, que se maneja en index.html)
        navbar.classList.add('navbar-fixed');
        placeholder.style.height = `${navbarHeight}px`;

        // 🔸 EFECTOS HOVER EN MENÚ
        const menuItems = document.querySelectorAll('.nav-item');
        const letterLinks = document.querySelectorAll('.custom-letters a');

        function toggleHover(section, activate) {
            const menuSpans = document.querySelectorAll(`.nav-item[data-section="${section}"] .nav-link span`);
            const letter = document.querySelector(`.custom-letters a[data-section="${section}"] .letter-img`);
            if (activate) {
                menuSpans.forEach(span => span.classList.add('hover-active'));
                if (letter) letter.classList.add('hover-active');
            } else {
                menuSpans.forEach(span => span.classList.remove('hover-active'));
                if (letter) letter.classList.remove('hover-active');
            }
        }

        // Efectos hover para index.html
        if (document.querySelector('.custom-letters')) {
            letterLinks.forEach(link => {
                const section = link.getAttribute('data-section');
                link.addEventListener('mouseenter', () => toggleHover(section, true));
                link.addEventListener('mouseleave', () => toggleHover(section, false));
            });
            menuItems.forEach(item => {
                const section = item.getAttribute('data-section');
                item.addEventListener('mouseenter', () => toggleHover(section, true));
                item.addEventListener('mouseleave', () => toggleHover(section, false));
            });
        } else {
            // Efectos hover para otras páginas
            menuItems.forEach(item => {
                const section = item.getAttribute('data-section');
                const spans = item.querySelectorAll('.nav-link span');
                if (section === currentSection) {
                    spans.forEach(span => span.classList.add('hover-active'));
                }
                item.addEventListener('mouseenter', () => {
                    if (section !== currentSection) {
                        toggleHover(section, true);
                    }
                });
                item.addEventListener('mouseleave', () => {
                    if (section !== currentSection) {
                        toggleHover(section, false);
                    }
                });
            });
        }
    }

    // 🔸 SCROLL SUAVE PARA ANCLAS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar-fixed')?.offsetHeight || 0;
                const extraOffset = 20;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - extraOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 🔸 ANIMACIÓN AL APARECER SECCIONES
    function revealSections() {
        const sections = document.querySelectorAll('.section-block, .missions-section-block, .huapango-section-block, .gastronomia-section-block, .presa-section-block');
        const windowHeight = window.innerHeight;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    }

    // Debounce para scroll
    let scrollTimeout;
    function debouncedRevealSections() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(revealSections, 100);
    }

    window.addEventListener('scroll', debouncedRevealSections);
    revealSections();

    // 🔸 CARRUSEL SWIPER 
    if (document.querySelector('.mySwiper')) {
        new Swiper('.mySwiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // 🔸 DATOS DEL CLIMA
    const apiKey = 'f22247db1f3b480f8a7190055252001';
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Jalpan de Serra&aqi=no`;

    async function getWeather() {
        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) throw new Error('Error en la respuesta de la API');
            const data = await response.json();
            const tempElement = document.getElementById('temperature');
            const conditionElement = document.getElementById('condition');
            const humidityElement = document.getElementById('humidity');
            const iconElement = document.getElementById('weather-icon');
            if (tempElement) tempElement.textContent = data.current.temp_c;
            if (conditionElement) conditionElement.textContent = data.current.condition.text;
            if (humidityElement) humidityElement.textContent = data.current.humidity;
            if (iconElement) iconElement.src = `https:${data.current.condition.icon}`;
        } catch (error) {
            console.error('❌ Error al obtener el clima:', error);
            const conditionElement = document.getElementById('condition');
            if (conditionElement) conditionElement.textContent = 'No disponible';
        }
    }

    getWeather();

    // 🔸 FORMULARIO DE COMENTARIOS
    const comentarioForm = document.querySelector('.comentario-form form');
    if (comentarioForm) {
        comentarioForm.addEventListener('submit', handleCommentSubmit);
    }

    function handleCommentSubmit(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const comentario = document.getElementById('comentario').value.trim();
        if (!nombre || !comentario) {
            showError('Por favor, completa todos los campos.');
            return;
        }
        addCommentToList(nombre, comentario);
        comentarioForm.reset();
    }

    function addCommentToList(nombre, comentario) {
        const lista = document.querySelector('.comentarios-lista');
        const nuevoComentario = document.createElement('li');
        nuevoComentario.className = 'col-md-4 mb-3 comentario-visible';
        const inicial = nombre.charAt(0).toUpperCase();
        nuevoComentario.innerHTML = `
            <div class="comentario-card">
                <div class="comentario-header">
                    <span class="user-initial">${inicial}</span>
                    <h5>${nombre}</h5>
                </div>
                <p>${comentario}</p>
            </div>
        `;
        lista.insertBefore(nuevoComentario, lista.firstChild);
        limitVisibleComments(lista, 3);
    }

    function limitVisibleComments(lista, maxVisible) {
        const comentarios = lista.querySelectorAll('li');
        comentarios.forEach((item, index) => {
            item.style.display = index >= maxVisible ? 'none' : '';
        });
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#DE0737';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.marginTop = '10px';
        document.querySelector('.comentario-form').appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // 🔸 CARGA DE DATOS DESDE FIRESTORE (GENÉRICO) - COMENTADO
    /*
    async function initializeFirestore() {
        const firebaseConfig = {
            apiKey: "AIzaSyD8kj9qzjsXdpurnz9MzvAGGs0DLdtxPpM",
            authDomain: "jalpandemicorazon-750b6.firebaseapp.com",
            projectId: "jalpandemicorazon-750b6",
            storageBucket: "jalpandemicorazon-750b6.firebasestorage.app",
            messagingSenderId: "426851112931",
            appId: "1:426851112931:web:6e1cd9367f7c05f423f2d6",
            measurementId: "G-7LP7HXXJG2"
        };

        // Inicializar Firebase
        const app = firebase.initializeApp(firebaseConfig);
        return firebase.firestore(app);
    }

    async function loadSectionData(collection, sectionId, isSubsection = false) {
        console.log(`🔍 Cargando datos para ${sectionId} en colección ${collection}`);
        const section = document.getElementById(sectionId);
        if (!section) {
            console.error(`❌ No se encontró la sección con ID: ${sectionId}`);
            return;
        }

        // Seleccionar el contenedor de contenido
        const contentBlock = section.querySelector(isSubsection ? '.missions-subsection-content' : '.content-block, .missions-content-block, .huapango-content-block, .gastronomia-content-block, .presa-content-block');
        if (!contentBlock) {
            console.error(`❌ No se encontró el bloque de contenido en ${sectionId}`);
            return;
        }

        // Seleccionar elementos de imagen y texto
        const imgElement = contentBlock.querySelector('.detail-img, .missions-detail-img, .huapango-detail-img, .gastronomia-detail-img, .presa-detail-img');
        const textElement = contentBlock.querySelector('.detail-text, .missions-detail-text, .huapango-detail-text, .gastronomia-detail-text, .presa-detail-text');
        if (!imgElement || !textElement) {
            console.error(`❌ Elementos no encontrados en ${sectionId}: img=${!!imgElement}, text=${!!textElement}`);
            return;
        }

        try {
            // Acceder a Firestore
            const db = await initializeFirestore();
            const docRef = db.collection(collection).doc(sectionId);
            const docSnap = await docRef.get();

            if (docSnap.exists) {
                const data = docSnap.data();
                console.log(`✅ Datos obtenidos para ${sectionId}:`, data);
                // Actualizar imagen
                imgElement.src = data.imagenUrl || '';
                imgElement.alt = section.querySelector(isSubsection ? '.missions-subsection-title' : '.section-title')?.textContent || sectionId;
                // Actualizar texto
                textElement.textContent = data.descripcion || '';
            } else {
                console.error(`❌ No se encontró el documento para ${sectionId}`);
                textElement.textContent = 'Contenido no disponible.';
            }
        } catch (error) {
            console.error(`❌ Error al cargar ${sectionId}:`, error);
            textElement.textContent = 'Hubo un problema al cargar el contenido.';
        }
    }

    // 🔸 CONFIGURACIÓN POR APARTADO
    const sectionConfig = {
        'unidad': {
            collection: 'unidad_familiar',
            sections: ['fiestas', 'gente', 'tradiciones']
        },
        'misiones': {
            collection: 'misiones_franciscanas',
            sections: ['mision_santiago', 'mision_tancoyol'],
            subsections: {
                parent: 'otras_misiones',
                ids: ['mision_landa', 'mision_tilaco', 'mision_conca']
            }
        },
        'huapango': {
            collection: 'huapango_tradiciones',
            sections: ['huapango', 'fiestas_tradicionales', 'artesanias']
        },
        'gastronomia': {
            collection: 'gastronomia_serrana',
            sections: ['platillos', 'ingredientes', 'recetas']
        },
        'presa': {
            collection: 'presa_agua',
            sections: ['presa_jalpan', 'poza_cazuela', 'rio_jalpan']
        },
        'tancama': {
            collection: 'zona_tancama',
            sections: ['sitio_arqueologico', 'historia', 'visitas']
        },
        'naturaleza': {
            collection: 'naturaleza_biodiversidad',
            sections: ['flora', 'fauna', 'lugares_magicos']
        }
    };

    // 🔸 INICIAR CARGA DE DATOS SEGÚN LA SECCIÓN
    const currentSection = Array.from(document.body.classList)
        .find(cls => cls.startsWith('section-'))?.replace('section-', '');
    
    if (currentSection && sectionConfig[currentSection]) {
        const config = sectionConfig[currentSection];
        // Cargar secciones principales
        config.sections.forEach(sectionId => {
            loadSectionData(config.collection, sectionId);
        });
        // Cargar subsecciones (si existen)
        if (config.subsections) {
            config.subsections.ids.forEach(subId => {
                loadSectionData(config.collection, subId, true);
            });
        }
    }
    */
});