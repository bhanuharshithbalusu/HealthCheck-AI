<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Healthcare Symptom Checker Project Instructions

This is a full-stack healthcare symptom checker application with the following architecture:

## Project Structure
- **Backend**: Node.js/Express API with OpenAI integration
- **Frontend**: React application with modern UI
- **Database**: JSON file-based storage for query history

## Key Guidelines

### Medical Safety
- Always include appropriate medical disclaimers
- Implement crisis detection for self-harm mentions
- Emphasize educational purpose only
- Include emergency contact resources

### Code Style
- Use modern ES6+ syntax
- Implement proper error handling
- Follow REST API conventions
- Use React functional components with hooks

### Security
- Validate all user inputs
- Implement rate limiting
- Use CORS properly
- Sanitize data before processing

### UI/UX
- Maintain consistent styling with the gradient theme
- Ensure responsive design
- Use clear, accessible language
- Provide loading states and error messages

### API Integration
- Handle OpenAI API errors gracefully
- Implement fallback responses
- Use proper HTTP status codes
- Include comprehensive error messages

## Environment Variables
- Backend requires OPENAI_API_KEY
- Frontend uses REACT_APP_API_URL for backend connection
- All sensitive data should be in .env files

## Testing Considerations
- Test with various symptom inputs
- Verify crisis detection works
- Test API rate limiting
- Ensure proper error handling
