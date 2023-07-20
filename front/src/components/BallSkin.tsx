import '../css/ballskin.css'

export const BallSkin = (): JSX.Element => {
    return (
        <div className="ball-skin">
            <img className="vector" alt="Vector" src="/svg/vector-left.svg" />
            <img className="rectangle" alt="ball" src="/svg/ball.svg" />
            <img className="vector" alt="Vector" src="/svg/vector-right.svg" />
        </div>
    );
};