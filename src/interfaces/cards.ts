import { IGameState } from "./interface";

export interface ICardsGridProps {
    cards: ICardImage[];
    gameState: IGameState;
    isFlipping: boolean;
    handleCardClick(cardIndex: number): Promise<void>;
}

export type ICardImage = "comet" | "moon" | "star" | "sun";
export type ICardState = null | "Reveal" | "Matched";

export interface ICardProps {
    state: ICardState;
    image: ICardImage;
}
