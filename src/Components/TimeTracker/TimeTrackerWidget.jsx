import { useEffect, useState } from "react";
import homePageArticles from "./homePageArticles";

function TimeTrackerWidget() {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIndex(
        (prevIndex) => (prevIndex + 1) % homePageArticles.length
      );
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cursor-pointer p-6 bg-colorF4 rounded-md shadow-xl h-full">
      <div>
        <h2 className="text-lg font-semibold text-colorH3">
          {homePageArticles[currentArticleIndex]?.title}
        </h2>
        <p className="text-sm font-normal mt-2 text-colorI1 leading-loose">
          {homePageArticles[currentArticleIndex]?.content}
        </p>
      </div>
    </div>
  );
}

export default TimeTrackerWidget;
