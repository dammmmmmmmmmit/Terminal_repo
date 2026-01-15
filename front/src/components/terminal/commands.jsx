import { asciiArt } from "./Ascii";

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
        <HelpItem key="projects" cmd="projects" desc="View my projects" />,
        <HelpItem key="skills" cmd="skills" desc="Technical skills" />,
        <HelpItem key="whoami" cmd="whoami" desc="Current user" />,
        <HelpItem key="whereami" cmd="whereami" desc="Current location" />, 
        <div key="spacer" className="mb-4"></div>,
      ];

    case "about":
      return [
        <div key="about1" className="mb-2">Aditya Sharma</div>,
        <div key="about2" className="text-gray-400">Developer | ML | Procastinator</div>,
        <div key="about3" className="mt-2 text-gray-500">I build things for the web and dabble in AI.</div>,
        <br />
      ];

    case "email":
    return [
        <div key="email" className="text-pink-500">aditya122sharma@gmail.com</div>, 
        <br />
        ];

    case "skills":
        return [
        <div key="skills" className="text-pink-500">he have no skills lmao!</div>, 
        <br />
        ];


    case "whoami":
      return [
        <div key="who" className="text-pink-500">visitor-user</div>, 
        <br />
      ];

    case "whereami":
      return[
          <LocationFetcher key={Date.now()} />
      ];
      
    case "projects": 
      return [
        <div key="proj-title" className="mb-2 text-purple-400">Active Projects:</div>,
        <div key="p1" className="mb-1"><a href="#" className="text-blue-400 underline hover:text-blue-300">Terminal Portfolio</a> - React & Tailwind</div>,
        <div key="p2" className="mb-1"><a href="#" className="text-blue-400 underline hover:text-blue-300">ML Regression Model</a> - Python & Scikit</div>,
        <br />
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