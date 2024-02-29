import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";
import articles from "./articles";

function TimerArticles() {
  const { currentArticleIndex } = useTimeTracker();

  return (
    <div>
      <h2 className="text-lg font-semibold text-colorF2">
        {articles[currentArticleIndex]?.title}
      </h2>
      <p className="text-sm font-normal mt-2 text-colorF3 leading-loose">
        {articles[currentArticleIndex]?.content}
      </p>
    </div>
  );
}

export default TimerArticles;
