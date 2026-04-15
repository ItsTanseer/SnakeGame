# 🐍 Snake Game (React + Tailwind)

A modern take on the classic Snake game built using **React** and **Tailwind CSS**.  
Smooth controls, growing snake mechanics, score tracking, and persistent high score — all running in the browser.

---

## 🚀 Features

- 🎮 Classic Snake gameplay (grid-based movement)
- 🐍 Snake grows when it eats food
- 🍎 Random food generation (never overlaps with snake)
- ⌨️ Keyboard controls with direction locking (no instant reverse)
- 💀 Wall collision & self-collision detection
- 🛑 Game Over screen with restart option
- 📈 Score tracking
- 🏆 Persistent High Score using `localStorage`
- 👀 Styled snake head (optional: eyes / direction styling)
- 🎨 Clean UI using Tailwind CSS

---

## 🧠 Tech Stack

- React (Hooks: useState, useEffect, useRef)
- Tailwind CSS
- JavaScript (ES6+)
- Vite

---

## ⚙️ How It Works

### 🐍 Snake Representation

The snake is stored as an array of coordinates:

```js
[
  { x: 6, y: 3 }, // head
  { x: 5, y: 3 },
  { x: 4, y: 3 }
]
```

---

### 🔁 Game Loop

- Runs using `setInterval`
- Moves snake every ~400ms
- Uses `useRef` to avoid stale state issues

---

### 🎯 Movement Logic

- Direction stored in state + ref
- Prevents 180° turns using a lock system
- Only one direction change per tick

---

### 🍎 Food System

- Randomly generated within grid
- Ensures it doesn’t spawn on snake body
- On collision:
  - Snake grows
  - Score increases
  - New food spawns

---

### 💀 Collision Detection

- Wall collision → Game Over  
- Self collision → Game Over  
- Game loop stops immediately

---

### 🏆 High Score

- Stored in `localStorage`
- Updated when game ends
- Persists across page reloads

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| ⬆️ | Move Up |
| ⬇️ | Move Down |
| ⬅️ | Move Left |
| ➡️ | Move Right |

---

## ▶️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/snake-game.git
cd snake-game
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the project
```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
 ├── App.jsx        # Main game logic
 ├── App.css        # Styling
 ├── main.jsx       # Entry point
```

---

## 💡 Future Improvements

- ⚡ Increase speed as score increases
- 🎵 Sound effects
- 🌈 Animations and smooth transitions
- 📱 Mobile touch controls
- 🏆 Leaderboard system

---

## ✨ Author

Built with logic, frustration, and a little bit of chaos 🐍🔥

---

## 📜 License

This project is open-source and free to use.