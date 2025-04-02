import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentModal from "./AppointmentModal";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
const DnDCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1));
  const [selectedTimeStart, setSelectedTimeStart] = useState("");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const eventData = [
      {
        id: 1,
        title: "Meeting",
        start: new Date(2025, 2, 29, 10, 0),
        end: new Date(2025, 2, 29, 11, 0),
      },
      {
        id: 2,
        title: "Lunch",
        start: new Date(2025, 2, 29, 12, 0),
        end: new Date(2025, 2, 29, 13, 0),
      },
    ];
    setEvents(eventData);
  }, []);

  const openModal = (slotInfo) => {
    const clickedDate = slotInfo.start;
    const clickedMonth = moment(clickedDate).month();
    const currentMonth = moment(currentDate).month();

    if (clickedMonth !== currentMonth) return;

    setSelectedDate(clickedDate);
    const eventsForDate = events.filter((e) =>
      moment(e.start).isSame(clickedDate, "day")
    );

    if (eventsForDate.length > 0) {
      setSelectedDateEvents(eventsForDate);
      setDetailsModalIsOpen(true);
    } else {
      setEditEventId(null);
      setModalIsOpen(true);
      setSelectedTimeStart("");
      setSelectedTimeEnd("");
      setName("");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeDetailsModal = () => {
    setDetailsModalIsOpen(false);
  };

  const handleDeleteAppointment = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    toast.error("Appointment deleted successfully!");
    closeModal();
  };

  const handleEventClick = (event) => {
    setEditEventId(event.id);
    setSelectedTimeStart(moment(event.start).format("HH:mm"));
    setSelectedTimeEnd(moment(event.end).format("HH:mm"));
    setModalIsOpen(true);
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    const newDate = new Date(currentDate);
    newDate.setMonth(newMonth);
    setCurrentDate(newDate);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ["00", "30"]) {
        const formattedHour = hour.toString().padStart(2, "0");
        const timeValue = `${formattedHour}:${minute}`;
        const displayTime = `${hour % 12 || 12}:${minute} ${
          hour < 12 ? "AM" : "PM"
        }`;
        options.push(
          <option key={timeValue} value={timeValue}>
            {`⏰ ${displayTime}`}
          </option>
        );
      }
    }
    return options;
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(updatedEvents);
    toast.success("Event moved successfully!");
  };

  const handleEventResize = ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(updatedEvents);
    toast.success("Event resized successfully!");
  };

  const CustomToolbar = ({ onView, view }) => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center w-full my-2 gap-2">
        <div className="w-full sm:w-auto">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="border-zinc-950 outline-none shadow-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-1 cursor-pointer w-full sm:w-auto"
          >
            {moment.months().map((month, index) => (
              <option key={index} value={index}>
                {`This month ${month}`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-1 w-full sm:w-auto justify-end">
          <button
            onClick={() => onView("month")}
            className={`border-zinc-950 shadow-2xl bg-white dark:bg-gray-800 p-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
              view === "month" ? "font-bold" : "font-normal"
            } text-gray-900 dark:text-white text-sm sm:text-base`}
          >
            Month
          </button>
          <button
            onClick={() => onView("week")}
            className={`border-zinc-950 shadow-2xl bg-white dark:bg-gray-800 p-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
              view === "week" ? "font-bold" : "font-normal"
            } text-gray-900 dark:text-white text-sm sm:text-base`}
          >
            Week
          </button>
          <button
            onClick={() => onView("day")}
            className={`border-zinc-950 shadow-2xl bg-white dark:bg-gray-800 p-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
              view === "day" ? "font-bold" : "font-normal"
            } text-gray-900 dark:text-white text-sm sm:text-base`}
          >
            Day
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white ms-0 md:ms-30 mt-15 h-[calc(100vh-10rem)] md:h-130 w-full md:w-[calc(100%-20rem)] absolute left-0 md:left-1/2 top-1/2 transform md:-translate-x-1/2 -translate-y-1/2 px-2 md:px-0">
        <DnDCalendar
          localizer={localizer}
          events={events}
          date={currentDate}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100% - 50px)",  cursor:"pointer"}}
          selectable
          onSelectSlot={openModal}
          onSelectEvent={handleEventClick}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          resizable
          draggableAccessor={() => true}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>

      <AppointmentModal
        Modal={Modal}
        closeDetailsModal={closeDetailsModal}
        handleDeleteAppointment={handleDeleteAppointment}
        modalIsOpen={modalIsOpen}
        detailsModalIsOpen={detailsModalIsOpen}
        selectedDateEvents={selectedDateEvents}
        closeModal={closeModal}
        editEventId={editEventId}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        moment={moment}
        setSelectedTimeStart={setSelectedTimeStart}
        selectedTimeStart={selectedTimeStart}
        setSelectedTimeEnd={setSelectedTimeEnd}
        selectedTimeEnd={selectedTimeEnd}
        generateTimeOptions={generateTimeOptions}
        setEvents={setEvents}
        events={events}
        setName={setName}
        name={name}
      />
    </div>
  );
};

export default MyCalendar;
