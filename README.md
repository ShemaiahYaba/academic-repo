# 📚 Academic Repository (Journal of TetraScience)

An open-source academic repository with social features. Users can upload, share, and discover academic documents such as journals, research papers, theses, and essays. Built for a community of students, researchers, and lifelong learners.

## ✨ Features

- 🔒 User authentication and profile management
- 📤 Upload academic files with metadata (title, abstract, category, etc.)
- 🧠 Personalized @user handles (e.g., @janedoe)
- 🗂️ Organized by user uploads in Firestore under `journals/@username`
- 🖼️ Dynamic homepage cards displaying recent uploads
- 🔎 Search and filter academic resources
- 💬 Social interaction features (likes, comments - coming soon!)
- ☁️ Scalable and serverless backend powered by Firebase and Google Cloud

## 🧰 Tech Stack

- **Frontend:** React + TypeScript
- **Backend:** Flask (Python)
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **Auth:** Firebase Authentication
- **Deployment:** Google Cloud Platform (App Engine, Cloud Functions)

## 📁 Project Structure
```

📦 academic-repo/
├── frontend/ # React app
│ ├── components/ # UI components (cards, forms, etc.)
│ ├── pages/ # Route components (Home, Upload, etc.)
│ └── context/ # AuthContext, global state
├── backend/ # Flask API (document processing, metadata analysis)
├── firebase/ # Firebase functions and configuration
└── README.md # Project documentation

````

## 🔧 Installation & Setup

### Backend (Flask API)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run
````

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

### Firebase Configuration

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable:
   - Firestore Database
   - Firebase Authentication (Email/Password)
   - Firebase Storage
3. Add your Firebase config to `frontend/src/firebaseConfig.ts`
4. Update Firestore security rules as needed.

### Suggested Firestore Structure

```
journals/
  @username/
    uploads: [
      {
        title: "Example Paper",
        date: "2025-04-09",
        url: "https://...",
        abstract: "...",
        tags: ["math", "research"]
      }
    ]
```

## 📄 Security Rules (Development)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /journals/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🌍 Future Improvements

- Commenting & peer feedback system
- Tag-based search and trending topics
- Bookmarking and personal libraries
- Content moderation tools
- AI-assisted tagging and metadata extraction

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Open a pull request

## 🛡 License

This project is licensed under the MIT License.

---

Made with ❤️ for students, by students.

```

---

Let me know if you’d like to include a logo, API documentation, contributor list, or anything else!
```
