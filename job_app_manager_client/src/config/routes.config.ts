import PageHome from "../pages/PageHome"
import { AppRoute } from "../clientModels/route.model"

export const routes:AppRoute[] =
    [
        {
            path: "/",
            page: PageHome,
        }
    ]   
