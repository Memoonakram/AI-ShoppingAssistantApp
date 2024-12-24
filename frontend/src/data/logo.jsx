import logo from "../static/images/logo.png";

export const Logo = ({size=16}) => {
    return (
        <img
        className={`mx-auto h-${size} w-${size} transition-transform duration-500 ease-in-out hover:rotate-[360deg] rounded-full border border-green-400`}
        src={logo}
        alt="logo"
        />
    );
    };