const CURRENT_PROFILE = 1; 
const BOOT_SOUND_URL = "/sounds/nostromo-boot.mp3";

const SOUND_PROFILES = {
  1: "https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3", 
  2: "https://assets.mixkit.co/active_storage/sfx/2409/2409-preview.mp3", 
  3: "https://assets.mixkit.co/active_storage/sfx/2386/2386-preview.mp3",
    4: "https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3", 
};

export const playKeystroke = () => {
  try {
    const audio = new Audio(SOUND_PROFILES[CURRENT_PROFILE]);
    
    
    if (CURRENT_PROFILE === 1) audio.volume = 0.5;
    if (CURRENT_PROFILE === 2) audio.volume = 0.25; 
    if (CURRENT_PROFILE === 3) audio.volume = 0.4;
    
        if (CURRENT_PROFILE === 4) {
        audio.volume = 0.2; 
        audio.playbackRate = 3;     }
    
    
    audio.play().catch(e => console.error("Audio blocked:", e));
  } catch (err) {
    console.error("Audio play failed", err);
  }
};

export const playBootSound = () => {
  try {
    const audio = new Audio(BOOT_SOUND_URL);
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Boot sound blocked:", e));
  } catch (err) {
    console.error("Boot sound failed", err);
  }
};