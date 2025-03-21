# Custom URL Shortener

A simple yet powerful URL shortener service that allows custom URL codes.

## Features

- Shorten any URL
- Create custom URL codes
- Track click statistics
- Clean and responsive UI

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/custom-url-shortener.git
cd custom-url-shortener
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file
```bash
cp .env.example .env
```

4. Edit the `.env` file with your MongoDB connection string
```
PORT=3000
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/urlshortener
```

5. Start the development server
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

## Deployment to Zeabur

Zeabur is a modern cloud platform that makes it easy to deploy your applications. Here's how to deploy this URL shortener:

### Step 1: Prepare your project

Make sure your project is ready for deployment:
- Ensure all code is committed to a Git repository (GitHub, GitLab, etc.)
- Make sure you have a `package.json` file with a `start` script

### Step 2: Sign up for Zeabur

1. Go to [Zeabur](https://zeabur.com/) and sign up for an account
2. Create a new project from the dashboard

### Step 3: Connect your repository

1. In your Zeabur project, click "Deploy"
2. Choose the git provider where your code is hosted
3. Authorize Zeabur to access your repositories
4. Select the URL shortener repository

### Step 4: Configure the deployment

1. Zeabur will automatically detect that this is a Node.js application
2. Set the following environment variables in the Zeabur dashboard:
   - `PORT`: 3000 (or any port Zeabur assigns, they often use `$PORT`)
   - `MONGODB_URI`: Your MongoDB connection string

### Step 5: Add a MongoDB service

1. In your Zeabur project, click "Add Service"
2. Select "MongoDB" from the database options
3. Once created, Zeabur will provide you with connection details
4. Update your `MONGODB_URI` environment variable with these details

### Step 6: Deploy your application

1. Click "Deploy" in the Zeabur dashboard
2. Wait for the deployment to complete
3. Once deployed, Zeabur will provide you with a URL for your application

### Step 7: Custom Domain (Optional)

1. In your Zeabur project settings, go to "Domains"
2. Add your custom domain
3. Configure the DNS settings as instructed by Zeabur
4. Wait for DNS propagation (may take up to 48 hours)

## Usage

1. Enter the long URL you want to shorten
2. Optionally enter a custom code (e.g., "my-link")
3. Click "Shorten URL"
4. Copy the shortened URL
5. View statistics by clicking "View Statistics"

## License

MIT
