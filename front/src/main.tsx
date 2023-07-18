import Auth from "./containers/Auth";
// @ts-ignore
import ReactDOM from 'react-dom/client'

<<<<<<< HEAD
import './index.css'
import Leaderboard from './Leaderboard';
import SkinPage from './SkinPage';
import HomePageReal from './HomePageReal';
import Home from './ui/templates/Home';
import Auth from './Auth';
import { Paths } from './technical/paths';
import ProfilePage from './ProfilePage';
import SettingPage from './SettingPage';
import Chat from './chat/pages/ChatPage';


const SomeRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.home} element={<Home />}>
          <Route index element={<HomePageReal />} />
          <Route path={Paths.leaderboard} element={<Leaderboard />} />
          <Route path={Paths.skins} element={<SkinPage />} />
          <Route path={Paths.profile} element={<ProfilePage />} />
          <Route path={Paths.settings} element={<SettingPage />} />
          <Route path={Paths.chat} element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth>
      <SomeRoutes />
    </Auth>
=======
ReactDOM.createRoot(document.querySelector('body')).render(
    <Auth/>
>>>>>>> origin/shai
);