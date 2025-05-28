export interface Car {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    carType: 'automatic' | 'manual';
    tags?: string[];   
    engine?: string;
    type?: string;
    style?: string;
    createdAt?: string;
  }