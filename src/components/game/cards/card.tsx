import { ICardProps } from "../../../interfaces/cards";
import { getCardImage } from "../../../utils/getCardImage";
import { motion } from "framer-motion";

export const Card = ({ state, image }: ICardProps) => {
    const opacityAnimation = {
        opacity: [0.9, 1, 0.9], // An array of y values representing the animation loop
        transition: {
            repeat: Infinity, // Repeat the animation infinitely
            duration: 1, // Duration of each bounce in seconds
        },
    };

    return (
        <div
            className={`"w-full h-full shadow-md flip-card ${
                state ? "flip-card-active" : ""
            }`}
        >
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <motion.div
                        whileHover={opacityAnimation}
                        className="bg-cyan-700 text-amber-400 h-full w-full flex justify-center items-center text-7xl"
                    >
                        ?
                    </motion.div>
                </div>

                <div className="flip-card-back">
                    <div className="w-full h-full shadow-md">
                        <img
                            className="object-contain w-full h-full p-5"
                            src={getCardImage(image)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
