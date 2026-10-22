const SITE_VERSION = '2026.10.16.1';

const pageLinks = [
    { id: 'accueil', label: 'Accueil', href: 'index.html' },
    { id: 'boutique', label: 'Boutique', href: 'boutique.html' },
    { id: 'catalogue', label: 'Catalogue', href: 'catalogue.html' },
    { id: 'produits', label: 'Produits', href: 'produits.html' },
    { id: 'apropos', label: 'À propos', href: 'apropos.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' }
];

const header = document.querySelector('[data-site-header]');

if (header) {
    const siteNavigationStorageKey = 'sante-naturel-previous-page-v1';
    const shoppingCartStorageKey = 'sante-naturel-shopping-cart-v1';
    const currentPage = document.body.dataset.page;
    const navItems = pageLinks.map(({ id, label, href }) => (
        `<a href="${href}"${id === currentPage ? ' aria-current="page"' : ''}><i class="fas ${id === currentPage ? 'fa-circle-check' : 'fa-arrow-right'}" aria-hidden="true"></i><span>${label}</span></a>`
    )).join('');

    header.className = 'site-header';
    header.innerHTML = `
        <div class="site-header-inner">
            <a href="index.html" class="site-brand" aria-label="Santé & Naturel, accueil">
                <img src="sante-naturel-logo.jpg" alt="">
                <span class="site-brand-copy">
                    <span class="site-brand-name">Santé & Naturel</span>
                    <span class="site-brand-subtitle">Youssou Mbow · Dakar</span>
                </span>
            </a>
            <div class="site-profile">
                <button class="site-profile-toggle" type="button" aria-label="Profil de Youssou Mbow" aria-controls="site-profile-menu" aria-expanded="false">
                    <img class="site-profile-photo" src="youssou-mbow.jpg" alt="">
                    <span class="site-profile-copy">
                        <span class="site-profile-name">YOUSSOU MBOW</span>
                        <span class="site-profile-title">Fondateur Santé & Naturel</span>
                    </span>
                    <i class="fas fa-chevron-down site-profile-chevron" aria-hidden="true"></i>
                </button>
                <div class="site-profile-menu" id="site-profile-menu" aria-label="Profil du fondateur" hidden>
                    <p class="site-profile-menu-name">YOUSSOU MBOW</p>
                    <p class="site-profile-menu-title">Fondateur Santé & Naturel</p>
                    <a href="https://wa.me/221772702493" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-whatsapp" aria-hidden="true"></i><span>Contacter la boutique</span>
                    </a>
                </div>
            </div>
            <div class="site-header-actions">
                <button class="site-back-button" type="button" aria-label="Retourner à la page précédente">
                    <i class="fas fa-arrow-left" aria-hidden="true"></i><span>Retour</span>
                </button>
                <button class="site-cart-toggle" type="button" aria-label="Ouvrir le panier" aria-controls="site-cart" aria-expanded="false">
                    <i class="fas fa-basket-shopping" aria-hidden="true"></i><span>Panier</span>
                    <span class="site-cart-count" data-cart-count aria-live="polite">0</span>
                </button>
                <button class="site-menu-toggle" type="button" aria-label="Ouvrir le menu" aria-controls="site-navigation" aria-expanded="false">
                    <i class="fas fa-bars" aria-hidden="true"></i>
                </button>
                <a class="site-order-link" href="https://wa.me/221772702493?text=Bonjour%20Sant%C3%A9%20%26%20Naturel,%20je%20souhaite%20commander%20un%20produit" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-whatsapp" aria-hidden="true"></i><span>Commander</span>
                </a>
            </div>
        </div>
    `;

    const menuToggle = header.querySelector('.site-menu-toggle');
    const profileToggle = header.querySelector('.site-profile-toggle');
    const profileMenu = header.querySelector('.site-profile-menu');
    const backButton = header.querySelector('.site-back-button');
    const currentDirectory = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

    const closeProfileMenu = (restoreFocus = false) => {
        if (profileToggle.getAttribute('aria-expanded') !== 'true') return;
        profileToggle.setAttribute('aria-expanded', 'false');
        profileMenu.hidden = true;
        if (restoreFocus) profileToggle.focus();
    };

    profileToggle.addEventListener('click', () => {
        const isOpen = profileToggle.getAttribute('aria-expanded') === 'true';
        profileToggle.setAttribute('aria-expanded', String(!isOpen));
        profileMenu.hidden = isOpen;
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.site-profile')) closeProfileMenu();
        const link = event.target.closest('a[href]');
        if (!link || link.target === '_blank') return;

        const destination = new URL(link.href, window.location.href);
        const destinationDirectory = destination.pathname.substring(0, destination.pathname.lastIndexOf('/'));
        if (destination.origin !== window.location.origin
            || destinationDirectory !== currentDirectory
            || destination.pathname === window.location.pathname) return;

        try {
            window.sessionStorage.setItem(siteNavigationStorageKey, JSON.stringify({
                from: `${window.location.pathname}${window.location.search}${window.location.hash}`,
                to: destination.pathname
            }));
        } catch (error) {
            console.error('Impossible d’enregistrer la navigation précédente.', error);
        }
    });

    backButton.addEventListener('click', () => {
        try {
            const storedNavigation = window.sessionStorage.getItem(siteNavigationStorageKey);
            if (storedNavigation) {
                const previousNavigation = JSON.parse(storedNavigation);
                if (previousNavigation.to === window.location.pathname
                    && typeof previousNavigation.from === 'string') {
                    window.sessionStorage.removeItem(siteNavigationStorageKey);
                    window.location.href = previousNavigation.from;
                    return;
                }
                window.sessionStorage.removeItem(siteNavigationStorageKey);
            }
        } catch (error) {
            console.error('Impossible de récupérer la page précédente.', error);
        }

        const referrer = document.referrer;
        if (referrer) {
            try {
                const referrerUrl = new URL(referrer);
                const referrerDirectory = referrerUrl.pathname.substring(0, referrerUrl.pathname.lastIndexOf('/'));
                if (referrerUrl.origin === window.location.origin && referrerDirectory === currentDirectory) {
                    window.history.back();
                    return;
                }
            } catch (error) {
                console.error('Impossible de déterminer la page précédente.', error);
            }
        }
        window.location.href = 'index.html';
    });

    const pageContent = [...document.querySelectorAll('header[data-site-header], main, [data-site-footer]')];
    const backdrop = document.createElement('div');
    backdrop.className = 'site-menu-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    const drawer = document.createElement('aside');
    drawer.className = 'site-menu-drawer';
    drawer.id = 'site-navigation';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Menu principal');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = `
        <div class="site-menu-drawer-heading">
            <span class="site-menu-eyebrow">Santé & Naturel</span>
            <button class="site-menu-close" type="button" aria-label="Fermer le menu">
                <i class="fas fa-xmark" aria-hidden="true"></i>
            </button>
        </div>
        <p class="site-menu-caption">Explorez notre univers</p>
        <nav class="site-nav" aria-label="Navigation principale">
            ${navItems}
            <button class="site-nav-settings" type="button" data-settings-open>
                <i class="fas fa-gear" aria-hidden="true"></i><span>Paramètres</span>
            </button>
        </nav>
        <a class="site-menu-contact" href="contact.html"><i class="fas fa-comments" aria-hidden="true"></i><span>Contacter la boutique</span></a>
        <button class="site-install-button" type="button" data-pwa-install hidden>
            <i class="fas fa-download" aria-hidden="true"></i><span>Installer l’application</span>
        </button>
        <p class="site-install-status" data-pwa-install-status role="status" aria-live="polite" hidden></p>
    `;
    document.body.append(backdrop, drawer);

    const settingsDialog = document.createElement('dialog');
    settingsDialog.className = 'site-settings-dialog';
    settingsDialog.setAttribute('aria-labelledby', 'site-settings-title');
    settingsDialog.innerHTML = `
        <div class="site-settings-content">
            <h2 id="site-settings-title">Paramètres</h2>
            <p class="site-settings-version">Version actuelle : <strong data-site-version></strong></p>
            <p class="site-settings-status" data-update-status role="status" aria-live="polite"></p>
            <div class="site-settings-actions">
                <button class="site-settings-check" type="button" data-check-updates>Vérifier les mises à jour</button>
                <button class="site-settings-close" type="button" data-settings-close>Fermer</button>
            </div>
        </div>
    `;
    settingsDialog.querySelector('[data-site-version]').textContent = SITE_VERSION;
    document.body.append(settingsDialog);

    const cartBackdrop = document.createElement('div');
    cartBackdrop.className = 'site-cart-backdrop';
    cartBackdrop.setAttribute('aria-hidden', 'true');
    const cartDrawer = document.createElement('aside');
    cartDrawer.className = 'site-cart-drawer';
    cartDrawer.id = 'site-cart';
    cartDrawer.setAttribute('role', 'dialog');
    cartDrawer.setAttribute('aria-modal', 'true');
    cartDrawer.setAttribute('aria-label', 'Votre panier');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartDrawer.innerHTML = `
        <div class="site-cart-heading">
            <div>
                <p class="site-cart-eyebrow">Votre sélection</p>
                <h2>Mon panier</h2>
            </div>
            <button class="site-cart-close" type="button" aria-label="Fermer le panier"><i class="fas fa-xmark" aria-hidden="true"></i></button>
        </div>
        <p class="site-cart-status" data-cart-status role="status" aria-live="polite"></p>
        <p class="site-cart-empty" data-cart-empty>Votre panier est vide. Ajoutez les produits qui vous intéressent.</p>
        <div class="site-cart-items" data-cart-items></div>
        <div class="site-cart-footer">
            <button class="site-cart-clear" type="button" data-cart-clear>Vider le panier</button>
            <a class="site-cart-checkout" data-cart-checkout target="_blank" rel="noopener noreferrer">
                <i class="fab fa-whatsapp" aria-hidden="true"></i><span>Envoyer la sélection sur WhatsApp</span>
            </a>
            <p class="site-cart-note">La disponibilité et le montant seront confirmés par la boutique.</p>
        </div>
    `;
    document.body.append(cartBackdrop, cartDrawer);

    const cartToggle = header.querySelector('.site-cart-toggle');
    const cartCount = header.querySelector('[data-cart-count]');
    const cartCloseButton = cartDrawer.querySelector('.site-cart-close');
    const cartItemsContainer = cartDrawer.querySelector('[data-cart-items]');
    const cartEmptyMessage = cartDrawer.querySelector('[data-cart-empty]');
    const cartStatus = cartDrawer.querySelector('[data-cart-status]');
    const cartCheckout = cartDrawer.querySelector('[data-cart-checkout]');
    const cartState = { items: [], available: true };
    const normalizeProductId = (name) => name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('fr')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const loadCart = () => {
        const storedCart = window.localStorage.getItem(shoppingCartStorageKey);
        if (!storedCart) return [];
        const parsedCart = JSON.parse(storedCart);
        if (!Array.isArray(parsedCart)
            || parsedCart.some((item) => !item || typeof item.name !== 'string'
                || item.id !== normalizeProductId(item.name)
                || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99)
            || new Set(parsedCart.map((item) => item.id)).size !== parsedCart.length) {
            throw new Error('Le format du panier enregistré est invalide.');
        }
        return parsedCart;
    };

    try {
        cartState.items = loadCart();
    } catch (error) {
        console.error('Impossible de charger le panier enregistré.', error);
        cartState.available = false;
        cartStatus.textContent = 'Impossible de lire le panier enregistré. Videz-le pour recommencer.';
    }

    const saveCart = (nextItems) => {
        try {
            window.localStorage.setItem(shoppingCartStorageKey, JSON.stringify(nextItems));
            cartState.items = nextItems;
            cartState.available = true;
            cartStatus.textContent = '';
            renderCart();
            return true;
        } catch (error) {
            console.error('Impossible d’enregistrer le panier.', error);
            cartState.available = false;
            cartStatus.textContent = 'Impossible d’enregistrer le panier. Vérifiez le stockage du navigateur.';
            renderCart();
            return false;
        }
    };

    const renderCart = () => {
        const totalCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = String(totalCount);
        cartToggle.setAttribute('aria-label', `Ouvrir le panier, ${totalCount} article${totalCount === 1 ? '' : 's'}`);
        cartEmptyMessage.hidden = cartState.items.length > 0;
        cartItemsContainer.replaceChildren();

        cartState.items.forEach((item) => {
            const row = document.createElement('article');
            row.className = 'site-cart-item';
            const name = document.createElement('h3');
            name.textContent = item.name;
            const controls = document.createElement('div');
            controls.className = 'site-cart-item-controls';
            const quantity = document.createElement('span');
            quantity.className = 'site-cart-quantity';
            quantity.textContent = `Quantité : ${item.quantity}`;
            const decrease = document.createElement('button');
            decrease.type = 'button';
            decrease.className = 'site-cart-quantity-button';
            decrease.dataset.cartChange = '-1';
            decrease.dataset.productId = item.id;
            decrease.setAttribute('aria-label', `Retirer une unité de ${item.name}`);
            decrease.disabled = item.quantity <= 1;
            decrease.textContent = '−';
            const increase = document.createElement('button');
            increase.type = 'button';
            increase.className = 'site-cart-quantity-button';
            increase.dataset.cartChange = '1';
            increase.dataset.productId = item.id;
            increase.setAttribute('aria-label', `Ajouter une unité de ${item.name}`);
            increase.disabled = item.quantity >= 99;
            increase.textContent = '+';
            const remove = document.createElement('button');
            remove.type = 'button';
            remove.className = 'site-cart-remove';
            remove.dataset.cartRemove = item.id;
            remove.setAttribute('aria-label', `Supprimer ${item.name} du panier`);
            remove.innerHTML = '<i class="fas fa-trash-can" aria-hidden="true"></i>';
            controls.append(decrease, quantity, increase, remove);
            row.append(name, controls);
            cartItemsContainer.append(row);
        });

        const hasItems = cartState.items.length > 0;
        cartCheckout.hidden = !hasItems;
        cartCheckout.href = hasItems
            ? `https://wa.me/221772702493?text=${encodeURIComponent([
                'Bonjour Santé & Naturel, je souhaite commander :',
                ...cartState.items.map((item) => `- ${item.name} × ${item.quantity}`)
            ].join('\n'))}`
            : '';
        cartDrawer.querySelector('[data-cart-clear]').disabled = !hasItems && cartState.available;
        cartDrawer.querySelectorAll('[data-cart-change], [data-cart-remove]').forEach((control) => {
            control.disabled = !cartState.available || control.disabled;
        });
        document.querySelectorAll('[data-cart-add]').forEach((button) => {
            button.disabled = !cartState.available;
        });
    };

    const decorateProductCards = () => {
        document.querySelectorAll('[data-product-card]:not([data-cart-action-added])').forEach((card) => {
            const productName = card.querySelector('h3')?.textContent.trim();
            const orderLink = card.querySelector('a[href*="wa.me"]');
            if (!productName || !orderLink) return;

            const addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.className = 'site-add-to-cart';
            addButton.dataset.cartAdd = '';
            addButton.innerHTML = '<i class="fas fa-cart-plus" aria-hidden="true"></i><span>Ajouter au panier</span>';
            addButton.setAttribute('aria-label', `Ajouter ${productName} au panier`);
            addButton.disabled = !cartState.available;
            orderLink.parentElement.insertBefore(addButton, orderLink);
            card.dataset.cartActionAdded = '';
        });
    };

    const openCart = () => {
        closeMenu();
        cartToggle.setAttribute('aria-expanded', 'true');
        cartDrawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('site-menu-open');
        pageContent.forEach((element) => { element.inert = true; });
        cartBackdrop.classList.add('is-open');
        cartDrawer.classList.add('is-open');
        cartCloseButton.focus();
    };

    const closeCart = () => {
        if (cartToggle.getAttribute('aria-expanded') !== 'true') return;
        cartToggle.setAttribute('aria-expanded', 'false');
        cartDrawer.setAttribute('aria-hidden', 'true');
        cartBackdrop.classList.remove('is-open');
        cartDrawer.classList.remove('is-open');
        document.body.classList.remove('site-menu-open');
        pageContent.forEach((element) => { element.inert = false; });
        window.setTimeout(() => {
            if (cartToggle.getAttribute('aria-expanded') === 'false'
                && menuToggle.getAttribute('aria-expanded') === 'false') cartToggle.focus();
        }, 280);
    };

    cartToggle.addEventListener('click', openCart);
    cartCloseButton.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);
    cartDrawer.querySelector('[data-cart-clear]').addEventListener('click', () => {
        try {
            window.localStorage.removeItem(shoppingCartStorageKey);
            cartState.available = true;
            cartStatus.textContent = '';
            cartState.items = [];
            renderCart();
        } catch (error) {
            console.error('Impossible de vider le panier.', error);
            cartStatus.textContent = 'Impossible de vider le panier enregistré.';
        }
    });

    document.addEventListener('click', (event) => {
        const addButton = event.target.closest('[data-cart-add]');
        if (addButton) {
            const card = addButton.closest('[data-product-card]');
            const name = card?.querySelector('h3')?.textContent.trim();
            if (!name || !cartState.available) return;
            const id = normalizeProductId(name);
            const existing = cartState.items.find((item) => item.id === id);
            const nextItems = existing
                ? cartState.items.map((item) => item.id === id
                    ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
                    : item)
                : [...cartState.items, { id, name, quantity: 1 }];
            if (saveCart(nextItems)) {
                const label = addButton.querySelector('span');
                label.textContent = 'Ajouté au panier';
                window.setTimeout(() => { label.textContent = 'Ajouter au panier'; }, 1200);
            }
            return;
        }

        const quantityButton = event.target.closest('[data-cart-change]');
        if (quantityButton) {
            const id = quantityButton.dataset.productId;
            const change = Number(quantityButton.dataset.cartChange);
            const nextItems = cartState.items.map((item) => item.id === id
                ? { ...item, quantity: Math.max(1, Math.min(99, item.quantity + change)) }
                : item);
            saveCart(nextItems);
            return;
        }

        const removeButton = event.target.closest('[data-cart-remove]');
        if (removeButton) {
            saveCart(cartState.items.filter((item) => item.id !== removeButton.dataset.cartRemove));
        }
    });

    document.addEventListener('keydown', (event) => {
        if (cartToggle.getAttribute('aria-expanded') !== 'true') return;
        if (event.key === 'Escape') {
            closeCart();
        } else if (event.key === 'Tab') {
            const focusableElements = [...cartDrawer.querySelectorAll('a[href], button:not(:disabled)')]
                .filter((element) => !element.hidden);
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (!cartDrawer.contains(document.activeElement)) {
                event.preventDefault();
                (event.shiftKey ? lastElement : firstElement).focus();
            } else if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });

    window.addEventListener('storage', (event) => {
        if (event.key !== shoppingCartStorageKey) return;
        try {
            cartState.items = loadCart();
            cartState.available = true;
            cartStatus.textContent = '';
            renderCart();
        } catch (error) {
            console.error('Impossible de synchroniser le panier entre les pages.', error);
            cartState.available = false;
            cartStatus.textContent = 'Impossible de lire le panier enregistré.';
            renderCart();
        }
    });

    new MutationObserver(decorateProductCards).observe(document.body, { childList: true, subtree: true });
    decorateProductCards();
    renderCart();

    const closeButton = drawer.querySelector('.site-menu-close');
    const navigation = drawer.querySelector('.site-nav');

    const closeMenu = (restoreFocus = true) => {
        if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
        menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('site-menu-open');
        pageContent.forEach((element) => { element.inert = false; });
        window.setTimeout(() => {
            if (restoreFocus && menuToggle.getAttribute('aria-expanded') === 'false') {
                menuToggle.focus();
            }
        }, 280);
    };

    const settingsStatus = settingsDialog.querySelector('[data-update-status]');
    const checkUpdatesButton = settingsDialog.querySelector('[data-check-updates]');
    const closeSettingsButton = settingsDialog.querySelector('[data-settings-close]');
    const updateCheckParameter = 'site-update-check';

    const getUpdateCheckResult = () => {
        const currentUrl = new URL(window.location.href);
        const checkValue = currentUrl.searchParams.get(updateCheckParameter);
        if (!checkValue) return null;

        currentUrl.searchParams.delete(updateCheckParameter);
        window.history.replaceState(window.history.state, '', currentUrl);
        try {
            const check = JSON.parse(checkValue);
            if (typeof check.version !== 'string' || typeof check.nonce !== 'number') return null;
            return check.version === SITE_VERSION ? 'Votre site est à jour' : 'Mise à jour installée';
        } catch (error) {
            console.error('Impossible de lire le résultat de la vérification des mises à jour.', error);
            return null;
        }
    };

    const pendingUpdateResult = getUpdateCheckResult();
    const closeSettings = () => {
        if (settingsDialog.open) settingsDialog.close();
    };

    drawer.querySelector('[data-settings-open]').addEventListener('click', () => {
        closeMenu(false);
        settingsDialog.showModal();
        closeSettingsButton.focus();
    });
    closeSettingsButton.addEventListener('click', closeSettings);
    settingsDialog.addEventListener('click', (event) => {
        if (event.target === settingsDialog) closeSettings();
    });
    checkUpdatesButton.addEventListener('click', async () => {
        checkUpdatesButton.disabled = true;
        settingsStatus.textContent = 'Vérification en cours…';

        try {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) await registration.update();
            }

            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
            }

            const reloadUrl = new URL(window.location.href);
            reloadUrl.searchParams.set(updateCheckParameter, JSON.stringify({
                version: SITE_VERSION,
                nonce: Date.now()
            }));
            window.location.assign(reloadUrl);
        } catch (error) {
            console.error('Impossible de vérifier les mises à jour.', error);
            settingsStatus.textContent = 'La vérification a échoué. Vérifiez votre connexion puis réessayez.';
            checkUpdatesButton.disabled = false;
        }
    });

    const openMenu = () => {
        if (menuToggle.getAttribute('aria-expanded') === 'true') return;
        closeCart();
        menuToggle.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('site-menu-open');
        pageContent.forEach((element) => { element.inert = true; });
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        closeButton.focus();
    };

    menuToggle.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    if (pendingUpdateResult) {
        settingsStatus.textContent = pendingUpdateResult;
        settingsDialog.showModal();
        closeSettingsButton.focus();
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && profileToggle.getAttribute('aria-expanded') === 'true') {
            closeProfileMenu(true);
        }
        if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
        if (event.key === 'Escape') {
            closeMenu();
        } else if (event.key === 'Tab') {
            const focusableElements = [...drawer.querySelectorAll('a[href], button:not(:disabled)')];
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (!drawer.contains(document.activeElement)) {
                event.preventDefault();
                (event.shiftKey ? lastElement : firstElement).focus();
            } else if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });
}

document.querySelectorAll('[data-site-footer]').forEach((footer) => {
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 text-center sm:px-6 md:grid-cols-3 md:text-left lg:px-8">
            <div class="space-y-3">
                <img src="sante-naturel-logo.jpg" alt="Logo Santé &amp; Naturel" class="mx-auto h-14 w-14 rounded-full object-cover md:mx-0">
                <h2 class="text-xl font-bold">Santé & Naturel</h2>
                <p class="text-sm text-slate-300">Youssou Mbow · Boutique bien-être au naturel.</p>
            </div>
            <div class="space-y-2 text-sm text-slate-200">
                <p><i class="fas fa-map-marker-alt mr-2 text-cyan-300" aria-hidden="true"></i>Médina, Dakar 10000, Sénégal</p>
                <p><i class="fas fa-phone-alt mr-2 text-cyan-300" aria-hidden="true"></i>+221 77 270 24 93</p>
                <p><i class="fab fa-whatsapp mr-2 text-cyan-300" aria-hidden="true"></i>Commande directe WhatsApp</p>
            </div>
            <div>
                <a href="https://wa.me/221772702493" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
                    <i class="fab fa-whatsapp" aria-hidden="true"></i>Nous contacter
                </a>
            </div>
        </div>
        <p class="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">© 2026 Santé & Naturel · Youssou Mbow · Dakar</p>
    `;
});

