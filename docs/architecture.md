# Architecture

## Vue d’ensemble

La plateforme suit une architecture frontend/backend stricte:

```text
Angular SPA
  -> JWT
Spring Boot API
  -> PostgreSQL
  -> Grafana Mimir
  -> Grafana Loki
```

## Backend

- Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA + Flyway
- WebClient pour Mimir/Loki
- PostgreSQL pour utilisateurs, dashboards, panels et configuration

Domaines principaux:

- `auth`
- `user`
- `datasource`
- `dashboard`
- `panel`
- `monitoring`
- `security`
- `health`
- `exception`

## Frontend

- Angular standalone
- Angular Material
- `ngx-echarts` / Apache ECharts
- Router + guard
- Interceptors HTTP
- Forms réactifs

## Sécurité

- Aucune URL secrète Mimir/Loki dans le bundle Angular
- Aucun token Mimir/Loki côté navigateur
- JWT signé côté backend
- BCrypt pour le mot de passe admin
- Secrets datasource chiffrés avant stockage

## Tolérance aux pannes

- L’application démarre même si Mimir ou Loki sont indisponibles
- Les health checks sont séparés
- Chaque panel gère son propre état loading / empty / error
