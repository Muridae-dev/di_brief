import {FaSignInAlt, FaSignOutAlt, FaUser, FaHome, FaSuitcase, FaBriefcase} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch}  from "react-redux";
import {logout, reset} from "../features/auth/authSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/")
    }

    const goToInventory = () => {
        navigate("/inventory")
    }
    const goToHome = () => {
        navigate("/main")
    }

    const goToTrades = () => {
        navigate("/trades")
    }

    const goToLogin = () => {
        navigate("/login")
    }

    const goToRegister = () => {
        navigate("/register")
    }


    return (
        <header className="header">
            <ul>

                <li className="logo">
                    <button className="btn" onClick={goToHome}>
                        <FaHome/> HOME
                    </button>
                </li>
            
                {user ? (<>
                    <li>
                        <p>{user && user.name}</p>
                    </li>
                    <li>
                    <button className="btn" onClick={onLogout}>
                        <FaSignOutAlt /> LOGOUT
                    </button>
                    </li>
                    <li>
                        <button className="btn" onClick={goToInventory}>
                            <FaSuitcase/> INVENTORY
                        </button>
                    </li>
                    <li>
                    <button className="btn" onClick={goToTrades}>
                        <FaBriefcase /> TRADES
                    </button>
                    </li>
                </>) : (<>
                <li>
                    <button className="btn" onClick={goToLogin}>
                        <FaSignInAlt /> LOGIN
                    </button>
                </li>
                <li>
                    <button className="btn" onClick={goToRegister}>
                        <FaUser />Register
                    </button>
                </li>
                </>)}
            </ul>
        </header>
    )
}

export default Header