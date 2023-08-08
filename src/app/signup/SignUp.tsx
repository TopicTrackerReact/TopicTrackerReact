"use client"


export const SignUp = () => {

	const handleSignUp = async () => {
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
	return (
		<div className="flex flex-col bg-slate-100 w-1/5 h-96 justify-around p-12 drop-shadow-xl">
			<label>Email</label>
			<input className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"/>
			<div className="flex">
				<span>
					<label>First Name</label>
					<input className="input h-8 w-32 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"/>
				</span>
				<span>
					<label>Last Name </label>
					<input className="input h-8 w-32 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"/>
				</span>
			</div>
			<label>Password</label>
			<input className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"/>
			<button className="btn bg-slate-500 mt-8">Sign Up</button>
		</div>
	)
}