//
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toggle from "./Toggle";

function Header() {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState(() => {
		return localStorage.getItem("accessToken");
	})
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("user")
		return savedUser? JSON.parse(savedUser) : null
	})
	 

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("user");
        setAccessToken(null)   
		setUser(null)
		navigate("/login");
	};

	useEffect(() => {
		const handleExpiredToken = () => {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("user");
			setAccessToken(null);
			setUser(null);
			navigate("/login");
		};

		window.addEventListener("authExpired", handleExpiredToken);

		return () => {
			window.removeEventListener("authExpired", handleExpiredToken);
		};
	}, [navigate]);

	return (
		<header className="sticky-top bg-secondary border-bottom border-secondary border-opacity-25 shadow-sm ">
			<nav className="navbar navbar-expand-lg navbar-dark container mx-2">
				{/* Brand Logo */}
				<Link
					to="/"
					className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-white ms-3"
				>
					<i className="bi bi-film text-primary"></i>
					<span>
						Movie<span className="text-primary">Explorer</span>
					</span>
				</Link>

				{/* Action Group: User Status / Auth CTA + Mobile Toggler */}
				<div className="d-flex align-items-center gap-3 order-lg-last ms-auto ms-lg-4">
					{accessToken ? (
						<div className="d-flex align-items-center gap-2">
							<div className="d-flex align-items-center gap-2 text-white bg-secondary bg-opacity-25 px-3 py-1 rounded-pill border border-secondary border-opacity-50">
								<i className="bi bi-person-check text-primary"></i>
								<span className="fw-semibold small">{user?.username || "User"}</span>
							</div>
							<button
								onClick={handleLogout}
								className="btn btn-outline-warning btn-sm px-3 rounded-pill fw-semibold"
							>
								Logout
							</button>
						</div>
					) : (
						
						<Link
							to="/signup"
							className="btn shadow btn-danger text-white btn-md px-4 py-1 text-uppercase fw-bold rounded-pill text-nowrap " aria-label="button for sign-up"
						>
							Sign Up
						</Link>
					)}

					{/* Toggle button rendered via component */}
					<Toggle isLoggedIn={!!accessToken} />
				</div>
			</nav>
		</header>
	);
}

export default Header;
