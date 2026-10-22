const catalogueProducts = [
    { name: 'ABSORBENT C', image: 'ABSORBANT C.jpeg', category: 'nutrition', search: 'vitamine c immunite fatigue collagene energie', benefits: ['La vitamine C contribue au fonctionnement normal du système immunitaire.', 'Elle contribue à réduire la fatigue et à la formation normale de collagène.', 'Elle participe au métabolisme énergétique normal.'] },
    { name: 'FOREVER ABSORBENT-D', image: 'forever-absorbent-d.webp', category: 'nutrition', search: 'vitamines d e comprimés a croquer', benefits: ['Complément alimentaire à croquer contenant des vitamines D et E.', 'Le flacon contient 60 comprimés à croquer.'] },
    { name: 'FOREVER ARGI+', image: 'forever-argi-plus.jpg', category: 'nutrition', search: 'arginine vitamines sachets', benefits: ['Complément alimentaire associant L-arginine et vitamines.', 'Présenté en sachets individuels.'] },
    { name: 'FOREVER CALCIUM', image: 'FOREVER CALCIUM.jpeg', category: 'nutrition', search: 'calcium magnesium vitamine c vitamine d zinc os dentition muscles', benefits: ['Le calcium et la vitamine D contribuent au maintien d’une ossature normale.', 'Le calcium contribue au maintien d’une dentition normale.', 'Le calcium contribue au fonctionnement normal des muscles.'] },
    { name: 'BEE POLLEN', image: 'FOREVER BEE POLLEN.jpeg', category: 'nutrition', search: 'pollen abeille nutriments vitalite', benefits: ['Apporte des nutriments naturellement présents dans le pollen d’abeille.', 'Contribue à la vitalité au quotidien.'] },
    { name: 'MULTI-MACA', image: 'FOREVER MULTI-MACA.jpeg', category: 'nutrition', search: 'maca vitalite energie tonus', benefits: ['La maca est traditionnellement appréciée pour accompagner la vitalité.', 'S’intègre à une routine quotidienne axée sur le tonus et le bien-être.', 'Convient aux routines bien-être des hommes et des femmes.'] },
    { name: 'BEE PROPOLIS', image: 'FOREVER BEE PROPOLIS.jpeg', category: 'nutrition', search: 'propolis ruche abeille antioxydant immunite defenses naturelles', benefits: ['La propolis est appréciée pour ses propriétés antioxydantes.', 'Contribue au maintien des défenses naturelles.'] },
    { name: 'LYCIUM PLUS', image: 'FOEVER LYCIUM PLUS.jpeg', category: 'nutrition', search: 'goji lycium reglisse antioxydants vitalite stress oxydatif cellules', benefits: ['Les baies de goji sont naturellement riches en composés antioxydants.', 'Les composés antioxydants du goji contribuent à protéger les cellules du stress oxydatif.', 'Accompagne une routine quotidienne axée sur la vitalité.'] },
    { name: 'AIL & THYM', image: 'FOREVER AIL & THYM.jpeg', category: 'nutrition', search: 'ail thym digestion vitalite confort digestif bien-etre cardiovasculaire', benefits: ['Le thym est traditionnellement apprécié pour accompagner le confort digestif.', 'L’ail contribue à une routine alimentaire axée sur le bien-être cardiovasculaire.', 'La formule associe les bienfaits traditionnels de l’ail et du thym.'] },
    { name: 'VITOLIZE HOMMES', image: 'VITOLIZ HOMME.jpeg', category: 'nutrition', search: 'vitolize citrouille vitamines b6 c d e zinc homme vitalite energie testosterone', benefits: ['Contribue au bien-être et à la vitalité masculine.', 'Les vitamines B6 et C contribuent au métabolisme énergétique normal.', 'Le zinc contribue au maintien d’un taux normal de testostérone dans le sang.'] },
    { name: 'ALOE BERRY NECTAR', image: 'ALEO BERRY NECTAR.jpeg', category: 'boissons', search: 'aloe berry nectar boisson aloe vera canneberge pomme hydratation', benefits: ['Contribue à varier l’hydratation quotidienne.', 'Sa saveur fruitée rend l’hydratation quotidienne plus agréable.'] },
    { name: 'ALOE VERA GEL', image: 'aloe-vera-gel-forever.png', category: 'boissons', search: 'aloe vera gel boisson hydratation rafraichissant bien-etre', benefits: ['Boisson à l’aloe vera au goût doux et rafraîchissant.', 'Contribue à l’hydratation quotidienne.', 'S’intègre facilement à une routine de bien-être.'] },
    { name: 'BOISSONS À L’ALOE VERA', image: 'boissons-aloe-forever.png', category: 'boissons', search: 'mango berry nectar gel peaches boisson hydratation fraicheur', benefits: ['Des saveurs fruitées pour varier l’hydratation au quotidien.', 'Une boisson fraîche et agréable à intégrer à la routine quotidienne.'] },
    { name: 'SOINS À L’ALOE VERA', image: 'aloe-soins-forever.png', category: 'soins', search: 'aloe first gelly propolis creme peau rafraichit apaise hydrate confort cutane nourrit adoucit', benefits: ['Aloe First rafraîchit et apaise la peau.', 'Aloe Vera Gelly hydrate et procure une sensation de confort cutané.', 'Aloe Propolis Creme nourrit et adoucit la peau.'] },
    { name: 'SOINS & HYGIÈNE À L’ALOE', image: 'soins-quotidiens-aloe-forever.jpeg', category: 'soins', search: 'soins hygiene aloe vera forever bright dentifrice haleine fraiche aloe first propolis creme ever shield deodorant peau routine quotidienne', benefits: ['Forever Bright Toothgel aide à nettoyer les dents et laisse une sensation de fraîcheur mentholée.', 'Aloe First et Aloe Propolis Creme complètent une routine de soin pour hydrater et apaiser la peau.', 'Aloe Ever-Shield aide à contrôler les odeurs corporelles au quotidien.'] },
    { name: 'ALOE EVER-SHIELD', image: 'aloe-ever-shield-forever.jpg', category: 'soins', search: 'deodorant stick aloe vera fraicheur', benefits: ['Déodorant en stick formulé avec de l’aloe vera.', 'Un format pratique pour la routine quotidienne.'] },
    { name: 'ALOE AVOCADO FACE & BODY SOAP', image: 'aloe-avocado-soap-forever.jpg', category: 'soins', search: 'savon visage corps aloe vera avocat nettoyage peau', benefits: ['Savon à l’aloe vera et à l’avocat pour le visage et le corps.', 'Une senteur citronnée, indiquée sur l’emballage.'] },
    { name: 'FOREVER BRIGHT TOOTHGEL', image: 'forever-bright-toothgel.jpg', category: 'soins', search: 'dentifrice gel aloe vera propolis menthe sans fluor hygiene bucco dentaire', benefits: ['Dentifrice gel à l’aloe vera et à la propolis, à la menthe.', 'La formule est indiquée sans fluor sur l’emballage.'] },
    { name: 'SOIN DE VISAGE', image: 'soins-visage-forever.jpg', category: 'soins', search: 'aloe activator avocado soap aloe vera gelly propolis creme routine visage hydration peau', benefits: ['Sélection comprenant Aloe Activator, savon Aloe Avocado, Aloe Vera Gelly et Aloe Propolis Creme.', 'Des produits pour accompagner le nettoyage et les soins quotidiens du visage.'] },
    { name: 'SÉLECTION HYGIÈNE', image: 'selection-hygiene-forever.jpg', category: 'soins', search: 'forever bright toothgel dentifrice aloe lips levres ever shield deodorant routine quotidienne', benefits: ['Sélection réunissant Forever Bright Toothgel, Aloe Lips et Aloe Ever-Shield.', 'Une routine d’hygiène bucco-dentaire, des lèvres et du quotidien.'] },
    { name: 'SÉLECTION PROTECTION & SOINS', image: 'selection-protection-soins-forever.jpeg', category: 'soins', search: 'protection solaire aloe sunscreen spf 30 aloe heat lotion aloe lips levres forever bright dentifrice hygiene dentaire ever shield deodorant fraicheur soleil soin quotidien', benefits: ['Aloe Sunscreen SPF 30 aide à protéger la peau exposée au soleil.', 'Aloe Lips aide à garder les lèvres douces, tandis qu’Aloe Heat Lotion accompagne le massage.', 'Forever Bright favorise l’hygiène bucco-dentaire et Aloe Ever-Shield aide à contrôler les odeurs corporelles.'] },
    { name: 'SÉLECTION NUTRITION & SOINS', image: 'selection-nutrition-soins-forever.jpeg', category: 'soins', search: 'absorbent c vitamine c arctic sea omega 3 forever kids aloe vera gelly propolis creme heat lotion ever shield bright toothgel aloe jojoba shampoo hygiene cheveux peau nutrition bien etre quotidien', benefits: ['Absorbent-C apporte de la vitamine C, qui contribue au fonctionnement normal du système immunitaire ; Arctic Sea apporte des acides gras oméga-3.', 'Aloe Vera Gelly et Aloe Propolis Creme complètent les soins quotidiens de la peau.', 'La sélection inclut aussi des produits d’hygiène bucco-dentaire, corporelle et capillaire à l’aloe vera.'] },
    { name: 'KIT VISAGE À L’ALOE', image: 'kit-visage-aloe-forever.jpeg', category: 'soins', search: 'gelly propolis creme savon avocado peau nettoie hydrate fraicheur nourrit adoucit', benefits: ['Nettoie la peau en douceur avec le savon Aloe Avocado.', 'Aloe Vera Gelly hydrate et procure une sensation de fraîcheur.', 'Aloe Propolis Creme nourrit et adoucit la peau.'] }
];

