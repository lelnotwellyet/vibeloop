# VibeLoop — Student Mentorship Platform

A social networking web app connecting junior students with senior mentors. Built with React + TypeScript.

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Login page |
| `/register` | Register page (Junior / Senior role selection) |
| `/feed` | Main feed with posts, trending topics, suggested mentors |
| `/chat` | Messaging UI |
| `/profile/:id` | User profile with banner, skills, posts |

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Install & Run

```bash
git clone <repo-url>
cd vibeloop
npm install
npm start
```

App runs at **http://localhost:3000**

---

## Connecting to Backend (MongoDB + Express)

All the UI is currently using mock/static data. To wire it up to a real Express + MongoDB backend, follow these steps.

### 1. Install Axios

```bash
npm install axios
```

### 2. Create an API config file

Create `src/api.ts`:

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // your Express server URL
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

### 3. API endpoints your Express server should expose

#### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login → returns JWT token + user |
| POST | `/api/auth/register` | Register new user |

#### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update profile |
| GET | `/api/users/mentors` | Get suggested mentors |

#### Posts / Feed
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (feed) |
| POST | `/api/posts` | Create a new post |
| PUT | `/api/posts/:id/like` | Like / unlike a post |

#### Messages / Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/conversations` | Get all conversations |
| GET | `/api/conversations/:id/messages` | Get messages in a conversation |
| POST | `/api/conversations/:id/messages` | Send a message |

---

### 4. Example — replace mock login (`src/pages/Login.tsx`)

```ts
import api from '../api';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', res.data.token);
  navigate('/feed');
};
```

### 5. Example — replace mock feed posts (`src/pages/Feed.tsx`)

```ts
import { useEffect, useState } from 'react';
import api from '../api';

const [posts, setPosts] = useState([]);

useEffect(() => {
  api.get('/posts').then(res => setPosts(res.data));
}, []);
```

### 6. Recommended MongoDB Schema (Mongoose)

```js
// User
{
  name: String,
  email: String,
  passwordHash: String,
  role: { type: String, enum: ['Junior', 'Senior'] },
  skills: [String],
  bio: String,
  location: String,
  connections: [{ type: ObjectId, ref: 'User' }],
  mentees: [{ type: ObjectId, ref: 'User' }],
  createdAt: Date,
}

// Post
{
  author: { type: ObjectId, ref: 'User' },
  content: String,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{ body: String, author: ObjectId, createdAt: Date }],
  createdAt: Date,
}

// Message
{
  conversation: { type: ObjectId, ref: 'Conversation' },
  sender: { type: ObjectId, ref: 'User' },
  text: String,
  createdAt: Date,
}

// Conversation
{
  participants: [{ type: ObjectId, ref: 'User' }],
  lastMessage: String,
  updatedAt: Date,
}
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript |
| Routing | React Router v6 |
| Icons | Lucide React |
| Styling | Plain CSS (no framework) |
| Backend (to connect) | Express.js |
| Database (to connect) | MongoDB + Mongoose |
| Auth (to connect) | JWT |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx       # Top navigation bar
│   └── Badge.tsx        # Senior / Junior badge pill
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Feed.tsx
│   ├── Chat.tsx
│   └── Profile.tsx
├── App.tsx              # Routes setup
└── index.css            # Global styles
```
