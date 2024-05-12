import { useState } from "react";

export const Header = ({ scrollData, recipeData, onRecipeClick }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const categories = recipeData ? [...new Set(recipeData.map((recipe) => recipe.category))] : [];
  // Check if recipeData exists before mapping over it

  return (
    <div>
      <header onClick={toggleNav}>
        <div className="marquee track content" role="presentation">
          {scrollData.map((item, index) => (
            <span
              key={index}
              style={{ fontWeight: index % 2 === 1 ? "bold" : "normal" }}
            >
              {item}
            </span>
          ))}
        </div>

        <div id="arrow-box" role="presentation">
          <ul className="head-arrows">
            <li>↓</li>
            <li>↓</li>
            <li>↓</li>
          </ul>
        </div>

        <div id="border" role="presentation"></div>
      </header>
      <nav
        onClick={toggleNav}
        className={isNavOpen ? "" : "open"}
        role="presentation"
      >
        <div id="nav-box" role="presentation">
          {categories.map((category) => (
            <div key={category} className="navSection">
              <h1>{category}</h1>
              {/* Render recipe titles as links under each category */}
              <div className="menuList">
                {recipeData
                  .filter((recipe) => recipe.category === category)
                  .map((recipe) => (
                    <button className="menuItem" href="#" onClick={() => onRecipeClick(recipe.id)}>
                        {recipe.title.toLowerCase()}!
                    </button>
                  ))}
              </div>
            </div>
          ))}

          <button id="hide-menu" onClick={toggleNav}>
            ↑
          </button>
        </div>
        <div id="border"></div>
        <div id="blank-space" onClick={toggleNav}></div>
      </nav>
    </div>
  );
};
