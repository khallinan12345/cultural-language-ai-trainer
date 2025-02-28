# Cultural and Language AI Trainer

This React application helps technology trainees in Gambia improve their cultural and language fit when working with US clients. The application simulates conversations with US clients and provides cultural and communication feedback.

## Features

- Simulated conversations with US clients on technical topics
- Real-time cultural and communication feedback
- Multiple technical scenarios (React, JavaScript, Python, .NET)
- Easy-to-use interface

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/cultural-language-ai-trainer.git
cd cultural-language-ai-trainer
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Add your image file:
   - Place your "Gambian trainee.png" image in the `public` directory
   - Or place it in `src/assets` directory if you're importing it directly

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
cultural-language-ai-trainer/
├── public/
│   └── Gambian trainee.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CulturalTrainer.jsx
│   │   └── CulturalTrainer.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Adding New Scenarios

To add new scenarios, update the `scenarios` object in `CulturalTrainer.jsx`:

```javascript
const scenarios = {
  'your-new-scenario': {
    intro: 'Introduction message from the US client',
    responses: [
      "Possible client response 1",
      "Possible client response 2",
      // Add more possible responses
    ]
  },
  // Other existing scenarios...
};
```

Then add the new option to the select element.

### Enhancing the Cultural Advisor

The current implementation uses a simple rule-based evaluation function. To integrate with a more sophisticated AI model:

1. Modify the `evaluateResponse` function in `CulturalTrainer.jsx`
2. Connect to your preferred AI service or model

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with production-ready files that can be served by any static web server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to the technology training program in Gambia
- All contributors to this project
