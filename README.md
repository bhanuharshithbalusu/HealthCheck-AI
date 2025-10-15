# Healthcare Symptom Checker

A full-stack web application that provides educational information about symptoms and health conditions using AI-powered analysis. Built with React and Node.js, featuring a modern green-themed UI design.

🌐 **Live Demo**: [View on GitHub Pages](https://bhanuharshithbalusu.github.io/healthcare-symptom-checker)

## ⚠️ Medical Disclaimer

**This application is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.**

## ✨ Features

- 🤖 **AI-Powered Analysis**: Uses Google Gemini AI or OpenAI's GPT models to analyze symptoms and provide educational information
- 🧠 **Intelligent Demo Mode**: Provides symptom-specific responses even without API key
- 📋 **Comprehensive Input**: Collect detailed symptom information including duration, severity, and patient demographics
- 🔒 **Privacy Focused**: Secure handling of health information with appropriate safety measures
- 📊 **History Tracking**: Keep track of previous analyses for reference
- 🎨 **Modern UI**: Clean, responsive interface with green color theme and focus on user experience
- ⚡ **Real-time Analysis**: Quick symptom analysis with immediate results
- 🚨 **Safety Features**: Built-in crisis detection and emergency resources
- 📱 **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Live Deployment

This application is deployed on GitHub Pages. You can access it at:
**[https://bhanuharshithbalusu.github.io/healthcare-symptom-checker](https://bhanuharshithbalusu.github.io/healthcare-symptom-checker)**

### GitHub Pages Features:
- ✅ Static frontend deployment
- ✅ Green modern UI theme
- ✅ Responsive design
- ✅ Fast loading times
- ✅ HTTPS enabled
- ⚠️ Note: Backend API features require separate hosting (see deployment section)

## 🛠️ Technology Stack

### Frontend
- **React** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Gemini AI** - Advanced AI-powered symptom analysis
- **OpenAI API** - Alternative AI provider support
- **JSON File Storage** - Simple data persistence
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

## Project Structure

```
healthcare-symptom-checker/
├── backend/                 # Express.js API server
│   ├── controllers/         # Route handlers
│   ├── routes/             # API route definitions
│   ├── utils/              # Utility functions
│   ├── data/               # JSON data storage
│   └── server.js           # Main server file
├── frontend/               # React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS styles
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key (recommended) OR OpenAI API key

### Quick Setup
Run the interactive setup script:
```bash
./setup.sh
```
This will guide you through:
- Installing all dependencies
- Configuring your preferred AI provider
- Setting up environment variables

### Manual Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```
   # Choose your AI provider
   AI_PROVIDER=gemini

   # For Google Gemini (Recommended - Free tier available)
   GEMINI_API_KEY=your_gemini_api_key_here

   # OR for OpenAI
   OPENAI_API_KEY=your_openai_api_key_here

   # Server settings
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **Get API Keys:**
   - **Gemini (Free)**: https://makersuite.google.com/app/apikey
   - **OpenAI (Paid)**: https://platform.openai.com/api-keys

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Running Both Services

You can run both frontend and backend simultaneously:

1. **Terminal 1** (Backend):
   ```bash
   cd backend && npm run dev
   ```

2. **Terminal 2** (Frontend):
   ```bash
   cd frontend && npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Symptom Analysis
- `POST /api/symptoms/analyze` - Analyze symptoms using AI
- `GET /api/symptoms/common` - Get list of common symptoms

### History Management
- `GET /api/history` - Retrieve query history
- `POST /api/history` - Save query to history

### System
- `GET /api/health` - Health check endpoint

## Usage

1. **Enter Symptoms**: Describe your symptoms in detail on the main page
2. **Provide Context**: Optionally add age, gender, duration, and severity information
3. **Get Analysis**: Receive AI-generated educational information about possible conditions
4. **Review Recommendations**: Read suggested next steps and safety information
5. **View History**: Access previous analyses in the History section

## Safety Features

- **Crisis Detection**: Automatically detects mentions of self-harm or suicide and provides emergency resources
- **Rate Limiting**: Prevents API abuse with request throttling
- **Input Validation**: Comprehensive validation of user inputs
- **Medical Disclaimers**: Clear warnings about the educational nature of the content
- **Emergency Resources**: Direct links to crisis helplines and emergency services

## Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Environment Variables

**Backend (.env):**
```
OPENAI_API_KEY=your_openai_api_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Quick Start for GitHub Pages Deployment

### Prerequisites
- GitHub account
- Git installed locally
- Node.js (v16 or higher)

### Step-by-Step Deployment

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/healthcare-symptom-checker.git
   cd healthcare-symptom-checker
   ```

2. **Update configuration files** (Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username):
   - `frontend/package.json` → `homepage` field
   - `frontend/public/index.html` → `og:url` meta tag
   - `README.md` → Live demo links

3. **Deploy using the automated script**:
   ```bash
   ./deploy-github-pages.sh
   ```

4. **Enable GitHub Pages**:
   - Go to your GitHub repository
   - Settings → Pages
   - Select `gh-pages` branch as source
   - Save

5. **Access your live application**:
   Your site will be available at: `https://YOUR_GITHUB_USERNAME.github.io/healthcare-symptom-checker`

### Manual Deployment (Alternative)
```bash
cd frontend
npm install
npm run build
npm run deploy
```

## 🚀 Deployment

### GitHub Pages Deployment (Frontend Only)

1. **Fork or Clone this repository**
2. **Update the homepage URL** in `frontend/package.json`:
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/healthcare-symptom-checker"
   ```

3. **Install dependencies and deploy**:
   ```bash
   cd frontend
   npm install
   npm run deploy
   ```

4. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Select `gh-pages` branch as source
   - Your site will be available at: `https://YOUR_GITHUB_USERNAME.github.io/healthcare-symptom-checker`

### Full-Stack Deployment Options

**Frontend (GitHub Pages)**: Static React app
**Backend Options**:
- **Vercel**: Use the included `vercel.json` configuration
- **Heroku**: Use the included `Procfile`
- **Railway**: Simple Node.js deployment
- **Render**: Free tier available

### Vercel Deployment (Full-Stack)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy both frontend and backend
vercel
```

### Local Development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section below
2. Review the API documentation
3. Create an issue in the repository

## Troubleshooting

### Common Issues

1. **"Module not found" errors**: Run `npm install` in both directories
2. **API connection issues**: Ensure backend is running on port 5000
3. **OpenAI API errors**: Check your API key and quota
4. **CORS errors**: Verify FRONTEND_URL in backend environment

### Error Codes
- `400` - Bad Request (validation errors)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error (server issues)

## Acknowledgments

- OpenAI for providing the AI analysis capabilities
- React team for the excellent frontend framework
- Express.js community for the robust backend framework

---

**Remember: This is an educational tool. Always consult healthcare professionals for medical advice.**
