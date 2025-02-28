# Setup Instructions for Cultural and Language AI Trainer

Follow these step-by-step instructions to set up the Cultural and Language AI Trainer React application.

## 1. Create a New Vite React Project

```bash
# Create a new Vite React project
npm create vite@latest cultural-language-ai-trainer -- --template react

# Navigate to the project directory
cd cultural-language-ai-trainer
```

## 2. Install Dependencies

```bash
# Install the required dependencies
npm install
```

## 3. Set Up the Project Structure

Create the following directory structure:

```
src/
├── assets/         # Place your "Gambian trainee.png" image here
├── components/     # For the CulturalTrainer component
```

```bash
# Create the necessary directories
mkdir -p src/assets src/components
```

## 4. Add the Image File

Place your "Gambian trainee.png" image in the assets directory:

```bash
# Copy your image to the assets directory
# Either do this manually or use a command like:
cp /path/to/your/Gambian\ trainee.png src/assets/
```

## 5. Create the Component Files

Create the following files with the content provided in the other artifacts:

1. `src/components/CulturalTrainer.jsx` - The main component
2. `src/components/CulturalTrainer.css` - Styles for the component
3. `src/App.jsx` - The root component
4. `src/App.css` - Root styles
5. `src/main.jsx` - Entry point (should already exist)
6. `src/index.css` - Global styles (should already exist)

## 6. Update package.json

Your `package.json` should look similar to the one provided. The key dependencies are:

- react
- react-dom

And development dependencies:

- vite
- @vitejs/plugin-react
- eslint and related plugins

## 7. Run the Development Server

```bash
# Start the development server
npm run dev
```

This will start the development server. Open your browser and navigate to `http://localhost:5173` to see the application running.

## 8. Building for Production

When you're ready to deploy:

```bash
# Build for production
npm run build
```

This creates a `dist` directory with optimized production files.

## 9. Customization

### Modifying Scenarios

To add or modify the technical scenarios, edit the `scenarios` object in `CulturalTrainer.jsx`.

### Enhancing the AI

To connect with more sophisticated AI models:

1. Modify the `evaluateResponse` function in `CulturalTrainer.jsx`
2. Add API calls to your preferred AI service (like OpenAI, Anthropic, etc.)

### Adding More Features

Consider adding:
- User authentication
- Progress tracking
- More sophisticated feedback mechanisms
- Real-world case studies

## 10. GitHub Repository

To publish to GitHub:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Cultural and Language AI Trainer"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/cultural-language-ai-trainer.git

# Push to GitHub
git push -u origin main
```

Make sure to update your GitHub profile and add a proper description, README, and license to make it accessible to the world.

## Troubleshooting

### Common Issues:

1. **Image not displaying**: Make sure the image path is correct. If importing directly, use:
   ```javascript
   import gambianTraineeImage from '../assets/Gambian trainee.png';
   ```

2. **Styling issues**: If styles aren't applying correctly, check for CSS module configuration or class name conflicts.

3. **Development server not starting**: Check for port conflicts or missing dependencies. Try:
   ```bash
   npm run dev -- --port 3000
   ```
