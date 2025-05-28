import React, { useEffect, useState } from "react";
import { Button, Card, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchCarTags, fetchCarTypes } from "../api/cars";

const AddcarForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    carType: "",
    tags: [] as string[],
    imageUrl: "",
  });

  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarTypes()
      .then(setCarTypes)
      .catch(() => message.error("Failed to load car types"));

    fetchCarTags()
      .then(setTagOptions)
      .catch(() => message.error("Failed to load tags"));
  }, []);

  const validateForm = () => {
    const { name, carType, tags, imageUrl, description } = formData;
    if (!name || name.length > 50) {
      message.error("Car name is required and must be ≤ 50 characters.");
      return false;
    }
    if (description.length > 200) {
      message.error("Description must be ≤ 200 characters.");
      return false;
    }
    if (!carType) {
      message.error("Car type is required.");
      return false;
    }
    if (!tags.length) {
      message.error("At least one tag must be selected.");
      return false;
    }
    if (!imageUrl) {
      message.error("Image URL is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
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

  return (
    <div className="w-4/5 mx-auto">
      <Card className="addcar-form">
        <div className="mb-4">
          <label htmlFor="name" className="block text-xs mb-2">
            Car name<span className="text-danger">*</span>
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            maxLength={50}
            className="rounded-full text-xs h-12 px-4"
            size="large"
            placeholder="Enter car name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-xs mb-2">
            Description
          </label>
          <TextArea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            maxLength={200}
            className="rounded-2xl text-xs px-4"
            placeholder="Enter here"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="carType" className="block text-xs mb-2">
            Car type<span className="text-danger">*</span>
          </label>
          <Select
            id="carType"
            value={formData.carType}
            showSearch
            placeholder="Select"
            optionFilterProp="label"
            onChange={(value) => setFormData({ ...formData, carType: value })}
            className="rounded-select text-xs h-12 w-full"
            options={(carTypes || []).map((type: string) => ({
              label: type.charAt(0).toUpperCase() + type.slice(1),
              value: type,
            }))}
          />
        </div>
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
            onChange={(value) => setFormData({ ...formData, tags: value })}
            options={(tagOptions || []).map((tag: string) => ({
              label: tag
                .split("_")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" "),
              value: tag,
            }))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-xs mb-2">
            Car Image URL<span className="text-danger">*</span>
          </label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            className="rounded-full text-xs h-12 px-4"
            size="large"
            placeholder="Enter here"
          />
        </div>
        <div className="text-center">
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
