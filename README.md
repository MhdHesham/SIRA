# SIRA

Smart Institute & Responsive Academics platform for multi-institute training management.

## Architecture

- `apps/frontend`: React + TypeScript + Vite + Tailwind-ready web application.
- `apps/backend`: Laravel REST API, authentication, tenancy, training and assessment domain.
- `services/ai`: FastAPI service for skill-gap analysis and adaptive learning paths.
- `infra`: local infrastructure configuration.

## Quick start

```powershell
docker compose up -d mysql redis

Set-Location apps\backend
Copy-Item .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

In another terminal:

```powershell
Set-Location apps\frontend
npm.cmd install
npm.cmd run dev
```

```powershell
Set-Location services\ai
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

The API is available at `http://localhost:8000/api`, the AI service at
`http://localhost:8001`, and the frontend at `http://localhost:5173`.

## Initial roles

The seed data creates the roles `super_admin`, `institute_admin`, `instructor`,
and `trainee`. Authentication uses Laravel Sanctum.
