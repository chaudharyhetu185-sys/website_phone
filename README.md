# ⚡ NEXUS // DUALITY STUDIO — Full-Stack Creative Web Agency Website

A production-quality, modern, responsive full-stack web application designed for a creative web development studio founded by **TWO FRIENDS** (Alex & Liam).

This project features a 6-page visual storytelling experience with step-by-step navigation, an interactive project showcase with category filtering, founder profiles, service offerings, client reviews, working contact form, REST API with Express & Node.js, MongoDB database integration, and seamless offline/dev fallback support.
   
---

## 🌟 Key Features

- **6-Page Visual Storytelling Experience**: Guided page-by-page flow ("NEXT" / "PREVIOUS" action buttons, floating bottom progress bar, keyboard shortcut navigation).
- **Dual Navigation Mode**: Toggle between **Story Mode** (guided step-by-step) and **Scroll Mode** (free continuous scroll).
- **Meet the Founders (2 Friends)**: Side-by-side desktop profiles with bios, skills, social links, and direct contact hooks.
- **Service Offerings**: 8 interactive service cards with micro-interactions and custom project request drawers.
- **Interactive Portfolio**: Filterable project showcase (*All*, *Websites*, *UI/UX*, *Creative*, *Custom Solutions*) with live demo links, source repo links, and modal case study previews.
- **Client Testimonials**: Review cards and carousel with star ratings and sample demonstration tags.
- **Working Contact Form**: Interactive form with input validation, Express endpoint `POST /api/contact`, MongoDB persistence, loading feedback, and celebratory confetti.
- **Zero-Crash Dev Fallback**: Works immediately out-of-the-box even if MongoDB is offline or not installed locally.
- **Centralized Configuration**: Founder photos, names, bios, social links, and brand details can be updated from a single file (`client/src/config/foundersConfig.js` & `brandConfig.js`).

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v3 & Custom Glassmorphism System
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Validation**: Server-side validation middleware
- **Security**: CORS, Environment variable isolation

---

## 📁 Project Folder Structure

```
d:\website\
├── package.json               # Root orchestrator script (concurrently)
├── README.md                  # Comprehensive Documentation
├── .env.example               # Root environment variables template
│
├── server\                    # Express REST API Backend
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── src\
│       ├── server.js          # Express entry point & listener
│       ├── app.js             # Middleware, routes, CORS setup
│       ├── config\
│       │   └── db.js          # MongoDB connection helper with dev fallback
│       ├── models\
│       │   ├── Founder.js     # Mongoose Schema
│       │   ├── Project.js     # Mongoose Schema
│       │   ├── Review.js      # Mongoose Schema
│       │   └── ContactMessage.js
│       ├── controllers\
│       │   ├── founderController.js
│       │   ├── projectController.js
│       │   ├── reviewController.js
│       │   └── contactController.js
│       ├── routes\
│       │   ├── founderRoutes.js
│       │   ├── projectRoutes.js
│       │   ├── reviewRoutes.js
│       │   └── contactRoutes.js
│       ├── data\
│       │   └── seedData.js    # Seed & Fallback Data
│       └── scripts\
│           └── seed.js        # DB Seeder Script
│
└── client\                    # Vite + React Frontend
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    └── src\
        ├── main.jsx           # React Root Entry Point
        ├── App.jsx            # Main Story Controller & Page Layout
        ├── index.css          # Tailwind & Custom Glassmorphism styles
        ├── config\
        │   ├── brandConfig.js    # Central Brand Name & Taglines
        │   └── foundersConfig.js # Central Founder Profiles & Socials
        ├── data\              # Static Development Fallbacks
        ├── services\
        │   └── api.js         # API Client with auto-fallback
        ├── components\        # Reusable UI components
        └── sections\          # 6 Story Pages / Sections
```

---

## 🚀 Quick Start Guide

### Step 1: Install Dependencies
Run from the root directory (`d:\website`):
```bash
npm run install:all
```
*Or install manually:*
```bash
# Install root
npm install

# Install server
cd server && npm install && cd ..

# Install client
cd client && npm install && cd ..
```

---

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env` in the `server` directory:
```bash
# Windows PowerShell
copy server\.env.example server\.env
```
2. Default environment values:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/two_friends_studio
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### Step 3: Run the Application

You can launch both the **Backend API** and **Frontend Vite Server** simultaneously with a single command from the root directory:

```bash
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🗄️ Database & Seed Data

### Setting Up MongoDB (Optional)
If you have MongoDB installed locally or use a MongoDB Atlas cluster, update `MONGODB_URI` in `server/.env`.

To seed demo data into your MongoDB database:
```bash
npm run seed
```

*Note: If MongoDB is offline, the website automatically loads in-memory fallback data so you can immediately preview and test all features without configuration errors.*

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/founders` | Fetch founder profiles |
| `GET` | `/api/projects` | Fetch portfolio projects (supports `?category=Websites`) |
| `GET` | `/api/projects/:id` | Fetch single project by ID |
| `POST` | `/api/projects` | Add a new project |
| `PUT` | `/api/projects/:id` | Update existing project |
| `DELETE` | `/api/projects/:id` | Remove project |
| `GET` | `/api/reviews` | Fetch client testimonials |
| `POST` | `/api/reviews` | Submit client testimonial |
| `POST` | `/api/contact` | Submit contact form inquiry |
| `GET` | `/api/health` | System health check |

---

## ✏️ Customization & Editing

### How to Replace Founder Photos, Names & Social Links
Open [`client/src/config/foundersConfig.js`](file:///d:/website/client/src/config/foundersConfig.js) and update the values:
```javascript
export const FOUNDERS_DATA = [
  {
    id: "founder-1",
    name: "Your Name",
    role: "Co-Founder & Role",
    bio: "Your short bio description...",
    photo: "https://your-image-url.jpg",
    skills: ["React", "UI/UX", "Tailwind"],
    socials: {
      github: "https://github.com/yourhandle",
      linkedin: "https://linkedin.com/in/yourhandle",
      instagram: "https://instagram.com/yourhandle",
      email: "you@example.com"
    }
  }
];
```

### How to Change Brand Name & Taglines
Open [`client/src/config/brandConfig.js`](file:///d:/website/client/src/config/brandConfig.js) to update brand name, email, location, and stats.

---

## 🌐 Production Deployment

### Frontend (Vercel / Netlify)
1. 
uild:client
   ```
2. Deploy the `client/dist` directory to Vercel or Netlify. Set environment variable `VITE_API_BASE_URL` to your production backend URL.

### Backend (Render / Railway / Heroku)
1. Deploy the `server` directory.
2. Set environment variables: `NODE_ENV=production`, `PORT=5000`, `MONGODB_URI=your_mongodb_atlas_connection_string`.

---

## 📜 License
ISC License — Created for Two Friends Studio.
#   w e b s i t e _ p h o n e  
 