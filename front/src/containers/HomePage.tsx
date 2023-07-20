import {PlayerSkin} from "../components/PlayerSkin";
import {BallSkin} from "../components/BallSkin"
import {LaunchButton} from "../components/LaunchButton"

export default function HomePage({user}){

    return (
        <>
            <div className="frame">
                <div className="frame-left">
                    <div className="skin-selection">
                        <PlayerSkin />
                        <BallSkin />
                        <LaunchButton />
                    </div>

                </div>
                <div className="frame-right">
                    {/*<SearchFriend />*/}
                    {/*<friendTabs />*/}
                </div>
            </div>
        </>
    )
}