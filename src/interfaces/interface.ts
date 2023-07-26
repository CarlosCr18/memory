import { ICardImage, ICardState } from "./cards";
import { ICheckForWin, IRevealAndUpdateCard } from "./gameFunctions";

export type IScreens = "Start" | "Game" | "End";
export type gameEndStatus = "Win" | "Lose";

export type IGameAction = "Match" | "Reveal";

export interface IEndViewProps {
    gameEndStatus: gameEndStatus;
    gameEndState: IGameState;
    gameState: IGameState[];
    cards: ICardImage[];
    reset(): void;
}

export interface IGameViewProps {
    gameState: IGameState;
    updateGameState: ({
        state,
        timeOut,
        errors,
        matches,
        clickedOn,
        time,
        action,
        cardImage,
    }: IRevealAndUpdateCard) => Promise<void>;
    checkForWin: ({ state, time }: ICheckForWin) => boolean;
    cards: ICardImage[];
}

export interface IGameState {
    clickedOn: ({ index: number; card: ICardImage } | null)[];
    time: number;
    errors: number;
    matches: number;
    state: ICardState[];
    action: IGameAction;
}
