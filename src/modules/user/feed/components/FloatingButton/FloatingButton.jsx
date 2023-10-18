import React, { useEffect, useState } from "react";

export const FloatingButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="button-container fixed bottom-5 right-5 select-none">
      {showButton && (
        <button
          className="bg-[#58c9e5] text-white text-[27px] border-none rounded-full w-12 h-12 transition-all hover:bg-[#66d8f5] dark:bg-[#ccc] dark:text-[#1e242a]"
          onClick={scrollToTop}
          title="Volver arriba"
        >
          ↑
        </button>
      )}
    </div>
  );
};
