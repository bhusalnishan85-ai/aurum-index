import { z } from 'zod';

const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  date: z.string(),
  author: z.string(),
  excerpt: z.string(),
  image: z.string()
});

const articlesSchema = z.array(articleSchema);

export const articles = articlesSchema.parse([
  {
    id: 'paper-walls',
    title: 'Paper Walls and the Ethics of Empty Space',
    category: 'Curatorial Note',
    date: '2025-02-12',
    author: 'Elise Hartmann',
    excerpt: 'A study of wall residue, spatial pause, and the way exhibitions continue to speak after the objects leave the room.',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'catalogue-voice',
    title: 'Catalogue Voice in the Age of Moving Interfaces',
    category: 'Essay',
    date: '2025-03-05',
    author: 'Marta Sorel',
    excerpt: 'How a museum website can adopt the authority of print without losing the physical intelligence of motion.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'stone-weather',
    title: 'Stone, Salt, and the Slow Time of Surface',
    category: 'Artist Observation',
    date: '2025-03-28',
    author: 'Signe Arlo',
    excerpt: 'On corrosion, quiet material change, and why some images only become legible through patient looking.',
    image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'dust-lines',
    title: 'Dust Lines as Temporary Drawing',
    category: 'Notebook',
    date: '2025-04-16',
    author: 'Jonah Rhee',
    excerpt: 'The gallery after deinstallation offers one of the most honest portraits of institutional memory.',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'architectures-of-waiting',
    title: 'Architectures of Waiting',
    category: 'Essay',
    date: '2025-05-03',
    author: 'Anton Mirek',
    excerpt: 'Thresholds are less about entry than about delay—the room before the room, the moment before seeing.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'drawn-twice',
    title: 'A Drawing Read Twice',
    category: 'Observation',
    date: '2025-05-22',
    author: 'Noa Kessler',
    excerpt: 'Graphite repetition as a method for measuring doubt, recall, and instability without spectacle.',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'support-objects',
    title: 'Support Objects and the Authority of Display',
    category: 'Curatorial Note',
    date: '2025-06-11',
    author: 'Tomas Verri',
    excerpt: 'Plinths, rails, labels, and barriers become protagonists when the artwork steps briefly out of view.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'interior-weather',
    title: 'Interior Weather, Minor Pressure',
    category: 'Essay',
    date: '2025-06-28',
    author: 'Leila Moravec',
    excerpt: 'The atmosphere of a room is never background; it is a form of authorship distributed across touch and temperature.',
    image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'unlit-ledgers',
    title: 'Reading the Unlit Ledger',
    category: 'Archive',
    date: '2025-07-10',
    author: 'Pavel Ionescu',
    excerpt: 'Darkness is not concealment alone; it is a cataloguing pressure that decides what can emerge into sight.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'north-wall',
    title: 'The North Wall as Record',
    category: 'Field Note',
    date: '2025-07-27',
    author: 'Ilya Sato',
    excerpt: 'Shadows left by previous installations can function as evidence, abstraction, and emotional residue all at once.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80'
  }
]);

export type Article = z.infer<typeof articleSchema>;
