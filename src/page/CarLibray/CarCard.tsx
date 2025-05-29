import { Card, Tag, Modal, message } from "antd";
import type { Car } from "../../types/Car";
import { useEffect, useRef, useState } from "react";
import placeholderImg from "../../assets/car-placeholder.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { deleteCar } from "../../api/cars";
import DeleteIcon from "../../components/Icons/DeleteIcon";

// Props interface definition
interface Props {
  car: Car;
  onDelete: (id: string) => void;
}

// CarCard component definition
const CarCard: React.FC<Props> = ({ car, onDelete }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState(placeholderImg);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Image load debouncing
  useEffect(() => {
    if (imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const img = new Image();
            img.onload = () => {
              setImgSrc(car.imageUrl);
              setLoading(false);
            };
            img.onerror = () => {
              setImgSrc(placeholderImg);
              setLoading(false);
            };
            img.src = car.imageUrl;
            observer.unobserve(imgRef.current as Element);
          }
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(imgRef.current);

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current as Element);
        }
      };
    }
  }, [car.imageUrl]);

  // Handle favorite toggle
  const handleFavorite = (e: any): void => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      console.log("Favorite car added");
    } else {
      console.log("Favorite car removed");
    }
  };

  // Modal control functions
  const showDeleteModal = (): void => {
    setIsModalOpen(true);
  };

  // Handle car deletion
  const handleDeleteConfirm = async (): Promise<void> => {
    setDeleting(true);
    try {
      await deleteCar(car.id);
      message.success(`${car.name} deleted successfully`);
      onDelete(car.id);
    } catch (error: unknown) {
      message.error("Failed to delete the car. Please try again.");
    } finally {
      setDeleting(false);
      setIsModalOpen(false);
    }
  };

  // Close modal
  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  // Render car card
  return (
    <>
      <Card
        loading={loading}
        hoverable
        cover={
          <img
            ref={imgRef}
            alt={car.name}
            src={imgSrc}
            className="h-48 w-full object-cover rounded-t-lg"
          />
        }
        className="w-full shadow-card relative card-block"
        style={{ borderRadius: 15 }}
      >
        {/* Favorite button */}
        <div className="absolute top-4 left-4">
          {isFavorite ? (
            <FaHeart
              className="text-base cursor-pointer"
              style={{ color: "#FFD700" }}
              onClick={handleFavorite}
            />
          ) : (
            <FaRegHeart
              className="text-base cursor-pointer"
              style={{ color: "black" }}
              onClick={handleFavorite}
            />
          )}
        </div>
        {/* Car details */}
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold line-clamp-1">{car.name}</h3>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
              e.stopPropagation();
              showDeleteModal();
            }}
            disabled={deleting}
            aria-label={`Delete ${car.name}`}
          >
            {<DeleteIcon />}
          </button>
        </div>
        <p className="text-xs line-clamp-2 min-h-8">{car.description}</p>
        {/* Car type tag */}
        <Tag
          color={car.carType === "automatic" ? "#F5E7D0" : "#D6F9DB"}
          className="absolute right-2 top-4 text-xs"
          style={{
            color: car.carType === "automatic" ? "#997C4C" : "#0DA900",
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          {car.carType.charAt(0).toUpperCase() + car.carType.slice(1)}
        </Tag>
      </Card>

      {/* Delete confirmation modal */}
      <Modal
        centered
        className="delete-modal"
        title={
          <span className="flex items-center flex-col gap-2">
            {<DeleteIcon />}
            <span className="font-semibold">Delete {car.name}?</span>
          </span>
        }
        open={isModalOpen}
        onOk={(e?: React.MouseEvent<HTMLElement>): void => {
          e?.stopPropagation?.();
          handleDeleteConfirm();
        }}
        onCancel={(e?: React.MouseEvent<HTMLElement>): void => {
          e?.stopPropagation?.();
          handleCancel();
        }}
        confirmLoading={deleting}
        okText="Delete"
        cancelText="Cancel"
        width={400}
        closable={false}
        okButtonProps={{
          style: {
            backgroundColor: "black",
            borderRadius: "50px",
            padding: "12px 40px",
            height: "auto",
          },
        }}
        cancelButtonProps={{
          style: {
            color: "black",
            borderRadius: "50px",
            padding: "12px 40px",
            height: "auto",
            borderColor: "black",
          },
        }}
      >
        <p className="mb-6 text-center">
          Are you sure you want to delete this car?
        </p>
      </Modal>
    </>
  );
};

export default CarCard;
