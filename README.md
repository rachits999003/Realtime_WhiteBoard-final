# 🎨 DrawEase – Real-time Collaborative Whiteboard

A modern, feature-rich real-time collaborative whiteboard application with drawing tools, sticky notes, dark mode, image uploads, and multi-user synchronization. Built with Node.js, Express, and Socket.IO v4.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-orange.svg)](https://socket.io/)

## 🚀 Live Demo

- 🔗 **Frontend**: [GitHub Pages](https://csjayzz.github.io/Realtime_WhiteBoard-final-with-dark-mode/)
- 🔌 **Backend**: [Render](https://drawease.onrender.com)

> ⚠️ **Note**: The Render backend may take a few seconds to wake up from sleep mode.

## ✨ Features

### 🖌️ Drawing Tools
- **Pencil Tool** with customizable size and colors
- **Eraser Tool** with adjustable size
- **Color Palette** with preset colors
- **Line Width Control** (5-30px)
- Smooth drawing with anti-aliasing

### 🎯 Canvas Features
- **Clear Canvas** with confirmation dialog
- **Undo/Redo** functionality with stack management
- **Download** canvas as image
- **Responsive Canvas** that adapts to window size

### 📝 Collaboration
- **Real-time Multi-user Sync** via Socket.IO
- **Sticky Notes** for annotations
- **Image Upload** and sharing
- **Live Drawing Sync** across all connected users

### 🎨 UI/UX
- **Dark Mode** toggle with localStorage persistence
- **Collapsible Toolbar** for more canvas space
- **Mobile Touch Support** for drawing on tablets/phones
- **Responsive Design** with media queries

## 🛠️ Tech Stack

### Frontend
- **HTML5** Canvas API
- **CSS3** with custom properties and animations
- **Vanilla JavaScript** (ES6+)
- **Socket.IO Client** v4.7

### Backend
- **Node.js** (v14+)
- **Express** v4.21 - Web server
- **Socket.IO** v4.7 - Real-time communication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### DevOps
- **GitHub Pages** - Frontend hosting
- **Render** - Backend hosting
- **Git** - Version control

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rachits999003/Realtime_WhiteBoard-final.git
   cd Realtime_WhiteBoard-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   SOCKET_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3000`

5. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Open multiple tabs to test real-time collaboration

### Production Build

```bash
npm start
```

## 📁 Project Structure

```
Realtime_WhiteBoard-final/
├── server/
│   ├── app.js              # Express server & Socket.IO configuration
│   └── config.js           # Environment configuration
├── public/
│   ├── index.html          # Main HTML file
│   ├── css/                # Stylesheets
│   │   ├── style.css       # Main styles
│   │   ├── theme.css       # Dark mode styles
│   │   ├── sticky.css      # Sticky notes styles
│   │   ├── image.css       # Image upload styles
│   │   ├── hamburger.css   # Menu styles
│   │   └── queries.css     # Media queries
│   ├── js/                 # JavaScript modules
│   │   ├── draw.js         # Drawing functionality
│   │   ├── tool.js         # Tool management
│   │   ├── sticky.js       # Sticky notes
│   │   ├── image.js        # Image uploads
│   │   ├── receiver.js     # Socket event handlers
│   │   ├── socket-manager.js # Centralized socket management
│   │   └── utilities/
│   │       └── common.js   # Shared utilities
│   ├── NewIcons/           # Icon assets
│   └── assets/             # Additional assets
├── .env                    # Environment variables (git-ignored)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies & scripts
└── README.md               # Documentation
```

## 🎮 Usage

### Drawing
1. Select the **Pencil** tool from the toolbar
2. Choose a color from the palette
3. Adjust the line width using the slider
4. Click and drag on the canvas to draw

### Eraser
1. Select the **Eraser** tool
2. Adjust the eraser size
3. Click and drag to erase

### Sticky Notes
1. Click the **Sticky Note** icon
2. A draggable note appears on the canvas
3. Type your text
4. Close or minimize as needed

### Image Upload
1. Click the **Photo** icon
2. Select an image from your device
3. The image appears on the canvas
4. Drag to reposition

### Clear Canvas
1. Click the **Clear** icon (trash can)
2. Confirm the action
3. Canvas is cleared for all users

## 🔒 Security Features

- **Input Validation** on all socket events
- **CORS Configuration** for cross-origin requests
- **Tool Whitelist** validation
- **Size & Color Constraints** to prevent abuse
- **Environment-aware CORS** (strict in production)

## 🚀 Deployment

### Frontend (GitHub Pages)
1. Build your frontend assets
2. Push to the `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Backend (Render/Heroku)
1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables:
   - `PORT` (auto-set by platform)
   - `NODE_ENV=production`
   - `ALLOWED_ORIGINS` (your frontend URLs)
4. Deploy from main branch

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🐛 Known Issues

- Render backend may experience cold starts (10-15 seconds)
- Large image uploads may cause performance issues
- Undo/Redo doesn't sync across users (by design)


## 👥 Credits

**Original Author**: Jayesh Jagtap - [GitHub](https://github.com/csjayzz) • [LinkedIn](https://www.linkedin.com/in/jayesh-jagtap-63a135263/)


## 🙏 Acknowledgments

- Socket.IO for real-time communication
- Express.js community
- All contributors and testers

---

Made with ❤️ for collaborative creativity
