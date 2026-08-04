# To-Do List Web Application (College Mini Project)

A simple, clean, and responsive **To-Do List** reminder web application created for a college mini project.

## 📌 Project Overview
The To-Do List application is a simple reminder system that helps users manage their daily tasks. Users can add, complete, edit, and delete tasks. Task data is stored on the server in a SQLite database, so the application persists changes centrally instead of relying on browser Local Storage. This project demonstrates basic **CRUD operations** using HTML, CSS, JavaScript, Node.js, Express, and SQLite.

---

## 🚀 Features
- ➕ **Add Task**: Users can type a task in the input field and add it to the list.
- ✅ **Mark Completed**: Checkbox to toggle task completion with a line-through styling effect.
- ✏️ **Edit Task**: Update task text after adding it.
- 🗑️ **Delete Task**: Dedicated delete button for each task.
- 💾 **SQLite Persistence**: Tasks are saved in a centrally managed SQLite database.
- 📝 **Empty State Display**: Shows a friendly *"No Tasks Available"* message when the list is empty.
- 📱 **Responsive Design**: Designed to look clean on mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack
- **HTML5**: Semantic structure and forms.
- **CSS3**: Custom styling, Flexbox layout, CSS variables, line-through effect, and responsiveness.
- **JavaScript (ES6+)**: DOM manipulation and fetch-based API interaction.
- **Node.js + Express**: Backend REST API server.
- **SQLite**: Single-file database for persistent task storage.

---

## 📂 Project Structure
```
project 1/
│
├── index.html      # Main HTML file containing web structure & semantic markup
├── style.css       # Custom stylesheet with modern design system & responsive layout
├── app.js          # JavaScript logic for CRUD operations & fetch-based API interaction
├── server.js       # Node/Express backend server exposing SQLite REST endpoints
├── package.json    # Project metadata and dependency scripts
└── README.md       # Project documentation & mini project summary
```

---

## 💻 How to Run the Project
1. Open the project folder in a terminal.
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and visit:
   ```
   http://localhost:3000
   ```
5. Add, complete, edit, and delete tasks. Your data is persisted in the SQLite database file.

> The SQLite schema is defined in `schema.sql`, and `server.js` creates the `tasks` table automatically on first run.

---

## 🎓 Learning Outcomes
- Understanding DOM manipulation using vanilla JavaScript (`document.getElementById`, `createElement`, `appendChild`).
- Event handling (`submit`, `click`, `change`).
- Using the Fetch API to call a REST backend and persist data in SQLite.
- Structuring clean, well-commented code suitable for mini project evaluation.
