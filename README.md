# Tripitify API

A  trip planning API built with Node.js, Express, TypeORM, and MySQL. This API provides secure user authentication, onboarding, and trip management functionality.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with email verification
- **User Onboarding**: Complete user profile setup with interests and preferences
- **Password Management**: Secure password reset and change functionality
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive request validation with Joi
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Security Headers**: Helmet.js for security headers
- **CORS Protection**: Configurable CORS settings
- **Email Integration**: Resend.com integration for transactional emails

## 🛡️ Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure JSON Web Tokens for authentication
- **Password Hashing**: bcryptjs with salt rounds for password security
- **Email Verification**: Required email verification before account activation
- **Token Expiration**: Configurable token expiration times

### Input Validation & Sanitization
- **Joi Validation**: Comprehensive request validation
- **XSS Protection**: Input sanitization to prevent XSS attacks
- **SQL Injection Prevention**: TypeORM ORM protection
- **Strong Password Policy**: Enforced password complexity requirements

### Rate Limiting
- **Authentication Endpoints**: 5 attempts per 15 minutes
- **General Endpoints**: 100 requests per 15 minutes
- **Password Reset**: 3 attempts per hour
- **Strict Endpoints**: 10 requests per 15 minutes

### Security Headers
- **Helmet.js**: Comprehensive security headers
- **Content Security Policy**: XSS protection
- **HSTS**: HTTP Strict Transport Security
- **CORS**: Configurable Cross-Origin Resource Sharing

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tripitify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit the `.env` file with your configuration:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=tripitify_db

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
   RESET_TOKEN_SECRET=your_reset_token_secret_here

   # Email Configuration (Resend)
   RESEND_API_KEY=re_your_resend_api_key_here

   # Application Configuration
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:3000
   ```

5. **Database Setup**
   - Create a MySQL database named `tripitify_db`
   - The application will automatically create tables and seed default data

6. **Start the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

Once the server is running, access the interactive API documentation at:
- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/health`

## 🔐 API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `GET /api/auth/verify-email` - Verify email address
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/change-password` - Change password (authenticated)
- `POST /api/auth/resend-verification` - Resend verification email

### Onboarding Endpoints
- `GET /api/onboarding/profile` - Get user profile
- `PUT /api/onboarding/user-type` - Update user type
- `PUT /api/onboarding/interests` - Update user interests
- `POST /api/onboarding/complete` - Complete onboarding
- `GET /api/onboarding/user-types` - Get all user types
- `GET /api/onboarding/interests` - Get all interests

## 🔒 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

## 📝 Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

### Update User Interests
```bash
PUT /api/onboarding/interests
Authorization: Bearer <token>
Content-Type: application/json

{
  "interestIds": [1, 2, 3, 4]
}
```

## 🗄️ Database Schema

The application uses TypeORM with the following main entities:
- **User**: User account information
- **UserType**: User categories (Traveller, Planner, Both)
- **Interest**: Available interests for users
- **UserInterest**: User-interest relationships
- **Trip**: Trip information and planning
- **TripActivity**: Activities within trips

## 🚦 Error Handling

The API uses consistent error response format:

```json
{
  "status": "error",
  "message": "Error description",
  "data": null
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (duplicate resources)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## 🧪 Testing

Use the Swagger UI at `/api-docs` for interactive API testing, or use tools like:
- Postman
- Insomnia
- curl
- HTTPie

## 🔧 Configuration

### Rate Limiting
Adjust rate limits in `src/middlewares/validation.middleware.js`:
- Authentication: 5 attempts per 15 minutes
- General: 100 requests per 15 minutes
- Password reset: 3 attempts per hour

### Security Headers
Configure security headers in `src/middlewares/security.middleware.js`

### CORS Settings
Update CORS origins in the security middleware for production deployment

## 🚀 Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database credentials
3. Set up proper CORS origins for your frontend
4. Configure rate limiting for production traffic
5. Set up SSL/TLS certificates
6. Configure proper logging and monitoring

