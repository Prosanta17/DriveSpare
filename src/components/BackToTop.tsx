import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

/**
 * BackToTop Component
 * Renders a button that appears when the user scrolls down and allows them to scroll back to the top
 */
const BackToTop: React.FC = () => {
  // State to control button visibility
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    // Handler to show/hide button based on scroll position
    const handleScroll = (): void => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Cleanup: remove event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to smoothly scroll to the top of the page
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
