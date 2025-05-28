import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <Button
          type="primary"
          shape="circle"
          onClick={scrollToTop}
          className="fixed bottom-4 right-4"
        >
          <FaArrowUp />
        </Button>
      )}
    </>
  );
};

export default BackToTop;
