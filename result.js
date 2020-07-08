import React, { useEffect, useState } from "react";
import "./home.css";
export default function Result(props) {
  const [cards, setCards] = useState(props);
  useEffect(() => {
    setCards(props);
  }, [props]);
  return (
    <div>
      <div className="result">
        {cards.result ? (
          props.result.cards.map((item) => {
            return (
              <div className="resultValue">
                <img src={item.card_images[0].image_url_small} />
              </div>
            );
          })
        ) : (
          <div>there is nothing to show</div>
        )}
      </div>
    </div>
  );
}
