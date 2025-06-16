# Project

## 🛠️ Prerequisites

Ensure the following are installed:

- **[Node.js](https://nodejs.org/)** (v18+ recommended)
- **[Docker](https://www.docker.com/)** (to run PostgreSQL locally)
- **[pnpm](https://pnpm.io/)** or `npm`/`yarn` (pnpm preferred)
- **[PostgreSQL client](https://www.postgresql.org/download/)** (optional for DB inspection)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

$$
git clone https://github.com/yourusername/jobfit.git
cd jobfit
$$

---

### 2. Start PostgreSQL with Docker

$$
docker run --name projname-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=projname -p 5432:5432 -d postgres
$$

---

### 3. Set environment variables

Create a `.env` file at the root:

$$
cp .env.example .env
$$

Edit `.env` and set the following:

$$
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/projname
NEXTAUTH_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
$$

---

### 4. Install dependencies

$$
pnpm install
# or
npm install
$$

---

### 5. Initialize the database

$$
npx prisma db push
$$

(Optional) Seed the database:

$$
pnpm db:seed
$$

---

### 6. Start the development server

$$
pnpm dev
# or
npm run dev
$$

Visit: [http://localhost:3000](http://localhost:3000)

---

## ✅ Optional Tools

- Regenerate Prisma client:

$$
npx prisma generate
$$
