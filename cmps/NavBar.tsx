import { instaFont } from "./Header"
import InstaIcon from "./icons/InstaIcon"
import NavLinks from "./NavLinks"


export function NavBar() {
    return (
        <div className="nav-container fixed inset-x-0 bottom-0 flex flex-1 md:flex md:justify-start md:static md:flex-col gap-8 lg:w-56">
            <div className="icon-container items-end hidden md:flex">
                <InstaIcon className="lg:hidden" />
                <h1 className={`hidden text-xl ${instaFont.className} lg:block`}>InstaFrame</h1>
            </div>
            <nav className="flex flex-1 py-1 justify-evenly border-t md:justify-start md:border-t-0 md:gap-2 md:flex-col">
                <NavLinks />
            </nav>
        </div>
    )
}