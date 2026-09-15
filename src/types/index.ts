export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  image: string;
  model?: string;
  description: string;
}

export interface Artist {
  id: string;
  slug: string;
  nom: string;
  ville: string;
  discipline: string;
  biographie: string;
  portrait: string;
  oeuvres: Artwork[];
}

export interface Exposition {
  id: string;
  titleKey: string;
  descKey: string;
  artistsKey: string;
  image: string;
  lieuKey: string;
  dateDebut: string;
  dateFin: string;
  status: 'current' | 'upcoming' | 'past';
  slug?: string;
}
