# PharmaChain MVP

An enterprise-grade pharmaceutical traceability and prescription management platform powered by Hyperledger Fabric.

## Architecture

* **Frontend**: Next.js App Router, Tailwind CSS, Glassmorphic UI
* **Backend**: NestJS, PostgreSQL (for Users/Auth), TypeORM, JWT Auth
* **Blockchain**: Hyperledger Fabric Gateway SDK, TypeScript Chaincode

## Local Setup Guide

### 1. Prerequisites

* Node.js v18+
* Docker & Docker Compose
* PostgreSQL (Running locally or via Docker)

### 2. Database Setup

Create a PostgreSQL database named `pharmachain`.
Update the `.env` file in the `backend` directory with your database credentials.

### 3. Running the Backend

```bash
cd backend
npm install
npm run start:dev
```

### 4. Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Hyperledger Fabric Setup (Mocked for MVP API Testing)

For the MVP UI/API development phase, the `FabricService` in NestJS is mocking the blockchain calls to allow the Frontend and Backend to be tested without spinning up the heavy Fabric test-network. 

When you are ready to connect to a real network:
1. Navigate to `blockchain/chaincode`
2. Run `npm run build` to compile the TypeScript Smart Contracts.
3. Deploy the compiled chaincode to your local Fabric test network.
4. Update `FabricService` in `backend` to load your connection profile and wallet.

## Features Implemented

* ✅ Stunning, responsive Glassmorphic UI.
* ✅ Full NestJS monolithic structure with REST APIs.
* ✅ JWT-based authentication and Role-Based Access Control (RBAC).
* ✅ Fabric Gateway integration architecture.
* ✅ 4 Smart Contracts: Drugs, Shipments, Prescriptions, Audit.
