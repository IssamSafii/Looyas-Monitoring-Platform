# Safi Stage Monitoring Platform

Application web locale de monitoring pour interroger Grafana Mimir et Grafana Loki via un backend Spring Boot sécurisé, puis afficher métriques, logs et dashboards natifs dans une interface Angular moderne.

## Architecture

```text
safi-stage-monitoring/
├── backend/      # Spring Boot 3, JWT, JPA, Flyway, PostgreSQL, Mimir/Loki clients
├── frontend/     # Angular standalone, Material, ngx-echarts
├── docker-compose.yml
├── .env.example
├── README.md
└── docs/
```

Flux réseau imposé:

```text
Angular -> Backend Spring Boot -> Mimir / Loki
```

## Prérequis

- Java 17+ localement pour ce dépôt
- Maven via `backend/mvnw.cmd` ou `backend/mvnw`
- Node.js 20+
- PostgreSQL 16+ si vous ne passez pas par Docker

## Variables d’environnement

Copier `.env.example` vers `.env`, puis compléter les valeurs réelles:

```env
POSTGRES_DB=safi_monitoring
POSTGRES_USER=safi
POSTGRES_PASSWORD=safi

JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRATION_SECONDS=28800

DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin

MIMIR_BASE_URL=
MIMIR_API_PREFIX=/prometheus
MIMIR_TENANT_ID=
MIMIR_USERNAME=
MIMIR_PASSWORD=
MIMIR_BEARER_TOKEN=

LOKI_BASE_URL=
LOKI_API_PREFIX=/loki
LOKI_TENANT_ID=
LOKI_USERNAME=
LOKI_PASSWORD=
LOKI_BEARER_TOKEN=

FRONTEND_URL=http://localhost:4200
BACKEND_URL=http://localhost:8080
```

## Démarrage avec Docker

```bash
docker compose up --build
```

Services exposés:

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

## Démarrage manuel

Backend:

```bash
cd backend
./mvnw spring-boot:run
```

Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm start
```

Le frontend utilise `proxy.conf.json` pour appeler `http://localhost:8080/api`.

## Login initial

Compte MVP créé automatiquement au premier démarrage si absent:

- Username: `admin`
- Password: valeur `DEFAULT_ADMIN_PASSWORD`, défaut local `admin`

Le mot de passe est toujours stocké avec BCrypt.

## Configuration Loki

Cas sans auth:

```env
LOKI_BASE_URL=https://loki.example.com
LOKI_API_PREFIX=/loki
```

Cas Basic Auth:

```env
LOKI_BASE_URL=https://loki.example.com
LOKI_USERNAME=my-user
LOKI_PASSWORD=my-password
```

Cas Bearer:

```env
LOKI_BASE_URL=https://loki.example.com
LOKI_BEARER_TOKEN=my-token
```

## Configuration Mimir

Cas sans auth:

```env
MIMIR_BASE_URL=https://mimir.example.com
MIMIR_API_PREFIX=/prometheus
```

Cas Basic Auth:

```env
MIMIR_BASE_URL=https://mimir.example.com
MIMIR_USERNAME=my-user
MIMIR_PASSWORD=my-password
```

Cas Bearer:

```env
MIMIR_BASE_URL=https://mimir.example.com
MIMIR_BEARER_TOKEN=my-token
```

## Header X-Scope-OrgID

Si vos tenants l’exigent:

```env
MIMIR_TENANT_ID=tenant-a
LOKI_TENANT_ID=tenant-a
```

Le backend ajoute alors `X-Scope-OrgID` uniquement côté serveur.

## Tester les endpoints avec curl

Login:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

Query metrics:

```bash
curl -X POST http://localhost:8080/api/monitoring/metrics/query-range \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"query":"up","start":"2026-07-22T09:00:00Z","end":"2026-07-22T10:00:00Z","step":"60"}'
```

Query logs:

```bash
curl -X POST http://localhost:8080/api/monitoring/logs/query-range \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"query":"{job=~\".+\"}","start":"2026-07-22T09:00:00Z","end":"2026-07-22T10:00:00Z","step":"60","limit":200,"direction":"BACKWARD"}'
```

## Import des dashboards Grafana

- Le backend scanne `classpath*:grafana/*.json`
- Les panels Grafana détectés sont convertis en dashboards natifs
- Les variables `${cluster:regex}`, `${namespace:regex}`, `${pod:regex}`, `${node:regex}`, `$__rate_interval` sont substituées côté backend
- Les variables inconnues sont refusées

## Résolution des problèmes

CORS:

- Vérifier `FRONTEND_URL`
- Utiliser le proxy Angular en local

401 / 403:

- Refaire le login
- Vérifier que le token JWT est bien présent dans `Authorization`
- Les routes `/api/auth/login`, Swagger et `/api/health/**` restent publiques

No data:

- Vérifier les vrais endpoints Mimir/Loki
- Vérifier les labels disponibles dans vos métriques
- Vérifier les périodes sélectionnées
- Vérifier `X-Scope-OrgID` si multi-tenant

## Tests et build

Backend:

```bash
cd backend
./mvnw test
./mvnw package
```

Frontend:

```bash
cd frontend
npm test
npm run build
```

## Structure du projet

- `backend/src/main/java/com/safistage/monitoring/auth`: login et changement de mot de passe
- `backend/src/main/java/com/safistage/monitoring/datasource`: CRUD des data sources
- `backend/src/main/java/com/safistage/monitoring/monitoring`: clients Mimir/Loki, validation, normalisation
- `backend/src/main/java/com/safistage/monitoring/dashboard` et `panel`: dashboards natifs
- `frontend/src/app/features`: pages fonctionnelles
- `frontend/src/app/shared/components`: composants réutilisables UI
- `docs/`: documentation détaillée
