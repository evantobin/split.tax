# Multi-State Tax Calculator

A modern, professional web application for calculating state tax allocation when working across multiple states throughout the year. Perfect for remote workers, snowbirds, travelers, and anyone with multi-state tax obligations.

## 🌐 Live Application

**🚀 [Try it now at split.tax](https://split.tax)**

The application is deployed and ready to use in production. No installation required - simply visit the link above to start calculating your multi-state tax allocation.

![Multi-State Tax Calculator](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Live Site](https://img.shields.io/badge/Live-split.tax-blue)

## 🎯 Who Needs This Tool?

- **Remote Workers**: Digital nomads and remote employees working from different states
- **Snowbirds**: Retirees and professionals who split time between seasonal residences
- **Business Travelers**: Consultants and professionals with extended travel assignments
- **Temporary Residents**: Contract workers, interns, or anyone with temporary state residency
- **Multi-State Employees**: Workers whose job requires presence in multiple states

## ✨ Features

### 🗓️ Interactive Calendar-Based Pay Periods
- **Google Calendar-style Interface**: Intuitive month navigation and visual period management
- **Weekday-Only View**: Shows only Monday-Friday within visiting dates
- **Drag & Drop**: Create pay periods by dragging across empty days
- **Click to Edit**: Click colored days to edit gross taxable amounts
- **Color-Coded Periods**: Each pay period has a unique visual identifier
- **Semi-Monthly Generation**: Automatic 1st-15th and 16th-last day periods

### 🏛️ Advanced State Tax Management
- **Primary State Settings**: Configure your main state of residence
- **Multi-State Support**: Track days worked in different states
- **Tax Settings**: Customizable tax rates and settings per state
- **Automatic Calculations**: Proper tax allocation based on work days

### 📊 Professional Reporting
- **Detailed Results**: Comprehensive breakdown of tax allocation
- **Pay Period Analysis**: Individual period calculations and summaries
- **Export Ready**: Professional reports for tax filing and record keeping

### 🔗 Google Calendar Integration
- **Automatic Import**: Import work location events from Google Calendar
- **Multi-Calendar Support**: Scan all your calendars for tax events
- **Smart Parsing**: Recognizes `[TAX] STATE` format events
- **Seamless Sync**: OAuth 2.0 integration for secure access

### 🎨 Modern User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: System preference detection with manual toggle
- **Toast Notifications**: Contextual feedback for user actions
- **Sticky Header**: Always-accessible navigation and controls
- **Loading States**: Professional loading indicators and error handling

### 🚀 Advanced Technical Features
- **State Management**: Zustand-powered centralized state management
- **Local Storage**: Automatic data persistence between sessions
- **Real-time Updates**: Live calculation updates as you make changes
- **Type Safety**: Full TypeScript implementation
- **Modern Architecture**: React 18 with latest best practices

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Integration**: Google Calendar API
- **Storage**: Browser LocalStorage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser
- (Optional) Google account for calendar integration

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/multi-state-tax-calculator.git
   cd multi-state-tax-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Google Calendar Integration (Optional)**
   - Create a Google Cloud Console project
   - Enable the Google Calendar API
   - Create OAuth 2.0 credentials
   - Update `src/config.ts` with your client ID

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📋 Usage Guide

### 1. Global Settings
- Set your **primary state** of residence
- Enter your **visiting dates** (work period)
- Configure **tax settings** if needed

### 2. Other States
- Add states where you worked temporarily
- Use **Google Calendar import** to automatically populate work days
- Or manually add dates for each state

### 3. Bonus Income
- Add any bonus income received during the period
- Specify the state where each bonus was earned

### 4. Pay Periods
- Use the **interactive calendar** to create pay periods
- **Drag across days** to create new periods
- **Click periods** to edit gross taxable amounts
- Use **auto-generation** for standard biweekly or semi-monthly periods

### 5. Calculate Results
- Click **"Calculate Allocation"** to generate results
- Review detailed breakdowns for each pay period
- Export results for tax filing

## 🔧 Configuration

### Google Calendar Setup

1. **Google Cloud Console**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google Calendar API

2. **OAuth 2.0 Setup**:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Authorized origins: `http://localhost:5173` (for development)

3. **Update Configuration**:
   ```typescript
   // src/config.ts
   export const CLIENT_ID = 'your-google-client-id.googleusercontent.com';
   ```

### Tax Settings

Customize tax rates and settings in the application:
- Access via the gear icon in Global Settings
- Modify rates per state as needed
- Settings are automatically saved locally

## 🎯 Calendar Event Format

For Google Calendar integration, use this format in your event titles:
```
[TAX] STATE_CODE - Description
```

Examples:
- `[TAX] CA - Working from San Francisco`
- `[TAX] NY - Client meeting in New York`
- `[TAX] FL - Remote work from Miami`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Application header
│   ├── PayPeriodCalendar.tsx  # Interactive calendar
│   ├── ResultsPanel.tsx # Results display
│   └── ...
├── store.ts             # Zustand state management
├── types.ts             # TypeScript definitions
├── utils.ts             # Utility functions
├── config.ts            # Configuration settings
└── App.tsx              # Main application component
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** if applicable
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure responsive design principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Disclaimer

**This tool is for informational purposes only and does not constitute tax advice.** Always consult with a qualified tax professional for your specific situation. State tax laws vary and change frequently.

## 🆘 Support

- **Email**: support@split.tax

## 🗺️ Roadmap

- [ ] Additional state tax rule implementations
- [ ] Export to popular tax software formats
- [ ] Mobile app development
- [ ] Advanced reporting features
- [ ] Multi-year support
- [ ] Integration with payroll systems

## 🎉 Acknowledgments

- Built with modern React and TypeScript
- Styled with Tailwind CSS
- Icons by Lucide
- State management by Zustand
- Calendar integration with Google APIs

---

Made with ❤️ for remote workers, travelers, and multi-state professionals.
