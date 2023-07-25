import { ICardsGridProps } from "../../../interfaces/cards";
import { Card } from "./card";

export const CardsGrid = ({cards, gameState, isFlipping, handleCardClick}:ICardsGridProps) => {
    return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center w-screen max-w-full md:max-w-[900px] ">
        {cards.map((card, index) => {
            return (
                <button
                    key={index}
                    onClick={() => void handleCardClick(index)}
                    className={`border-0 outline-0 h-40 w-full max-w-[200px] max-h-[200px] ${
                        gameState.state[index]
                            ? `cursor-default`
                            : ""
                    }`}
                    disabled={isFlipping}
                >
                    <Card
                        state={
                            gameState.state[index]
                        }
                        image={card}
                    />
                </button>
            );
        })}
    </div>
}