// Кнопка "Наверх" (без изменений)
const backToTopButton = document.createElement('button');
backToTopButton.textContent = 'Наверх ↑';
backToTopButton.id = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 18px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTopButton);

function toggleBackToTop() {
    if (window.pageYOffset > 100) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
}

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', toggleBackToTop);
toggleBackToTop();
document.addEventListener('DOMContentLoaded', function() {
 
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || category === itemCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // НОВОЕ: Модальное окно для фото
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close');

    // Открытие модалки при клике на фото
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            modalImg.src = item.src;  // Подставляем src кликнутого фото
            modal.classList.remove('hidden');  // Показываем модалку
        });
    });

    // Закрытие по крестику
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Закрытие по клику на фон (вне фото)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Закрытие по Escape (бонус для UX)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });

    // АККОРДЕОН: Переключение пунктов
    const accordionTitles = document.querySelectorAll('.accordion-title');

    accordionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const item = title.parentElement;  // .accordion-item
            const isActive = item.classList.contains('active');

            // Закрываем все пункты
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Открываем текущий (если был открыт — закроем)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});