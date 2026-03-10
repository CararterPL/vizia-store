(function(window, document) {
    'use strict';
    var easyPack = {
        initialized: false,
        init: function(config) {
            if (this.initialized) return;
            var self = this;
            window.easyPackConfig = config;
            
            // Tworzenie iframe z mapą InPost
            var container = document.getElementById('easypack-geowidget');
            if (!container) {
                console.error('Błąd: Brak kontenera #easypack-geowidget');
                return;
            }

            var iframe = document.createElement('iframe');
            var baseUrl = 'https://geowidget.inpost.pl/v3/geowidget.html';
            var params = [];
            
            if (config.defaultLocale) params.push('locale=' + config.defaultLocale);
            if (config.mapType) params.push('mapType=' + config.mapType);
            if (config.searchType) params.push('searchType=' + config.searchType);
            
            iframe.src = baseUrl + (params.length ? '?' + params.join('&') : '');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.id = 'easypack-iframe';

            container.appendChild(iframe);

            // Nasłuchiwanie na wybór punktu
            window.addEventListener('message', function(event) {
                if (event.origin !== 'https://geowidget.inpost.pl') return;
                var data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                
                if (data.type === 'point.select' || data.method === 'onPointSelect') {
                    if (typeof window.onPointSelect === 'function') {
                        window.onPointSelect(data.value || data.point);
                    }
                }
            }, false);

            this.initialized = true;
            console.log('InPost GeoWidget Local Proxy: Initialized');
        }
    };
    window.easyPack = easyPack;
})(window, document);