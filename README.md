# FeedFront

Website to allow students to give feedback on their classes, and to allow teachers to visualize them.

Projects:

- feedfront: Frontend
- feedback: Backend

---

## Run the project

A simple docker command is enough to run the project.

**Production environment**:
To start the project:

```bash
docker compose -f docker-compose-prod.yml up
```

To stop the project:

```bash
# Remove the volumes (all data will be lost):
docker compose -f docker-compose-prod.yml down -v

# Destroy the containers but keep the volumes (data will remain):
docker compose -f docker-compose-prod.yml down
```

**Development environment**:
To start the project:

```bash
docker compose up
```

To stop the project:

```bash
# Remove the volumes (all data will be lost):
docker compose down -v

# Destroy the containers but keep the volumes (data will remain):
docker compose down
```

This will start the project and each service. To use the project, visit [http://localhost:3000](http://localhost:3000).
