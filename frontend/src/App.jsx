import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Favorite = lazy(() => import("./pages/Favorite"))
const WatchList = lazy(() => import("./pages/WatchList"))
const SignUp = lazy(() => import("./pages/SignUp"))
const Details = lazy(() => import("./pages/Details"))

import {MovieListsProvider} from "./context/MovieListsContext"
 import ProtectedRoutes from "./components/ProtectedRoutes";
 import GuestRoutes from "./components/GuestRoutes";

 function PageLoader(){
	return (
<div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
	<div className="spinner-border text-primary" role="status">
		<span className="visually-hidden">Loading...</span>
	</div>
</div>		

	)
 }
function App() {
  return (
		<Suspense fallback={<PageLoader/>}>
			<MovieListsProvider>
			<BrowserRouter>
				<Routes >
					
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={
							<GuestRoutes>
								<Login />
							</GuestRoutes>
						}
					/>
					<Route
						path="/signup"
						element={
							<GuestRoutes>
								<SignUp />
							</GuestRoutes>
						}
					/>

					<Route path="/details/:id" element={<Details />} />

					<Route
						path="/watchlist"
						element={
							<ProtectedRoutes>
								<WatchList />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/favorite"
						element={
							<ProtectedRoutes>
								<Favorite />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</BrowserRouter>
			</MovieListsProvider>

		</Suspense>
	);
}

export default App;
