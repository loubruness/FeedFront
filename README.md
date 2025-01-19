# FeedFront

Website to allow students to give feedback on their classes, and to allow teachers to visualize them.

Projects:

- feedfront: Frontend
- feedback: Backend
- efrei-api: School API

---

## Run the project

A simple docker command is enough to run the project.

### Production environment

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

### Development environment

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

## Customize the project

In the docker-compose files, or using .env files, you can customize how the project will behave. Here are the environment variables you can use:

### Frontend

- NEXT_PUBLIC_BACK_ADDRESS (`string`, default: `localhost:3001`): The URL to the backend service.

### Backend

- SECRET_KEY (`string`): The key to sign the authentication tokens.
- SECRET_KEY_FORM (`string`): The key to sign the form tokens.
- SECRET_KEY_ROLE (`string`): The key to sign the role tokens.
- EFREI_API_URL (`string`): The URL for the school service.
- EFREI_API_KEY (`string`): The API key to use the school service.
- MAIL_USERNAME (`string`): The email address that will send the emails.
- MAIL_PASSWORD (`string`): The password of the email account
- OAUTH_CLIENTID (`string`): Client ID for the email provider.
- OAUTH_CLIENT_SECRET (`string`): Client secret for the email provider.
- OAUTH_REFRESH_TOKEN (`string`): Refresh token for the email provider.
- DB_NAME (`string`): The name of the database containing information about the forms, etc.
- DB_USER (`string`): The user to use to access the database
- DB_PASS (`string`): The password of the user that has access to the database.
- DB_HOST (`string`): The address of the server hosting the database.
- DB_PORT (`string`): The port to access the database on the server.
- SEND_EMAILS_IMMEDIATELY (`boolean`, default: `false`): If true, sends the emails immediately without waiting for the course's end date.
- FRONTEND_PUBLIC_URL (`string`, default: `http://localhost:3000`): The URL of the project to put inside of the emails.

This will start the project and each service. To use the project, visit [http://localhost:3000/pages/Login](http://localhost:3000/pages/Login).

## Potential features for future versions

In the future, we think FeedFront could benefit from a dedicated analysis dashboard that would show analytics on the forms' responses and allow for tracking of KPIs instead of having to download separate reports from forms from different years and having to compare them manually to track the progression.
