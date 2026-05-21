import { BookOpenCheck } from "lucide-react"
import sampleProfile from "../../assets/sampleProfile.jpg"

function Grades() {


    const student = [{
        LastName: "Gerona",
        FirstName: "Reven",
        MiddleName: "Amazona",
        gender: "Male",
        studentNumber: "2021A2313",
        grade: 12,
        schoolYear: "2022-2023",
        sem: "1st",
        strand: "STEM",
        section: "A"
    }]

    const containerStyle = "flex  flex-col items-center justify-center"
    const valueStyle = "text-sm font-semibold text-[#053fbb]"
    const labelStyle = "text-sm text-gray-500"
    return (
        <div className="flex flex-col  flex-1 w-full justify-center items-center overflow-y-auto p-2 ">
            <div className="w-full flex border-b p-2">
                <div className="w-full  flex items-center justify-center gap-3">
                    <div className="flex gap-2 ">
                        <p>Year</p>
                        <select name="year" id="year" className="border">
                            <option value="2022-2023">2022-2023</option>
                            <option value="2021-2022">2021-2022</option>
                            <option value="2020-2021">2020-2021</option>
                        </select>
                    </div>
                    <div className="flex gap-2 ">
                        <p>Semester</p>
                        <select name="sem" id="sem" className="border">
                            <option value="1st">1st</option>
                            <option value="Summer">Summer</option>
                            <option value="2nd">2nd</option>

                        </select>
                    </div>
                </div>
            </div>
            <div className="flex lg:w-270 h-full md:h-full w-full flex-col min-h-0 lg:border rounded bg-[#d5dcdb] gap-2">
                <header>
                    <div className="flex items-center justify-center w-full">
                        <div className="w-20 h-20 flex items-center justify-center border-3 border-[#f90106] rounded-full m-2 bg-[#00d9ff]">
                            <BookOpenCheck color="#053fbb" className="w-fit h-full p-2" />
                        </div>
                        <div className="flex-1 flex-col flex items-center justify-center">
                            <span className="lg:text-2xl text-lg font-semibold text-[#053fbb] flex items-center justify-center">Gerona Sample highschool</span>
                            <span>Tiniguiban Calauag Quezon</span>
                        </div>
                        <div className="m-2">
                            <img src={sampleProfile} alt="profile" className="lg:w-25 lg:h-25 h-17 w-17 border rounded" />
                        </div>
                    </div>
                </header>
                <div className="w-full pt-0.5 bg-[#00c3ca] mb-2"></div>
                <main className="flex flex-col h-full w-full  gap-2">
                    {student.map((student) => <div className="grid lg:grid-row-2 w-full gap-2">
                        <div className="grid grid-cols-4 w-full ">
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.LastName}</span>
                                <span className={labelStyle}>Last Name</span>
                            </div>
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.FirstName}</span>
                                <span className={labelStyle}>First Name</span>
                            </div>
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.MiddleName}</span>
                                <span className={labelStyle}>Middle Name</span>
                            </div>
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.gender}</span>
                                <span className={labelStyle}>Gender</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 w-full">
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.studentNumber}</span>
                                <span className={`${labelStyle} nowrap flex`} >Sudent No.</span>
                            </div>
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.schoolYear}</span>
                                <span className={labelStyle}>School Year</span>
                            </div>
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.grade}</span>
                                <span className={labelStyle}>Grade Level</span>
                            </div>
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.sem}</span>
                                <span className={labelStyle}>Semester</span>
                            </div>
                            <div className={containerStyle}>
                                <span className={valueStyle}>{student.strand}</span>
                                <span className={labelStyle}>Strand</span>
                            </div>
                        </div>
                    </div>)}

                    {/*grades record*/}
                    <div className="flex-1 w-full h-full border">
                        <header>
                            <div className="flex items-center justify-center w-full">
                                <div className="flex-1 flex-col flex items-center justify-center border-b">
                                    <span className="lg:text-2xl text-lg font-semibold text-[#053fbb] flex items-center justify-center">Grades Record</span>
                                </div>
                            </div>

                        </header>
                        <main>
                            <header className="flex w-full border-b">
                                <div className="w-10 border-r flex items-center justify-center italic font-semibold">
                                    <p >No.</p>
                                </div>
                                <div className="w-20 border-r flex items-center justify-center italic font-semibold">
                                    <p>Code</p>
                                </div>
                                <div className="flex-1 min-w-40  border-r flex items-center justify-center italic font-semibold">
                                    <p>Subject</p>
                                </div>

                                <div className="w-10 border-r flex items-center justify-center italic font-semibold">
                                    <p>1st</p>
                                </div >

                                <div className="w-10 border-r flex items-center justify-center italic font-semibold">
                                    <p>2nd</p>
                                </div>
                                <div className="w-10 border-r flex items-center justify-center italic font-semibold">
                                    <p>3rd</p>
                                </div>
                                <div className="w-10 border-r flex items-center justify-center italic font-semibold">
                                    <p>4th</p>
                                </div>
                                <div className="w-10  flex items-center justify-center italic font-semibold">
                                    <p>Final</p>
                                </div>
                            </header>
                            {/*grades record*/}
                            <main className="flex flex-col w-full" >
                                <div className="flex w-full border-b">
                                    <div className="w-10 border-r flex items-center justify-center">
                                        <p >1</p>
                                    </div>
                                    <div className="w-20 border-r flex items-center justify-center break-all">
                                        <p>SDFSDFSDFSDF</p>
                                    </div>
                                    <div className="flex-1 min-w-40  border-r flex flex-col items-center justify-center break-all">
                                        <p >Aralingpanlipunansapagpapakatao</p>
                                        <p className="text-sm text-[#000988]">section: BSIT 4-1</p>
                                    </div>
                                    <div className="w-10 border-r flex items-center justify-center">
                                        <p>90</p>
                                    </div >

                                    <div className="w-10 border-r flex items-center justify-center">
                                        <p>80</p>
                                    </div>
                                    <div className="w-10 border-r flex items-center justify-center">
                                        <p>86</p>
                                    </div>
                                    <div className="w-10 border-r flex items-center justify-center">
                                        <p>97</p>
                                    </div>
                                    <div className="w-10  flex items-center justify-center">
                                        <p>97</p>
                                    </div>
                                </div>
                            </main>
                            <footer className="flex w-full border-b">
                                <div className="border-r flex-1 flex items-center justify-center">
                                    <p className="text-xl italic font-bold ">Total Grade</p>
                                </div>
                                <div className="w-10 items-center flex justify-center"><p className="font-bold">97</p></div>
                            </footer>
                        </main>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Grades