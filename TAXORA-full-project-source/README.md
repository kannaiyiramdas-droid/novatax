# TAXORA

A multi-tenant tax compliance workspace foundation built with Next.js, TypeScript, Prisma and MySQL.

## Included in this source package

- Premium dark purple/blue responsive interface
- User registration and login with bcrypt password hashing
- HTTP-only signed session cookie
- Organisation/workspace created during registration
- Workspace membership roles
- GSTIN create/list workflow
- Basic audit log for GSTIN creation
- Prisma/MySQL schema for users, organisations, memberships, GSTINs, clients and audit logs

## Requirements

- Node.js 20.9+
- MySQL database (Aiven MySQL supported)
- Git

## Setup

1. Extract the ZIP.
2. Open the extracted folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Put your Aiven MySQL connection string in `DATABASE_URL`.
6. Set `JWT_SECRET` to a long random secret (at least 32 characters).
7. Run:

```bash
npx prisma generate
npx prisma db push
npm run dev
```

8. Open http://localhost:3000.

## Aiven connection string

Use the connection string supplied by your Aiven service. Include the SSL parameters required by your Aiven connection details. Do not commit `.env` to GitHub.

## Deploying to Vercel

Import the GitHub repository in Vercel, set `DATABASE_URL`, `JWT_SECRET`, and `APP_URL` in Project Settings > Environment Variables, then deploy. Ensure the database allows connections from your deployment environment and use a secure production database configuration.

## Important production checklist

This is a working foundation, not a completed GST filing product. Before real client or tax data is used:
- Add rate limiting, email verification, password reset and MFA.
- Add explicit organisation switching and membership administration.
- Review authorization and tenant isolation with security tests.
- Add backups, monitoring, retention policies and security review.
- Configure authorised GSP/GSTN APIs and credentials for live GST data, return filing, IRN and e-way bills.
- Add proper GST validations and professional review of tax calculations.
- Configure a production session secret and secure database network access.

GSTN/GSP integration is intentionally not simulated. The app does not claim to file returns or create IRNs/e-way bills until the authorised integrations are implemented.
