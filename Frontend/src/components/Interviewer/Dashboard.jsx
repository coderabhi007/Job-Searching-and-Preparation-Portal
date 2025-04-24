import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import axiosInstance from '@/axios/axiosConfig'

const getTimeOptions = () => {
  const times = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h.toString().padStart(2, '0')
      const minute = m.toString().padStart(2, '0')
      times.push(`${hour}:${minute}`)
    }
  }
  return times
}

const isToday = (selectedDate) => {
  const today = new Date().toISOString().split('T')[0]
  return selectedDate === today
}

const isTimeBeforeNow = (time) => {
  const now = new Date()
  const [hour, minute] = time.split(':').map(Number)
  const selected = new Date()
  selected.setHours(hour, minute, 0, 0)
  return selected < now
}

const Dashboard = () => {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [date, setDate] = useState('')
  const [skills, setSkills] = useState('')
  const [upcomingInterviews, setUpcomingInterviews] = useState([])

  const handleSubmit = async () => {
    if (!startTime || !endTime || !date || !skills) {
      toast.error('Please fill all fields')
      return
    }

    if (startTime >= endTime) {
      toast.error('Start time must be less than end time')
      return
    }

    const diff =
      (new Date(`1970-01-01T${endTime}`) - new Date(`1970-01-01T${startTime}`)) / (1000 * 60 * 60)

    if (diff < 1) {
      toast.error('Minimum 1 hour difference required between start and end time')
      return
    }

    const today = new Date().toISOString().split('T')[0]
    if (date < today) {
      toast.error('Date cannot be before today')
      return
    }

    if (isToday(date) && isTimeBeforeNow(startTime)) {
      toast.error('Start time must not be before current time')
      return
    }

    const payload = {
      startTime,
      endTime,
      date,
      skills: skills.split(',').map(skill => skill.trim()),
    }

    try {
      await axiosInstance.post('/interview/add', payload)
      toast.success('Slot posted successfully')
      setStartTime('')
      setEndTime('')
      setDate('')
      setSkills('')
      fetchUpcomingInterviews()
    } catch (err) {
      toast.error('Error posting slot')
    }
  }

  const fetchUpcomingInterviews = async () => {
    try {
      const res = await axiosInstance.get('/interview/getInterviweInterviwer')
      const responseData = res.data.data
      setUpcomingInterviews(Array.isArray(responseData) ? responseData : [])
    } catch (err) {
      console.error('Error fetching upcoming interviews', err)
      setUpcomingInterviews([])
    }
  }

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
    fetchUpcomingInterviews()
  }, [])

  const timeOptions = getTimeOptions()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-semibold mb-6 text-[#6A38C2]">Post Available Slot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select start time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select end time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
            <textarea
              rows={3}
              placeholder="e.g. JavaScript, React, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Post Slot
        </button>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4 text-[#6A38C2]">Upcoming Interviews</h2>
        {upcomingInterviews.length === 0 ? (
          <p className="text-gray-500 text-center">No interviews scheduled.</p>
        ) : (
          <div className="space-y-4">
            {upcomingInterviews.map((interview, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <p>
                  <span className="font-medium text-gray-700">📅 Date:</span>{' '}
                  {new Date(interview.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium text-gray-700">⏰ Start:</span> {interview.startTime}
                </p>
                {interview.endTime && (
                  <p>
                    <span className="font-medium text-gray-700">⏱️ End:</span> {interview.endTime}
                  </p>
                )}
                <p>
                  <span className="font-medium text-gray-700">🛠️ Skills:</span>{' '}
                  {interview.skill}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
