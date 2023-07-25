import SoundOn from "../../assets/images/icons/soundon.svg";
import SoundOff from "../../assets/images/icons/soundoff.svg";
import BackgroundSound from "../../assets/sounds/background.mp3"
import { useRef, useState } from "react";

export const AudioButton = () => {
	const [sound, setSound] = useState<"On" | "Off">("Off");
    const audioRef = useRef<HTMLAudioElement>(null)
	return (
        <>
            <button
                onClick={() => {
                    if(sound == "Off"){
                        setSound("On");
                        if(audioRef.current){
                            audioRef.current.play()
                        }
                    }else{
                        setSound("Off");
                        if(audioRef.current){
                            audioRef.current.pause()
                        }
                    }

                    
                }}
                className="w-[40px] h-[40px] absolute top-[2rem] right-[2rem]"
            >
                <img
                    className="object-contain w-full h-full"
                    src={sound == "On" ? SoundOn : SoundOff}
                />
            </button>
            <audio ref={audioRef} src={BackgroundSound}/>
        </>
	);
};
