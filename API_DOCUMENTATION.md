# Tech Blog API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Get Trending Topics

Fetches the latest trending tech topics from SERP API or returns mock data.

**Endpoint:** `GET /api/trends`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "title": "AI and Machine Learning Advancements in 2024",
      "snippet": "Discover the latest breakthroughs in artificial intelligence...",
      "link": "https://example.com/ai-ml-2024",
      "source": "Tech News"
    }
  ],
  "count": 5
}
```

### 2. Generate Blog Posts

Generates blog posts based on trending topics.

**Endpoint:** `GET /api/content/generate?count=5`

**Query Parameters:**
- `count` (optional): Number of posts to generate (default: 5)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "title": "AI and Machine Learning Advancements in 2024",
      "introduction": "In today's rapidly evolving tech landscape...",
      "mainContent": [
        {
          "heading": "Overview",
          "content": "This technology is reshaping..."
        }
      ],
      "conclusion": "AI and Machine Learning represents...",
      "tags": ["technology", "innovation", "ai"],
      "createdAt": "2024-10-03T06:47:02.188Z",
      "source": "Tech News"
    }
  ],
  "count": 5
}
```

### 3. Generate Single Post

Generates a single blog post from a specific trend.

**Endpoint:** `POST /api/content/generate-single`

**Request Body:**
```json
{
  "trend": {
    "title": "AI and Machine Learning Advancements in 2024",
    "snippet": "Discover the latest breakthroughs...",
    "link": "https://example.com/ai-ml-2024",
    "source": "Tech News"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "AI and Machine Learning Advancements in 2024",
    "introduction": "In today's rapidly evolving tech landscape...",
    "mainContent": [...],
    "conclusion": "...",
    "tags": [...],
    "createdAt": "2024-10-03T06:47:02.188Z",
    "source": "Tech News"
  }
}
```

### 4. Get Available Platforms

Returns the list of available publishing platforms and their configuration status.

**Endpoint:** `GET /api/post/platforms`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "twitter",
      "configured": false
    },
    {
      "name": "linkedin",
      "configured": false
    },
    {
      "name": "medium",
      "configured": false
    },
    {
      "name": "devto",
      "configured": false
    }
  ]
}
```

### 5. Publish Content

Publishes content to selected platforms.

**Endpoint:** `POST /api/post/publish`

**Request Body:**
```json
{
  "content": {
    "title": "AI and Machine Learning Advancements in 2024",
    "introduction": "In today's rapidly evolving tech landscape...",
    "mainContent": [...],
    "conclusion": "...",
    "tags": [...]
  },
  "platforms": ["twitter", "linkedin", "medium"]
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "success": false,
      "message": "Twitter API key not configured",
      "platform": "twitter"
    },
    {
      "success": false,
      "message": "LinkedIn API key not configured",
      "platform": "linkedin"
    },
    {
      "success": false,
      "message": "Medium API key not configured",
      "platform": "medium"
    }
  ]
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Status Codes

- `200` - Success
- `400` - Bad Request (missing required parameters)
- `500` - Internal Server Error

## Notes

- The application works with mock data when API keys are not configured
- SERP API integration can be enabled by adding `SERP_API_KEY` to the `.env` file
- Platform posting requires respective API keys in the `.env` file
- All responses are in JSON format
