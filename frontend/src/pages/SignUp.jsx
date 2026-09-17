
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
function SignUp() {
	const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
	const { register, handleSubmit,  formState , watch} = useForm({
		mode: "all",
	});
	const { errors } = formState;
    const password = watch("password")


	const onSubmit = async(data) => {
		try {
			const response = await fetch(
				`${API_URL}/api/register/`,

				{
					method: "POST",
					 headers : {
						"content-Type": "application/json"
						
					 },
					 body: JSON.stringify({
                        username: data.username,
						email: data.email,
						password : data.password,
						confirmPassword: data.confirmPassword,
						age: data.age,
						gender : data.gender
					 }),
				}
			)

			const result = await response.json()

			if(response.ok){
				alert("Account Created Successfully")
				navigate("/login")
			}
			else{
				alert("Registration Failed")
			}
		}

		catch (error){
			alert("Something went wrong. please try again.")
		}
	};

    
	return (
		<div className="bg-dark">
			<Header />
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-lg-5 col-md-6">
						<div className="card shadow-lg p-5 rounded-3 bg-secondary text-light ">
							<h2 className="fw-bold my-3 fs-2">Sign Up Your Account</h2>
							<form onSubmit={handleSubmit(onSubmit)}>
								{/* Name */}
								<div className=" my-3">
									<label className=" form-label fw-semibold text-white">
										Name
									</label>

									<input
										type="text"
										className="form-control form-control-lg text-center px-2"
										{...register("username", {
											required: "Username is required...",
											minLength: {
												value: 3,
												message: "Username must be at least 3 characters",
											},
										})}
									/>
									<p className="text-danger p-2">{errors.username?.message}</p>
								</div>
								{/* EMail */}
								<div className=" my-3">
									<label className=" form-label fw-semibold text-white">
										Email
									</label>

									<input
										type="email"
										className="form-control form-control-lg text-center px-2"
										{...register("email", {
											required: "Email is required...",
											pattern: {
												value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
												message: "Invalid email address",
											},
										})}
									/>
									<p className="text-danger p-2">{errors.email?.message}</p>
								</div>
								{/* Password */}
								<div className="my-3">
									<label className="form-label text-white fw-semibold">
										Password
									</label>
									<input
										type="password"
										className="form-control form-control-lg text-center px-2"
										{...register("password", {
											required: "Password is required",
											minLength: {
												value: 8,
												message: "Password must be 8 character long",
											},
										})}
									/>
									<p className="text-danger p-2">{errors.password?.message}</p>
								</div>

								{/* Confirm Password */}
								<div className="my-3">
									<label className="form-label fw-semibold text-white">
										Confirm Password
									</label>
									<input
										type="password"
										className="form-control form-control-lg text-center px-2"
										{...register("confirmPassword", {
											required: "Password is required",
											validate: (value) =>
												value === password || "Passwords do not match",
											minLength: {
												value: 8,
												message: "Password must be 8 character long",
											},
										})}
									/>
									<p className="text-danger p-2">
										{errors.confirmPassword?.message}
									</p>
								</div>
								<div className=" my-3">
									<label className=" form-label fw-semibold text-white">
										Age
									</label>

									<input
										type="number"
										className="form-control form-control-lg text-center px-2"
										{...register("age", {
											required: "age is required",
											valueAsNumber: true,
											min: {
												value: 18,
												message: "Age must be atleast 18",
											},
											max: {
												value: 110,
												message: "Age must be at most 110",
											},
										})}
									/>
									<p className="text-danger p-2">{errors.age?.message}</p>
								</div>

								{/* gender */}
								<div className=" my-3">
									<div className="form-check form-check-inline">
										<input
											type="radio"
											name="gender"
											value="male"
											className="form-check-input  px-2 "
											{...register("gender", { required: true })}
										/>
										<label className=" form-check-label fw-semibold text-white">
											Male
										</label>
									</div>
									<div className="form-check form-check-inline">
										<input
											type="radio"
											name="gender"
											value="female"
											className="form-check-input   px-2"
											{...register("gender", {
												required: "Please select your gender ",
											})}
										/>
										<label className=" form-check-label fw-semibold text-white">
											Female
										</label>
									</div>
									<p className="text-danger p-2">{errors.gender?.message}</p>
								</div>

								<div className="d-grid gap-4">
									<button
										type="submit"
										className="btn btn-outline-primary fw-bold btn-lg text-uppercase"
									>
										Sign Up
									</button>
								</div>

								<h3 className="fw-semibold fs-5 pt-4 text-center">
									Already have an account ?
									<Link
										to="/login"
										className="link-danger link-offset-2 link-underline-opacity-50 link-underline-opacity-100-hover fw-semibold px-2 "
									>
										{" "}
										LOGIN 
									</Link>
								</h3>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* <DevTool control={control} placement="top-left" /> */}
		</div>
	);
}

export default SignUp;
