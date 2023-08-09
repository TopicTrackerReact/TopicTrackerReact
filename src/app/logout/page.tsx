'use client'

export default function Logout() {

  const loggingOut = async () => {

    const fetchResponse = await fetch('/api/auth/logout');
    const response = await fetchResponse.json();

    console.log('response ', response);

  }

  return (
    <div className="min-h-screen min-w-full">
      <div className="flex flex-col items-center m-auto">
        <h1>Are you sure you want to log out?</h1>
        <button className="btn" onClick={loggingOut}>
          Logout
        </button>
      </div>
    </div>
  )

}