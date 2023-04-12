import { useState } from "react";

export const useToggleText = (text: string, maxLength: number) => {
  const [showMore, setShowMore] = useState(() => {
    return text.length <= maxLength;
  });

  const toggleShowMore = () => {
    setShowMore((state) => !state);
  };

  const truncatedText = showMore ? text : text.slice(0, maxLength) + "...";

  return { truncatedText, toggleShowMore, isShowingMore: showMore };
};
