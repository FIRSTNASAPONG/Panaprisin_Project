# Tech Stack — Panaprisin Project

> อ้างอิงจากโค้ดจริงใน repo: `FIRSTNASAPONG/Panaprisin_Project`
> (โปรเจกต์: พณาไพรสิน — เว็บของเก่า/ของสะสม/แต่งบ้าน)

## Architecture
Full-stack **Next.js (App Router)** ตัวเดียว — Backend คือ API Routes (Route Handlers) ภายใต้ `src/app/api/*` ไม่ได้แยก service ต่างหาก

> หมายเหตุ: บาง dependency ใน `package.json` ใช้ semver range เช่น `^16.2.12`, `^5`, `^0.45.2` ซึ่งเป็นช่วงเวอร์ชันที่ยอมให้ติดตั้งได้ในช่วงนั้น หากต้องการระบุ “เวอร์ชันที่ถูก lock จริง” ต้องดูจาก `package-lock.json`

```
Client (Browser)
   │
   ▼
Next.js 16.2.12 (App Router)
   ├── Frontend: src/app/{login, register, dashboard}
   └── Backend:  src/app/api/{auth/login, auth/register, products}
              │
              ▼
        Drizzle ORM (src/db/schema.ts)
              │
              ▼
        PostgreSQL 16-alpine (Docker container)
```

---

## Backend (API Routes)
| รายการ | เทคโนโลยี | เวอร์ชัน/Range จริงใน repo |
|---|---|---|
| Framework | Next.js (API Routes / Route Handlers) | 16.2.12 |
| Language | TypeScript | ^5 |
| ORM | Drizzle ORM | ^0.45.2 |
| DB Driver | `postgres` (postgres.js) | ^3.4.9 |
| Authentication | JWT — ไลบรารี `jsonwebtoken` (`src/lib/jwt.ts`) | ^9.0.3 |
| Password Hashing | bcryptjs | ^3.0.3 |
| Env Loader | dotenv | ^17.4.2 |

**API endpoints ที่มีจริง:**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `/api/products` และ `/api/products/[id]`

---

## Database
| รายการ | เทคโนโลยี | หมายเหตุ |
|---|---|---|
| Database | PostgreSQL 16 (alpine) | รันผ่าน Docker container `panaprisin_postgres` |
| Migration Tool | Drizzle Kit | ^0.31.10, config อยู่ที่ `drizzle.config.ts` schema: `src/db/schema.ts` |
| Timezone | Asia/Bangkok | ตั้งค่าใน docker-compose |

---

## Frontend
| รายการ | เทคโนโลยี | เวอร์ชัน/Range จริงใน repo |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.12 |
| UI Library | React / React DOM | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 (ใช้ `@tailwindcss/postcss`, ไม่มีไฟล์ `tailwind.config` แบบ v3) |
| Font | Google Fonts — Sarabun (ผ่าน `next/font/google`) | weight 100–800, subsets: thai, latin |
| หน้าเว็บที่มีจริง | `/login`, `/register`, `/dashboard` | - |

---

## Environment & Configuration
| รายการ | รายละเอียด |
|---|---|
| Env Variables (จาก docker-compose) | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`, `DATABASE_URL` |
| Config โหลดผ่าน | `dotenv/config` (ใช้ใน `drizzle.config.ts`) |

---

## Code Quality
| รายการ | เทคโนโลยี |
|---|---|
| Linting | ESLint 9 + `eslint-config-next` 16.2.12 |
| Type Checking | TypeScript (strict mode เปิดอยู่ใน `tsconfig.json`) |

---

## Testing
| รายการ | เทคโนโลยี | หมายเหตุ |
|---|---|---|
| Test Runner | Jest `^30.4.2` (ผ่าน `next/jest`) | testEnvironment: `node` |
| Assertion | `@testing-library/jest-dom` (`^7.0.0`) | - |
| API Mocking | `Supertest` | วิธีที่ใช้ยิงเข้า Route Handlers (รัน server จริง หรือใช้ next-test-api-route-handler) |
| TS support | `ts-jest` (`^29.4.12`), `ts-node` (`^10.9.2`) | - |
| ตำแหน่งไฟล์เทส | `tests/api/*.test.ts` | - |

---

## Deployment & CI/CD
| รายการ | เทคโนโลยี |
|---|---|
| Containerization | Docker (multi-stage build: deps → builder → runner, base image `node:22-alpine`, ใช้ Next.js standalone output) |
| Orchestration | Docker Compose (`docker-compose.yml` สำหรับ DB, `docker-compose.prod.yml` สำหรับ prod) |
| Container Registry | GitHub Container Registry (GHCR) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |

**CI/CD Pipeline จริง:**
1. **test** — checkout → setup Node 22 → `npm ci` → `npm run test` (Jest)
2. **build-and-push** — build Docker image แล้ว push ขึ้น `ghcr.io` (ใช้ GitHub Actions cache)
3. **deploy** — SSH เข้า self-hosted Ubuntu VM → `docker compose pull` + `up -d` → รัน DB migration ในคอนเทนเนอร์ → prune image เก่า

Trigger: push เข้า branch `main`

---

## Notes
- ✅ เพิ่ม **bcryptjs** (hashing password) ที่ไม่มีในสไลด์เดิม
- ✅ ระบุ DB driver ที่ใช้จริงคือ `postgres` (postgres.js) ไม่ใช่ `pg`
- ✅ Tailwind เป็น **v4** ไม่ใช่ v3 (ไม่มี `tailwind.config.js` แบบเดิม ใช้ PostCSS plugin)
- ✅ Next.js/React เป็นเวอร์ชันล่าสุด (Next 16, React 19)
- ✅ Deployment ใช้ **GHCR + self-hosted runner ผ่าน SSH** ไม่ใช่แค่ "Docker, Docker Compose" เฉยๆ
