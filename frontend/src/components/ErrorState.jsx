function ErrorState({ message, onRetry }) {
	return (
		<div className="text-center my-5 py-5">
			<i className="bi bi-exclamation-triangle text-danger fs-1"></i>

			<h4 className="mt-3">Something went wrong</h4>

			<p className="text-light">{message}</p>

			{onRetry && (
				<button className="btn btn-primary" onClick={onRetry}>
					<i className="bi bi-arrow-clockwise me-2"></i>
					Try Again
				</button>
			)}
		</div>
	);
}

export default ErrorState;
