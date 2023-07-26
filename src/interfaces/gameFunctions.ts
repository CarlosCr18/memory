import { ICardImage, ICardState } from "./cards";
import { IGameAction } from "./interface";

export interface IRevealAndUpdateCard {
    state: ICardState[];
    timeOut: number;
    errors?: number;
    matches?: number;
    clickedOn?: number;
    cardImage?: ICardImage;
    time?: number;
    action?: IGameAction;
}

export interface ICheckForWin {
    state: ICardState[];
    time: number;
}

export interface IShuffleArray {}
