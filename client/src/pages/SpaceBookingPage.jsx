import { useState } from 'react'

function SpaceBookingPage() {
  const [form, setForm] = useState({
    space: '',
    date: '',
    startTime: '',
    endTime: '',
  })
  const [message, setMessage] = useState('')

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Booking form submitted successfully.')
  }

  return (
    <main>
      <h1>Book a Library Space</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Space
          <select
            name="space"
            value={form.space}
            onChange={handleChange}
            required
          >
            <option value="">Select a space</option>
            <option value="study-room-1">Study Room 1</option>
            <option value="study-room-2">Study Room 2</option>
            <option value="computer-lab">Computer Lab</option>
            <option value="meeting-room">Meeting Room</option>
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Start time
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End time
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Book Space</button>
      </form>

      {message && <p role="status">{message}</p>}
    </main>
  )
}

export default SpaceBookingPage