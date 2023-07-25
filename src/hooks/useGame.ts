import { useState } from "react";
import { ICheckForWin, IRevealAndUpdateCard } from "../interfaces/gameFunctions";
import { IGameState, IScreens, gameEndStatus } from "../interfaces/interface";
import { ICardImage } from "../interfaces/cards";
import { shuffleArray } from "../utils/shuffleArray";

export interface IUseGameProps{
    setView: React.Dispatch<React.SetStateAction<IScreens>>;
}
export const useGame = ({setView}:IUseGameProps) => {

	const [gameState, setGameState] = useState<IGameState[]>([
		{
			clickedOn: [],
			time: 30,
			errors: 0,
			matches: 0,
			state: Array(8).fill(null),
			action: "Reveal",
		},
	]);
	const [gameEndStatus, setGameEndStatus] = useState<gameEndStatus>("Lose");
    const [cards, setCards] = useState<ICardImage[]>(
		shuffleArray([
			"comet",
			"comet",
			"moon",
			"moon",
			"star",
			"star",
			"sun",
			"sun",
		]))

    const updateGameState = async ({
        state,
        timeOut,
        errors,
        matches,
        clickedOn,
        time,
        action,
        cardImage,
    }: IRevealAndUpdateCard) => {
        console.log(state)
        setGameState((prevState) => {
            return [
                ...prevState,
                {
                    ...prevState[prevState.length - 1],
                    state,
                    ...(errors ? { errors } : {}),
                    ...(matches ? { matches } : {}),
                    ...(time ? { time } : {}),
                    ...(clickedOn !== undefined
                        ?   {
                            clickedOn: [
                                ...prevState[prevState.length - 1].clickedOn,
                                {
                                    index: clickedOn,
                                    card: cardImage ? cardImage : "comet",
                                },
                            ],
                        }
                        : null),
                    ...(action ? { action } : {}),
                },
            ];
        });
        await new Promise((resolve) => setTimeout(resolve, timeOut));
    };
    
    const checkForWin = ({
        state,
        time,
    }: ICheckForWin) => {
        if (time <= 0) {
            setGameEndStatus("Lose")
            setView("End");
            return;
        }
        const missingMatches = state.some((val) => !val);
        if (!missingMatches) {
            setGameEndStatus("Win")
            setView("End");
            return;
        }
    };

    const reset = () => {
        setGameState([
            {
                clickedOn: [],
                time: 30,
                errors: 0,
                matches: 0,
                state: Array(8).fill(null),
                action: "Reveal",
            },
        ])
        setGameEndStatus("Lose");
        setCards(shuffleArray([
			"comet",
			"comet",
			"moon",
			"moon",
			"star",
			"star",
			"sun",
			"sun",
		]))
    }


    return {gameState,gameEndStatus,checkForWin,updateGameState,reset, lastStatus: gameState[gameState.length-1], cards}
}