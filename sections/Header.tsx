import Link from "next/link";
import { SearchBar, ThemeSwitcher } from "@components";

const Header = () => {
  return (
    <header className="header-glass w-full h-16 fixed top-0 right-0 z-50
                flex items-center">
      <Link href="/" className="w-72 max-lg:w-fit max-lg:mx-auto">
        <h1 className="text-logo text-gradient text-center">PacoMovies</h1>
      </Link>

      <SearchBar />

      <ThemeSwitcher />
    </header>
  )
}

export default Header;