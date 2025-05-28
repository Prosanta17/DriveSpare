import React, { useEffect, useState } from "react";
import { Button, Card, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchCarTags, fetchCarTypes } from "../api/cars";

// Define form data interface
interface FormData {
  name: string;
  description: string;
  carType: string;
  tags: string[];
  imageUrl: string;
}

// Define form errors interface
interface FormErrors {
  [key: string]: boolean;
}

const AddcarForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    carType: "",
    tags: [],
    imageUrl: "",
  });
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  // Fetch car types and tags on component mount
  useEffect(() => {
    fetchCarTypes()
      .then(setCarTypes)
      .catch(() => message.error("Failed to load car types"));

    fetchCarTags()
      .then(setTagOptions)
      .catch(() => message.error("Failed to load tags"));
  }, []);

  // Validate form fields before submission
  const validateForm = (): boolean => {
    const { name, carType, tags, imageUrl, description } = formData;
    let isValid = true;
    const newErrors: FormErrors = {};

    // Check name field
    if (!name || name.length > 50) {
      message.error("Car name is required and must be ≤ 50 characters.");
      newErrors.name = true;
      isValid = false;
    }
    // Check description length
    if (description.length > 200) {
      message.error("Description must be ≤ 200 characters.");
      newErrors.description = true;
      isValid = false;
    }
    // Check car type
    if (!carType) {
      message.error("Car type is required.");
      newErrors.carType = true;
      isValid = false;
    }
    // Check tags
    if (!tags.length) {
      message.error("At least one tag must be selected.");
      newErrors.tags = true;
      isValid = false;
    }
    // Check image URL
    if (!imageUrl) {
      message.error("Image URL is required.");
      newErrors.imageUrl = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(
        "https://cars-mock-api-new-6e7a623e6570.herokuapp.com/api/cars/",
        formData
      );
      message.success("Car added successfully!");
      navigate("/car-library");
    } catch (error) {
      message.error("Failed to add car.");
    } finally {
      setLoading(false);
    }
  };

  // Render form component
  return (
    <div className="w-full lg:w-3/5 mx-auto max-w-[575px]">
      <Card className="addcar-form">
        {/* Car name input field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-xs mb-2">
            Car name<span className="text-danger">*</span>
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: false });
            }}
            maxLength={50}
            className="rounded-full text-xs h-12 px-4"
            size="large"
            placeholder="Enter car name"
            status={errors.name ? "error" : ""}
          />
        </div>
        {/* Description textarea field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-xs mb-2">
            Description
          </label>
          <TextArea
            id="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setFormData({ ...formData, description: e.target.value });
              setErrors({ ...errors, description: false });
            }}
            maxLength={200}
            className="rounded-2xl text-xs px-4"
            placeholder="Enter here"
            autoSize={{ minRows: 3, maxRows: 5 }}
            status={errors.description ? "error" : ""}
          />
        </div>
        {/* Car type select field */}
        <div className="mb-4">
          <label htmlFor="carType" className="block text-xs mb-2">
            Car type<span className="text-danger">*</span>
          </label>
          <Select
            id="carType"
            showSearch
            placeholder="Select"
            optionFilterProp="label"
            onChange={(value: string) => {
              setFormData({ ...formData, carType: value });
              setErrors({ ...errors, carType: false });
            }}
            className="rounded-select  text-xs h-12 w-full"
            classNames={{
              popup: {
                root: "carType-Select",
              },
            }}
            status={errors.carType ? "error" : ""}
            options={(carTypes || []).map((type: string) => ({
              label: type.charAt(0).toUpperCase() + type.slice(1),
              value: type,
            }))}
          />
        </div>
        {/* Specifications/tags multi-select field */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-xs mb-2">
            Specifications<span className="text-danger">*</span>
          </label>
          <Select
            id="tags"
            mode="multiple"
            allowClear
            placeholder="Select"
            className="rounded-select text-xs min-h-12 w-full"
            value={formData.tags}
            classNames={{
              popup: {
                root: "carTag-Select",
              },
            }}
            onChange={(value: string[]) => {
              setFormData({ ...formData, tags: value });
              setErrors({ ...errors, tags: false });
            }}
            status={errors.tags ? "error" : ""}
            options={(tagOptions || []).map((tag: string) => ({
              label: tag
                .split("_")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" "),
              value: tag,
            }))}
          />
        </div>
        {/* Image URL input field */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-xs mb-2">
            Car Image URL<span className="text-danger">*</span>
          </label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, imageUrl: e.target.value });
              setErrors({ ...errors, imageUrl: false });
            }}
            className="rounded-full text-xs h-12 px-4"
            size="large"
            placeholder="Enter here"
            status={errors.imageUrl ? "error" : ""}
          />
        </div>
        {/* Submit button */}
        <div className="text-center mt-5 mb-3">
          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            style={{
              backgroundColor: "#9B72D2",
              borderColor: "#9B72D2",
              color: "white",
              borderRadius: "50px",
              padding: "12px 60px",
              height: "auto",
            }}
          >
            Add
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddcarForm;
