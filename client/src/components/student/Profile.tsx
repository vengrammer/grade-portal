
import myProfile from "../../assets/sampleProfile.jpg"
function Profile() {

    function Info({ label, value }: { label: string; value: string }) {
        return (
            <div className="flex flex-col">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-lg font-semibold text-[#053fbb]">{value}</span>
            </div>
        );
    }
    return (
        <div className="flex flex-1 w-full justify-center items-center overflow-y-auto p-2">
            <div className="flex lg:w-200 h-full md:h-full w-full flex-col lg:border rounded p-2 bg-[#d5dcdb]">
                <header className="flex max-h-40 w-full">
                    <div className="w-full flex items-center justify-center ">
                        <img className="max-h-40 max-w-40 border-2 rounded " src={myProfile} alt="profile" />
                    </div>
                </header>
                <main className="flex-1 w-full p-6 rounded-2xl  overflow-auto">
                    <div className="max-w-5xl mx-auto flex flex-col gap-6">
                        {/* NAME SECTION */}
                        <div className="bg-white shadow-md rounded-xl p-6 border">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4 ">Full Name</h2>
                            <div className="w-full bg-black pt-0.5 rounded m-2"></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Info label="Last Name" value="Gerona" />
                                <Info label="First Name" value="Reven" />
                                <Info label="Middle Name" value="Amazona" />
                            </div>
                        </div>
                        {/* DETAILS SECTION */}
                        <div className="bg-white shadow-md rounded-xl  p-6 border">
                            <h2 className="text-lg font-semibold text-gray-700">Student Info</h2>
                            <div className="w-full bg-black pt-0.5 rounded m-2"></div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <Info label="Student No." value="A202109921" />
                                <Info label="Gender" value="Male" />
                                <Info label="Birth Date" value="12/20/2004" />
                                <Info label="Age" value="20" />
                                <Info label="Strand" value="HUMSS" />
                            </div>
                        </div>
                        {/* Account Details */}
                        <div className="bg-white shadow-md rounded-xl p-6 border">
                            <h2 className="text-lg font-semibold text-gray-700">Account Details</h2>
                            <div className="w-full bg-black pt-0.5 rounded m-2"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <Info label="Created At." value="12/20/2004" />
                                <Info label="Last Updated" value="12/20/2004" />
                                <Info label="Created By" value="Admin" />                                
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile;