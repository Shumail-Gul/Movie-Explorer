import { Link } from "react-router-dom";

function EmptyState({ icon = "bi-film", title, message }) {
	return (
		<div className="text-center my-5 py-5">
			<i className={`bi ${icon} fs-1 text-warning`}></i>

			<h4 className="mt-3 text-white">{title}</h4>

			<p className="text-white">{message}</p>

			<Link to="/" className="btn btn-outline-primary mt-2">
				<i className="bi bi-film me-2"></i>
				Explore Movies
			</Link>
		</div>
	);
}

export default EmptyState;
