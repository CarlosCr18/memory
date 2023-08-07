import "./index.css";
import { useGame } from "./hooks/useGame";
import { AudioProvider } from "./services/audioService";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Start/Start";
import Game from "./views/Game/view/Game";
import End from "./views/End";

function App() {
    const {
        gameEndStatus,
        checkForWin,
        updateGameState,
        lastStatus,
        reset,
        cards,
        gameState,
    } = useGame();
    return (
        <main className="max-w-screen-xl m-auto">
            <AudioProvider>
                <Router>
                    <Routes>
                        <Route
                            path="/game"
                            element={
                                <Game
                                    gameState={lastStatus}
                                    checkForWin={checkForWin}
                                    updateGameState={updateGameState}
                                    cards={cards}
                                />
                            }
                        />
                        <Route
                            path="/result"
                            element={
                                <End
                                    gameEndStatus={gameEndStatus}
                                    gameEndState={lastStatus}
                                    reset={reset}
                                    gameState={gameState}
                                    cards={cards}
                                />
                            }
                        />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Router>
            </AudioProvider>
        </main>
    );
}

export default App;
