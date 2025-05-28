import type { Car } from "../types/Car";
import axios from "axios";

// Fetches all cars from the API
export const fetchCars = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>("https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars");
  return response.data;
};

// Fetches a specific car by its ID
export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await axios.get<Car>(`https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars/${id}`);
  return response.data;
};

// Fetches all available car types
export const fetchCarTypes = async (): Promise<string[]> => {
  const response = await axios.get<string[]>("https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars/types");
  return response.data;
};

// Fetches all available car tags
export const fetchCarTags = async (): Promise<string[]> => {
  const response = await axios.get<string[]>("https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars/tags");
  return response.data;
};

// Fetches cars filtered by type and/or tags
export const fetchFilteredCars = async (
  carType?: string,
  tags?: string[]
): Promise<Car[]> => {
  const params = new URLSearchParams();
  if (carType) params.append("carType", carType);
  if (tags?.length) {
    params.append("tags", tags.join(','));
  }
  const response = await axios.get<Car[]>(
    `https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars?${params.toString()}`
  );
  return response.data;
};

// Fetches cars sorted by name or creation date, with optional filtering by type and tags
export const fetchSortedCars = async (
  sortBy: 'name' | 'createdAt',
  sortOrder: 'asc' | 'desc',
  carType?: string,
  tags?: string[]
): Promise<Car[]> => {
  const params = new URLSearchParams();
  params.append("sortBy", sortBy);
  params.append("sortOrder", sortOrder);
  if (carType) params.append("carType", carType);
  if (tags?.length) params.append("tags", tags.join(','));

  const response = await axios.get<Car[]>(
    `https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars?${params.toString()}`
  );
  return response.data;
};