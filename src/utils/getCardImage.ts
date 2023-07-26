import Comet from "../assets/images/cards/comet.svg";
import Moon from "../assets/images/cards/moon.svg";
import Star from "../assets/images/cards/star.svg";
import Sun from "../assets/images/cards/sun.svg";

export const getCardImage = (image: string): string => {
    switch (image) {
        case "comet":
            return Comet;
        case "moon":
            return Moon;
        case "star":
            return Star;
        case "sun":
            return Sun;
    }
    return "";
};
