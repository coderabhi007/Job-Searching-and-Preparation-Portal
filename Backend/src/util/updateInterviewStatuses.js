import Interview from '../models/interviwe.model.js';

async function updateInterviewStatuses() {
  const interviews = await Interview.find({ status: { $ne: 'completed' } });

  const now = new Date();

  for (let interview of interviews) {
    const { date, startTime, endTime } = interview;

    const endDateTime = new Date(`${date.toISOString().split('T')[0]}T${endTime}`);

    if (now > endDateTime) {
      interview.status = 'completed';
      await interview.save();
    }
  }
}
export default updateInterviewStatuses