"use client";

import React, { useState, useEffect } from "react";
import { formatDate, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
}

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  // Load events from DB
  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data: CalendarEvent[] = await res.json();
      setCurrentEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = async (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${selected.event.title}"?`
      )
    ) {
      try {
        const res = await fetch(`/api/events?id=${selected.event.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete event");
        await fetchEvents();
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const newEvent: CalendarEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start.toISOString(),
        end: selectedDate.end?.toISOString(),
        allDay: selectedDate.allDay,
      };

      try {
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
        if (!res.ok) throw new Error("Failed to add event");
        await fetchEvents();
      } catch (err) {
        console.error("Error adding event:", err);
      }

      handleCloseDialog();
    }
  };

  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        {/* Sidebar */}
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {currentEvents.length === 0 && (
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            )}
            {currentEvents.map((event) => (
              <li
                className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                key={event.id}
              >
                {event.title}
                <br />
                <label className="text-slate-950">
                  {formatDate(new Date(event.start), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar */}
        <div className="w-9/12 mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents} // Load from DB
          />
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-gray-200 p-3 rounded-md text-lg"
            />
            <button
              className="bg-green-500 text-white p-3 mt-5 rounded-md"
              type="submit"
            >
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
