import CreateIcon from "./icons/CreateIcon"
import ExploreIcon from "./icons/ExploreIcon"
import HeartIcon from "./icons/HeartIcon"
import HomeIcon from "./icons/HomeIcon"
import InstaIcon from "./icons/InstaIcon"
import SearchIcon from "./icons/SearchIcon"


export function NavBar() {
    return (
        <div className="nav-container hidden md:flex flex-col gap-8">
            <InstaIcon />
            <nav className="flex flex-col gap-2">
                <HomeIcon />
                <SearchIcon />
                <ExploreIcon />
                <HeartIcon />
                <CreateIcon />
            </nav>
        </div>
    )
}