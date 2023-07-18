import "../css/friend.css"
import FriendTabs from "./FriendTabs";
import Friend from "../components/Friend";
export default function FriendList(){
    return (
        <div className="friends">
            <FriendTabs></FriendTabs>
            <div className="horizontal-separator"></div>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
        </div>
    );
}