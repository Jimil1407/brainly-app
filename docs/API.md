# 🔌 API Documentation

This document provides comprehensive information about the Second Brain API endpoints.

## Base URL

- **Development**: `http://localhost:3000/api/v1`
- **Production**: `https://second-brain-6avd.onrender.com/api/v1`

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 🔐 Authentication

#### POST `/signup`
Create a new user account.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "string",
    "username": "string"
  }
}
```

#### POST `/signin`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "string",
  "user": {
    "_id": "string",
    "username": "string"
  }
}
```

### 📄 Content Management

#### GET `/content`
Get all content for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "contents": [
    {
      "_id": "string",
      "link": "string",
      "type": "tweet|video|document|link",
      "title": "string",
      "tags": "string",
      "userId": "string",
      "createdAt": "string"
    }
  ]
}
```

#### POST `/content`
Create new content.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "link": "string",
  "type": "tweet|video|document|link",
  "title": "string",
  "tags": "string"
}
```

**Response:**
```json
{
  "message": "Content created successfully",
  "content": {
    "_id": "string",
    "link": "string",
    "type": "string",
    "title": "string",
    "tags": "string",
    "userId": "string",
    "createdAt": "string"
  }
}
```

#### DELETE `/content`
Delete content by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "id": "string"
}
```

**Response:**
```json
{
  "message": "Content deleted successfully"
}
```

### 🔗 Sharing

#### POST `/content/share`
Generate shareable link for a single content item.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "id": "string"
}
```

**Response:**
```json
{
  "hash": "string",
  "shareableLink": "string"
}
```

#### POST `/content/shareAll`
Generate shareable link for all user content.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "hash": "string",
  "shareableLink": "string"
}
```

### 🌐 Public Access

#### GET `/content/shared/{hash}`
Get shared content by hash (no authentication required).

**Response:**
```json
{
  "contents": [
    {
      "_id": "string",
      "link": "string",
      "type": "string",
      "title": "string",
      "tags": "string",
      "createdAt": "string"
    }
  ],
  "sharedBy": "string"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Data Models

### User
```typescript
interface User {
  _id: string;
  username: string;
  password: string; // hashed
  createdAt: Date;
  updatedAt: Date;
}
```

### Content
```typescript
interface Content {
  _id: string;
  link: string;
  type: 'tweet' | 'video' | 'document' | 'link';
  title: string;
  tags: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### ShareableLink
```typescript
interface ShareableLink {
  hash: string;
  shareableLink: string;
  userId: string;
  createdAt: Date;
}
```

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **Content endpoints**: 100 requests per minute
- **Public endpoints**: 50 requests per minute

## CORS

The API supports CORS for the following origins:
- `http://localhost:5173` (development)
- `https://second-brain-app.vercel.app` (production)

## Examples

### Using cURL

#### Sign up
```bash
curl -X POST http://localhost:3000/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

#### Sign in
```bash
curl -X POST http://localhost:3000/api/v1/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

#### Get content
```bash
curl -X GET http://localhost:3000/api/v1/content \
  -H "Authorization: Bearer <your-token>"
```

#### Create content
```bash
curl -X POST http://localhost:3000/api/v1/content \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "link": "https://example.com",
    "type": "link",
    "title": "Example Link",
    "tags": "example,test"
  }'
```

### Using JavaScript/Fetch

```javascript
// Sign in
const signIn = async (username, password) => {
  const response = await fetch('http://localhost:3000/api/v1/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  return data.token;
};

// Get content
const getContent = async (token) => {
  const response = await fetch('http://localhost:3000/api/v1/content', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
};
```

## Support

For API support or questions:
- Create an issue on GitHub
- Check the [README](../README.md) for setup instructions
- Review the [Contributing Guide](../CONTRIBUTING.md)
