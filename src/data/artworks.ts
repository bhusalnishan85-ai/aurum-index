import { z } from 'zod';

const artworkSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  year: z.number(),
  price: z.number(),
  dimensions: z.string(),
  medium: z.string(),
  description: z.string(),
  image: z.string(),
  room: z.string(),
  tags: z.array(z.string())
});

const artworksSchema = z.array(artworkSchema);

export const artworks = artworksSchema.parse([
  {
    id: 'weight-of-air',
    title: 'The Weight of Air',
    artist: 'Mara Veldt',
    year: 2024,
    price: 18400,
    dimensions: '162 × 118 cm',
    medium: 'Mineral pigment, graphite, and gesso on linen',
    description: 'A restrained study of atmospheric pressure and visual silence, this work layers pale mineral pigment over a fractured graphite ground. Veldt’s surface appears almost empty from a distance, yet up close reveals delicate interruptions, scratches, and soft abrasions that suggest memory as something physically eroded.',
    image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 01',
    tags: ['Current', 'Painting', 'Atmosphere']
  },
  {
    id: 'room-without-witness',
    title: 'Room Without Witness',
    artist: 'Elias Nohr',
    year: 2023,
    price: 22000,
    dimensions: '148 × 112 cm',
    medium: 'Pigment print and linen mount',
    description: 'Nohr constructs a psychological interior from shadow, linen, and repeated architectural edges. The image resists narrative, offering instead a measured tension between absence and occupation. Its quiet geometry feels institutional, but the softened boundaries imply a private history just beyond the visible frame.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 02',
    tags: ['Current', 'Photography', 'Architecture']
  },
  {
    id: 'index-of-salt',
    title: 'Index of Salt',
    artist: 'Signe Arlo',
    year: 2022,
    price: 14900,
    dimensions: '132 × 96 cm',
    medium: 'Salt wash, powdered stone, and binder on panel',
    description: 'Built from powdered stone, salt wash, and oxidized binder, this piece documents the slow conversion of matter into surface. Arlo treats corrosion as a language, allowing subtle blooms and stains to accumulate like marginal notes in an archaeological ledger.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 01',
    tags: ['Archive', 'Material', 'Surface']
  },
  {
    id: 'after-the-white-room',
    title: 'After the White Room',
    artist: 'Jonah Rhee',
    year: 2025,
    price: 31500,
    dimensions: '180 × 130 cm',
    medium: 'Archival pigment photograph',
    description: 'Rhee’s large-scale photographic composition captures a gallery after deinstallation, when the architecture briefly becomes the subject. Tape marks, dust lines, and uneven light become evidence of vanished works, turning the museum itself into a temporary archive of presence.',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 03',
    tags: ['Upcoming', 'Photography', 'Institution']
  },
  {
    id: 'soft-machinery',
    title: 'Soft Machinery',
    artist: 'Camille Osei',
    year: 2024,
    price: 27800,
    dimensions: '170 × 124 cm',
    medium: 'Thread, resin, and pigment on canvas',
    description: 'Osei merges textile logic with mechanical repetition, creating a gridded surface that appears both engineered and handmade. The work’s muted palette conceals a tactile intensity, where threads, resin, and pigment form a quiet argument between control and bodily imperfection.',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 04',
    tags: ['Current', 'Textile', 'Grid']
  },
  {
    id: 'threshold-study-6',
    title: 'Threshold Study No. 6',
    artist: 'Anton Mirek',
    year: 2021,
    price: 12600,
    dimensions: '96 × 54 cm',
    medium: 'Oil and charcoal on birch panel',
    description: 'A narrow composition of layered blacks and warm greys, this study explores the architectural threshold as an emotional condition. Mirek’s restrained marks create a sense of waiting, as if the work is less an image than a pause before entering another room.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 02',
    tags: ['Archive', 'Painting', 'Threshold']
  },
  {
    id: 'line-remembered-twice',
    title: 'A Line Remembered Twice',
    artist: 'Noa Kessler',
    year: 2020,
    price: 16200,
    dimensions: '110 × 82 cm',
    medium: 'Graphite on museum rag',
    description: 'Kessler’s drawing repeats a single wavering line until it becomes terrain. Graphite density shifts almost imperceptibly, producing a meditation on repetition, doubt, and the instability of memory. The work rewards slow viewing and resists immediate photographic comprehension.',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 04',
    tags: ['Archive', 'Drawing', 'Memory']
  },
  {
    id: 'black-plinth-morning',
    title: 'Black Plinth, Morning',
    artist: 'Theo Ansel',
    year: 2025,
    price: 34000,
    dimensions: '190 × 142 cm',
    medium: 'Gelatin silver photograph',
    description: 'Ansel photographs a sculptural plinth before an exhibition opens, transforming a support object into a monument. The morning light is severe and architectural, emphasizing surface dust, chipped corners, and the fragile authority of display systems usually meant to disappear.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 03',
    tags: ['Upcoming', 'Photography', 'Display']
  },
  {
    id: 'minor-weather',
    title: 'Minor Weather',
    artist: 'Leila Moravec',
    year: 2023,
    price: 19700,
    dimensions: '150 × 104 cm',
    medium: 'Pigment and wash on linen panel',
    description: 'Moravec’s layered linen panel captures subtle shifts in humidity, tone, and touch. Its washed greys and earth pigments produce an atmosphere that feels meteorological rather than pictorial, suggesting weather as something that can happen quietly inside a room.',
    image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 01',
    tags: ['Current', 'Atmosphere', 'Painting']
  },
  {
    id: 'study-for-an-unlit-archive',
    title: 'Study for an Unlit Archive',
    artist: 'Pavel Ionescu',
    year: 2024,
    price: 25300,
    dimensions: '158 × 116 cm',
    medium: 'Casein and charcoal on board',
    description: 'This work imagines an archive without electricity: shelves, boxes, labels, and documents reduced to tonal masses. Ionescu’s composition is austere but deeply tactile, using darkness not as drama but as a method of withholding information.',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 02',
    tags: ['Current', 'Archive', 'Darkness']
  },
  {
    id: 'the-measured-silence',
    title: 'The Measured Silence',
    artist: 'Renée Tal',
    year: 2022,
    price: 29100,
    dimensions: '176 × 132 cm',
    medium: 'Oil, chalk, and wax on canvas',
    description: 'Tal’s work uses negative space as its primary material. A small cluster of marks occupies the lower edge of the canvas, making the surrounding field feel monumental. The result is a disciplined composition about scale, restraint, and the ethics of looking.',
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 04',
    tags: ['Archive', 'Scale', 'Silence']
  },
  {
    id: 'north-wall-fragment',
    title: 'North Wall Fragment',
    artist: 'Ilya Sato',
    year: 2025,
    price: 17800,
    dimensions: '124 × 92 cm',
    medium: 'Photographic transfer and chalk on panel',
    description: 'Sato isolates a section of a museum wall, preserving shadows left by previous installations. The piece blurs documentation and abstraction, asking whether absence can become collectible. Its surface is spare, but its emotional charge lies in what has been removed.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=80',
    room: 'Room 03',
    tags: ['Upcoming', 'Wall', 'Absence']
  }
]);

export type Artwork = z.infer<typeof artworkSchema>;
