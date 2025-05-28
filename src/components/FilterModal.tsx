import React from "react";
import { Modal, Tag, Collapse, Button } from "antd";
import { RiResetRightLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  open: boolean;
  carTypes: string[];
  tags: string[];
  selectedType?: string;
  selectedTags: string[];
  onCancel: () => void;
  onApply: () => void;
  onReset: () => void;
  setSelectedType: (type?: string) => void;
  setSelectedTags: (tags: string[]) => void;
}

const FilterModal: React.FC<Props> = ({
  open,
  carTypes,
  tags,
  selectedType,
  selectedTags,
  onCancel,
  onApply,
  onReset,
  setSelectedType,
  setSelectedTags,
}) => {
  const toggleTag = (tag: string): void => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Modal
      open={open}
      footer={[
        <Button
          key="apply"
          type="primary"
          onClick={onApply}
          style={{
            backgroundColor: "#9B72D2",
            borderColor: "#9B72D2",
            color: "white",
            borderRadius: "50px",
            padding: "12px 80px",
            height: "auto",
          }}
        >
          Apply
        </Button>,
      ]}
      onCancel={onCancel}
      width={500}
      centered
      className="filter-modal"
    >
      <a
        onClick={onReset}
        className="text-sm text-black inline-block mb-2 hover:text-primary"
      >
        <span className="flex items-center gap-2">
          <RiResetRightLine />
          Reset
        </span>
      </a>
      <div className="flex items-center gap-2 font-semibold text-base">
        Filter By
      </div>

      <Collapse
        defaultActiveKey={["type", "tags"]}
        expandIconPosition="end"
        expandIcon={({ isActive }: { isActive?: boolean }) => (
          <IoIosArrowDown
            style={{
              transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        )}
        ghost
        items={[
          {
            key: "type",
            label: (
              <span className="text-xs uppercase font-semibold">Car Type</span>
            ),
            children: (
              <div className="flex flex-wrap gap-1">
                {carTypes.map((type) => (
                  <Tag
                    key={type}
                    color="default"
                    onClick={() =>
                      setSelectedType(selectedType === type ? undefined : type)
                    }
                    style={{
                      cursor: "pointer",
                      padding: "0.2rem 1rem",
                      borderRadius: "1rem",
                      color: selectedType === type ? "#9B72D2" : "black",
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Tag>
                ))}
              </div>
            ),
          },
          {
            key: "tags",
            label: (
              <span className="text-xs uppercase font-semibold">Tags</span>
            ),
            children: (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    color="default"
                    onClick={() => toggleTag(tag)}
                    style={{
                      cursor: "pointer",
                      padding: "0.2rem 1rem",
                      borderRadius: "1rem",
                      color: selectedTags.includes(tag) ? "#9B72D2" : "black",
                    }}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Tag>
                ))}
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default FilterModal;
