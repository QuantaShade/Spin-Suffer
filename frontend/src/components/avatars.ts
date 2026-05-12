export interface Avatar {
  id: string;
  emoji: string;
  label: string;
}

export const AVATARS: Avatar[] = [
  { id: "skull",    emoji: "💀", label: "Skull" },
  { id: "fire",     emoji: "🔥", label: "Fire" },
  { id: "devil",    emoji: "😈", label: "Devil" },
  { id: "alien",    emoji: "👽", label: "Alien" },
  { id: "robot",    emoji: "🤖", label: "Robot" },
  { id: "clown",    emoji: "🤡", label: "Clown" },
  { id: "ghost",    emoji: "👻", label: "Ghost" },
  { id: "ninja",    emoji: "🥷", label: "Ninja" },
  { id: "zombie",   emoji: "🧟", label: "Zombie" },
  { id: "wizard",   emoji: "🧙", label: "Wizard" },
  { id: "dragon",   emoji: "🐉", label: "Dragon" },
  { id: "cat",      emoji: "😺", label: "Cat" },
];

export function getAvatarById(id: string): Avatar {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}