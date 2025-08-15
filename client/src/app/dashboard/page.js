import Calendar from "@/components/Calendar";
import NewWorkoutButton from "@/components/NewWorkoutButton";
import Image from "next/image";

export default function Dashboard() {
  return (
    <main>
      <Calendar />
      <div className="flex flex-col items-center">
        <NewWorkoutButton />
      </div>
    </main>
  );
}
