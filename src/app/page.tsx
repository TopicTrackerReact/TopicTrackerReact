import { Input } from "./home/input";
import { AllTasks } from "./home/allTasks";

export default function Landing() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 w-screen h-100 pt-[6rem] pl-32 pr-32">
      <div className="flex items-center w-100 h-[40rem] bg-white rounded-2xl shadow-2xl p-8">
        <div className=" text-3xl min-w-xl max-w-xl flex flex-col justify-around h-[15rem]">
          <div className="h-[5rem] text-5xl">Get started with <div className="font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Timely</div></div>
          <div className=" w-3/4">
            <h3>Keeping track of complex topics, made easier.</h3>
          </div>
        </div>
        <div className="bg-orange-300 w-2/3">
          <Input/>
          <AllTasks/>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="h-[40rem] w-screen flex justify-between items-center xl:pr-8 xl:pl-2 2xl:p-24">
      <div className="flex flex-col justify-between items-center h-[30rem] w-[44rem] lg:w-[38rem] text-[3rem] py-20 ">
        <h1>Get started with Timely</h1>
        <div className="p-10 flex flex-col items-center w-[42rem]">
          <h3 className="text-2xl text-center">
            Timely allows you to keep track of topics in an organized manner,
            with buttons that expand on a click. You are able to keep track of
            notes, completed status, as well as update anything about your topic
            on the fly!
          </h3>
        </div>
      </div>
      <div className=" 2xl:h-[38rem] xl:w-[60rem] rounded-lg shadow-2xl border-0 border-stone-100 lg:h-[36rem]">
        <Input />
        <AllTasks />
      </div>
    </div> */
}
