from fastapi import FastAPI, Depends
from app.api import ldap, auth
from app.routes import org_setup
from app.core.database import sync_engine
from app.models.user import Base



from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Peopleforge API")

# Add CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables at startup
@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=sync_engine)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(ldap.router, prefix="/api/ldap", tags=["LDAP"])
app.include_router(org_setup.router)

@app.get("/")
def read_root():
    return {"message": "Peopleforge backend is running"}




