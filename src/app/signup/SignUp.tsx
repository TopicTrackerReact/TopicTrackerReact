"use client"


export const SignUp = () => {

	const handleSignUp = async () => {
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({})
		})
	}
	return (
		<div className="flex flex-col bg-slate-100 w-1/5 h-96 justify-around p-12 drop-shadow-xl">
			<h1 className="self-center text-lg">Get Started</h1>
			<label>Email</label>
			<input className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"/>
			<div className="flex justify-between">
				<span className="flex flex-col">
					<label>First Name</label>
					<input className="input h-8 w-32 bg-zinc-300 hover:bg-gray-300 her:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"/>
				</span>
				<span className="flex flex-col">
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