import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import MyTickets from './pages/MyTickets';
import RaffleDetail from './pages/RaffleDetail';
import Winners from './pages/Winners';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "HowItWorks": HowItWorks,
    "MyTickets": MyTickets,
    "RaffleDetail": RaffleDetail,
    "Winners": Winners,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};