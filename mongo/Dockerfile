FROM mongo:7

# Optional init scripts run only on first container init (empty /data/db)
COPY ./init/ /docker-entrypoint-initdb.d/
