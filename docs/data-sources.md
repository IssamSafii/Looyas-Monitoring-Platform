# Data Sources

## Objectif

Les data sources permettent d’enregistrer la configuration serveur nécessaire à l’accès Mimir et Loki sans jamais exposer les credentials au frontend.

## Champs principaux

- `name`
- `type`
- `baseUrl`
- `apiPrefix`
- `tenantId`
- `authenticationType`
- `username`
- `encryptedPassword`
- `encryptedToken`
- `enabled`

## Modes supportés

- `NONE`
- `BASIC`
- `BEARER`

## Bonnes pratiques

- Conserver `baseUrl` sans query string dynamique
- Utiliser `tenantId` pour `X-Scope-OrgID`
- Laisser `password` ou `token` vides pour conserver le secret existant
- Désactiver une source sans la supprimer si l’endpoint externe est temporairement indisponible
