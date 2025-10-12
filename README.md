# Tech Blog Application

A mobile-optimized tech blog application with auto-generated content from trending topics and auto-posting capabilities to multiple platforms.

## Features

🚀 **Auto-Generated Content**: Automatically generates blog posts based on trending tech topics from SERP API

📱 **Mobile-Optimized**: Fully responsive design that works seamlessly on all devices

🌐 **Multi-Platform Publishing**: Auto-post to Twitter, LinkedIn, Medium, and DEV.to

📈 **Trending Topics**: Real-time trending technology news and topics

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **APIs**: SERP API for trending topics
- **Platforms**: Twitter, LinkedIn, Medium, DEV.to

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skills-copilot-codespaces-vscode
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- `SERP_API_KEY`: Your SERP API key (optional - mock data will be used if not provided)
- `TWITTER_API_KEY`, `TWITTER_API_SECRET`: Twitter API credentials
- `LINKEDIN_API_KEY`: LinkedIn API credentials
- `MEDIUM_API_KEY`: Medium API credentials
- `DEV_TO_API_KEY`: DEV.to API credentials

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### 1. View Trending Topics
- Navigate to the "Trending Topics" tab
- Click "Refresh Trends" to fetch the latest trending tech topics
- View topic details including title, snippet, and source

### 2. Generate Blog Posts
- Click "Generate Posts" to automatically create blog posts from trending topics
- Navigate to the "Generated Posts" tab to view all generated content
- Each post includes:
  - Title and introduction
  - Main content sections
  - Conclusion
  - Relevant tags
  - Source information

### 3. Auto-Post to Platforms
- Select a generated post by clicking "Select for Publishing"
- Navigate to the "Auto-Post" tab
- Choose platforms to publish to (Twitter, LinkedIn, Medium, DEV.to)
- Click "Publish Now" to post to selected platforms
- View publishing results for each platform

## Project Structure

```
skills-copilot-codespaces-vscode/
├── server/
│   ├── index.js              # Express server entry point
│   ├── routes/
│   │   ├── serpApi.js        # SERP API routes
│   │   ├── content.js        # Content generation routes
│   │   └── posting.js        # Auto-posting routes
│   └── services/
│       ├── serpApiService.js # SERP API integration
│       ├── contentGenerator.js # Content generation logic
│       └── postingService.js # Multi-platform posting
├── public/
│   ├── index.html            # Main HTML file
│   ├── css/
│   │   └── styles.css        # Responsive CSS styles
│   └── js/
│       └── app.js            # Frontend JavaScript
├── package.json              # Node.js dependencies
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## API Endpoints

### Trends
- `GET /api/trends` - Fetch trending tech topics

### Content Generation
- `GET /api/content/generate?count=5` - Generate multiple blog posts
- `POST /api/content/generate-single` - Generate single blog post from specific trend

### Publishing
- `GET /api/post/platforms` - Get available publishing platforms and their status
- `POST /api/post/publish` - Publish content to selected platforms

## Configuration

### SERP API
The application uses SERP API to fetch trending topics. If no API key is configured, mock data will be used for demonstration purposes.

### Platform APIs
To enable auto-posting, configure the following API keys in your `.env` file:
- **Twitter**: Requires API key and secret
- **LinkedIn**: Requires API key
- **Medium**: Requires API key
- **DEV.to**: Requires API key

Note: The application works with mock responses if API keys are not configured, useful for testing.

## Mobile Optimization

The application is fully responsive and optimized for mobile devices:
- Adaptive grid layouts
- Touch-friendly buttons and controls
- Optimized font sizes and spacing
- Mobile-first CSS approach
- Smooth scrolling and transitions

## Development

To run in development mode with auto-reload:
```bash
npm run dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

