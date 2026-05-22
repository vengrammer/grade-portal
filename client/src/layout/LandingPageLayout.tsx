import { BookIcon } from "lucide-react";


function LandingPageLayout() {
    return (
        <div className="flex w-full flex-col min-h-screen bg-linear-to-t to-[#e6e8e7] from-[#256dfc] ">
            <header>
                <div className="flex items-center justify-between px-4 py-2 bg-[#4784ff] text-white">
                    <div className="flex items-center">
                        <BookIcon size={30} className="mr-2" />
                        <h1 className="text-2xl font-bold">Grade Portal</h1>
                    </div>
                    <div className="flex gap-5 pr-10">
                    <button className="px-5  bg-[#0a6af9] border rounded-sm ">Log in</button>
                        <button className="px-5  bg-[#078b8b] rounded-sm ">About Us</button>
                    </div>
                </div>
            </header>
            <div className=" flex-1 flex w-full h-full items-center justify-center">
                <form className="max-w-100 w-full h-full flex flex-col bg-[#c0c1c9] gap-10 py-10 px-5 rounded-2xl border">
                    <div className="flex w-full items-center justify-center">
                        <p className="text-2xl font-bold text-[#0a3882]">Welcome to Grade Portal</p>
                    </div>
                    <div className="flex flex-col flex-1  gap-2 ">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-sans font-semibold">Student Number</label>
                            <input type="text" required className="border pl-2 rounded-sm text-lg py-1" />
                        </div>
                        <div className="flex flex-col gap-2 pb-7">
                            <label htmlFor="" className="font-sans font-semibold ">Password</label>
                            <input type="password" required className="border pl-2 rounded-sm text-lg py-1" />
                        </div>
                        <div className="flex w-full justify-center items-center">
                            <button type="submit" className="w-full py-2 border-[#1170f5] hover:bg-[#2765bd] hover:scale-105 transition transform bg-[#1170f5] rounded-sm text-white font-bold cursor-pointer">Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LandingPageLayout;