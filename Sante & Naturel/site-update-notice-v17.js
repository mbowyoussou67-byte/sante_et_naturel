if ('serviceWorker' in navigator && window.isSecureContext) {
    const updateNotice = document.createElement('aside');
    updateNotice.className = 'site-update-notice';
    updateNotice.setAttribute('aria-label', 'Mise à jour du site');
    updateNotice.setAttribute('role', 'status');
    updateNotice.setAttribute('aria-live', 'polite');
    updateNotice.hidden = true;
    updateNotice.innerHTML = `
        <div class="site-update-notice-copy">
            <strong>Une mise à jour est disponible</strong>
            <p data-update-notice-status>Installez-la pour profiter de la dernière version du site.</p>
        </div>
        <div class="site-update-notice-actions">
            <button class="site-update-install" type="button" data-install-update>Installer la mise à jour</button>
            <button class="site-update-dismiss" type="button" data-dismiss-update>Plus tard</button>
        </div>
    `;
    document.body.append(updateNotice);

    const installUpdateButton = updateNotice.querySelector('[data-install-update]');
    const dismissUpdateButton = updateNotice.querySelector('[data-dismiss-update]');
    const updateNoticeStatus = updateNotice.querySelector('[data-update-notice-status]');
    let updateNoticeDismissed = false;
    let hasServiceWorkerController = Boolean(navigator.serviceWorker.controller);

    const showUpdateNotice = () => {
        if (!updateNoticeDismissed) updateNotice.hidden = false;
    };

    dismissUpdateButton.addEventListener('click', () => {
        updateNoticeDismissed = true;
        updateNotice.hidden = true;
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hasServiceWorkerController) {
            hasServiceWorkerController = true;
            return;
        }
        window.location.reload();
    });

    navigator.serviceWorker.register('./service-worker.js')
        .then((registration) => {
            const checkForServiceWorkerUpdate = () => {
                if (document.visibilityState !== 'visible' || registration.waiting) return;
                registration.update().catch((error) => {
                    console.error('Impossible de vérifier les mises à jour en arrière-plan.', error);
                });
            };

            const watchInstallingWorker = () => {
                const installingWorker = registration.installing;
                if (!installingWorker) return;
                updateNoticeDismissed = false;

                installingWorker.addEventListener('statechange', () => {
                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateNotice();
                    }
                });
            };

            registration.addEventListener('updatefound', watchInstallingWorker);
            if (registration.waiting && navigator.serviceWorker.controller) showUpdateNotice();

            installUpdateButton.addEventListener('click', () => {
                const waitingWorker = registration.waiting;
                if (!waitingWorker) {
                    updateNoticeStatus.textContent = 'Cette mise à jour n’est plus disponible. Actualisez la page pour vérifier à nouveau.';
                    installUpdateButton.disabled = true;
                    return;
                }

                installUpdateButton.disabled = true;
                updateNoticeStatus.textContent = 'Installation en cours…';
                waitingWorker.postMessage({ type: 'SKIP_WAITING' });
            });

            checkForServiceWorkerUpdate();
            window.setInterval(checkForServiceWorkerUpdate, 5 * 60 * 1000);
            document.addEventListener('visibilitychange', checkForServiceWorkerUpdate);
        })
        .catch((error) => {
            console.error('Impossible de vérifier les mises à jour du site.', error);
        });
}
