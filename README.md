Problem Statement

Design and implement an API that facilitates grocery item management (for admins) and booking functionalities (for users). The API should include full CRUD capabilities, role-based access control, and order handling.

👥 Roles
🛠️ Admin
Add new grocery items

View all grocery items

Update grocery item details

Remove grocery items

Manage inventory levels

🧑‍💼 User
View available grocery items

Book multiple grocery items in a single order


⚙️ Tech Stack
Backend: Node.js + TypeScript

Database: PostgreSQL (via Sequelize ORM)

Authentication: JWT-based

Containerization: Docker (for advanced deployment)

🗃️ Getting Started

git clone https://github.com/chintan3540/qp-assessment.git

cd qp-assessment

npm install

Once installed, you can run the app locally.

after npm i code run locally and you do using docker then run below command


🐳 Docker Support
To use Docker, you can either pull the pre-built image or use Docker Compose:

Option 1: Pull the Docker Image

docker pull chintanbhesaniya/grocery-api

If the above command fails, use Docker Compose as described below.

Option 2: Use Docker Compose

Start the Application

docker-compose up -d

Stop and Remove the Application

docker-compose down



📂 Database Schema

-- Enable UUID generation extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE "Users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "role" VARCHAR(10) NOT NULL DEFAULT 'USER' CHECK ("role" IN ('USER', 'ADMIN')),
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- GroceryItems table
CREATE TABLE "GroceryItems" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "price" FLOAT NOT NULL,
  "stock" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE "Orders" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "Users"("id"),
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- OrderItems table
CREATE TABLE "OrderItems" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "orderId" UUID NOT NULL REFERENCES "Orders"("id") ON DELETE CASCADE,
  "groceryItemId" UUID NOT NULL REFERENCES "GroceryItems"("id"),
  "quantity" INTEGER NOT NULL,
  "priceAtOrder" FLOAT NOT NULL
);



🧪 API Endpoints
🔐 Authentication


Method	Endpoint	      Description
POST	/api/register	  Register a new user
POST	/api/login	      Log in a user/admin

👑 Admin Routes (/admin)

Method	  Endpoint	                  Description
POST	  /api/admin/grocery	      Add a new grocery item
GET	      /api/admin/grocery	      View all grocery items
GET	      /api/admin/grocery/:id	  View one grocery items
PUT	      /api/admin/grocery/:id      Update grocery item details
DELETE	  /api/admin/grocery/:id	  Delete a grocery item


👤 User Routes
Method	  Endpoint	          Description
POST	  /api/order	      Book multiple groceries in one order
GET	      /api/groceries      View available grocery items
