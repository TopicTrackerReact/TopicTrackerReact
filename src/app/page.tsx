import { Input } from "./home/input";

export default function Landing() {
  return (
    <div className="bg-red-100 h-[40rem] w-screen flex justify-between items-center p-24">
      <div className="bg-orange-900 h-[36rem] w-[44rem] text-[3rem]">
        <h1>Get started with Timely</h1>
      </div>
      <div className="flex flex-col items-center bg-stone-100 h-[38rem] w-[60rem] rounded-lg shadow-2xl border-0 border-stone-100">
        <Input />
      </div>
    </div>
  );
}
