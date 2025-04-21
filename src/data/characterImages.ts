// Define interfaces for clarity
export interface CharacterStyleProps {
  top: string;
  left: string;
  translateX: string;
  translateY: string;
  rotate: number;
  zIndex: number;
  width: number;
  height: number;
  flipX?: boolean;
}

export interface CharacterData {
  id: number;
  src: string;
  alt: string;
  mobile: CharacterStyleProps; // Styles for mobile
  desktop: CharacterStyleProps; // Styles for desktop (and larger)
  priority: boolean; // Whether this image should be prioritized
}

// Define the character image data with both mobile and desktop positions
export const characterImages: CharacterData[] = [
  { 
    id: 1, 
    src: '/champ png/egypt-god-5.png', 
    alt: 'Character 1',
    mobile: { 
      top: '0%', left: '50%', translateX: '50%', translateY: '0%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    desktop: { 
      top: '0%', left: '50%', translateX: '40%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 200, height: 250 
    },
    priority: true
  },
  { 
    id: 2, 
    src: '/champ png/greek-creep-1.png', 
    alt: 'Character 2',
    mobile: { 
      top: '0%', left: '50%', translateX: '-45%', translateY: '30%', 
      rotate: 0, zIndex: 7, width: 100, height: 150 
    },
    desktop: { 
      top: '0%', left: '50%', translateX: '-60%', translateY: '-35%', 
      rotate: 0, zIndex: 7, width: 150, height: 200 
    },
    priority: true
  },
  { 
    id: 3, 
    src: '/champ png/greek-creep-4.png', 
    alt: 'Character 3',
    mobile: { 
      top: '0%', left: '50%', translateX: '-160%', translateY: '20%', 
      rotate: 0, zIndex: 6, width: 120, height: 150 
    },
    desktop: { 
      top: '0%', left: '50%', translateX: '-120%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: true
  },
  { 
    id: 4, 
    src: '/champ png/greek-god-1.png', 
    alt: 'Character 4',
    mobile: { 
      top: '0%', left: '50%', translateX: '-110%', translateY: '20%', 
      rotate: 0, zIndex: 8, width: 110, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-130%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: true
  },
  { 
    id: 5, 
    src: '/champ png/greek-god-3.png', 
    alt: 'Character 5',
    mobile: { 
      top: '0%', left: '50%', translateX: '-28%', translateY: '20%', 
      rotate: 0, zIndex: 6, flipX: true, width: 100, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-40%', translateY: '-40%', 
      rotate: 0, zIndex: 4, flipX: true, width: 150, height: 200 
    },
    priority: true
  },
  { 
    id: 6, 
    src: '/champ png/greek-legend-2.png', 
    alt: 'Character 6',
    mobile: { 
      top: '0%', left: '50%', translateX: '-85%', translateY: '18%', 
      rotate: 0, zIndex: 7, width: 110, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-100%', translateY: '-40%', 
      rotate: 0, zIndex: 7, width: 150, height: 200 
    },
    priority: false
  },
  { 
    id: 7, 
    src: '/champ png/hell-god-3.png', 
    alt: 'Character 7',
    mobile: { 
      top: '0%', left: '50%', translateX: '-95%', translateY: '-5%', 
      rotate: 0, zIndex: 5, width: 180, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-110%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: false
  },
  { 
    id: 8, 
    src: '/champ png/japan-creep-2.png', 
    alt: 'Character 8',
    mobile: { 
      top: '0%', left: '50%', translateX: '-210%', translateY: '60%', 
      rotate: 0, zIndex: 8, width: 80, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-110%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: false
  },
  { 
    id: 9, 
    src: '/champ png/japan-creep-4.png', 
    alt: 'Character 9',
    mobile: { 
      top: '0%', left: '50%', translateX: '0%', translateY: '-30%', 
      rotate: 0, zIndex: 3, width: 100, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '20%', translateY: '-100%', 
      rotate: 0, zIndex: 3, width: 150, height: 200 
    },
    priority: false
  },
  { 
    id: 10, 
    src: '/champ png/viking-creep-4.png', 
    alt: 'Character 10',
    mobile: { 
      top: '0%', left: '50%', translateX: '-20%', translateY: '20%', 
      rotate: 0, zIndex: 6, flipX: true, width: 200, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-20%', translateY: '-35%', 
      rotate: 0, zIndex: 5, flipX: true, width: 250, height: 200 
    },
    priority: false
  },
  { 
    id: 11, 
    src: '/champ png/viking-creep-5.png', 
    alt: 'Character 11',
    mobile: { 
      top: '0%', left: '50%', translateX: '50%', translateY: '0%', 
      rotate: 0, zIndex: 8, flipX: true, width: 200, height: 150 
    },
    desktop: { 
      top: '0%', left: '50%', translateX: '50%', translateY: '-40%', 
      rotate: 0, zIndex: 6, flipX: true, width: 350, height: 200 
    },
    priority: false
  },
  { 
    id: 12, 
    src: '/champ png/viking-god-2.png', 
    alt: 'Character 12',
    mobile: { 
      top: '0%', left: '50%', translateX: '-170%', translateY: '30%', 
      rotate: 0, zIndex: 9, width: 180, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-110%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 200, height: 200 
    },
    priority: false
  },
  { 
    id: 13, 
    src: '/champ png/viking-god-3.png', 
    alt: 'Character 13',
    mobile: { 
      top: '0%', left: '50%', translateX: '40%', translateY: '5%', 
      rotate: 0, zIndex: 7, width: 120, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '35%', translateY: '-40%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: false
  },
].map((char, index) => ({
  ...char,
  priority: index < 5 // Set priority true for first 5 characters
}));