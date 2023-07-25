
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
		<motion.div
			whileHover={opacityAnimation}
			initial={state ? { rotateY: 0 } : {}}
			animate={state ? { rotateY: 180 } : {}}
			transition={{ duration: 0.6 }}
			className="w-full h-full shadow-md"
		>
			{state ? (
				<img
					className="object-contain w-full h-full p-5"
					src={getCardImage(image)}
				/>
			) : (
				<div className="bg-cyan-700 text-amber-400 h-full w-full flex justify-center items-center text-7xl">
					?
				</div>
			)}
		</motion.div>
	);
};
