import { asciiArt } from "./Ascii";
import LocationFetcher from "./LocationFetcher";

const HelpItem = ({ cmd, desc }) => (
  <div className="flex gap-4">
    <span className="text-yellow-400 min-w-[100px]">{cmd}</span>
    <span className="text-gray-400">- {desc}</span>
  </div>
);

export function runCommand(input, themeStyle = "") {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case "welcome":
      return [
        <div key="art" className={`mb-4 font-bold ${themeStyle}`}>
          {asciiArt}
        </div>,
        <div key="wel1" className={themeStyle}>Welcome to my terminal portfolio.</div>,
        <div key="wel2" className="mb-4">
          For a list of available commands, type <span className="text-yellow-400">'ls'</span>.
        </div>,
      ];

    case "ls":
    case "help":
      return [
        <div key="help-header" className="mb-2 text-gray-500">Available Commands:</div>,
        <HelpItem key="about" cmd="about" desc="About me" />,
        <HelpItem key="clear" cmd="clear" desc="Clear the terminal" />,
        <HelpItem key="config" cmd="config" desc="Open theme settings" />,
        <HelpItem key="education" cmd="education" desc="My education background" />,
        <HelpItem key="email" cmd="email" desc="Send me an email" />,
        <HelpItem key="github" cmd="gui" desc="Go to github" />,
        <HelpItem key="pai" cmd="p.ai" desc="Access Neural Net (Chatbot) Password: guest" />,
        <HelpItem key="projects" cmd="projects" desc="View my projects" />,
        <HelpItem key="skills" cmd="skills" desc="Technical skills" />,
        <HelpItem key="whoami" cmd="whoami" desc="Current user" />,
        <HelpItem key="whereami" cmd="whereami" desc="Current location" />,
        <div key="spacer" className="mb-4"></div>,
      ];

    case "about":
      return [
        <div key="about1" className="mb-2">Aditya Sharma</div>,
        <div key="about2" className="text-gray-400">Developer | ML Enthusiast | CS Student</div>,
        <div key="about3" className="mt-2 text-gray-500">I build things for the web and train models to predict the future.</div>,
        <br />
      ];

    case "email":
      return [
        <div key="email" className="text-pink-500">aditya122sharma@gmail.com</div>,
        <br />
      ];

    case "skills":
      return [
        <div key="skills-header" className="mb-2 text-green-400">Technical Arsenal:</div>,
        <div key="lang" className="mb-1"><span className="text-yellow-400">Languages:</span> Python, Java, JavaScript, HTML/CSS</div>,
        <div key="web" className="mb-1"><span className="text-yellow-400">Web:</span> React, Tailwind CSS, Node.js</div>,
        <div key="ml" className="mb-1"><span className="text-yellow-400">AI/ML:</span> TensorFlow, Keras, Scikit-learn, Pandas, NumPy</div>,
        <div key="tools" className="mb-1"><span className="text-yellow-400">Tools:</span> Git, Linux (Arch/Pop!_OS), Neovim</div>,
        <br />
      ];

    case "education":
      return [
        <div key="edu-title" className="mb-2 text-blue-400">Academic Background:</div>,
        <div key="edu-deg" className="font-bold">Bachelor of Computer Applications</div>,
        <div key="edu-loc" className="text-gray-500 mb-2">New Delhi, India</div>,
        <div key="edu-course" className="text-sm opacity-80">
          Relevant Coursework: <br />
          • Data Structures & Algorithms (Java/Python)<br />
          • Machine Learning & Deep Learning<br />
          • Linear Algebra & Statistics<br />
          • Full Stack Web Development
        </div>,
        <br />
      ];

    case "whoami":
      return [
        <div key="who" className="text-pink-500">visitor-user</div>,
        <br />
      ];

    case "whereami":
      return [
        <LocationFetcher key={Date.now()} />
      ];

    case "projects":
      return [
        <div key="proj-title" className="mb-2 text-purple-400">Active Projects:</div>,
        <><div key="p1" className="mb-1">
          <span className="text-yellow-400">1. Terminal Portfolio</span> - <span className="text-gray-400">React, Tailwind, Cloudflare Workers</span>
        </div><div key="p2" className="mb-1">
            <span className="text-yellow-400">2. Stock Price Predictor</span> - <span className="text-gray-400">Python, Scikit-learn, Regression Analysis</span>
          </div><div key="p3" className="mb-1">
            <span className="text-yellow-400">3. Library Management Sys</span> - <span className="text-gray-400">Java, OOP Principles</span>
          </div><div key="p4" className="mb-1">
            <span className="text-yellow-400">4. XOR Neural Network</span> - <span className="text-gray-400">Deep Learning, Keras/TensorFlow</span>
          </div><br /></>
      ];

    case "clear":
      return [];

    default:
      return [
        <div key="err" className="text-red-500">
          command not found: <span className="font-bold">{cmd}</span>
        </div>,
        <div key="err-hint" className="text-gray-500 mb-4">
          Type <span className="text-yellow-400">'help'</span> for list of commands.
        </div>
      ];
  }
}