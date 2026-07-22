# Import des dashboards Grafana

## Fonctionnement

Au démarrage, le backend cherche des fichiers:

```text
classpath*:grafana/*.json
```

Si la base est vide, les dashboards détectés sont transformés en entités natives `Dashboard` et `Panel`.

## Champs récupérés

- titre du dashboard
- description
- panels
- type de panel
- titre et description
- datasource Loki ou Mimir
- requête
- unité
- options brutes JSON
- position et taille

## Variables Grafana

Les substitutions suivantes sont gérées:

- `${cluster:regex}`
- `${namespace:regex}`
- `${pod:regex}`
- `${node:regex}`
- `$__rate_interval`

Règles:

- `all` devient `.+`
- les valeurs sont échappées pour regex
- `$__rate_interval` devient `5m`
- les variables inconnues sont refusées

## Limite actuelle

Sans JSON Grafana présent dans le dépôt, l’importeur reste inactif mais prêt à fonctionner dès qu’un dossier `grafana/` est ajouté au classpath backend.
