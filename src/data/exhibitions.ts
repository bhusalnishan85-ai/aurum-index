import { z } from 'zod';

const exhibitionSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(['Current', 'Upcoming', 'Archive']),
  start: z.string(),
  end: z.string(),
  room: z.string(),
  artists: z.number(),
  works: z.number(),
  curator: z.string(),
  note: z.string(),
  image: z.string()
});

const exhibitionsSchema = z.array(exhibitionSchema);

export const exhibitions = exhibitionsSchema.parse([
  {
    id: 'after-installation',
    title: 'After Installation',
    status: 'Current',
    start: '2025-03-14',
    end: '2025-08-30',
    room: 'Rooms 01–02',
    artists: 4,
    works: 12,
    curator: 'Curated by Elise Hartmann',
    note: 'An exhibition of surfaces marked by removal, dust memory, and post-display architecture. The galleries operate like an index of what remains after art has moved on.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'soft-machines',
    title: 'Soft Machines, Quiet Rooms',
    status: 'Upcoming',
    start: '2025-09-18',
    end: '2026-01-12',
    room: 'Rooms 03–04',
    artists: 5,
    works: 18,
    curator: 'Curated by Tomas Verri',
    note: 'Textile logic, mechanical rhythm, and institutional silence converge in a measured study of systems that hold the body at a distance while still bearing its trace.',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'weather-inside',
    title: 'Weather Inside the Frame',
    status: 'Current',
    start: '2025-04-22',
    end: '2025-10-05',
    room: 'North Light Hall',
    artists: 3,
    works: 9,
    curator: 'Curated by Nura Selk',
    note: 'A meditation on atmosphere as structure. Humidity, wash, and abrasion become compositional tools for artworks that resist immediate capture.',
    image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'the-unlit-ledger',
    title: 'The Unlit Ledger',
    status: 'Archive',
    start: '2024-01-11',
    end: '2024-06-09',
    room: 'Archive Chamber',
    artists: 6,
    works: 15,
    curator: 'Curated by Marta Sorel',
    note: 'An archival exhibition focused on darkness as a cataloguing method. Shelving, labels, and the bureaucratic afterlife of objects were treated as forms of image-making.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop&q=80'
  }
]);

export type Exhibition = z.infer<typeof exhibitionSchema>;
