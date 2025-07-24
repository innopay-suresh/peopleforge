
# --- ASYNC ENGINE (for FastAPI app) ---
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

async_engine = create_async_engine(settings.DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(bind=async_engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def init_db():
    import app.models.user
    import app.models.organization
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# --- SYNC ENGINE (for scripts/migrations) ---
from sqlalchemy import create_engine
sync_engine = create_engine(settings.DATABASE_URL.replace('+asyncpg', ''), echo=True)
SessionLocal = sessionmaker(bind=sync_engine)
