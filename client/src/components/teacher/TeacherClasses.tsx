

function TeacherClasses() {
    return (
        <div className="flex w-full">
            <div className="flex flex-row  w-full border sm:m-2">
                <div className="flex flex-col gap-2 min-w-90 min-h-20 border bg-gray-400 p-2">
                    <div className="flex w-full border h-12  rounded flex items-center justify-between px-2">
                        <p className="font-bold">Filter by year:</p>
                        <select name="" id="" className="border rounded">
                            <option value="">Select a year</option>
                            <option value="">Sample</option>
                            <option value="">Sample</option>
                        </select>
                    </div>
                    <div className="flex flex-1 border rounded overflow-y-auto p-2">
                        <div className=" w-full h-20  border rounded p-2 cursor-pointer hover:scale-102 ">
                            <p>School-year: 2026-2027</p>
                            <p>Section: 7-1</p>
                            <p>Subject: Mathematics</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col border bg-white">
                    <div className="flex justify-between p-3  w-full h-15 border">
                        <div>
                            <p>School-year: 2026-2027</p>
                            <p>Section: 7-1</p>
                            <p>Subject: Mathematics</p>
                        </div>

                        
                            <input type="text" className="border w-100 p-2 rounded" placeholder="Search by name, account number"/>
                        

                    </div>
                    <div className="flex flex-1 border bg-gray-300">

                    </div>
                </div>
            </div>

        </div>
    )
}

export default TeacherClasses;