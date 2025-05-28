import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IoIosSearch } from "react-icons/io";

import CarCard from "../components/CarCard";
import CarDetailsModal from "../components/CarDetailsModal";
import FilterModal from "../components/FilterModal";
import NoResult from "../assets/no-result.png";

import {
  fetchCars,
  fetchCarById,
  fetchCarTags,
  fetchCarTypes,
  fetchFilteredCars,
} from "../api/cars";
import type { Car } from "../types/Car";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

const FilterIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
  >
    <path
      d="M14.7436 0.615383H3.25646C2.09608 0.615383 1.51589 0.615383 1.15541 0.953598C0.794922 1.29181 0.794922 1.83616 0.794922 2.92485V3.49085C0.794922 4.34241 0.794922 4.7682 1.00793 5.12116C1.22093 5.47413 1.61008 5.69319 2.38837 6.13132L4.77854 7.47684C5.30074 7.77075 5.56183 7.91778 5.74878 8.08008C6.13809 8.41805 6.37776 8.81518 6.48636 9.30232C6.53851 9.53616 6.53851 9.80989 6.53851 10.3572V12.5476C6.53851 13.2939 6.53851 13.667 6.74521 13.958C6.95193 14.2489 7.31905 14.3924 8.05334 14.6795C9.59476 15.282 10.3655 15.5833 10.9136 15.2405C11.4616 14.8977 11.4616 14.1144 11.4616 12.5476V10.3572C11.4616 9.80989 11.4616 9.53616 11.5138 9.30232C11.6223 8.81518 11.862 8.41805 12.2513 8.08008C12.4382 7.91778 12.6993 7.77075 13.2216 7.47684L15.6117 6.13132C16.39 5.69319 16.7792 5.47413 16.9922 5.12116C17.2052 4.7682 17.2052 4.34241 17.2052 3.49085V2.92485C17.2052 1.83616 17.2052 1.29181 16.8447 0.953598C16.4842 0.615383 15.904 0.615383 14.7436 0.615383Z"
      stroke="black"
      strokeWidth="1.23077"
    />
  </svg>
);

const ShortIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6571 0C11.8426 0 12.0203 0.0730845 12.1494 0.202569L15.8065 3.86924C16.0702 4.13356 16.0635 4.55564 15.7916 4.81191C15.5197 5.06827 15.0856 5.06178 14.822 4.79742L12.3428 2.31182V11.3333C12.3428 11.7015 12.0358 12 11.6571 12C11.2784 12 10.9714 11.7015 10.9714 11.3333V2.31182L8.49224 4.79742C8.22865 5.06178 7.79455 5.06827 7.52264 4.81191C7.25074 4.55564 7.24406 4.13356 7.50774 3.86924L11.1649 0.202569C11.294 0.0730845 11.4716 0 11.6571 0ZM4.34285 0C4.72156 0 5.02857 0.29848 5.02857 0.666667V9.68818L7.50774 7.20258C7.77133 6.93822 8.20543 6.93173 8.47734 7.18809C8.74925 7.44436 8.75592 7.8664 8.49224 8.13076L4.83513 11.7974C4.70598 11.9269 4.52837 12 4.34285 12C4.15734 12 3.97973 11.9269 3.85058 11.7974L0.193444 8.13076C-0.0701994 7.8664 -0.063516 7.44436 0.208356 7.18809C0.480237 6.93173 0.914348 6.93822 1.17799 7.20258L3.65714 9.68818V0.666667C3.65714 0.29848 3.96415 0 4.34285 0Z"
      fill="black"
    />
  </svg>
);

const CarLibrary: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [carDetailLoading, setCarDetailLoading] = useState<boolean>(false);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState<"name" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  const toggleSort = (field: "name" | "createdAt") => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

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

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        query.append("sortBy", sortBy);
        query.append("sortOrder", sortOrder);
        const res = await fetch(
          `https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars?${query.toString()}`
        );
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, [sortBy, sortOrder]);

  useEffect(() => {
    fetchCarTypes().then(setCarTypes);
    fetchCarTags().then(setTags);
  }, []);

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
    setLoading(true);
    fetchFilteredCars(selectedType, selectedTags)
      .then(setCars)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleResetFilters = () => {
    setSelectedType(undefined);
    setSelectedTags([]);
    fetchCars().then(setCars);
    setIsFilterModalOpen(false);
  };

  const handleCardClick = async (id: string) => {
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

  const handleDelete = (id: string) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-10">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <>
          <div className="mb-8 flex items-center justify-between">
            <Input
              size="large"
              placeholder="Search a car"
              prefix={<IoIosSearch className="text-xl" />}
              className="rounded-full shadow-search text-sm h-10 w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center">
              <Button
                icon={FilterIcon}
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
                  {ShortIcon} Sort
                </Button>
              </Dropdown>
            </div>
          </div>

          {filteredCars.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredCars.map((car) => (
                <div key={car.id} onClick={() => handleCardClick(car.id)}>
                  <CarCard car={car} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <img src={NoResult} alt="no-result" className="mx-auto mb-4" />
              <p className="font-semibold">
                No results found with '{searchTerm}'.
              </p>
            </div>
          )}

          <Link
            to="/add-car"
            className="hidden fixed bottom-10 right-10 md:inline-block bg-primary text-white text-base font-bold px-8 py-3 rounded-full hover:bg-purple-700 transition"
          >
            + Add Car
          </Link>

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
