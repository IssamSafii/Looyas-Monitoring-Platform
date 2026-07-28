# Integration OCI

## Objectif

Cette integration ajoute OCI au flux existant:

```text
Angular -> Spring Boot -> OCI Monitoring / OCI Logging Search / OCI Compute / OCI Identity
```

Mimir et Loki restent inchanges.

## Dossier local OCI

Creer le dossier:

```text
C:\Users\Safi\.oci-safi-monitoring
```

Structure attendue:

```text
C:\Users\Safi\.oci-safi-monitoring
|-- config
`-- oci_api_key.pem
```

## Exemple de config OCI

```ini
[DEFAULT]
user=USER_OCID
fingerprint=FINGERPRINT
tenancy=TENANCY_OCID
region=REGION
key_file=/app/.oci/oci_api_key.pem
```

Le chemin `key_file` doit viser le chemin dans le conteneur Docker, pas le chemin Windows.

## Variables `.env`

```env
OCI_ENABLED=true
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
```

## Montage Docker

Le service backend monte le dossier OCI en lecture seule:

```text
${OCI_HOST_CONFIG_DIR:-./docker/oci-placeholder}:/app/.oci:ro
```

Les credentials OCI:

- ne sont jamais copies dans l'image
- ne sont jamais renvoyes au frontend
- ne doivent jamais etre committes

## Permissions IAM minimales

Policies de lecture seule recommandees:

- lecture des metriques Monitoring
- lecture Logging Search
- lecture des instances Compute
- lecture Identity pour le test de sante

## Etat non configure

Quand `OCI_ENABLED=false` ou quand les variables critiques sont absentes, l'API renvoie:

```json
{
  "status": "NOT_CONFIGURED",
  "configured": false
}
```

Le frontend affiche:

```text
La source OCI n'est pas encore configuree.
```

## Endpoints OCI

- `GET /api/monitoring/oci/health`
- `GET /api/monitoring/oci/metrics/namespaces`
- `GET /api/monitoring/oci/metrics/definitions`
- `POST /api/monitoring/oci/metrics/query`
- `POST /api/monitoring/oci/logs/search`
- `GET /api/monitoring/oci/compute/instances`
- `GET /api/monitoring/oci/compute/instances/{instanceId}`

Tous les endpoints OCI, sauf la verification globale de sante applicative classique, restent proteges par JWT comme le reste de l'application.

## Verification

1. Completer `.env`
2. Verifier la presence de `config` et `oci_api_key.pem`
3. Lancer:

```bash
docker compose up --build
```

4. Se connecter a l'application
5. Aller dans `Data Sources`
6. Tester la source OCI
7. Ouvrir:
   - `/oci`
   - `/oci/compute`
   - `/oci/metrics`
   - `/oci/logs`

## Resolution des erreurs

### Not configured

- verifier `OCI_ENABLED`
- verifier `OCI_CONFIG_FILE`
- verifier `OCI_REGION`
- verifier `OCI_COMPARTMENT_ID`

### Invalid credentials

- verifier le profil `OCI_PROFILE`
- verifier le fichier `config`
- verifier `oci_api_key.pem`

### Permission denied

- verifier les policies IAM

### Region unavailable

- verifier `OCI_REGION`

### No data

- verifier le namespace OCI
- verifier les metriques disponibles via `metrics/definitions`
- verifier la periode selectionnee

### Timeout

- verifier le reseau sortant
- verifier `OCI_QUERY_TIMEOUT_SECONDS`

## Securite

- aucun credential OCI dans Angular
- aucun credential OCI dans PostgreSQL
- aucune stack trace OCI complete envoyee au frontend
- aucun log backend avec private key, token, passphrase ou contenu du fichier config
- aucune operation OCI d'ecriture
