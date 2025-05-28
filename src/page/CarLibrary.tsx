import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import CarCard from "../components/CarCard";
import CarDetailsModal from "../components/CarDetailsModal";
import FilterModal from "../components/FilterModal";
import NoResult from "../assets/no-result.png";

// Import API functions and types
import {
  fetchCarById,
  fetchCars,
  fetchCarTags,
  fetchCarTypes,
  fetchFilteredCars,
} from "../api/cars";
import type { Car } from "../types/Car";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import FilterIcon from "../components/FilterIcon";
import ShortIcon from "../components/ShortIcon";

// Interface for sort fields
interface SortFields {
  name: "name";
  createdAt: "createdAt";
}

const CarLibrary: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [carDetailLoading, setCarDetailLoading] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<keyof SortFields>("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  // Handle sorting logic
  const toggleSort = (field: keyof SortFields): void => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

  // Dropdown menu items for sorting
  const menuItems: MenuProps["items"] = [
    {
      key: "sortByName",
      label: (
        <button
          onClick={() => toggleSort("name")}
          className="w-full flex items-center font-semibold"
        >
          Sort by {sortBy === "name" && sortOrder === "DESC" ? "A-Z" : "Z-A"}
          {sortBy === "name" &&
            (sortOrder === "ASC" ? (
              <span className="ml-2">↓</span>
            ) : (
              <span className="ml-2">↑</span>
            ))}
        </button>
      ),
    },
    {
      key: "sortByDate",
      label: (
        <button
          onClick={() => toggleSort("createdAt")}
          className="w-full flex items-center font-semibold"
        >
          Sort by Date Modified
          {sortBy === "createdAt" &&
            (sortOrder === "ASC" ? (
              <span className="ml-2">↓</span>
            ) : (
              <span className="ml-2">↑</span>
            ))}
        </button>
      ),
    },
  ];

  // Fetch cars on sort change
  useEffect(() => {
    const loadCars = async (): Promise<void> => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        query.append("sortBy", sortBy);
        query.append("sortOrder", sortOrder);
        const { data } = await axios.get(
          `https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars?${query.toString()}`
        );
        setCars(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, [sortBy, sortOrder]);

  // Fetch car types and tags on component mount
  useEffect(() => {
    fetchCarTypes().then(setCarTypes);
    fetchCarTags().then(setTags);
  }, []);

  // Handle filter application
  const handleApplyFilters = (): void => {
    setIsFilterModalOpen(false);
    setLoading(true);
    fetchFilteredCars(selectedType, selectedTags)
      .then(setCars)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // Reset filters
  const handleResetFilters = (): void => {
    setSelectedType(undefined);
    setSelectedTags([]);
    fetchCars().then(setCars);
    setIsFilterModalOpen(false);
  };

  // Handle car card click
  const handleCardClick = async (id: string): Promise<void> => {
    setModalOpen(true);
    setCarDetailLoading(true);
    try {
      const car = await fetchCarById(id);
      setSelectedCar(car);
    } catch (err) {
      console.error(err);
    } finally {
      setCarDetailLoading(false);
    }
  };

  // Handle car deletion
  const handleDelete = (id: string): void => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  // Filter cars based on search term
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-10">
      {loading ? (
        // Loading spinner
        <div
          className="flex justify-center items-center"
          style={{ height: `calc(100vh - 100px)` }}
        >
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <>
          {/* Search and filter section */}
          <div className="mb-8 flex items-center justify-between">
            <Input
              size="large"
              placeholder="Search a car"
              prefix={<IoIosSearch className="text-xl" />}
              className="rounded-full shadow-search text-sm h-10 w-72 mr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center">
              <Button
                icon={<FilterIcon />}
                onClick={() => setIsFilterModalOpen(true)}
                className="rounded-full shadow-search text-sm h-10 font-semibold hover:border-primary focus:border-primary hover:text-primary"
              >
                Filter
              </Button>
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
                overlayClassName="short-dropdown"
              >
                <Button className="ml-2 rounded-full shadow-search text-sm h-10 font-semibold hover:border-primary focus:border-primary hover:text-primary">
                  {<ShortIcon />} Sort
                </Button>
              </Dropdown>
            </div>
          </div>

          {/* Car grid or no results message */}
          {filteredCars.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredCars.map((car) => (
                <div key={car.id} onClick={() => handleCardClick(car.id)}>
                  <CarCard car={car} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col justify-center items-center text-gray-500 mt-10"
              style={{ height: `calc(100vh - 300px)` }}
            >
              <img src={NoResult} alt="no-result" className="mx-auto mb-4" />
              <p className="font-semibold">
                No results found with '{searchTerm}'.
              </p>
            </div>
          )}

          {/* Add car button */}
          <Link
            to="/add-car"
            className="fixed bottom-10 right-10 md:inline-block bg-primary text-white text-base font-bold px-8 py-3 rounded-full hover:bg-purple-700 transition"
          >
            + Add Car
          </Link>

          {/* Modals */}
          <CarDetailsModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            car={selectedCar}
            loading={carDetailLoading}
          />

          <FilterModal
            open={isFilterModalOpen}
            carTypes={carTypes}
            tags={tags}
            selectedType={selectedType}
            selectedTags={selectedTags}
            onCancel={() => setIsFilterModalOpen(false)}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
            setSelectedType={setSelectedType}
            setSelectedTags={setSelectedTags}
          />
        </>
      )}
    </div>
  );
};
export default CarLibrary;
