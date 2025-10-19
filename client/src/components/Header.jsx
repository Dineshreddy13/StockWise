import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";
const Header = () => {
    return (
        <header className="sticky top-0 z-100 bg-neutral-900 p-2">
            <div className="max-w-[85vw] m-auto header-wrapper">
                <Link to="/" >
                    <img src="./src/assets/stockwise.png" alt="StockWise logo" height={32} width={140} 
                        className="h-15 w-auto cursor-pointer bg-black rounded-full flex-center p-1"
                    />
                </Link>

                <nav className="hidden sm:flex items-center gap-15">
                <NavItems/>
                </nav>
                
                <UserDropdown/>
            </div>
        </header>
    );
}

export default Header;