import React, { useState } from "react";
import SideNavbar from "./SideNavbar";
import { toast } from "react-toastify";

function AppointmentModal(props) {
  const {
    Modal,
    closeDetailsModal,
    handleDeleteAppointment,
    modalIsOpen,
    detailsModalIsOpen,
    selectedDateEvents,
    closeModal,
    editEventId,
    selectedDate,
    moment,
    setSelectedTimeStart,
    selectedTimeStart,
    setSelectedTimeEnd,
    selectedTimeEnd,
    generateTimeOptions,
    setEvents,
    events,
    name,
    setName,
  } = props;
  const [catogories, setCategories] = useState("");
  const handleSaveAppointment = () => {
    if (!selectedDate || !selectedTimeStart || !selectedTimeEnd) {
      toast.error("Please fill in all fields!");
      return;
    }

    const startDateTime = moment(selectedDate)
      .set("hour", selectedTimeStart.split(":")[0])
      .set("minute", selectedTimeStart.split(":")[1])
      .toDate();

    const endDateTime = moment(selectedDate)
      .set("hour", selectedTimeEnd.split(":")[0])
      .set("minute", selectedTimeEnd.split(":")[1])
      .toDate();

    if (moment(endDateTime).isSameOrBefore(startDateTime)) {
      toast.error("End time must be after start time!");
      return;
    }

    if (editEventId !== null) {
      // Update an existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editEventId
            ? {
                ...event,
                title: `${catogories} - ${moment(startDateTime).format(
                  "hh:mm A"
                )}`,
                start: startDateTime,
                end: endDateTime,
              }
            : event
        )
      );
      toast.success("Appointment updated successfully!");
    } else {
      // Create a new event
      const newEvent = {
        id: events.length + 1,
        title: `${catogories} - ${moment(startDateTime).format("hh:mm A")}`,
        start: startDateTime,
        end: endDateTime,
      };
      setEvents([...events, newEvent]);
      toast.success("Appointment booked successfully!");
    }
    closeModal();
  };
  return (
    <div>
      {/* Booking Modal with Date & Time Picker */}
      <div>
        {/* Booking Modal - Responsive adjustments */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Appointment Modal"
          className="p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-xl w-full sm:w-96 mx-auto mt-10 sm:mt-30 z-100"
          overlayClassName="fixed inset-0 backdrop-blur-sm bg-white/30 bg-opacity-50 flex items-center justify-center p-4"
          closeTimeoutMS={300}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">
              {editEventId ? "Edit Appointment" : "Make New Appointment"}
            </h2>
            <button
              onClick={closeModal}
              className="text-black px-4 py-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded-md mb-4"
            id="name"
            value={name}
            onInput={(e) => setName(e.target.value)}
          />

          <label htmlFor="categories">Categories</label>
          <select
            name="catogories"
            id="categories"
            className="border p-2 w-full rounded-md mb-4 cursor-pointer"
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value="default">Select a Category</option>
            <option value="malaria">Malaria</option>
            <option value="dangue">Dangue</option>
            <option value="fever">fever</option>
          </select>

          <label htmlFor="doctor">Doctor</label>
          <select
            name="doctor"
            id="doctor"
            className="border p-2 w-full rounded-md mb-4 cursor-pointer"
          >
            <option value="default">Select a Doctor</option>
            <option value="malaria">Dr Laxman</option>
            <option value="dangue">Dr. Pal</option>
            <option value="fever">Dr. singh</option>
          </select>

          {/* Date and Time Picker Input - Responsive adjustments */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="start-time" className="block mb-2">
                Start Time
              </label>
              <select
                name="start-time"
                id="start-time"
                className="border p-2 w-full rounded-md mb-4 cursor-pointer"
                value={selectedTimeStart}
                onChange={(e) => setSelectedTimeStart(e.target.value)}
              >
                <option value="">⏰ Select a Time</option>
                {generateTimeOptions()}
              </select>
            </div>

            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="end-time" className="block mb-2">
                End Time
              </label>
              <select
                name="end-time"
                id="end-time"
                className="border p-2 w-full rounded-md mb-4 cursor-pointer"
                value={selectedTimeEnd}
                onChange={(e) => setSelectedTimeEnd(e.target.value)}
              >
                <option value="">⏰ Select a Time</option>
                {generateTimeOptions()}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-0 mt-4">
            <button
              onClick={handleSaveAppointment}
              className="bg-dark-blue text-white px-4 py-2 rounded-2xl cursor-pointer"
            >
              {editEventId ? "Update" : "Make New Appointment"}
            </button>
            {editEventId && (
              <button
                onClick={() => handleDeleteAppointment(editEventId)}
                className="bg-red-500 text-white px-4 py-2 rounded-2xl"
              >
                Delete
              </button>
            )}
          </div>
        </Modal>

        {/* Details Modal - Responsive adjustments */}
        <Modal
          isOpen={detailsModalIsOpen}
          onRequestClose={closeDetailsModal}
          contentLabel="Appointments for the Day"
          className="p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-xl w-full sm:w-96 mx-auto mt-10 sm:mt-20 z-100"
          overlayClassName="fixed inset-0 backdrop-blur-sm bg-white/30 bg-opacity-50 flex items-center justify-center p-4"
          closeTimeoutMS={300}
        >
          <h2 className="text-xl font-semibold mb-4">
            Appointments on{" "}
            {selectedDate ? moment(selectedDate).format("MMMM Do, YYYY") : ""}
          </h2>
          {selectedDateEvents?.length > 0 ? (
            <ul>
              {selectedDateEvents?.map((event) => (
                <li key={event.id} className="mb-2">
                  <strong>{event.title}</strong> <br />
                  {moment(event.start).format("hh:mm A")} -{" "}
                  {moment(event.end).format("hh:mm A")}
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments for this date.</p>
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={closeDetailsModal}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </Modal>

        <SideNavbar
          modalIsOpen={modalIsOpen}
          detailsModalIsOpen={detailsModalIsOpen}
        />
      </div>
    </div>
  );
}

export default AppointmentModal;
