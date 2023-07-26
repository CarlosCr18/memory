import SoundOn from "../../assets/images/icons/soundon.svg";
import SoundOff from "../../assets/images/icons/soundoff.svg";
import { useState } from "react";
import { useAudio } from "../../services/audioService";

export const AudioButton = () => {
    const [sound, setSound] = useState<"On" | "Off">("Off");
    const { playByKey, pauseByKey } = useAudio();

    return (
        <>
            <button
                onClick={() => {
                    if (sound == "Off") {
                        setSound("On");
                        playByKey("background");
                    } else {
                        setSound("Off");
                        pauseByKey("background");
                    }
                }}
                className="w-[40px] h-[40px] absolute top-[2rem] right-[2rem]"
            >
                <img
                    className="object-contain w-full h-full"
                    src={sound == "On" ? SoundOn : SoundOff}
                />
            </button>
        </>
    );
};
