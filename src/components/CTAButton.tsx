import { motion } from "framer-motion";
import { ICTAButtonProps } from "../interfaces/CTAbutton";

export const CTAButton = ({ buttonText, onButtonClick }: ICTAButtonProps) => {

  const bounceAnimation = {
    y: [0, -10, -0], // An array of y values representing the animation loop
    transition: {
      repeat: Infinity, // Repeat the animation infinitely
      duration: 1, // Duration of each bounce in seconds
    },
  };
	return (
		<motion.div
			initial={{ opacity: 0, y: 300 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.9 }}
		>
			<motion.button
                className="bg-lime-600 px-10 py-5 text-white"
				whileHover={ bounceAnimation
				}
				onClick={onButtonClick}
			>
				{buttonText}
			</motion.button>
		</motion.div>
	);
};
