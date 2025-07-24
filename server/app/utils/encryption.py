from cryptography.fernet import Fernet


# Ideally, load this from secure config/env
FERNET_KEY = b'xQeVHWtTUBBIOjRPUh-4vcmvPu2Htc0cKDFv4ZUqawY='
cipher = Fernet(FERNET_KEY)

def encrypt_password(plain: str) -> str:
    return cipher.encrypt(plain.encode()).decode()

def decrypt_password(encrypted: str) -> str:
    return cipher.decrypt(encrypted.encode()).decode()
