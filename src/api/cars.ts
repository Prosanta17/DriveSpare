import type { Car } from "../types/Car";


export const fetchCars = async (): Promise<Car[]> => {
  const response = await fetch("https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars");
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return await response.json();
};

export const fetchCarById = async (id: string) => {
  const response = await fetch(`https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars/${id}`);
  if (!response.ok) throw new Error("Failed to fetch car details");
  return response.json();
};

export const fetchCarTypes = async (): Promise<string[]> => {
  const response = await fetch("https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars/types");
  if (!response.ok) throw new Error("Failed to fetch car types");
  return response.json();
};

export const fetchCarTags = async (): Promise<string[]> => {
  const res = await fetch("https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars/tags");
  if (!res.ok) throw new Error("Failed to fetch car tags");
  return res.json();
};

export const fetchFilteredCars = async (
  carType?: string,
  tags?: string[]
): Promise<Car[]> => {
  const params = new URLSearchParams();
  if (carType) params.append("carType", carType);
  if (tags?.length) {
    params.append("tags", tags.join(','));
  }
  const res = await fetch(
    `https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars?${params.toString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch filtered cars");
  return res.json();
};

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

  const res = await fetch(
    `https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars?${params.toString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch sorted cars");
  return res.json();
};

