import { Input } from './input'
import { AllTasks } from './allTasks'

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center bg-red-900">
      <Input />
      <AllTasks />
    </div>
  )
}
