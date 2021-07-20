import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div style={{ position: "fixed", bottom: 25, right: 25 }}>
          <Button
            className="bg-info border-0 rounded-circle"
            onClick={scrollToTop}
          >
            <i className="text-dark fas fa-arrow-up fa-2x"></i>
          </Button>
        </div>
      )}
    </>
  );
}
