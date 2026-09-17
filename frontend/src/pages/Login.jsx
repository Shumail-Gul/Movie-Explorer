import {useForm} from "react-hook-form";

import Header from "../components/Header"
import { Link , useNavigate} from "react-router-dom"
function Login() {

    const navigate = useNavigate()
    const {register,
        handleSubmit
    , formState} = useForm({
        mode: "all"
    })

    const {errors} = formState;
const API_URL = import.meta.env.VITE_API_URL;
    const onSubmit = async(data) => {
         
        try{
            const response = await fetch(
                `${API_URL}/api/login/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json()

            if(response.ok){

                // save JWT token

                localStorage.setItem("accessToken", result.access)
                localStorage.setItem("refreshToken", result.refresh)

                // save user information

                localStorage.setItem("user", JSON.stringify(result.user))

                alert("Login Successful!")

                navigate("/")
            }

            else{

                alert(
                    result.email ||
                    result.password||
                    "Login failed. Please check your credentials."
                )
            }

        }
        catch(error){
            alert("Something went wrong. please try again. ")
        }

    }
  return (
		<div className="bg-dark">
			<Header />
			<div className="container mt-5 ">
				<div className="row justify-content-center">
					<div className="col-lg-5 col-md-6">
						<div className="card shadow-lg p-5 rounded-3 bg-secondary text-light">
							<h2 className="fw-bold my-3 fs-2">Login Your Account</h2>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className=" my-3">
									<label className=" form-label fw-semibold text-white">
										Email
									</label>

									<input
										type="email"
										name="useremail"
										className="form-control form-control-lg text-center px-2 text-dark"
										{...register("email", {
											required: "Email is required.",
											pattern: {
												value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
												message: "Invalid email address",
											},
										})}
									/>
									<p className="text-danger p-2">{errors.email?.message}</p>
								</div>
								<div className="my-3">
									<label className="form-label fw-semibold text-white">
										Password
									</label>
									<input
										type="password"
										name="userpassword"
										className="form-control form-control-lg text-center px-2 text-dark"
										{...register("password", {
											required: "Password is required...",
											minLength: {
												value: 8,
												message: "Password must be 8 character long",
											},
										})}
									/>
									<p className="text-danger p-2">{errors.password?.message}</p>
								</div>
								<div className="d-grid gap-4">
									<button
										type="submit"
										className="btn btn-outline-primary fw-bold btn-lg"
									>
										Login
									</button>
								</div>
								<h3 className="fw-semibold fs-5 pt-4 text-center">
									New User?
									<Link
										to="/signup"
										className="link-danger text-uppercase link-offset-2 link-underline-opacity-50 link-underline-opacity-100-hover fw-semibold px-2 "
									>
										{" "}
										Sign Up
									</Link>
								</h3>

								<div></div>
							</form>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	);
}

export default Login


