import Link from "next/link";
import { SearchBar, ThemeSwitcher } from "@components";

const Header = () => {
  return (
    <header
      className="header-glass w-full h-16
            fixed top-0 right-0 flex items-center z-20"
    >
      <Link href="/" className="w-72 max-lg:w-fit max-lg:mx-auto">
        <h1 className="text-logo text-gradient text-center">PacoMovies</h1>
      </Link>

      <div className="max-lg:hidden">
        <SearchBar widthClass="w-[576px]" margin="ml-5" />
      </div>

      <ThemeSwitcher />
    </header>
  );
};

export default Header;
