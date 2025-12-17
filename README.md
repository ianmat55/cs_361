# AI Job Matching Platform

A full-stack web application that leverages artificial intelligence and semantic matching to automate job searching and application processes. Built with modern web technologies and machine learning capabilities to intelligently match candidates with job opportunities.

## Overview

This platform streamlines the job search process by using AI to analyze resumes, match candidates with relevant positions, and automate application submissions. The system employs vector embeddings and semantic search to discover opportunities that traditional keyword-based searches would miss.

### Key Features

- **Intelligent Resume Analysis** - PDF parsing and AI-powered extraction of skills, experience, and qualifications
- **Semantic Job Matching** - Vector embedding-based search using PostgreSQL with pgvector for accurate job-candidate matching
- **Profile Management** - Comprehensive tracking of education, work experience, projects, and technical skills
- **Resume Tailoring** - AI-assisted generation of customized resumes for specific job applications
- **Usage Analytics** - Track application metrics and token usage for AI operations
- **Secure Authentication** - OAuth 2.0 integration (Google) and credential-based auth via NextAuth.js

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router and Server Components
- **React 19** - Latest React features including Server Actions
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon system

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication and session management
- **Prisma ORM** - Type-safe database client with migrations
- **PostgreSQL** - Primary relational database
- **pgvector** - Vector similarity search for semantic matching

### AI/ML
- **OpenAI API** - GPT-based resume tailoring and content generation
- **Vector Embeddings** - Semantic search and job matching
- **PDF Parsing** - Automated resume content extraction

### DevOps & Tools
- **Docker** - Containerized PostgreSQL database
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **pnpm** - Fast, disk space efficient package manager

## Database Schema

The application uses a sophisticated relational schema with the following core models:

- **Profile** - User accounts and authentication
- **Resume** - Uploaded resume documents with parsing status
- **Experience** - Work history records
- **Education** - Academic background
- **Project** - Portfolio projects
- **Skill** - Technical skills with experience levels
- **Embeddings** - Vector representations for semantic matching
- **Usage** - API usage and generation tracking

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **Docker** ([Download](https://www.docker.com/))
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL client** (optional, for database inspection)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ai-job-platform.git
cd ai-job-platform
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Start PostgreSQL with Docker**

The application requires PostgreSQL with the pgvector extension:

```bash
pnpm db:init
# or manually:
docker run --name local-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=mydb \
  -p 5433:5432 \
  -v pgdata:/var/lib/postgresql/data \
  -d ankane/pgvector
```

4. **Configure environment variables**

Create a `.env.dev` file in the project root:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/mydb

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

5. **Initialize the database**

```bash
pnpm db:push:dev
# This runs: prisma db push && prisma generate
```

6. **Start the development server**

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Database
- `pnpm db:init` - Initialize PostgreSQL with pgvector
- `pnpm db:start` - Start existing Docker container
- `pnpm db:stop` - Stop Docker container
- `pnpm db:status` - Check database status
- `pnpm db:connect` - Connect to database via psql
- `pnpm db:push:dev` - Push schema changes to dev database
- `pnpm db:push` - Push schema changes to database

### Database Management

```bash
# View database status
pnpm db:status

# Connect to database
pnpm db:connect

# Regenerate Prisma client after schema changes
npx prisma generate

# Open Prisma Studio for visual database management
npx prisma studio
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/         # NextAuth endpoints
│   │   │   ├── signup/       # User registration
│   │   │   └── profile/      # Profile management
│   │   ├── actions/          # Server Actions
│   │   ├── dashboard/        # User dashboard
│   │   ├── profile/          # Profile editor
│   │   ├── login/            # Authentication pages
│   │   └── signup/
│   └── components/            # React components
│       ├── ui/               # Reusable UI components
│       └── ...               # Feature components
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── ...config files
```

## Features in Detail

### Authentication Flow
- Google OAuth 2.0 integration for quick signup
- Secure credential-based authentication with bcrypt password hashing
- Session management with JWT tokens
- Protected routes and API endpoints

### Resume Processing
1. User uploads PDF resume
2. Server parses PDF content
3. AI extracts structured data (skills, experience, education)
4. Vector embeddings generated for semantic search
5. Resume stored with metadata for future matching

### Semantic Job Matching
- Job descriptions converted to vector embeddings
- Candidate profiles embedded in same vector space
- Similarity search using pgvector's cosine distance
- Ranked results based on semantic relevance, not just keywords

### Profile Management
- Comprehensive forms for experience, education, projects
- Skill tracking with proficiency levels
- Resume version management
- Export capabilities for different formats

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | For Google auth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | For Google auth |
| `OPENAI_API_KEY` | OpenAI API key | For AI features |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Hosting

For production, use a managed PostgreSQL service with pgvector support:
- [Supabase](https://supabase.com/) (pgvector included)
- [Neon](https://neon.tech/) (supports pgvector)
- [Railway](https://railway.app/) (with pgvector extension)

Ensure the database has the pgvector extension enabled:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## Security Considerations

- All passwords hashed with bcrypt (salt rounds: 10)
- CSRF protection via NextAuth
- HTTP-only cookies for session tokens
- Environment variables for sensitive credentials
- SQL injection prevention via Prisma's parameterized queries
- Input validation on all forms and API endpoints

## Performance Optimizations

- Server Components for reduced client-side JavaScript
- Turbopack for faster development builds
- Database indexes on frequently queried fields
- Vector similarity search with HNSW indexing
- Lazy loading of components and routes
- Image optimization via Next.js Image component

## Contributing

This project follows standard Git workflow:

1. Create a feature branch
2. Make your changes
3. Write/update tests as needed
4. Submit a pull request

## License

This project is private and proprietary.

## Acknowledgments

- Next.js team for the excellent framework
- Vercel for hosting and deployment platform
- OpenAI for AI capabilities
- Prisma for the fantastic ORM
- pgvector team for vector search functionality

---

**Built with** Next.js, React, TypeScript, PostgreSQL, and OpenAI | **Powered by** Vector Embeddings & Semantic Search
