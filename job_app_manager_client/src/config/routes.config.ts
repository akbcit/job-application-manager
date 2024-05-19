import { PageHome } from "../pages/PageHome";
import { PageDashBoard } from "../pages/PageDashBoard";
import { AppRoute } from "../clientModels/route.model"

export const routes: AppRoute[] =
    [
        {
            path: "/",
            page: PageHome,
        },
        {
            path: "/dashboard",
            page: PageDashBoard,
        }
    ]   
