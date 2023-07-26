import { ICardImage } from "../interfaces/cards";

export const shuffleArray = (cardsArray: ICardImage[]): ICardImage[] => {
    const array = [...cardsArray];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
