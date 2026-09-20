import {  useEffect,useRef,useState } from "react"

function Search({ onSearch, onCategoryChange }) {
	const [query, setQuery] = useState("");
	
  const [activeCategory, setActiveCategory] = useState("top_rated")
const firstRender = useRef(true)
  const handleCategory = (category) => {
setActiveCategory(category)
setQuery("")
onCategoryChange(category)
    
  }

  const timerRef = useRef(null)

  const handleSubmit = (e) => {
	e.preventDefault();
	if(!query.trim()) return;
	clearTimeout(timerRef.current)
	onSearch(query)

  }

	useEffect(() => {

		if(firstRender.current){
			firstRender.current = false
			return
		}
		if (!query.trim())  return;

		timerRef.current = setTimeout(() => {
			onSearch(query)
		}, (500));
			return () => {
				clearTimeout(timerRef.current)
			}
		

		
	}, [query, onSearch]);
	return (
		<div className="container my-2">
			<div className="row align-items-center">
				<div className="col-lg-7   ">
					<form
						className=" d-flex "
						role="search"
						onSubmit={handleSubmit}
					>
						<input
							type="text"
							className="form-control rounded-5 px-4 shadow rounded-start-pill outline-dark  border-danger"
							placeholder="Search Movie..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button
							type="submit"
							className="btn btn-danger rounded-5 shadow rounded-end-pill fw-bold text-white text-uppercase px-5"
						>
							Search
						</button>
					</form>

					{/* Tabs */}
				</div>
				<div className="col-lg-5  my-2">
					<div className="btn-group  w-100">
						<button
							className={`btn btn-sm shadow btn-outline-primary fw-semibold  text-white rounded-start-pill p-2 ${activeCategory === "top_rated" ? "active " : ""}`}
							type="button"
							onClick={() => handleCategory("top_rated")}
						>
							Top Rated
						</button>
						<button
							className={`btn btn-sm shadow btn-outline-primary fw-semibold  text-white  px-5 ${activeCategory === "popular" ? "active" : ""}`}
							onClick={() => handleCategory("popular")}
							type="button"
						>
							Popular
						</button>
						<button
							className={`btn btn-sm shadow btn-outline-primary fw-semibold  text-white rounded-end-pill px-5 ${activeCategory === "trending" ? "active" : ""}`}
							type="button"
							onClick={() => handleCategory("trending")}
						>
							Trending
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search
