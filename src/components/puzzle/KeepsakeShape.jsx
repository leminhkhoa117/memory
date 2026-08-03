const shapeRenderers = {
  ribbon: (
    <svg viewBox="0 0 72 152" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M58 10C16 34 16 118 58 142"
        fill="none"
        stroke="#b8a482"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d="M58 10C16 34 16 118 58 142"
        fill="none"
        stroke="#ddcdac"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M56 22C26 42 26 110 56 130"
        fill="none"
        stroke="rgba(120,102,74,0.4)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  wire: (
    <svg viewBox="0 0 72 152" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 10C56 34 56 118 14 142"
        fill="none"
        stroke="#6f6553"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g fill="#e4cb96">
        <circle cx="30" cy="19" r="4.6" />
        <circle cx="45" cy="45" r="4.6" />
        <circle cx="48" cy="76" r="4.6" />
        <circle cx="45" cy="107" r="4.6" />
        <circle cx="30" cy="133" r="4.6" />
      </g>
      <g fill="rgba(255,244,214,0.5)">
        <circle cx="30" cy="19" r="1.8" />
        <circle cx="48" cy="76" r="1.8" />
        <circle cx="30" cy="133" r="1.8" />
      </g>
    </svg>
  ),
  twig: (
    <svg viewBox="0 0 74 100" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M62 8C36 24 20 54 14 92"
        fill="none"
        stroke="#7a6850"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M46 26C54 18 62 18 66 22C60 30 52 32 46 26Z" fill="#8c7a5c" />
      <path d="M28 56C22 46 22 38 26 34C33 41 34 50 28 56Z" fill="#7f6e52" />
      <path d="M20 78C28 74 34 76 36 80C29 85 23 84 20 78Z" fill="#8c7a5c" />
    </svg>
  ),
  button: (
    <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
      <circle cx="44" cy="44" r="36" fill="none" stroke="#b6a684" strokeWidth="13" />
      <circle cx="44" cy="44" r="36" fill="none" stroke="#dccdaa" strokeWidth="6" />
      <g fill="rgba(84,72,52,0.55)">
        <circle cx="36" cy="36" r="3.4" />
        <circle cx="52" cy="36" r="3.4" />
        <circle cx="36" cy="52" r="3.4" />
        <circle cx="52" cy="52" r="3.4" />
      </g>
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 30 154" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="18" width="16" height="112" rx="2" fill="#c0a76d" />
      <rect x="7" y="18" width="6" height="112" fill="rgba(255,240,206,0.28)" />
      <path d="M7 130h16l-8 18z" fill="#d9c7a4" />
      <path d="M11.6 139.5h6.8l-3.4 8.5z" fill="#3f382d" />
      <rect x="7" y="6" width="16" height="12" rx="2" fill="#9c8f7a" />
      <rect x="7" y="14" width="16" height="4" fill="rgba(60,52,40,0.35)" />
    </svg>
  ),
  scrap: (
    <svg viewBox="0 0 58 44" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 8L18 3L33 7L52 4L55 20L50 33L36 39L20 36L6 41L2 25Z"
        fill="#ded3ba"
        stroke="rgba(96,84,62,0.35)"
        strokeWidth="1"
      />
      <g stroke="rgba(96,84,62,0.35)" strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 16h30" />
        <path d="M12 23h22" />
      </g>
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 104 46" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 4h96v11a8 8 0 000 16v11H4V31a8 8 0 000-16z"
        fill="#c8b894"
        stroke="rgba(88,76,56,0.4)"
        strokeWidth="1"
      />
      <path d="M68 6v34" stroke="rgba(88,76,56,0.45)" strokeWidth="1.2" strokeDasharray="3 4" />
      <g stroke="rgba(80,68,50,0.5)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M14 18h40" />
        <path d="M14 27h26" />
      </g>
    </svg>
  ),
  polaroid: (
    <svg viewBox="0 0 82 94" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="76" height="88" rx="2" fill="#e2dac7" />
      <rect x="10" y="10" width="62" height="58" fill="#4a4438" />
      <path d="M10 56l16-16 14 12 12-10 20 16v10H10z" fill="#6b6252" />
      <circle cx="58" cy="24" r="6" fill="#7d745f" />
    </svg>
  ),
  clip: (
    <svg viewBox="0 0 40 76" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 62V18a7 7 0 0114 0v40a11 11 0 01-22 0V22"
        fill="none"
        stroke="#a79f8d"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  ),
}

function KeepsakeShape({ name }) {
  return shapeRenderers[name] ?? null
}

export default KeepsakeShape
