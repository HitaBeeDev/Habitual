import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import articles from "./articles";

function ArticlesSection() {
  return (
    <div className="grid grid-rows-2 gap-3 h-full">
      {articles.map((article) => (
        <div
          key={article.id}
          className=" text-colorA1 p-5 font-medium rounded-md shadow-xl bg-colorA4 text-md flex flex-col justify-between"
        >
          <p>{article.content}</p>
          <div className="self-end mt-2">
            <button className="text-xs w-6 h-6 bg-colorD4 rounded-md flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-3 h-3 text-colorA1 hover:text-colorA5"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticlesSection;
