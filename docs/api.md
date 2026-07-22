# API

## Auth

- `POST /api/auth/login`
- `POST /api/auth/change-password`

## Data Sources

- `GET /api/admin/data-sources`
- `GET /api/admin/data-sources/{id}`
- `POST /api/admin/data-sources`
- `PUT /api/admin/data-sources/{id}`
- `DELETE /api/admin/data-sources/{id}`
- `POST /api/admin/data-sources/{id}/test`

## Monitoring Metrics

- `POST /api/monitoring/metrics/query`
- `POST /api/monitoring/metrics/query-range`
- `GET /api/monitoring/metrics/labels`
- `GET /api/monitoring/metrics/labels/{labelName}/values`

## Monitoring Logs

- `POST /api/monitoring/logs/query`
- `POST /api/monitoring/logs/query-range`
- `GET /api/monitoring/logs/labels`
- `GET /api/monitoring/logs/labels/{labelName}/values`

## Dashboards

- `GET /api/dashboards`
- `GET /api/dashboards/{id}`
- `POST /api/dashboards`
- `PUT /api/dashboards/{id}`
- `DELETE /api/dashboards/{id}`

## Panels

- `POST /api/dashboards/{dashboardId}/panels`
- `PUT /api/panels/{panelId}`
- `DELETE /api/panels/{panelId}`
- `POST /api/panels/{panelId}/preview`

## Health

- `GET /api/health`
- `GET /api/health/mimir`
- `GET /api/health/loki`

## Erreur standard

```json
{
  "timestamp": "2026-07-22T10:30:00Z",
  "status": 400,
  "code": "INVALID_QUERY",
  "message": "La requête PromQL est invalide",
  "path": "/api/monitoring/metrics/query-range",
  "details": []
}
```
