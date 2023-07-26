import { motion } from "framer-motion";
import { CTAButton } from "../components/CTAButton";
import { IEndViewProps } from "../interfaces/interface";
import { useState } from "react";
import { CardsGrid } from "../components/game/cards";
import { useNavigate } from "react-router-dom";

const EndScreen = ({
    gameEndStatus,
    gameEndState,
    gameState,
    cards,
    reset,
}: IEndViewProps) => {
    const navigate = useNavigate();
    const [history, setHistory] = useState(false);
    const [count, setCount] = useState(0);
    const handleButtonClick = () => {
        reset();
        navigate("/Game");
    };

    const handleViewHistory = () => {
        setHistory(true);
    };

    const updateCount = (prev: number, next: number) => {
        if (prev + next < 0) {
            return prev;
        }
        if (prev + next > gameState.length - 1) {
            return prev;
        }
        return prev + next;
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-white py-[5rem] px-4 md:px-6 gap-10">
            <motion.div
                className="max-w-screen-md mx-auto p-4 w-[100%] text-center"
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
            >
                <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
                    {gameEndStatus == "Win"
                        ? `You did it!`
                        : `Oops you didn’t find them all`}
                </h2>
                <p>
                    <b>Errors:</b>
                    {` ${gameEndState.errors}`}
                </p>
                {gameEndStatus == "Win" && (
                    <>
                        <p>
                            <strong>Turns:</strong>
                            {` ${(gameEndState.clickedOn.length / 2).toFixed(
                                0
                            )}`}
                        </p>
                        <p>
                            <strong>Time left:</strong>
                            {` ${gameEndState.time.toFixed(1)}s`}
                        </p>
                    </>
                )}
                {gameEndStatus == "Lose" && (
                    <>
                        <p>
                            <strong>Turns:</strong>
                            {` ${(gameEndState.clickedOn.length / 2).toFixed(
                                0
                            )}`}
                        </p>
                        <p>
                            <strong>Matches:</strong>
                            {` ${gameEndState.matches}`}
                        </p>
                    </>
                )}
            </motion.div>
            <CTAButton
                buttonText="Play again"
                onButtonClick={handleButtonClick}
            />
            {!history && (
                <CTAButton
                    buttonText="View Game History"
                    onButtonClick={handleViewHistory}
                />
            )}
            {history && (
                <>
                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{
                                backgroundColor: "#4d7c0f",
                                color: "#fff",
                            }}
                            className="border w-[100px] p-4 border-lime-700"
                            onClick={() => {
                                setCount((prev) => updateCount(prev, -1));
                            }}
                        >
                            Previous
                        </motion.button>
                        <motion.button
                            whileHover={{
                                backgroundColor: "#4d7c0f",
                                color: "#fff",
                            }}
                            className="border w-[100px] p-4 border-lime-700"
                            onClick={() => {
                                setCount((prev) => updateCount(prev, 1));
                            }}
                        >
                            Next
                        </motion.button>
                    </div>

                    <CardsGrid
                        cards={cards}
                        gameState={gameState[count]}
                        isFlipping={true}
                        handleCardClick={async () => {}}
                    />
                </>
            )}
        </section>
    );
};

export default EndScreen;
