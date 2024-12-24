from django.contrib.auth.models import AnonymousUser
from channels.middleware import BaseMiddleware
from django.db import close_old_connections
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
import logging

User = get_user_model()
logger = logging.getLogger(__name__)

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        # Extract token from the query string
        token = None
        query_string = scope.get('query_string', b'').decode()
        if query_string:
            params = dict(param.split('=') for param in query_string.split('&'))
            token = params.get('token')

        # Set user as anonymous by default
        scope['user'] = AnonymousUser()

        if token:
            try:
                # Decode and verify token using AccessToken (JWT)
                access_token = AccessToken(token)

                # Fetch the user associated with the token
                user = await self.get_user_from_token(access_token)
                if user:
                    scope['user'] = user
                else:
                    logger.warning("User not found for the given token.")
                    await send({
                        'type': 'websocket.close',
                    })  # Close connection if no user found for token
            except (InvalidToken, TokenError) as e:
                logger.error(f"Invalid token or token error: {e}")
                await send({
                    'type': 'websocket.close',
                })  # Close connection if token is invalid

        # Close any old database connections before handling request
        close_old_connections()

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user_from_token(self, access_token):
        try:
            # Get the user ID from the token and return the user object
            user_id = access_token['user_id']
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            logger.warning(f"User with ID {user_id} not found.")
            return None
        except Exception as e:
            logger.error(f"Error retrieving user from token: {e}")
            return None
