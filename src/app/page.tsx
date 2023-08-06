import { Input } from './input'
import { AllTasks } from './allTasks'

export default function Home() {
  return (
    <main>
      <div>
        <Input />
      </div>
      <div>
        <AllTasks />
      </div>
    </main>
  )
}