const pwaInstallButton = document.querySelector('[data-pwa-install]');
const pwaInstallStatus = document.querySelector('[data-pwa-install-status]');
let deferredInstallPrompt = null;
const isPwaInstalled = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;

if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('./service-worker.js')
        .catch((error) => {
            console.error('Impossible d’enregistrer le mode hors ligne.', error);
            if (pwaInstallStatus) {
                pwaInstallStatus.textContent = 'L’installation nécessite un site sécurisé (HTTPS).';
                pwaInstallStatus.hidden = false;
            }
        });

    if (pwaInstallButton && !isPwaInstalled) {
        pwaInstallButton.hidden = false;
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            deferredInstallPrompt = event;
        });

        pwaInstallButton.addEventListener('click', async () => {
            if (!deferredInstallPrompt) {
                const isAppleMobile = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
                pwaInstallStatus.textContent = isAppleMobile
                    ? 'Dans Safari, touchez Partager puis « Sur l’écran d’accueil ».'
                    : 'Dans le menu du navigateur, choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».';
                pwaInstallStatus.hidden = false;
                return;
            }

            deferredInstallPrompt.prompt();
            const choice = await deferredInstallPrompt.userChoice;
            deferredInstallPrompt = null;
            if (choice.outcome === 'accepted') {
                pwaInstallStatus.textContent = 'Installation acceptée. L’application va s’ajouter à votre appareil.';
                pwaInstallStatus.hidden = false;
            }
        });
    }
}

