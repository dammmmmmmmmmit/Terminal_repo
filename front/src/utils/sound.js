// A short, crisp mechanical keyboard click sound (Base64 encoded)
const keyPressSound = "data:audio/wav;base64,UklGRi4AAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="; // (This is a placeholder, see note below)

// REAL DATA: I will give you a real, working click sound below.
// This function handles the "rapid fire" typing without lag
export const playKeystroke = () => {
  try {
    // We create a new Audio object for every keypress to allow overlapping sounds
    // (So fast typing sounds natural)
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3"); 
    audio.volume = 0.3; // Keep it subtle (30% volume)
    audio.play();
  } catch (err) {
    console.error("Audio play failed", err);
  }
};