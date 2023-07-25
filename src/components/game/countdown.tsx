import { useRef } from "react";
import Countdown from "react-countdown";
import Ticking from "../../assets/sounds/ticking.mp3";
import { IGameCountDownProps } from "../../interfaces/countdown";

export const GameCountdown = ({
	onTimeEnd,
	currentTime,
}: IGameCountDownProps) => {
	const dateCountDown = useRef(new Date().getTime() + 30000);
	const TickingAudio = useRef<HTMLAudioElement>(null);
	const renderer = ({
		seconds,
		completed,
		milliseconds,
	}: {
		seconds: number;
		milliseconds: number;
		completed: boolean;
	}) => {
		if (completed) {
			onTimeEnd();
		}
		currentTime.current = seconds + milliseconds / 1000;
		if (
			(currentTime.current) == 10  &&
			TickingAudio.current !== null
		) {
			TickingAudio.current.play();
		}
		return (
			<p
				className={`absolute top-[2rem] left-1/2 transform -translate-x-1/2 text-6xl ${
					seconds < 10 ? "text-red-600" : ""
				}`}
			>
				{seconds}.{milliseconds / 100}s
			</p>
		);
	};
	return (
		<>
			<Countdown
				date={dateCountDown.current}
				renderer={renderer}
				intervalDelay={0}
				precision={1}
			/>
			<audio ref={TickingAudio} src={Ticking}></audio>
		</>
	);
};
