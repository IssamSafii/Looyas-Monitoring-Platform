# Safi Stage Monitoring Platform

Application locale de monitoring avec:

- frontend Angular
- backend Spring Boot 3 + JWT
- PostgreSQL
- Grafana Mimir pour les metriques
- Grafana Loki pour les logs
- Oracle Cloud Infrastructure pour les metriques, logs et instances Compute

## Architecture

```text
safi-stage-monitoring/
|-- backend/
|-- frontend/
|-- docker-compose.yml
|-- .env.example
|-- README.md
`-- docs/
```

Flux reseau:

```text
Angular -> Backend Spring Boot -> Mimir / Loki / OCI
```

Le frontend ne contacte jamais OCI directement.

## Prerequis

- Java 17+
- Node.js 20+
- Docker Desktop si vous utilisez Compose

## Variables d'environnement

Copier `.env.example` vers `.env`, puis completer les valeurs reelles.

Variables principales:

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

OCI_ENABLED=false
OCI_HOST_CONFIG_DIR=C:/Users/Safi/.oci-safi-monitoring
OCI_CONFIG_FILE=/app/.oci/config
OCI_PROFILE=DEFAULT
OCI_REGION=
OCI_COMPARTMENT_ID=
OCI_DEFAULT_METRIC_NAMESPACE=oci_computeagent
OCI_QUERY_TIMEOUT_SECONDS=30
OCI_MAX_QUERY_RANGE_HOURS=168
OCI_LOG_LIMIT=500
OCI_LOG_MAX_LIMIT=2000
OCI_INCLUDE_SUBCOMPARTMENTS=false

FRONTEND_URL=http://localhost:4200
BACKEND_URL=http://localhost:8080
```

## Demarrage avec Docker

```bash
docker compose up --build
```

Services exposes:

- frontend: `http://localhost:4200`
- backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

Le backend monte le dossier OCI en lecture seule:

```text
${OCI_HOST_CONFIG_DIR:-./docker/oci-placeholder} -> /app/.oci
```

Les credentials OCI ne sont jamais copies dans l'image Docker.

## Demarrage manuel

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

Compte cree automatiquement au premier demarrage si absent:

- username: `admin`
- password: valeur `DEFAULT_ADMIN_PASSWORD`, par defaut `admin`

## Configuration Mimir et Loki

Les sources Mimir et Loki restent gerees par le backend.

Exemple Mimir:

```env
MIMIR_BASE_URL=https://mimir.example.com
MIMIR_API_PREFIX=/prometheus
```

Exemple Loki:

```env
LOKI_BASE_URL=https://loki.example.com
LOKI_API_PREFIX=/loki
```

Si vos tenants l'exigent:

```env
MIMIR_TENANT_ID=tenant-a
LOKI_TENANT_ID=tenant-a
```

## Configuration OCI

L'integration OCI est uniquement cote backend.

Dossier local recommande:

```text
C:\Users\Safi\.oci-safi-monitoring
```

Structure attendue:

```text
C:\Users\Safi\.oci-safi-monitoring
|-- config
`-- oci_api_key.pem
```

Exemple de fichier `config`:

```ini
[DEFAULT]
user=USER_OCID
fingerprint=FINGERPRINT
tenancy=TENANCY_OCID
region=REGION
key_file=/app/.oci/oci_api_key.pem
```

Variables OCI a completer apres l'implementation:

```env
OCI_ENABLED=true
OCI_HOST_CONFIG_DIR=C:/Users/Safi/.oci-safi-monitoring
OCI_CONFIG_FILE=/app/.oci/config
OCI_PROFILE=DEFAULT
OCI_REGION=
OCI_COMPARTMENT_ID=
OCI_DEFAULT_METRIC_NAMESPACE=oci_computeagent
OCI_INCLUDE_SUBCOMPARTMENTS=false
```

Permissions IAM minimales:

- lecture Monitoring
- lecture Logging Search
- lecture Compute
- lecture Identity pour le test de connexion

Ne jamais committer:

- le vrai fichier `config` OCI
- les fichiers `*.pem` ou `*.key`
- `.env`

Documentation detaillee: [docs/oci-integration.md](docs/oci-integration.md)

## Endpoints utiles

Login:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

Metriques Mimir:

```bash
curl -X POST http://localhost:8080/api/monitoring/metrics/query-range \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"query":"up","start":"2026-07-28T09:00:00Z","end":"2026-07-28T10:00:00Z","step":"60"}'
```

Logs Loki:

```bash
curl -X POST http://localhost:8080/api/monitoring/logs/query-range \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"query":"{job=~\".+\"}","start":"2026-07-28T09:00:00Z","end":"2026-07-28T10:00:00Z","step":"60","limit":200,"direction":"BACKWARD"}'
```

Sante OCI:

```bash
curl http://localhost:8080/api/monitoring/oci/health \
  -H "Authorization: Bearer <TOKEN>"
```

## Resolution des problemes

401 / 403:

- refaire le login
- verifier l'en-tete `Authorization`

No data:

- verifier les vrais endpoints Mimir ou Loki
- verifier la periode selectionnee
- verifier les labels et namespaces disponibles

OCI Not configured:

- verifier `OCI_ENABLED`
- verifier `OCI_CONFIG_FILE`
- verifier `OCI_REGION`
- verifier `OCI_COMPARTMENT_ID`
- verifier le montage `${OCI_HOST_CONFIG_DIR}:/app/.oci:ro`

OCI Invalid credentials:

- verifier le fichier `config`
- verifier la cle PEM
- verifier le profil `OCI_PROFILE`

OCI Permission denied:

- verifier les policies IAM en lecture seule

OCI Region unavailable:

- verifier `OCI_REGION`

OCI Timeout:

- verifier le reseau sortant et `OCI_QUERY_TIMEOUT_SECONDS`

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

## Structure

- `backend/src/main/java/com/safistage/monitoring/datasource`: CRUD des sources
- `backend/src/main/java/com/safistage/monitoring/monitoring`: Mimir et Loki
- `backend/src/main/java/com/safistage/monitoring/oci`: integration OCI
- `frontend/src/app/features`: pages fonctionnelles
- `frontend/src/app/shared/components`: composants UI reutilisables
- `docs/`: documentation complementaire
