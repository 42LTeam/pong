
import React from "react";
import Header from "./Header";

export default function Application(props){


    return (
        <>
            <Header user={props.user}></Header>
        </>
    )

    // return (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path={Paths.home} element={<Home />}>
    //                 <Route index element={<HomePageReal />} />
    //                 <Route path={Paths.leaderboard} element={<Leaderboard />} />
    //                 <Route path={Paths.skins} element={<SkinPage />} />
    //                 <Route path={Paths.profile} element={<ProfilePage />} />
    //                 <Route path={Paths.settings} element={<SettingPage />} />
    //                 <Route path={Paths.chat} element={<Chat />} />
    //             </Route>
    //         </Routes>
    //     </BrowserRouter>
    // )
}