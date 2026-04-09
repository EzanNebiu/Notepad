# Notepad - Minimalist Shareable Online Notepad

A fast, minimalist, and shareable online notepad inspired by notepad.pw. Each note lives at its own unique URL and can be edited or shared instantly.

## Features

- 🚀 **Instant Note Creation** - Create notes with unique URLs
- 💾 **Auto-save** - Automatic saving with debounce, plus manual save option
- 📝 **Multiple Modes** - Raw text, Markdown preview, and Code editor
- 🔒 **Password Protection** - Optional password protection for sensitive notes
- 🔗 **Shareable Links** - Editable links and read-only share links
- 🎨 **Customization** - Spell check toggle, monospace font, light/dark mode
- 📊 **Note Stats** - Word count, character count, and last saved time
- 🔄 **Custom URLs** - Change note slugs to your preference
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Material UI (minimal usage)
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- TypeScript
- bcrypt (password hashing)
- nanoid (slug generation)

## Project Structure

```
notepad/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── app/           # App entry point
│   │   ├── components/    # Reusable components
│   │   │   ├── Editor/    # Editor components
│   │   │   ├── Layout/    # Layout components
│   │   │   ├── Toolbar/   # Toolbar components
│   │   │   ├── Footer/    # Footer component
│   │   │   ├── Modals/    # Dialog components
│   │   │   └── Shared/    # Shared components
│   │   ├── pages/         # Page components
│   │   ├── features/      # Feature-specific components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── constants/     # Constants
│   │   ├── styles/        # Global styles
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
├── server/                # Backend Node.js application
│   └── src/
│       ├── config/        # Configuration
│       ├── controllers/   # Route controllers
│       ├── routes/        # Express routes
│       ├── services/      # Business logic
│       ├── models/        # MongoDB models
│       ├── middleware/    # Express middleware
│       ├── utils/         # Utility functions
│       ├── validators/    # Input validators
│       └── types/         # TypeScript types
└── shared/                # Shared types and constants
    ├── types/             # Shared TypeScript types
    └── constants/         # Shared constants
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or remote)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd notepad
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:
   ```bash
   cp .env.example .env
   ```

   Update the values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/notepad
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

   Create a `.env` file in the `client` directory:
   ```bash
   cp .env.example .env
   ```

   Update the values:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**

   Make sure MongoDB is running locally or update the `MONGODB_URI` to point to your MongoDB instance.

6. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**

   Open your browser and navigate to `http://localhost:5173`

## Production Build

### Backend

```bash
cd server
npm run build
npm start
```

### Frontend

```bash
cd client
npm run build
npm run preview
```

## API Endpoints

### Notes

- `POST /api/notes` - Create a new note
- `GET /api/notes/:slug` - Get a note by slug
- `PATCH /api/notes/:slug` - Update a note
- `POST /api/notes/:slug/unlock` - Unlock a password-protected note
- `POST /api/notes/:slug/password` - Set password for a note
- `DELETE /api/notes/:slug/password` - Remove password from a note
- `POST /api/notes/:slug/change-slug` - Change note URL slug
- `GET /api/notes/:slug/share` - Get share information

## Key Features Explained

### Note Creation

When you visit a new URL slug (e.g., `/my-note`), a new note is automatically created if it doesn't exist. You can also generate random slugs for quick note creation.

### Auto-save

Notes auto-save after 1 second of inactivity (debounced). The save status indicator shows:
- **Saved** - All changes are saved
- **Saving** - Currently saving
- **Unsaved** - Changes pending
- **Error** - Save failed

### Password Protection

Notes can be password-protected. Passwords are hashed using bcrypt before storage. Password-protected notes require authentication to view or edit.

### Sharing

Each note has two tokens:
- **Editable Token** - Full edit access
- **Share Token** - Read-only access

Share the appropriate link based on desired access level.

### View Modes

- **Raw** - Plain text editing
- **Markdown** - Rendered markdown preview (sanitized HTML)
- **Code** - Monospace editor with language selection

## Security Features

- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting on API endpoints
- CSRF protection
- XSS protection via DOMPurify
- Secure token generation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Architecture Notes

### Frontend State Management

The app uses React hooks for state management, with custom hooks like `useNote` handling note-specific logic and auto-save functionality.

### Backend Design

The backend follows a clean architecture pattern with:
- Controllers handling HTTP requests
- Services containing business logic
- Models defining data structure
- Validators ensuring data integrity

### Database Schema

Notes are stored with the following key fields:
- slug (unique identifier)
- content (note text)
- mode (raw/markdown/code)
- tokens (editable and share)
- password protection
- settings (user preferences)
- timestamps

### Type Safety

Strong TypeScript typing throughout the codebase ensures type safety and better developer experience. Shared types between frontend and backend prevent inconsistencies.

## Performance Considerations

- Debounced auto-save prevents excessive API calls
- MongoDB indexing on frequently queried fields
- Lazy loading of components
- Optimized bundle size with tree-shaking

## Future Enhancements

Potential features for future development:
- User accounts for note management
- Note history/versioning
- Collaborative editing
- Export to various formats
- API rate limiting per user
- Note expiration dates
- Rich text editor mode
- Syntax highlighting for code mode

---

Built with ❤️ for simple, fast, shareable note-taking.
