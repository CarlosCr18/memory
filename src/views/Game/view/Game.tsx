import { useRef, useState } from "react";
import { IGameViewProps } from "../../../interfaces/interface";
import { toast } from "react-toastify";
import { AudioButton } from "../../../components/game/audioButton";
import { GameCountdown } from "../../../components/game/countdown";
import { CardsGrid } from "../../../components/game/cards";

export const GameScreen = ({
	gameState,
	checkForWin,
	updateGameState,
	cards,
}: IGameViewProps) => {
	const [isFlipping, setIsFlipping] = useState(false);
	const currentTime = useRef(30);

	const handleCardClick = async (cardIndex: number) => {
		const currentGameState = { ...gameState };
		if (currentGameState.state[cardIndex]) return; //click on revealed or matched card

		setIsFlipping(true);
		const clickedOn = cardIndex;
		const time = currentTime.current;
		const state = [...currentGameState.state];
		const action = currentGameState.action;
		let errors = currentGameState.errors;
		let matches = currentGameState.matches;

		if (action == "Match") {
			//We find the revealed card index before we reveal the second card
			const revealedCardIndex = currentGameState.state.findIndex(
				(card) => card == "Reveal"
			);
			state[cardIndex] = "Reveal";
			await updateGameState({
				timeOut: 600,
				state: [...state],
				clickedOn,
				cardImage: cards[cardIndex],
			});
			toast.dismiss();
			const isMatch = cards[revealedCardIndex] == cards[cardIndex];
			if (isMatch) {
				matches++;
				state[cardIndex] = "Matched";
				state[revealedCardIndex] = "Matched";
				toast.success("It's a match!");
			} else {
				errors++;
				state[cardIndex] = null;
				state[revealedCardIndex] = null;
				toast.error("sorry, but this is not a match");
			}
			await updateGameState({
				timeOut: isMatch ? 0 : 600,
				state,
				errors,
				matches,
				time,
				clickedOn: undefined,
				action: "Reveal",
			});
			checkForWin({ time, state });
			setIsFlipping(false);
		} else {
			state[cardIndex] = "Reveal";
			await updateGameState({
				timeOut: 300,
				state,
				time,
				clickedOn,
				cardImage: cards[cardIndex],
				action: "Match",
			});
			toast.dismiss();
			setIsFlipping(false);
		}
	};

	const onTimeEnd = () => {
		checkForWin({
			time: 0,
			state: gameState.state,
		});
	};

	return (
		<section className="relative min-h-screen flex justify-center items-center p-2 md:p-5">
			<AudioButton />
			<GameCountdown onTimeEnd={onTimeEnd} currentTime={currentTime} />
			<CardsGrid
				cards={cards}
				gameState={gameState}
				isFlipping={isFlipping}
				handleCardClick={handleCardClick}
			/>
		</section>
	);
};
