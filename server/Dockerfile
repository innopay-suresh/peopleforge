FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


COPY app/ ./app
RUN cat ./app/schemas/ldap_config.py

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
