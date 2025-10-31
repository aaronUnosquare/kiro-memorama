import type { Character } from '../types/game';

export const mexicanTerrorCharacters: Character[] = [
  {
    id: 'la-llorona',
    name: 'La Llorona',
    image: '/assets/images/characters/la-llorona.svg',
    origin: 'Folclore mexicano',
    story: 'Mujer que perdió a sus hijos y los busca eternamente cerca de ríos y lagos, lamentándose con su característico llanto. Su historia varía entre regiones, pero siempre representa el dolor maternal y la pérdida.',
    region: 'Todo México',
    category: 'fantasma'
  },
  {
    id: 'chupacabras',
    name: 'Chupacabras',
    image: '/assets/images/characters/chupacabras.svg',
    origin: 'Leyenda moderna mexicana',
    story: 'Criatura misteriosa que se alimenta de la sangre del ganado, especialmente cabras. Descrito como un ser reptiliano con espinas dorsales y ojos rojos brillantes.',
    region: 'Norte de México',
    category: 'criatura'
  },
  {
    id: 'nahual',
    name: 'Nahual',
    image: '/assets/images/characters/nahual.svg',
    origin: 'Mitología prehispánica',
    story: 'Brujo o chamán con la capacidad de transformarse en animal, especialmente jaguar, coyote o águila. Puede usar sus poderes para el bien o el mal según sus intenciones.',
    region: 'Centro y Sur de México',
    category: 'shapeshifter'
  },
  {
    id: 'catrina',
    name: 'La Catrina',
    image: '/assets/images/characters/catrina.svg',
    origin: 'Tradición del Día de Muertos',
    story: 'Elegante dama de la muerte que representa la igualdad ante la muerte. Creada por José Guadalupe Posada y popularizada por Diego Rivera, es símbolo del Día de Muertos.',
    region: 'Todo México',
    category: 'muerte'
  },
  {
    id: 'ahuizotl',
    name: 'Ahuizotl',
    image: '/assets/images/characters/ahuizotl.svg',
    origin: 'Mitología azteca',
    story: 'Criatura acuática con forma de perro que tiene una mano humana en la cola. Habita en lagos y ríos, atrayendo a los pescadores para ahogarlos y llevarse sus almas.',
    region: 'Valle de México',
    category: 'criatura'
  },
  {
    id: 'lechuza',
    name: 'La Lechuza',
    image: '/assets/images/characters/lechuza.svg',
    origin: 'Folclore del norte de México',
    story: 'Bruja que se transforma en lechuza gigante para acechar a sus víctimas durante la noche. Su grito anuncia desgracias y su presencia trae mala suerte.',
    region: 'Norte de México y frontera con EE.UU.',
    category: 'bruja'
  },
  {
    id: 'tzitzimimeh',
    name: 'Tzitzimimeh',
    image: '/assets/images/characters/tzitzimimeh.svg',
    origin: 'Mitología azteca',
    story: 'Diosas esqueléticas de la destrucción y la renovación. Guardianas de los eclipses y los momentos de transición cósmica, pueden traer tanto caos como renacimiento.',
    region: 'Centro de México',
    category: 'deidad'
  },
  {
    id: 'cipactli',
    name: 'Cipactli',
    image: '/assets/images/characters/cipactli.svg',
    origin: 'Mitología azteca',
    story: 'Monstruo primordial con forma de cocodrilo cubierto de bocas hambrientas. Según la mitología, la Tierra fue creada sobre su espalda y constantemente demanda ser alimentado.',
    region: 'Centro de México',
    category: 'monstruo'
  }
];

// Función para obtener un personaje por ID
export const getCharacterById = (id: string): Character | undefined => {
  return mexicanTerrorCharacters.find(character => character.id === id);
};

// Función para obtener personajes aleatorios para el juego
export const getRandomCharacters = (count: number = 8): Character[] => {
  const shuffled = [...mexicanTerrorCharacters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Función para validar que tenemos suficientes personajes
export const validateCharacterCount = (): boolean => {
  return mexicanTerrorCharacters.length >= 8;
};