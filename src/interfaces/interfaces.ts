export interface Camper {
  id: string;
  key: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  equipment?: string[];
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  kitchen: boolean;
  TV: boolean;
  bathroom: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: Gallery[];
  reviews: Reviews[];
}

export interface Reviews {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Gallery {
  thumb: string;
  original: string;
}

export interface CampersState {
  item: Camper | null;
  list: Camper[];
  isLoading: boolean;
  filters: filterParams;
  error: string | null;
  current: number;
  totalItems: number;
}

export interface FormValues {
  name: string;
  email: string;
  booking_date: string;
  comment?: string;
}

export interface filterParams {
  location: string;
  equipment: string[];
  form: string;
}

export interface FavoritesState {
  favorites: string[];
}
