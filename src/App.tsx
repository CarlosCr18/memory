import { useState } from "react";
import "./index.css";
import { IScreens } from "./interfaces/interface";
import { StartScreen } from "./views/Start";
import { EndScreen } from "./views/End";
import { GameScreen } from "./views/Game/view/Game";
import { useGame } from "./hooks/useGame";

function App() {
	const [view, setView] = useState<IScreens>("Start");
	const {gameEndStatus,checkForWin,updateGameState,lastStatus,reset,cards,gameState} = useGame({setView});
	return (
		<main className="max-w-screen-xl m-auto">
			{view === "Start" && <StartScreen setView={setView} />}
			{view === "Game" && (
				<GameScreen
				gameState={lastStatus}
				checkForWin={checkForWin}
				updateGameState={updateGameState}
				cards={cards}
				/>
			)}
			{view === "End" && (
				<EndScreen
					setView={setView}
					gameEndStatus={gameEndStatus}
					gameEndState={lastStatus}
					reset={reset}
					gameState={gameState}
					cards={cards}
				/>
			)}{" "}
		</main>
	);
}

export default App;
