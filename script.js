let menuData = {};
let currentLang = 'fr';

async function loadMenu() {
    try {
        let response = await fetch('style.json');
        menuData = await response.json();
        console.log(menuData)
        renderMenu();
    } catch (error) {
        console.error("Erreur:", error);
    }
}

function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    renderMenu();
}

function renderMenu() {
    document.getElementById('res-nameinnerText' || 'res-name').innerText = menuData.restaurantInfo.name[currentLang];
    
    let container = document.getElementById('menu-container');
    let navContainer = document.getElementById('categories-nav');
    
    container.innerHTML = '';
    navContainer.innerHTML = '';

    menuData.categories.forEach(category => {
        navContainer.innerHTML += `
            <a href="#cat-${category.id}" class="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-amber-500 hover:text-white transition">
                ${category.name[currentLang]}
            </a>
        `;

        let itemsHTML = '';
        category.items.forEach(item => {
            itemsHTML += `
                <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 class="font-bold text-lg text-gray-900">${item.name[currentLang]}</h3>
                    <span class="text-amber-600 font-semibold">${item.price} ${menuData.restaurantInfo.currency}</span>
                </div>
            `;
        });

        container.innerHTML += `
            <section id="cat-${category.id}" class="space-y-3">
                <h2 class="text-xl font-bold text-gray-800 border-b pb-1">${category.name[currentLang]}</h2>
                <div class="space-y-3">
                    ${itemsHTML}
                </div>
            </section>
        `;
    });
}

loadMenu();