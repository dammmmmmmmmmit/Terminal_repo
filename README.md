# 🖥️ Terminal Portfolio

> A retro-styled, interactive developer portfolio built with React & Tailwind CSS. 
> mimics a Linux terminal environment with immersive sound effects, hidden easter eggs, and a command-line interface.


## 🚀 Features

* **Interactive CLI:** Fully functional command prompt with history navigation (Up/Down arrows).
* **Immersive Audio:** Retro mechanical keyboard sounds (Thock/Typewriter) and sci-fi boot sequences.
* **Split-Pane Dashboard:** A visual "About Me" panel that slides in, creating a modern dashboard layout.
* **Geolocation API:** A `whereami` command that uses the browser's Geolocation API and OpenStreetMap to "triangulate" the user's position.
* **Theming System:** Global monochrome color system (Matrix Green, Amber, Cyberpunk Pink) that updates the entire UI instantly.
* **Responsive Design:** Hidden scrollbars and mobile-friendly layout.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Icons:** React Icons
* **State Management:** React Context API (for theming)

## 🕹️ Available Commands

Type `help` to see the full list. Some key commands include:

| Command | Description |
| :--- | :--- |
| `about` | Opens the split-pane visual dashboard with resume details. |
| `projects` | Lists active projects with links. |
| `skills` | Displays technical stack. |
| `whereami` | Triangulates user location using Reverse Geocoding. |
| `theme` | Opens the configuration menu to change terminal colors. |
| `clear` | Clears the terminal history. |

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/dammmmmmmmmmit/Terminal_repo.git](https://github.com/dammmmmmmmmmit/Terminal_repo.git)
    cd Terminal_repo
    ```

2.  **Install dependencies**
    ```bash
    cd front
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🔊 Sound Configuration

The audio engine supports multiple sound profiles. To change the typing sound:

1.  Open `front/src/utils/sound.js`
2.  Change the `CURRENT_PROFILE` variable:
    * `1`: Mechanical "Thock"
    * `2`: Retro Typewriter
    * `3`: Standard Click
    * `4`: Sevastopol Terminal (Alien: Isolation style)

## 🎨 Customization

The project uses a global **Theme Context**. 
To change the default boot color, edit `front/src/context/ThemeContext.jsx`:

```javascript
// Default to Matrix Green
const [themeColor, setThemeColor] = useState("#22c55e");

Built with 💻 and ☕ by [Aditya Sharma]
