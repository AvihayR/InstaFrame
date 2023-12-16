import { instaFont } from "./Header"
import CreateIcon from "./icons/CreateIcon"
import ExploreIcon from "./icons/ExploreIcon"
import HeartIcon from "./icons/HeartIcon"
import HomeIcon from "./icons/HomeIcon"
import InstaIcon from "./icons/InstaIcon"
import SearchIcon from "./icons/SearchIcon"


export function NavBar() {
    return (
        <div className="nav-container fixed inset-x-0 bottom-0 flex flex-1 md:flex md:justify-start md:static md:flex-col gap-8 lg:w-56">
            <div className="icon-container items-end hidden md:flex">
                <InstaIcon className="lg:hidden" />
                <h1 className={`hidden text-xl ${instaFont.className} lg:block`}>InstaFrame</h1>
            </div>
            <nav className="flex flex-1 py-1 justify-evenly border-t md:justify-start md:border-t-0 md:gap-2 md:flex-col">
                <div className="icon-container flex items-end">
                    <HomeIcon />
                    <span className="hidden ms-4 lg:block">Home</span>
                </div>
                <div className="icon-container flex items-end">
                    <SearchIcon />
                    <span className="hidden ms-4 lg:block">Search</span>
                </div>
                <div className="icon-container flex items-end">
                    <ExploreIcon />
                    <span className="hidden ms-4 lg:block">Explore</span>
                </div>
                <div className="icon-container flex items-end">
                    <HeartIcon />
                    <span className="hidden ms-4 lg:block">Notifications</span>
                </div>
                <div className="icon-container flex items-end">
                    <CreateIcon />
                    <span className="hidden ms-4 lg:block">Create</span>
                </div>
            </nav>
        </div>
    )
}