//

import { Link } from "react-router-dom";

function Toggle({ isLoggedIn }) {
	return (
		<>
			{/* Mobile Collapse Toggle Button */}
			<button
				className="navbar-toggler border-0 shadow-none"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarToggler"
				aria-controls="navbarToggler"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			{/* Nav Menu Items */}
			<div className="collapse navbar-collapse" id="navbarToggler">
				<ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2 pt-3 pt-lg-0">
					{!isLoggedIn && (
						<li className="nav-item">
							<Link
								to="/login"
								className="nav-link px-3 rounded text-light text-opacity-75"
							>
								<i className="bi bi-box-arrow-in-right me-1 text-primary"></i>{" "}
								Login
							</Link>
						</li>
					)}

					<li className="nav-item">
						<Link
							to="/watchlist"
							className="nav-link px-3 rounded text-light text-opacity-75"
						>
							<i className="bi bi-bookmark-plus text-primary me-1"></i>{" "}
							Watchlist
						</Link>
					</li>

					<li className="nav-item">
						<Link
							to="/favorite"
							className="nav-link px-3 rounded text-light text-opacity-75"
						>
							<i className="bi bi-heart me-1 text-primary"></i> Favorites
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Toggle;