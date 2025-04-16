# QR Code Management API

A Node.js + Express backend API for managing QR codes with Firebase Authentication and Supabase PostgreSQL database.

## Features

- Firebase Authentication integration
- RESTful API endpoints for QR code management
- PostgreSQL database with Prisma ORM
- Secure token-based authentication
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- Firebase project with Authentication enabled

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values with your Supabase and Firebase credentials

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### QR Codes

- `GET /api/qr-codes` - List all QR codes for the authenticated user
- `POST /api/qr-codes` - Create a new QR code
- `GET /api/qr-codes/:id` - Get QR code details by ID
- `PUT /api/qr-codes/:id` - Update QR code
- `DELETE /api/qr-codes/:id` - Delete QR code

## Authentication

All endpoints require a valid Firebase Authentication token in the Authorization header:
```
Authorization: Bearer <your-firebase-token>
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_CLIENT_EMAIL` - Firebase service account email
- `FIREBASE_PRIVATE_KEY` - Firebase service account private key

## License

MIT 