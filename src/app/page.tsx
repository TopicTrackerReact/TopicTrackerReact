import {Input} from './home/input'

export default function Landing() {
  return (
    <div className="h-[40rem] w-screen flex justify-center items-center">
        <div className="bg-stone-100 h-[38rem] w-[60rem] rounded-lg shadow-2xl border-0 border-stone-100">
          <Input />
        </div>
    </div>
  )
}
