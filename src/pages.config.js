import Home from './pages/Home';
import Raffles from './pages/Raffles';
import RaffleDetail from './pages/RaffleDetail';
import HowItWorks from './pages/HowItWorks';
import Winners from './pages/Winners';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Raffles": Raffles,
    "RaffleDetail": RaffleDetail,
    "HowItWorks": HowItWorks,
    "Winners": Winners,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};