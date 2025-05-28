import { Modal, Tag, Skeleton } from "antd";
import type { Car } from "../types/Car";
import { useState, useEffect } from "react";
import placeholderImg from "../assets/car-placeholder.jpg";

interface CarDetailsModalProps {
  open: boolean;
  onClose: () => void;
  car: Car | null;
  loading: boolean;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  open,
  onClose,
  car,
  loading,
}) => {
  // Initialize imgSrc as empty string
  const [imgSrc, setImgSrc] = useState<string>("");

  // Update imgSrc whenever car changes
  useEffect(() => {
    if (car?.imageUrl) {
      setImgSrc(car.imageUrl);
    } else {
      setImgSrc(placeholderImg);
    }
  }, [car]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      className="details-modal"
    >
      {loading || !car ? (
        <>
          <Skeleton active paragraph={{ rows: 0 }} />
          <Skeleton.Image
            style={{
              width: "100%",
              height: 288,
              borderRadius: "8px 8px 0 0",
              marginBottom: 15,
            }}
            active
          />
          <Skeleton active paragraph={{ rows: 6 }} />
        </>
      ) : (
        <div>
          <h2 className="text-4xl font-bold font-oswald mt-3 mb-5">
            {car.name}
          </h2>
          <img
            src={imgSrc}
            alt={car.name}
            className="w-full h-72 object-cover rounded-lg mb-4"
            onError={() => setImgSrc(placeholderImg)}
            loading="lazy"
          />
          <div className="mb-3">
            <Tag
              color={car.carType === "automatic" ? "#F5E7D0" : "#D6F9DB"}
              className="text-xs"
              style={{
                color: car.carType === "automatic" ? "#997C4C" : "#0DA900",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              {car.carType.charAt(0).toUpperCase() + car.carType.slice(1)}
            </Tag>
          </div>
          <h3 className="font-bold uppercase text-sm mb-2">Description</h3>
          <p className="text-xs mb-3">{car.description}</p>
          <hr />
          <div className="my-3">
            <h3 className="font-bold uppercase text-sm mb-2">SPECIFICATIONS</h3>
            {car.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic">
            Created on:{" "}
            {car.createdAt
              ? new Date(car.createdAt).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default CarDetailsModal;
