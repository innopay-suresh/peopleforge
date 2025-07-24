from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    DATABASE_URL_SYNC: str | None = None
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    FERNET_SECRET_KEY: str

    class Config:
        env_file = ".env"

    @property
    def sync_url(self):
        return self.DATABASE_URL_SYNC or self.DATABASE_URL.replace('+asyncpg', '')

settings = Settings()

