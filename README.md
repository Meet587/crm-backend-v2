# CRM Backend

A comprehensive **Customer Relationship Management (CRM) Backend** built with NestJS for property management and real estate operations. This application provides a robust API for managing leads, properties, deals, commissions, and user interactions in the real estate industry.

## Features

- **Lead Management**: Track and nurture potential customers and prospects
- **User Management**: Handle user accounts with JWT authentication and role-based access
- **Property Management**: Manage real estate properties and related data
- **Project Management**: Oversee development projects and timelines
- **Commission Tracking**: Calculate and track sales commissions
- **Deal Management**: Handle property transactions and deals
- **Builder Management**: Manage construction companies and contractors
- **City/Location Management**: Handle geographic data and locations
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation

## Technology Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator and class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest for unit and e2e tests
- **Security**: bcrypt for password hashing, rate limiting with throttler

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd crm-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials and other configuration.

4. Run database migrations:

```bash
npm run migration:run
```

5. (Optional) Seed the database with sample data:

```bash
npm run seed
```

## Development

### Running the Application

```bash
# Development mode with hot reload
npm run start:local

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

### Database Operations

```bash
# Generate new migration
npm run migration:generate

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Run database seeds
npm run seed
```

### Testing

```bash
# Unit tests
npm run test

# Unit tests in watch mode
npm run test:watch

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Code Quality

```bash
# Lint and fix code
npm run lint

# Format code with Prettier
npm run format
```

## Project Structure

```
src/
├── auth/                   # Authentication & authorization
├── users/                  # User management
├── leads/                  # Lead management
├── deal/                   # Deal/transaction management
├── commission/             # Commission calculations
├── builder/                # Builder/contractor management
├── city/                   # Location/city management
├── project-management/     # Project oversight
├── propert-management/     # Property management
├── config/                 # Environment configuration
├── db/                     # Database layer (entities, migrations, repositories)
├── decorators/             # Custom decorators
├── helpers/                # Utility functions
├── seeds/                  # Database seeders
├── app.module.ts           # Root module
└── main.ts                 # Application bootstrap
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api-docs
```

The API provides comprehensive documentation for all endpoints, including request/response schemas and authentication requirements.

## Environment Configuration

The application supports multiple environments:

- **LOCAL**: Development environment
- **DEVELOPMENT**: Staging environment
- **PRODUCTION**: Production environment

Configuration files are located in `src/config/sets/` and are automatically loaded based on the `NODE_ENV` variable.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

For detailed database schema and relationships, refer to the [database diagram](https://dbdiagram.io/d/property-crm-6868b05df413ba350863763a).

## Workflow Documentation

For system workflow and business process documentation, see the [workflow discussion](https://app.eraser.io/workspace/7t1LqV3rKzqusr7KEeMU).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the UNLICENSED license.

## Author

Meet Rakholiya
