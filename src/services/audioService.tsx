import React, { createContext, useContext, useState } from "react";
import CorrectSound from "../assets/sounds/correct.mp3";
import IncorrectSound from "../assets/sounds/incorrect.mp3";
import TickingSound from "../assets/sounds/ticking.mp3";
import BackgroundSound from "../assets/sounds/background.mp3";

type AudioFile = {
    key: string;
    src: string;
};

const audioFiles: AudioFile[] = [
    { key: "correct", src: CorrectSound },
    { key: "incorrect", src: IncorrectSound },
    { key: "ticking", src: TickingSound },
    { key: "background", src: BackgroundSound },
];

const AudioContext = createContext<AudioContextType | null>(null);

type AudioContextType = {
    audios: Map<string, HTMLAudioElement>;
    setAudio: (key: string, loop?: boolean) => void;
    playByKey: (key: string) => void;
    pauseByKey: (key: string) => void;
    stopAll: () => void;
};

export const useAudio = (): AudioContextType => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};
interface Props {
    children: React.ReactNode;
}
export const AudioProvider: React.FC<Props> = ({ children }) => {
    const [audios, setAudios] = useState<Map<string, HTMLAudioElement>>(
        new Map()
    );

    const setAudioByKey = (key: string, loop = false) => {
        const audioFile = audioFiles.find((file) => file.key === key);
        if (audioFile) {
            const newAudio = new Audio(audioFile.src);
            newAudio.addEventListener("ended", () => {
                if (loop) {
                    newAudio.currentTime = 0;
                    newAudio.play();
                } else {
                    pause(key);
                }
            });

            // Add the new audio instance to the map
            setAudios((prevAudios) => new Map(prevAudios).set(key, newAudio));
        }
    };

    const playByKey = (key: string) => {
        const audioFile = audios.get(key);
        if (audioFile) {
            audioFile.play();
        }
    };

    const pause = (key?: string) => {
        if (key) {
            const audioInstance = audios.get(key);
            if (audioInstance) {
                audioInstance.pause();
            }
        }
    };

    const stopAll = () => {
        audios.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
        setAudios(new Map());
    };

    return (
        <AudioContext.Provider
            value={{
                audios,
                setAudio: setAudioByKey,
                playByKey,
                pauseByKey: pause,
                stopAll,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
