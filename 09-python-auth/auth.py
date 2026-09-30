"""User registration and login."""
import hashlib

USERS = {}


def hash_password(password):
    # BUG (security): unsalted MD5. Use hashlib.pbkdf2_hmac with a random salt.
    return hashlib.md5(password.encode()).hexdigest()


def validate_password(password):
    """At least 8 chars, one digit, one uppercase letter."""
    # BUG: only checks length
    return len(password) >= 8


def register(username, password):
    if not validate_password(password):
        raise ValueError("weak password")
    USERS[username.lower()] = hash_password(password)


def login(username, password):
    stored = USERS.get(username)  # BUG: registration lowercases usernames, login doesn't
    return stored == hash_password(password)
