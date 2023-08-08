import Link from "next/link"

export default function Landing() {
  return (
    <main>
      <Link href={'/home'}>Home</Link>
      <Link href={'/login'}>LogIn</Link>
      <Link href={'/signup'}>SignUp</Link>
    </main>
  )
}
