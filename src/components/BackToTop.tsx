import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackTOTop: React.FC = () => {
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
          style={
            {
              // position: "fixed",
              // bottom: "20px",
              // right: "20px",
              // padding: "10px",
              // backgroundColor: "#000",
              // color: "#fff",
              // border: "none",
              // borderRadius: "50%",
              // cursor: "pointer",
              // width: "40px",
              // height: "40px",
            }
          }
        >
          <FaArrowUp />
        </Button>
      )}
    </>
  );
};

export default BackTOTop;