const catalogueCategories = [
    { id: 'nutrition', title: 'Nutrition & vitalité', description: 'Une sélection de compléments et de produits de la ruche.' },
    { id: 'boissons', title: 'Boissons à l’aloe vera', description: 'Des boissons et saveurs variées à découvrir.' },
    { id: 'soins', title: 'Soins & beauté', description: 'Des soins et produits cosmétiques pour votre routine.' }
];
const searchInput = document.getElementById('product-search');
const availabilityFilter = document.getElementById('stock-filter');
const resultsMessage = document.getElementById('search-results');
const stockDataMessage = document.getElementById('stock-data-status');
const categoryContainer = document.getElementById('product-categories');
const normalizeCatalogueText = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr')
    .trim();
const catalogueProductId = (name) => normalizeCatalogueText(name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let catalogueAvailability = new Map();

const makeProductCard = (product) => {
    const productId = catalogueProductId(product.name);
    const card = document.createElement('article');
    card.className = 'ice-card flex flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white transition hover:-translate-y-1 hover:border-sky-200';
    card.dataset.productCard = '';
    card.dataset.category = product.category;
    card.dataset.search = normalizeCatalogueText(`${product.name} ${product.search} ${product.benefits.join(' ')}`);

    const imageFrame = document.createElement('div');
    imageFrame.className = 'flex h-64 items-center justify-center border-b border-sky-50 bg-gradient-to-br from-white to-sky-50 p-5';
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;
    image.className = 'h-full w-full object-contain';
    image.loading = 'lazy';
    imageFrame.append(image);

    const body = document.createElement('div');
    body.className = 'flex flex-1 flex-col gap-5 p-6';
    const title = document.createElement('h3');
    title.className = 'text-lg font-bold text-slate-900';
    title.textContent = product.name;
    const benefits = document.createElement('ul');
    benefits.className = 'space-y-2 text-sm leading-6 text-slate-600';
    product.benefits.forEach((benefit) => {
        const item = document.createElement('li');
        item.className = 'flex gap-2';
        item.innerHTML = '<i class="fas fa-check mt-1 text-xs text-snGreen" aria-hidden="true"></i>';
        const text = document.createElement('span');
        text.textContent = benefit;
        item.append(text);
        benefits.append(item);
    });

    const stockRow = document.createElement('div');
    stockRow.className = 'mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-sky-50 pt-4';
    const status = document.createElement('span');
    status.dataset.stockStatus = '';
    status.className = 'rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600';
    status.textContent = 'Indisponible';
    status.setAttribute('aria-label', 'Stock indisponible');

    stockRow.append(status);

    const orderLink = document.createElement('a');
    orderLink.className = 'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-snGreen px-4 py-3 text-sm font-bold text-white transition hover:bg-snLightGreen disabled:cursor-not-allowed disabled:opacity-50';
    orderLink.dataset.orderLink = '';
    orderLink.setAttribute('aria-disabled', 'true');
    orderLink.tabIndex = -1;
    orderLink.classList.add('pointer-events-none', 'opacity-50');
    orderLink.innerHTML = '<i class="fab fa-whatsapp text-lg" aria-hidden="true"></i>';
    const orderLabel = document.createElement('span');
    orderLabel.textContent = 'Indisponible';
    orderLink.append(orderLabel);

    body.append(title, benefits, stockRow, orderLink);
    card.append(imageFrame, body);
    return card;
};

catalogueCategories.forEach((category) => {
    const section = document.createElement('section');
    section.id = category.id;
    section.className = 'anchor-section';
    const heading = document.createElement('div');
    heading.className = 'mb-5';
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold text-slate-900 sm:text-3xl';
    title.textContent = category.title;
    const description = document.createElement('p');
    description.className = 'mt-2 text-sm text-slate-600';
    description.textContent = category.description;
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3';
    grid.dataset.categoryGrid = category.id;

    catalogueProducts.filter((product) => product.category === category.id).forEach((product) => {
        grid.append(makeProductCard(product));
    });

    heading.append(title, description);
    section.append(heading, grid);
    categoryContainer.append(section);
});

function applyCatalogueFilters() {
    const query = normalizeCatalogueText(searchInput.value);
    const selectedAvailability = availabilityFilter.value;
    let visibleCount = 0;

    categoryContainer.querySelectorAll('[data-product-card]').forEach((card) => {
        const isAvailable = catalogueAvailability.get(catalogueProductId(card.querySelector('h3').textContent)) === true;
        const matchesQuery = card.dataset.search.includes(query);
        const matchesAvailability = selectedAvailability === 'all'
            || (selectedAvailability === 'available' && isAvailable)
            || (selectedAvailability === 'unavailable' && !isAvailable);
        const isVisible = matchesQuery && matchesAvailability;
        card.classList.toggle('hidden', !isVisible);
        if (isVisible) visibleCount += 1;
    });

    categoryContainer.querySelectorAll('[data-category-grid]').forEach((grid) => {
        const hasVisibleProducts = Array.from(grid.children).some((card) => !card.classList.contains('hidden'));
        grid.closest('section').classList.toggle('hidden', !hasVisibleProducts);
    });

    resultsMessage.textContent = visibleCount === 0
        ? 'Aucun produit trouvé avec ces critères.'
        : `${visibleCount} produit${visibleCount > 1 ? 's' : ''} affiché${visibleCount > 1 ? 's' : ''}.`;
}

searchInput.addEventListener('input', applyCatalogueFilters);
availabilityFilter.addEventListener('change', applyCatalogueFilters);
applyCatalogueFilters();

const updateProductAvailability = (card, available) => {
    const productName = card.querySelector('h3').textContent;
    const status = card.querySelector('[data-stock-status]');
    const orderLink = card.querySelector('[data-order-link]');
    const orderLabel = orderLink.querySelector('span');
    status.textContent = available ? 'Disponible' : 'Indisponible';
    status.className = available
        ? 'rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-900'
        : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600';
    status.setAttribute('aria-label', `Stock ${available ? 'disponible' : 'indisponible'}`);
    orderLabel.textContent = available ? 'Commander sur WhatsApp' : 'Indisponible';
    if (available) {
        const message = `Bonjour Santé & Naturel, je souhaite commander ${productName}.`;
        orderLink.href = `https://wa.me/221772702493?text=${encodeURIComponent(message)}`;
        orderLink.target = '_blank';
        orderLink.rel = 'noopener noreferrer';
        orderLink.removeAttribute('aria-disabled');
        orderLink.removeAttribute('tabindex');
        orderLink.classList.remove('pointer-events-none', 'opacity-50');
    } else {
        orderLink.removeAttribute('href');
        orderLink.removeAttribute('target');
        orderLink.removeAttribute('rel');
        orderLink.setAttribute('aria-disabled', 'true');
        orderLink.tabIndex = -1;
        orderLink.classList.add('pointer-events-none', 'opacity-50');
    }
};

const loadCatalogueAvailability = async () => {
    try {
        const response = await fetch('produits.json', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Chargement de produits.json impossible (${response.status}).`);
        }
        const products = await response.json();
        if (!Array.isArray(products) || products.some((product) =>
            !product || typeof product.id !== 'string' || typeof product.nom !== 'string'
            || typeof product.disponible !== 'boolean')) {
            throw new Error('Le format de produits.json est invalide.');
        }

        const availability = new Map(products.map((product) => [product.id, product.disponible]));
        const cards = Array.from(categoryContainer.querySelectorAll('[data-product-card]'));
        const missingProduct = cards.find((card) =>
            !availability.has(catalogueProductId(card.querySelector('h3').textContent)));
        if (missingProduct) {
            throw new Error(`Disponibilité absente pour ${missingProduct.querySelector('h3').textContent}.`);
        }

        catalogueAvailability = availability;
        cards.forEach((card) => {
            const id = catalogueProductId(card.querySelector('h3').textContent);
            updateProductAvailability(card, catalogueAvailability.get(id));
        });
        stockDataMessage.textContent = '';
    } catch (error) {
        console.error('Impossible de charger la disponibilité des produits.', error);
        stockDataMessage.textContent = 'Impossible de charger les disponibilités. Réessayez plus tard.';
        stockDataMessage.classList.add('text-red-700');
        categoryContainer.querySelectorAll('[data-product-card]').forEach((card) => {
            updateProductAvailability(card, false);
        });
    }
    applyCatalogueFilters();
};

loadCatalogueAvailability();
