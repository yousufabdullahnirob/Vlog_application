# 🚀 Full Stack Blog Application

A modern, responsive blog application built with **React** and **Django REST Framework**. This project demonstrates full CRUD capabilities, secure JWT authentication, and a polished UI with animations and instant feedback.

## 🌟 Key Features

- **Authentication**: Secure Login & Registration using JWT (JSON Web Tokens).
- **Create & Manage**: Users can write, edit, and delete their own blog posts.
- **Interactive UI**:
  - **Animations**: Smooth page transitions using `framer-motion`.
  - **Notifications**: Beautiful toast notifications with `react-hot-toast`.
  - **Responsive Design**: Mobile-friendly layout built with `Tailwind CSS`.
- **Backend API**: Robust REST API powered by Django & SQLite.

## 🛠️ Tech Stack

### Frontend

- **React (Vite)**: Fast client-side development.
- **Tailwind CSS**: Utility-first styling for specific designs.
- **Framer Motion**: For production-ready animations.
- **Axios**: Efficient API requests with interception logic.
- **React Router 6**: Client-side routing for SPA feel.

### Backend

- **Django REST Framework**: Powerful toolkit for building web APIs.
- **SQLite**: Lightweight database for development.
- **Corsheaders**: Handling cross-origin requests securely.

## 🏃‍♂️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v16+)
- Python (v3.10+)

### 1. Backend Setup

```bash
cd backend
# Activate Virtual Environment (Windows)
venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run request migrations
python manage.py migrate
# Start the server
python manage.py runserver
```

_The Backend will run on `http://127.0.0.1:8000`_

### 2. Frontend Setup

```bash
cd frontend
# Install dependencies
npm install
# Start the dev server
npm run dev
```

_The Frontend will run on `http://localhost:5173`_

## 🧪 Testing

I have included scripts to verify the backend logic:

- `debug_500_v3.py`: Tests the post creation flow.
- `test_edge_cases.py`: Checks for error handling on duplicate inputs.

## 👨‍💻 Author

Built as a portfolio project to demonstrate Full Stack proficiency.
