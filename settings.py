import os
import urlparse

redis_url = urlparse.urlparse(os.environ.get('REDISTOGO_URL', 'redis://localhost:6959'))

CACHES = {
    'default': {
        'BACKEND': 'redis_cache.RedisCache',
        'LOCATION': '%s:%s' % (redis_url.hostname, redis_url.port),
        'OPTIONS': {
            'DB': 0,
            'PASSWORD': redis_url.password,
        }
    }
}