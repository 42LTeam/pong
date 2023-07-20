import '../css/playerskin.css'

export const PlayerSkin = (): JSX.Element => {
    return (
        <div className="player-skin">
            <img className="vector" alt="Vector" src="/svg/vector-left.svg" />
            <img className="rectangle" alt="Rectangle" src="/svg/barre.svg" />
            <img className="vector" alt="Vector" src="/svg/vector-right.svg" />
        </div>
    );
};