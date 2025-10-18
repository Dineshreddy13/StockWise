import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header className="sticky top-0 bg-neutral-900 p-2">
            <div className="max-w-[85vw] m-auto header-wrapper">
                <Link to="/" >
                    <img src="./src/assets/stockwise.png" alt="StockWise logo" height={32} width={140} 
                        className="h-15 w-auto cursor-pointer bg-black rounded-full flex-center p-1"
                    />
                </Link>

                <div className="flex items-center gap-15">
                    <Link to="/">Home</Link>
                    <Link to="/search">Search</Link>
                    <Link to="/watchlist">Watchlist</Link>
                </div>
                <h1>DNR</h1>
            </div>
        </header>
    );
}

export default Header;