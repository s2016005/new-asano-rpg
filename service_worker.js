/**
 * キャッシュ名。
 */
var CACHE_NAME = 'rpgmv_cache';

/**
 * 最低限キャッシュすべきファイル。
 * このスクリプトファイルからの相対パス
 */
var urlsToCache = [
    'index.html',
    'icon/icon.png',
    'fonts/mplus-1m-regular.ttf',
    'fonts/gamefont.css',
    'css/like_rpg_windows.css'
];

/**
 * @function refreshCache
 * キャッシュの消去と App Shell の再キャッシュ
 * 
 * @returns {Promise<any>}
 */
function refreshCache() {
    return caches.delete(CACHE_NAME).then(function() {
        return caches.open(CACHE_NAME);
    }).then(function(cache) {
        return cache.addAll(urlsToCache);
    })
    .catch(function(e) {
        console.error(e.toString());
    });
}

self.addEventListener('install',
    /**
     * @function
     * インストール時の処理
     */
    function(event) {
        event.waitUntil(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.addAll(urlsToCache);
            })
            .catch(function(e) {
                console.error(e.toString());
            })
        );
    }
);

self.addEventListener('upgrade',
    /**
     * @function
     * Service Worker 更新時の処理
     */
    function(event) {
        event.waitUntil(
            // App Shell の再キャッシュ
            caches.open(CACHE_NAME).then(function(cache) {
                return Promise.all(
                    urlsToCache.map(function(urlToCache) {
                        return cache.match(urlToCache)
                        .then(function(response) {
                            cache.delete(response);
                        })
                        .catch(function(e) {
                            console.error(e.toString());
                        });
                    })
                );
            })
        );
    }
);

self.addEventListener('fetch',
    /**
     * @function
     * アセット読み込み時の処理
     * 
     * @param {*} event 
     */
    function(event) {
        event.respondWith(
            // フェッチ優先
            fetch(event.request)
                .then(function(response) {
                    if (response && response.status == 200) {
                        // 200 ならキャッシュ
                        /** @type {Response} キャッシュ用に複製したレス */
                        var cachedResponse = response.clone();
                        return caches.open(CACHE_NAME)
                        .then(function (cache) {
                            return cache.put(event.request, cachedResponse);
                        }).then(function() {
                            return response;
                        })
                        .catch(function(e) {
                            console.error(e.toString());
                        });
                    }
                    else {
                        return caches.match(event.request);
                    }
                })
                .catch(function(e) {
                    console.error(e.toString());
                })
        );
    });
