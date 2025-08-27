# AnalyticsAI

A modern web application that provides an AI-powered assistant for integrating analytics into iOS applications. The application features a split-screen interface with a mobile emulator for IPA file uploads and an intelligent chat assistant for analytics integration guidance.

## Features

### 🎯 Core Functionality
- **Mobile Emulator**: Upload and analyze iOS IPA files
- **AI Chat Assistant**: Intelligent guidance for analytics integration
- **Real-time Analysis**: Simulated app structure analysis
- **Interactive UI**: Modern, responsive design with animations

### 📱 Mobile Emulator
- Drag-and-drop IPA file upload
- Realistic iPhone frame design
- App information display (bundle ID, version, size)
- Analysis progress indicators
- File validation and error handling

### 🤖 AI Chat Assistant
- Natural language conversation interface
- Context-aware responses based on uploaded app
- Quick action buttons for common tasks
- Message history with timestamps
- Copy-to-clipboard functionality
- Typing indicators and animations

### 🎨 User Experience
- Beautiful, modern UI with Tailwind CSS
- Smooth animations using Framer Motion
- Responsive design for all screen sizes
- Intuitive drag-and-drop interface
- Real-time feedback and status updates

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AnalyticsAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Usage

### Uploading an IPA File
1. Drag and drop your `.ipa` file onto the mobile emulator
2. Wait for the analysis to complete
3. Review the extracted app information
4. Start chatting with the AI assistant

### Chatting with the AI Assistant
1. Type your questions about analytics integration
2. Use quick action buttons for common tasks
3. Copy helpful responses to your clipboard
4. Get personalized recommendations based on your app

### Supported Analytics Platforms
- Firebase Analytics
- Mixpanel
- Amplitude
- Crash reporting
- Performance monitoring
- A/B testing setup

## Project Structure

```
AnalyticsAI/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Application header
│   │   ├── MobileEmulator.tsx  # IPA upload and mobile frame
│   │   └── ChatAssistant.tsx   # AI chat interface
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # Project documentation
```

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by modifying:
- `tailwind.config.js` - Theme configuration
- `src/index.css` - Custom CSS classes
- Component-specific styles in each component

### AI Responses
Currently, the AI assistant uses simulated responses. To integrate with a real AI service:
1. Replace the simulated responses in `App.tsx`
2. Add API calls to your preferred AI service
3. Handle loading states and error cases

### File Processing
The current implementation simulates IPA file analysis. To add real IPA processing:
1. Implement IPA file parsing logic
2. Extract real bundle information
3. Add more detailed app structure analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team. 