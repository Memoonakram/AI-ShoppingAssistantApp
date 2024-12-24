# ...existing code...

# Channels
ASGI_APPLICATION = 'your_project_name.routing.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}

# ...existing code...
