Act as an expert Full-Stack Developer. I am building a Next.js (App Router) project using TypeScript, Drizzle ORM, PostgreSQL, bcryptjs, and jsonwebtoken. 

My database setup is complete. The DB instance is exported as `db` from `src/db/index.ts`.
Here is the exact database schema located at `src/db/schema.ts`:
- `users` table: id (uuid, pk), email (varchar, unique), password (varchar, hashed), role (varchar, default 'user'), createdAt (timestamp).
- `products` table: id (uuid, pk), name (varchar), price (integer), userId (uuid, foreign key to users.id), createdAt (timestamp).

Please write the complete backend API code (Route Handlers) and necessary utility functions for JWT Authentication and Product CRUD. Follow Next.js App Router conventions (using `NextRequest` and `NextResponse`).

Task 1: Create an Auth Utility File (`src/lib/jwt.ts`)
- Write a helper function to verify a JWT token from the `Authorization: Bearer <token>` header of a `NextRequest`.
- If valid, return the decoded user payload. If invalid or missing, return null. Use `process.env.JWT_SECRET`.

Task 2: Register API (`src/app/api/auth/register/route.ts`)
- Handle POST request. Extract `email` and `password` from the request body.
- Check if the email already exists in the `users` table.
- Hash the password using `bcryptjs` (salt rounds 10).
- Insert the new user into the database using Drizzle ORM and return a 201 success response.

Task 3: Login API (`src/app/api/auth/login/route.ts`)
- Handle POST request. Extract `email` and `password`.
- Find the user by email. Use `bcryptjs` to compare the password.
- If successful, generate a JWT token using `jsonwebtoken` (expires in 1d) containing the user's `id` and `email`.
- Return the token and user details in a 200 response.

Task 4: Products API - Get & Create (`src/app/api/products/route.ts`)
- Handle GET: Fetch all products from the database using Drizzle ORM and return them.
- Handle POST: Verify the user using the helper from Task 1. If unauthorized, return 401. If authorized, extract `name` and `price` from the body, and insert a new product with `userId` set to the verified user's id. Return 201.

Task 5: Products API - Update & Delete (`src/app/api/products/[id]/route.ts`)
- Handle PUT: Verify the user. Extract `name` and `price`. Update the product ONLY IF the `userId` matches the logged-in user. Return 200.
- Handle DELETE: Verify the user. Delete the product ONLY IF the `userId` matches the logged-in user. Return 200.

Ensure all code includes proper try-catch error handling and TypeScript types. Please provide the code block for each file clearly so I can copy and paste them.