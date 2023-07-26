export interface IGameCountDownProps {
    onTimeEnd(): void;
    currentTime: React.MutableRefObject<number>;
}
