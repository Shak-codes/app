import React, { useState, useEffect } from "react";

interface InputWatcherProps {
  focus: "OTHER" | "PASSWORD" | "NONE";
  emailLength: number;
  watchImgs: string[];
  hideImgs: string[];
}

const InputWatcher: React.FC<InputWatcherProps> = ({ focus, emailLength, watchImgs, hideImgs }) => {
  const [currentImg, setCurrentImg] = useState<string | null>(null);
  const [prevFocus, setPrevFocus] = useState<"OTHER" | "PASSWORD" | "NONE">("NONE");

  useEffect(() => {
    if (!watchImgs.length || !hideImgs.length) return;

    if (focus === "NONE" && prevFocus !== "NONE") {
      [...watchImgs].slice(0, 4).reverse().forEach((img, idx) => {
        setTimeout(() => setCurrentImg(img), idx * 50)
      })
    }
    else if (focus === "NONE") setCurrentImg(watchImgs[0]);
    else if (focus === "OTHER" && prevFocus === "PASSWORD") {
      [...hideImgs].reverse().forEach((img, index) => {
        setTimeout(() => setCurrentImg(img), index * 50);
      });
    } else if (focus === "OTHER" && emailLength === 0) {
      [...watchImgs].slice(0, 4).forEach((img, idx) => {
        setTimeout(() => setCurrentImg(img), idx * 50)
      })
    } else if (focus === "OTHER") {
      const index = Math.min(4+Math.floor(emailLength/1.9), 20);
      setCurrentImg(watchImgs[index]);
    } else {
      hideImgs.forEach((img, index) => {
        setTimeout(() => setCurrentImg(img), index * 50);
      });
    }

    setPrevFocus(focus);
  }, [focus, emailLength, watchImgs, hideImgs]);

  // Fallback image
  const fallbackImg = watchImgs.length ? watchImgs[0] : "";

  return (
    <img
      src={currentImg ?? fallbackImg}
      className="rounded-full"
      width={130}
      height={130}
      tabIndex={-1}
      alt="Reactive Animal"
    />
  );
};

export default InputWatcher;