const chatWhatsAppUrl = 'https://wa.me/221772702493';
    const chatMessages = [];
    const chatMarkup = document.createElement('div');
    chatMarkup.className = 'site-chat';
    chatMarkup.innerHTML = `
        <section class="site-chat-panel" role="dialog" aria-label="Assistant Santé & Naturel (IA)" aria-hidden="true" hidden>
            <header class="site-chat-header">
                <div class="site-chat-heading">
                    <h2>Assistant Santé &amp; Naturel (IA)</h2>
                    <button class="site-chat-close" type="button" aria-label="Fermer la discussion">×</button>
                </div>
                <a class="site-chat-whatsapp" href="${chatWhatsAppUrl}" target="_blank" rel="noopener noreferrer">
                    <span aria-hidden="true">☏</span> Commander sur WhatsApp
                </a>
            </header>
            <div class="site-chat-transcript" role="log" aria-live="polite" aria-relevant="additions">
                <p class="site-chat-message is-assistant">Bonjour ! Comment puis-je vous aider à découvrir les produits Santé &amp; Naturel ?</p>
            </div>
            <p class="site-chat-status" role="status" aria-live="polite"></p>
            <form class="site-chat-form">
                <label class="site-chat-label" for="site-chat-input">Votre message</label>
                <div class="site-chat-compose">
                    <input id="site-chat-input" name="message" type="text" maxlength="500" autocomplete="off" placeholder="Écrivez votre question…" required>
                    <button type="submit" aria-label="Envoyer le message">Envoyer</button>
                </div>
                <span class="site-chat-counter" aria-live="polite">0 / 500</span>
            </form>
        </section>
        <button class="site-chat-launcher" type="button" aria-label="Ouvrir l’assistant Santé & Naturel" aria-controls="site-chat-panel" aria-expanded="false">
            <span aria-hidden="true">✦</span><span>Assistant IA</span>
        </button>
    `;
    const chatPanel = chatMarkup.querySelector('.site-chat-panel');
    const chatLauncher = chatMarkup.querySelector('.site-chat-launcher');
    const chatClose = chatMarkup.querySelector('.site-chat-close');
    const chatTranscript = chatMarkup.querySelector('.site-chat-transcript');
    const chatForm = chatMarkup.querySelector('.site-chat-form');
    const chatInput = chatMarkup.querySelector('#site-chat-input');
    const chatSend = chatForm.querySelector('button[type="submit"]');
    const chatCounter = chatMarkup.querySelector('.site-chat-counter');
    const chatStatus = chatMarkup.querySelector('.site-chat-status');
    document.body.append(chatMarkup);

    const setChatOpen = (isOpen) => {
        chatPanel.hidden = !isOpen;
        chatPanel.setAttribute('aria-hidden', String(!isOpen));
        chatLauncher.setAttribute('aria-expanded', String(isOpen));
        chatLauncher.setAttribute('aria-label', isOpen
            ? 'Fermer l’assistant Santé & Naturel'
            : 'Ouvrir l’assistant Santé & Naturel');
        if (isOpen) {
            chatInput.focus();
        } else {
            chatLauncher.focus();
        }
    };

    const appendChatMessage = (role, text, includeWhatsApp = false) => {
        const message = document.createElement('p');
        message.className = `site-chat-message ${role === 'user' ? 'is-user' : 'is-assistant'}`;
        message.textContent = text;
        if (includeWhatsApp) {
            const link = document.createElement('a');
            link.className = 'site-chat-fallback';
            link.href = chatWhatsAppUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'Contacter la boutique sur WhatsApp';
            message.append(document.createElement('br'), link);
        }
        chatTranscript.append(message);
        chatTranscript.scrollTop = chatTranscript.scrollHeight;
    };

    chatLauncher.setAttribute('aria-controls', 'site-chat-panel');
    chatPanel.id = 'site-chat-panel';
    chatLauncher.addEventListener('click', () => {
        setChatOpen(chatPanel.hidden);
    });
    chatClose.addEventListener('click', () => setChatOpen(false));
    chatMarkup.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !chatPanel.hidden) setChatOpen(false);
    });
    chatInput.addEventListener('input', () => {
        chatCounter.textContent = `${chatInput.value.length} / 500`;
    });

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const text = chatInput.value.trim();
        if (!text || text.length > 500 || chatSend.disabled) return;

        chatStatus.textContent = '';
        appendChatMessage('user', text);
        chatMessages.push({ role: 'user', content: text });
        chatMessages.splice(0, Math.max(0, chatMessages.length - 10));
        chatInput.value = '';
        chatCounter.textContent = '0 / 500';
        chatSend.disabled = true;
        chatInput.disabled = true;
        chatStatus.textContent = 'L’assistant prépare une réponse…';

        try {
            const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatMessages.slice(-10) })
            });
            const result = await response.json();
            if (!response.ok) {
                if (response.status === 429 || result.error === 'rate_limited') {
                    appendChatMessage('assistant', 'Vous avez atteint la limite temporaire de messages. La boutique peut vous aider directement :', true);
                } else {
                    throw new Error('Le service de discussion est momentanément indisponible.');
                }
            } else if (typeof result.reply !== 'string' || !result.reply.trim()) {
                throw new Error('La réponse de l’assistant est vide.');
            } else {
                const reply = result.reply.trim();
                chatMessages.push({ role: 'assistant', content: reply });
                chatMessages.splice(0, Math.max(0, chatMessages.length - 10));
                appendChatMessage('assistant', reply);
            }
        } catch (error) {
            console.error('Impossible d’obtenir une réponse de l’assistant.', error);
            appendChatMessage('assistant', 'Désolé, je ne peux pas répondre pour le moment. Vous pouvez contacter la boutique directement :', true);
        } finally {
            chatSend.disabled = false;
            chatInput.disabled = false;
            chatStatus.textContent = '';
            chatInput.focus();
        }
    });

window.addEventListener('appinstalled', () => {
    pwaInstallButton?.setAttribute('hidden', '');
    if (pwaInstallStatus) {
        pwaInstallStatus.textContent = 'Santé & Naturel est installée sur cet appareil.';
        pwaInstallStatus.hidden = false;
    }
});
