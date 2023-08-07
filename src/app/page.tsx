import { Input } from './input'
import { AllTasks } from './allTasks'

export default function Home() {
  return (
    <main className="flex flex-col bg-red-900 h-full">
      <Input />
      <AllTasks />
    </main>
  )
}
