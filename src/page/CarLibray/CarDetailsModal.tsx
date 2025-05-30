import { Modal, Tag, Skeleton } from "antd";
import type { Car } from "../../types/Car";
import { useState, useEffect } from "react";
import placeholderImg from "../../assets/car-placeholder.jpg";

// Props interface for CarDetailsModal component
interface CarDetailsModalProps {
  open: boolean;
  onClose: () => void;
  car: Car | null;
  loading: boolean;
}

// CarDetailsModal component displays detailed information about a car
const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  open,
  onClose,
  car,
  loading,
}) => {
  // Initialize imgSrc as empty string to store the image URL
  const [imgSrc, setImgSrc] = useState<string>("");

  // If car has an imageUrl, use it; otherwise use placeholder image
  useEffect(() => {
    if (car?.imageUrl) {
      setImgSrc(car.imageUrl);
    } else {
      setImgSrc(placeholderImg);
    }
  }, [car]);

  return (
    // Modal component from antd library
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      className="details-modal"
    >
      {/* Show loading skeleton when loading or no car data */}
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
        // Display car details when data is available
        <div>
          {/* Car name header */}
          <h2 className="text-2xl md:text-4xl font-bold font-oswald mt-3 mb-5">
            {car.name}
          </h2>
          {/* Car image with fallback to placeholder on error */}
          <img
            src={imgSrc}
            alt={car.name}
            className="w-full h-72 object-cover rounded-lg mb-4"
            onError={() => setImgSrc(placeholderImg)}
            loading="lazy"
          />
          {/* Car type tag (automatic/manual) */}
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
          {/* Car description section */}
          <h3 className="font-bold uppercase text-sm mb-2">Description</h3>
          <p className="text-xs mb-3">{car.description}</p>
          <hr />
          {/* Car specifications section with tags */}
          <div className="my-3">
            <h3 className="font-bold uppercase text-sm mb-2">SPECIFICATIONS</h3>
            {car.tags?.map((tag) => (
              <Tag key={tag} className="border-primary">
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Tag>
            ))}
          </div>
          {/* Last updated timestamp */}
          <p className="text-xs text-gray-500 italic">
            Last Updated:{" "}
            {car.createdAt
              ? new Date(car.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }) +
                " | " +
                new Date(car.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Unknown"}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default CarDetailsModal;
