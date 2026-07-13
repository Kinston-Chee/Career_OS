# CareerOS backend (FastAPI + SQLAlchemy async + Alembic)
FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# WORKDIR mirrors how the app is imported today (app.app, routers.*, config, auth,
# agents.careeros_agent all resolve as top-level modules) - this directory IS
# the equivalent of the "backend/" folder, so it must be the import root.
WORKDIR /app

RUN groupadd -r careeros && useradd -r -g careeros careeros

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Both .env files (backend/.env and agents/careeros_agent/.env) are excluded via
# .dockerignore - secrets must be injected as real container env vars at run time
# (see docker-compose.yml's env_file: entries), never baked into the image.
RUN mkdir -p media/profile_pics && chown -R careeros:careeros /app
USER careeros

EXPOSE 8000

CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8000"]
