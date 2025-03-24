export interface Ring {
  id: string;
  name: string;
  power: string;
  bearer: string;
  forger: string;
  imageUri: string;
}

export interface RingCreateSchema {
  name: string;
  power: string;
  bearer: string;
  forger: string;
  imageUri: string;
}
