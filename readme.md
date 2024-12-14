# Quizer

Quizer is a **full-stack quiz application** built with **React** (frontend) and **Django REST Framework (DRF)** (backend). The app allows users to attempt quizzes, view results, and engage with interactive question-and-answer sessions. The goal of Quizer is to provide a smooth, modern, and user-friendly quiz experience.

---

## **🌐 Live Demo**
👉 [Visit Quizer](https://quizer-eight.vercel.app/)

---

## **📋 Table of Contents**
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)

---

## **✨ Features**

- User-friendly quiz interface
- Real-time score tracking
- View previous quiz attempts
- Mobile-responsive design
- Full-stack app with separate **frontend (React)** and **backend (Django DRF)**

---

## **🛠️ Tech Stack**

### **Frontend (React)**
- **React** for building the user interface
- **Axios** for making API requests
- **React Router** for handling client-side routing
- **Tailwind CSS** for responsive and modern UI design

### **Backend (Django DRF)**
- **Django** as the web framework
- **Django REST Framework (DRF)** for building the RESTful API
- **SQLite** as the database
- **Gunicorn** as the WSGI server
- **Whitenoise** for serving static files in production

---



## **🚀 Installation**

Follow these steps to set up the project locally.

### **1️⃣ Prerequisites**
- **Node.js** (v16 or higher) and **npm**
- **Python** (v3.8 or higher) and **pip**


### **2️⃣ Clone the Repository**
```bash
# Clone the repository
git clone https://github.com/Prathamdas3/quizer.git
cd quizer
```

### **3️⃣ Set up the Backend (Django DRF)**
```bash
cd .

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # For Linux/MacOS
venv\Scripts\activate   # For Windows

cd server
# Install dependencies
pip install -r requirements.txt

# Set up the database (ensure PostgreSQL is running)
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic

# Run the server
python manage.py runserver
```

### **4️⃣ Set up the Frontend (React)**
```bash
cd client

# Install dependencies
npm install

# Run the frontend development server
npm run dev
```

Now, visit **http://localhost:3000** for the React frontend and **http://localhost:8000** for the Django backend.

---

## **🔐 Environment Variables**

Create a `.env` file in the root directory and add the following variables:

### **Backend (.env file)**
```
FRONTEND_URL=http://localhost:3000
SECRET_KEY=
BACKEND_URL=
```

### **Frontend (.env file)**
```
VITE_BASE_URL=http://localhost:8000/api  # Change this in production
```

> **Note:** Never commit sensitive information like `SECRET_KEY` or `DATABASE_URL` to GitHub.

---

## **📘 Usage**

1. **Start the backend** (Django DRF):
   ```bash
   cd server
   python manage.py runserver
   ```

2. **Start the frontend** (React):
   ```bash
   cd client
   npm start
   ```

3. **Access the app**:
   - Frontend: **http://localhost:3000**
   - Backend (API): **http://localhost:8000/api/**

---



### **Quiz Management**
| Endpoint               | Method | Description               |
| ---------------------- | ------ | ------------------------- |
| `/api/start/`          | POST   | Start the quiz session    |
| `/api/questions/`      | GET    | Get questions of a quiz   |
| `/api/submit_answers/` | POST   | Subimt quiz answer        |
| `/api/history/`        | GET    | Get Previous quiz history |

> Full API documentation is available at **/api/docs/**.

---

## **🤝 Contributing**

We welcome contributions to Quizer! Here’s how you can contribute:

1. **Fork** the repository.
2. **Create a new branch** for your feature or bug fix.
3. **Commit your changes**.
4. **Push your branch** to your forked repo.
5. **Open a pull request**.

### **Code Style Guidelines**
- Use **Prettier** for code formatting in React.
- Follow **PEP 8** coding standards for Python.

---

## **📄 License**

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it as per the license terms.

---

**🚀 Ready to get started?** Follow the installation guide above, or visit [Quizer](https://quizer-eight.vercel.app/) to experience it live.

> Made with ❤️ by Pratham Das and contributors.

