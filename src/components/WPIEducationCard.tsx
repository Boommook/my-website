
function WPIEducationCard(){
    return (
        <div className="shadow-lg w-[85%] md:w-150 h-fit border-2 rounded-xl border-tangerine/30 p-4 bg-lightgray">
             <div className="flex items-start">
                <img src="/images/wpilogo.png" alt="WPI Logo" className="w-20 mt-2 mr-4"/>
                <div>
                    <h2 className="text-md md:text-xl font-semibold text-gray">Worcester Polytechnic Institute</h2>
                    <h3 className="text-sm md:text-md font-semibold text-gray/85">BS, Computer Science and Interactive Media & Game Development</h3>
                    <h4 className="text-gray/70 text-sm mb-4">GPA: 3.94/4.0</h4>
                </div>
            </div>
            <div className="space-y-[2%] flex flex-col">
                <div>
                    <div className="w-fit">
                        <h3 className="text-gray text-sm md:text-[16px] mb-1 font-semibold">Coursework</h3>
                        <hr className="border-cyan border-2 w-[110%] mb-2 rounded-2xl"/>
                    </div>
                    <p className="text-gray/80">Software Engineering, Object-Oriented Design, Technical Game Development,
                    Intro to AI, Linear Algebra, Operating Systems, Discrete Math, Systems</p>
                </div>
                <div className="flex justify-between gap-[4%]">
                    <div className="w-1/2">
                        <div className="w-fit">
                            <h3 className="text-gray text-sm md:text-[16px] mb-1 font-semibold">Achievements</h3>
                            <hr className="border-cyan border-2 mb-2 w-[110%] rounded-2xl"/>
                        </div>
                        <ul className="list-disc pl-5 text-gray/80 text-sm md:text-[16px]">
                            <li>Charles O. Thompson Scholar (2024)</li>
                            <li>Member, Upsilon Pi Epsilon the Computer Science Honors Society</li>
                            <li>Dean's List (all semesters)</li>
                        </ul>
                    </div>
                    <div className="w-1/2">
                        <div className="w-fit">
                            <h3 className="text-gray text-sm md:text-[16px] mb-1 font-semibold">Activities</h3>
                            <hr className="border-cyan border-2 mb-2 w-[110%] rounded-2xl"/>
                        </div>
                        <ul className="list-disc pl-5 text-gray/80 text-sm md:text-[16px]">
                            <li>PR Chair, Ultimate Frisbee Men's Team</li>
                            <li>Member, Outing Club</li>
                            <li>Member, IMGD Colloquiums</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WPIEducationCard;