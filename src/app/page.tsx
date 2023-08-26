import { Input } from "./home/input";
import { AllTasks } from "./home/allTasks";

export default function Landing() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 w-screen h-100 pt-[10rem]">
      <div className="flex justify-center items-center w-screen h-[40rem]">
        <div className="flex flex-col items-center h-[28rem] xl:w-[38rem] 2xl:w-[48rem] bg-stone-300 pt-14">
          <h1 className="text-[3rem]">Get started with Timely</h1>
          <div className="p-10 flex flex-col items-center w-[42rem]">
            <h3 className="text-2xl text-center">
              Timely allows you to keep track of topics in an organized manner,
              with buttons that expand on a click. You are able to keep track of
              notes, completed status, as well as update anything about your
              topic on the fly!
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-2xl shadow-2xl bg-stone-100 h-[35rem] xl:w-[50rem] 2xl:w-[60rem] hover:scale-[1.02] ease-in duration-200">
          <Input />
          <AllTasks />
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
