export default function Dashboard() {
    return (
        <>
            <h1 className="text-7xl p-[40px]">August 2025</h1>
            <div className="flex flex-col items-center p-[50px]">
                <div className="flex flex-row">
                    <p className="text-2xl pl-10 pr-10">Mon</p>
                    <p className="text-2xl pl-10 pr-10">Tue</p>
                    <p className="text-2xl pl-10 pr-10">Wed</p>
                    <p className="text-2xl pl-10 pr-10">Thu</p>
                    <p className="text-2xl pl-10 pr-10">Fri</p>
                    <p className="text-2xl pl-10 pr-10">Sat</p>
                    <p className="text-2xl pl-10 pr-10">Sun</p>
                </div>
                <div className="bg-gray-700 w-[80vw] h-[40vh]"></div>
            </div>
            <div className="flex justify-center">
                <div className="bg-gray-700 w-[40%] flex justify-center">
                    <a className="text-4xl p-[20px]">My Workout Title</a>
                </div>
            </div>
        </>
    );
}