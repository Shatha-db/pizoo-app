# Pizoo - AI-Powered Dating Platform

<div align="center">
  <h3>Find Meaningful Connections with AI</h3>
  <p>A modern, full-stack dating application with advanced matching algorithms</p>
</div>

---

## 🌟 Overview

Pizoo is a comprehensive dating platform that combines cutting-edge AI technology with intuitive design to help people find meaningful connections. Built with modern web technologies, it offers a seamless experience across devices.

### Key Features

- 🤖 **AI-Powered Matching** - Smart algorithm that learns your preferences
- 💬 **Real-Time Messaging** - Instant chat with WebSocket support
- 📹 **Video & Voice Calls** - Built-in LiveKit integration
- 🌍 **Multi-Language** - Support for 9 languages with RTL support
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔒 **Secure & Private** - End-to-end encryption and privacy controls
- ⭐ **Premium Features** - Advanced filters and unlimited likes
- 📍 **Location-Based** - Find matches near you

---

## 📂 Project Structure

```
pizoo-app/
├── backend/              # FastAPI backend
│   ├── server.py        # Main application
│   ├── requirements.txt # Python dependencies
│   └── services/        # Auth, Images, SMS, LiveKit
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── pages/      # Application pages
│   │   ├── components/ # Reusable components
│   │   ├── hooks/      # Custom React hooks
│   │   └── utils/      # Utility functions
│   ├── public/
│   └── package.json
│
├── marketing-website/   # Marketing landing page
│   ├── src/
│   └── public/
│
└── README.md           # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and Yarn
- **Python** 3.9+
- **MongoDB** 5.0+

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Setup

```bash
cd frontend
yarn install
cp .env.example .env
# Edit .env with backend URL
yarn start
```

---

## 🔧 Tech Stack

### Frontend
- **Framework:** React 18
- **Routing:** React Router v7
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Context API
- **Internationalization:** i18next
- **Real-time:** Socket.io client
- **Video Calls:** LiveKit React SDK

### Backend
- **Framework:** FastAPI (Python)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Image Storage:** Cloudinary
- **Video/Voice:** LiveKit
- **SMS/OTP:** Telnyx / Twilio
- **Real-time:** WebSocket

---

## 🌍 Supported Languages

- English (en)
- Arabic (ar) - with RTL support
- German (de)
- French (fr)
- Spanish (es)
- Italian (it)
- Portuguese (pt-BR)
- Russian (ru)
- Turkish (tr)

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Database
MONGO_URL=mongodb://localhost:27017/pizoo

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256

# Cloudinary (Images)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# LiveKit (Video/Voice)
LIVEKIT_API_KEY=your-key
LIVEKIT_API_SECRET=your-secret
LIVEKIT_URL=wss://your-instance.livekit.cloud

# SMS Service (Telnyx or Twilio)
TELNYX_API_KEY=your-key
# OR
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
```

### Frontend (.env)

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 📱 Features Breakdown

### Core Features
- ✅ User registration and authentication
- ✅ Profile creation with photo upload
- ✅ Swipe-based discovery
- ✅ Advanced matching algorithm
- ✅ Real-time chat messaging
- ✅ Video and voice calls
- ✅ Location-based search
- ✅ Likes and matches system
- ✅ User blocking and reporting
- ✅ Profile verification

### Premium Features
- 💎 Unlimited likes
- 💎 See who liked you
- 💎 Advanced filters (age, distance, interests)
- 💎 Read receipts
- 💎 Rewind last swipe
- 💎 Boost profile visibility

### Safety Features
- 🛡️ Photo verification
- 🛡️ Report and block users
- 🛡️ Privacy controls
- 🛡️ Safety tips and guidelines
- 🛡️ AI-powered content moderation

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

### Backend (Render / Railway / DigitalOcean)

**Using Render:**
1. Create new Web Service
2. Connect repository
3. Build: `pip install -r requirements.txt`
4. Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add environment variables

**Using Docker:**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "server:app", "--host", "0.0.0.0"]
```

---

## 🧪 Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
yarn test
```

---

## 📊 Database Schema

### Collections

**users:**
- Basic user information
- Authentication credentials
- Profile settings

**profiles:**
- Display information
- Photos and media
- Interests and bio

**matches:**
- Mutual likes
- Match timestamp

**messages:**
- Chat messages
- Media attachments
- Read status

**swipes:**
- User interactions
- Like/pass history

---

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Input validation
- XSS protection
- HTTPS enforcement
- Secure cookie handling

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

Proprietary - All rights reserved © 2025 Pizoo

---

## 📞 Support

- **Email:** hello@pizoo.ch
- **Website:** https://pizoo.ch

---

## 🙏 Acknowledgments

- React Team
- FastAPI Team
- shadcn/ui
- LiveKit
- Cloudinary
- MongoDB

---

<div align="center">
  <p>Made with ❤️ by the Pizoo Team</p>
  <p>Helping people find meaningful connections</p>
</div>
