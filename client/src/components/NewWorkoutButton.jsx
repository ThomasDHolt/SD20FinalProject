'use client'

import Link from "next/link";

export default function NewWorkoutButton() {
    return (
        <>
            <Link className="text-black text-3xl" href="/plan">
                <div className="bg-green-400 hover:bg-green-300 p-[20px] m-[20px] rounded-4xl">
                    New Workout
                </div>
            </Link>
        </>
    );
}