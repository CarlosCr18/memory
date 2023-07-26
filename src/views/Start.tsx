import { motion } from "framer-motion";
import Logo from "../assets/images/logo.svg";
import { CTAButton } from "../components/CTAButton";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate("/Game");
    };
    return (
        <section className="flex flex-col justify-center items-center bg-white py-[5rem] gap-4">
            <motion.div
                className="max-w-screen-sm mx-auto p-4 w-[100%]"
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <img
                    className="object-cover w-full h-full"
                    src={Logo}
                    alt="logo"
                />
            </motion.div>
            <CTAButton
                buttonText="Start game"
                onButtonClick={handleButtonClick}
            />
        </section>
    );
};

export default StartScreen;
