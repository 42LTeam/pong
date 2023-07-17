import Header from "./Header";
// @ts-ignore

const Application = function ({user}){


    return (
        <>
            <Header user={user}></Header>
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
export default Application;