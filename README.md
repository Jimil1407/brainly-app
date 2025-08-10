# 🧠 Second Brain - Your Digital Knowledge Hub

<div align="center">

![Second Brain Logo](frontend/public/brain-icon.svg)

**Organize, save, and share your digital knowledge with ease**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.2.10-000000?style=for-the-badge&logo=bun)](https://bun.sh/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-00C851?style=for-the-badge)](https://second-brain-app.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🚀 Live Demo](#-live-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [📁 Project Structure](#-project-structure)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ✨ Features

### 🎯 Core Functionality
- **🔗 Link Management**: Save and organize web links, tweets, videos, and documents
- **🏷️ Smart Tagging**: Categorize content with custom tags for easy discovery
- **🔍 Quick Search**: Find your saved content instantly
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🔐 Authentication & Security
- **🔒 Secure Authentication**: JWT-based user authentication
- **👤 User Profiles**: Personal content management
- **🔐 Password Protection**: Secure password handling

### 🌐 Sharing & Collaboration
- **🔗 Shareable Links**: Generate public links to share your content collections
- **📤 Bulk Sharing**: Share multiple items at once
- **🌍 Public Access**: Anyone can view shared content without registration

### 🎨 User Experience
- **⚡ Fast Performance**: Optimized with Vite and modern React patterns
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **📱 Mobile-First**: Responsive design that works on all devices
- **🔄 Real-time Updates**: Instant feedback and state management

---

## 🚀 Live Demo

**Try it out now!** 👉 [Second Brain App](https://second-brain-app.vercel.app)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bun** - Fast JavaScript runtime
- **TypeScript** - Type safety

### DevOps & Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **GitHub** - Version control

---

## 📸 Screenshots

<div align="center">

### 🏠 Dashboard
![Dashboard](https://via.placeholder.com/800x400/5244df/ffffff?text=Dashboard+View)

### 🔐 Authentication
![Login](https://via.placeholder.com/400x300/5244df/ffffff?text=Login+Form)

### ➕ Add Content
![Add Content](https://via.placeholder.com/400x300/5244df/ffffff?text=Add+Content+Modal)

### 📱 Mobile View
![Mobile](https://via.placeholder.com/300x600/5244df/ffffff?text=Mobile+View)

</div>

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Bun** (v1.2.10 or higher) - [Install Bun](https://bun.sh/)
- **MongoDB** - Local or cloud instance

### One-Command Setup
```bash
# Clone the repository
git clone https://github.com/Jimil1407/brainly-app.git
cd brainly-app

# Install dependencies and start both servers
npm run dev
```

This will start both frontend and backend servers automatically!

---

## 🔧 Installation

### 1. Clone the Repository 
    ```bash
    git clone https://github.com/Jimil1407/brainly-app.git
cd brainly-app
```

### 2. Backend Setup
```bash
cd backend
bun install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Start Development Servers

**Option A: Start Both Servers**
```bash
# From the root directory
npm run dev
```

**Option B: Start Separately**
```bash
# Terminal 1 - Backend
cd backend
bun run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 📁 Project Structure

```
brainly-app/
├── 📁 frontend/                 # React frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/      # React components
│   │   │   └── 📁 ui/          # UI components
│   │   ├── 📁 services/        # API services
│   │   └── 📁 main.tsx         # App entry point
│   ├── 📁 public/              # Static assets
│   └── package.json
├── 📁 backend/                  # Node.js backend API
│   ├── 📁 src/
│   │   ├── 📁 middleware/      # Express middleware
│   │   ├── 📁 schema/          # Database schemas
│   │   └── index.ts            # Server entry point
│   └── package.json
├── 📁 docs/                     # Documentation
└── README.md
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/second-brain

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:3000/api/v1
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/dist`
4. Add environment variables in Vercel dashboard

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `cd backend && bun install`
3. Set start command: `cd backend && bun run start`
4. Add environment variables in Render dashboard

### Environment Variables for Production
```env
# Frontend
VITE_API_URL=https://your-backend-url.onrender.com/api/v1

# Backend
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 1. Fork the Repository
```bash
git clone https://github.com/Jimil1407/brainly-app.git
cd brainly-app
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes
- Follow the existing code style
- Add tests for new features
- Update documentation

### 4. Commit and Push
```bash
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### 5. Create a Pull Request
- Describe your changes clearly
- Include screenshots if applicable
- Reference any related issues

### Development Guidelines
- **Code Style**: Use Prettier and ESLint
- **Commits**: Use conventional commit messages
- **Testing**: Write tests for new features
- **Documentation**: Update README for new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Bun Team** - For the fast JavaScript runtime
- **Vercel & Render** - For the hosting platforms

---

<div align="center">

**Made by [Jimil Digaswala]**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Jimil1407)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jimil-digaswala-b44973192/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/jimiltwt)

**⭐ Star this repository if you found it helpful!**

</div>
