# TicketWave Microservices

## TicketWave è una piattaforma per la rivendita di biglietti inutilizzati per concerti e partite, progettata con un'architettura a microservizi.

## Servizi inclusi

-   **User Service (`3001`)**: gestione utenti, login e registrazione.
-   **Ticket Service (`3002`)**: creazione e gestione dei biglietti.
-   **Order Service (`3003`)**: gestione ordini, blocco temporaneo e acquisto.
-   **Redis API Service (`3004`)**: gestore eventi Pub/Sub via Redis.
-   **Frontend React (`8080`)**: interfaccia utente dell’applicazione.
-   **Database MySQL per ogni servizio**: `user_service_db`, `ticket_service_db`, `order_service_db`.
-   **Redis**: messaggistica tra i microservizi.

---

## 🚀 Avvio rapido

### 1. Clona il repository

```bash
git clone ...
cd ticketwave-microservices
```

### 2. Configura gli ambienti

Assicurati che ogni servizio abbia un file `.env` con le variabili richieste. Per esempio:

```env
# Esempio per user_service/.env
PORT=3001
DB_HOST=user_service_db
DB_PORT=3306
DB_NAME=user_service_db
DB_USER=root
DB_PASSWORD=rootpass
JWT_SECRET=supersegretotest
REDIS_HOST=redis
REDIS_PORT=6379
```

### 3. Avvia l’applicazione

```bash
docker-compose up --build
```

Dopo il build, visita:

📍 `http://localhost:8080` ➜ interfaccia React

---

## 🔗 API Principali

| Metodo | Endpoint                   | Servizio       | Descrizione                  |
| ------ | -------------------------- | -------------- | ---------------------------- |
| POST   | `/api/register`            | user_service   | Registrazione utente         |
| POST   | `/api/login`               | user_service   | Login e ricezione JWT        |
| GET    | `/api/tickets`             | ticket_service | Elenco biglietti disponibili |
| POST   | `/api/tickets`             | ticket_service | Creazione nuovo biglietto    |
| POST   | `/api/orders`              | order_service  | Avvio ordine (blocco 15 min) |
| POST   | `/api/orders/:id/complete` | order_service  | Completamento ordine         |
| DELETE | `/api/orders/:id`          | order_service  | Annullamento ordine          |

---

## 📁 Struttura

```
ticketwave-microservices/
├── user_service/
├── ticket_service/
├── order_service/
├── redisAPI_service/
├── ticketwave_frontend/
├── docker-compose.yml
```

---

## 🛠️ Tecnologie

-   Node.js + Express
-   React + CRA
-   MySQL + Sequelize
-   Redis Pub/Sub
-   Docker & Docker Compose
-   Cloudinary + Multer (upload immagini)

---

## 📌 Note

-   Ogni microservizio è indipendente, comunica tramite eventi Redis.
-   L'interfaccia React è servita tramite Nginx.
-   Variabili ambientali gestite tramite `.env` e `env_file`.

---

## ✍️ Autore

Andrei Burduja – [Progetto creato per Tesi Master Università Niccolò Cusano 2025]
