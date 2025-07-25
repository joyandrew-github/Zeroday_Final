import React, { useState, useMemo, useCallback } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Clock, User, MapPin } from 'lucide-react';

const TimetableSection = ({
  timetable,
  showTimetableForm,
  setShowTimetableForm,
  timetableForm,
  setTimetableForm,
  editingTimetable,
  handleTimetableSubmit,
  deleteTimetableItem,
  editTimetableItem,
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  currentDate
}) => {
  const [viewMode, setViewMode] = useState('month'); // State to toggle between day and month views
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  // Fixed to July 2025 (month 6, 0-indexed)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Memoize week-to-date mappings for July 2025
  const weekDateRanges = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const startOfFirstWeek = new Date(firstDay);
    startOfFirstWeek.setDate(firstDay.getDate() - firstDay.getDay() + 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const weeksNeeded = Math.ceil((totalDays + firstDay.getDay()) / 7);

    return Array.from({ length: weeksNeeded }, (_, i) => {
      const weekStart = new Date(startOfFirstWeek);
      weekStart.setDate(startOfFirstWeek.getDate() + i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return { weekIndex: i, start: weekStart, end: weekEnd };
    });
  }, [year, month]);

  // Memoize current month days
  const currentMonth = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay() + 1);
    const totalDays = lastDay.getDate();
    const weeksNeeded = Math.ceil((totalDays + firstDay.getDay()) / 7);

    const monthDays = [];
    for (let week = 0; week < weeksNeeded; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + week * 7 + day);
        const weekIndex = weekDateRanges.findIndex(range =>
          date >= range.start && date <= range.end
        );
        weekDays.push({
          date,
          dayName: days[day],
          dayNumber: date.getDate(),
          isCurrentMonth: date.getMonth() === month && date.getFullYear() === year,
          isToday: date.toDateString() === new Date().toDateString(),
          weekIndex: weekIndex >= 0 ? weekIndex : 0
        });
      }
      monthDays.push(weekDays);
    }
    return monthDays;
  }, [year, month, days, weekDateRanges]);

  // Get classes for a specific day and week, filtered by date
  const getClassesForDay = useCallback((dayName, weekIndex, date) => {
    if (timetable[weekIndex] && timetable[weekIndex][dayName]) {
      return timetable[weekIndex][dayName].filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === month && itemDate.getFullYear() === year;
      }).sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return [];
  }, [timetable, month, year]);

  // ClassCard Component
  const ClassCard = React.memo(({ item, isCompact = false, weekIndex, day }) => (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group ${isCompact ? 'p-2' : 'p-3'}`}>
      <div className="flex justify-between items-start mb-1">
        <h4 className={`font-semibold text-blue-800 ${isCompact ? 'text-xs' : 'text-sm'} line-clamp-1`}>
          {item.subject}
        </h4>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <button
            onClick={() => editTimetableItem(weekIndex, day, item)}
            className="text-blue-600 hover:text-blue-800 p-1"
          >
            <Edit size={isCompact ? 12 : 14} />
          </button>
          <button
            onClick={() => deleteTimetableItem(weekIndex, day, item.id)}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <Trash2 size={isCompact ? 12 : 14} />
          </button>
        </div>
      </div>
      <div className={`space-y-1 ${isCompact ? 'text-xs' : 'text-xs'}`}>
        <p className="text-blue-600 flex items-center">
          <User size={10} className="mr-1" />
          {item.professor}
        </p>
        <p className="text-gray-600 flex items-center">
          <Clock size={10} className="mr-1" />
          {item.startTime} - {item.endTime}
        </p>
        <p className="text-gray-600 flex items-center">
          <MapPin size={10} className="mr-1" />
          {item.room}
        </p>
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          item.type === 'Lecture' ? 'bg-green-100 text-green-700' : 
          item.type === 'Lab' ? 'bg-purple-100 text-purple-700' :
          item.type === 'Tutorial' ? 'bg-orange-100 text-orange-700' :
          'bg-indigo-100 text-indigo-700'
        }`}>
          {item.type}
        </span>
      </div>
    </div>
  ));

  // DayView Component
  const DayView = () => {
    const classes = getClassesForDay(selectedDay, selectedWeekIndex, currentMonth[selectedWeekIndex]?.find(d => d.dayName === selectedDay)?.date);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4 flex items-center space-x-4">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <select
            value={selectedWeekIndex}
            onChange={(e) => setSelectedWeekIndex(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {weekDateRanges.map((range, idx) => (
              <option key={idx} value={idx}>Week {idx + 1} ({range.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})</option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          {classes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No classes scheduled for {selectedDay} in Week {selectedWeekIndex + 1}</p>
          ) : (
            classes.map(item => (
              <ClassCard key={item.id} item={item} weekIndex={selectedWeekIndex} day={selectedDay} />
            ))
          )}
        </div>
      </div>
    );
  };

  // MonthView Component
  const MonthView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-7 gap-0">
        {days.map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center font-semibold text-gray-700 border-b border-gray-200 text-sm">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      {currentMonth.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-0 border-b border-gray-200 last:border-b-0">
          {week.map((dayInfo, dayIndex) => (
            <div
              key={dayIndex}
              className={`border-r border-gray-200 last:border-r-0 min-h-[120px] p-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                !dayInfo.isCurrentMonth ? 'text-gray-400 bg-gray-100' : ''
              }`}
              onClick={() => {
                setViewMode('day');
                setSelectedDay(dayInfo.dayName);
                setSelectedWeekIndex(dayInfo.weekIndex);
              }}
            >
              <div className={`text-sm font-medium mb-2 ${
                dayInfo.isToday ? 'text-blue-600 font-bold' : 
                dayInfo.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {dayInfo.dayNumber}
              </div>
              <div className="space-y-1">
                {getClassesForDay(dayInfo.dayName, dayInfo.weekIndex, dayInfo.date).length === 0 ? (
                  <div className="text-xs text-gray-500 text-center">
                    {dayInfo.isCurrentMonth ? 'No classes' : ''}
                  </div>
                ) : (
                  getClassesForDay(dayInfo.dayName, dayInfo.weekIndex, dayInfo.date).slice(0, 2).map(item => (
                    <div
                      key={item.id}
                      className="bg-blue-100 text-blue-800 text-xs p-1 rounded truncate hover:bg-blue-200 transition-colors"
                      title={`${item.subject} (${item.startTime} - ${item.endTime})`}
                    >
                      {item.subject}
                    </div>
                  ))
                )}
                {getClassesForDay(dayInfo.dayName, dayInfo.weekIndex, dayInfo.date).length > 2 && (
                  <div
                    className="text-xs text-gray-500 cursor-default"
                    title={getClassesForDay(dayInfo.dayName, dayInfo.weekIndex, dayInfo.date).slice(2).map(item => `${item.subject} (${item.startTime} - ${item.endTime})`).join('\n')}
                  >
                    +{getClassesForDay(dayInfo.dayName, dayInfo.weekIndex, dayInfo.date).length - 2} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Timetable</h2>
          <p className="text-gray-600 mt-1">Manage your class schedule</p>
        </div>
        <button
          onClick={() => setShowTimetableForm(true)}
          className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Class</span>
        </button>
      </div>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex space-x-2">
          {['day', 'month'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)} // Ensure viewMode updates on click
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === mode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        <div className="text-lg font-semibold text-gray-800 min-w-[150px] text-center">
          July 2025
        </div>
      </div>
      {viewMode === 'day' && <DayView />}
      {viewMode === 'month' && <MonthView />}
      {showTimetableForm && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(134, 133, 133, 0.25), rgba(100, 100, 100, 0.05))',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 100, // Increased z-index to ensure modal is above sidebar
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}>
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingTimetable ? 'Edit Class' : 'Add New Class'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                  <input
                    type="text"
                    value="July"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="text"
                    value="2025"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Week</label>
                <select
                  value={timetableForm.weekIndex}
                  onChange={(e) => setTimetableForm({...timetableForm, weekIndex: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {weekDateRanges.map((range, idx) => (
                    <option key={idx} value={idx}>Week {idx + 1} ({range.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={timetableForm.subject || ''}
                  onChange={(e) => setTimetableForm({...timetableForm, subject: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professor</label>
                <input
                  type="text"
                  value={timetableForm.professor || ''}
                  onChange={(e) => setTimetableForm({...timetableForm, professor: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                <select
                  value={timetableForm.day || 'Monday'}
                  onChange={(e) => setTimetableForm({...timetableForm, day: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={timetableForm.startTime || ''}
                    onChange={(e) => setTimetableForm({...timetableForm, startTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={timetableForm.endTime || ''}
                    onChange={(e) => setTimetableForm({...timetableForm, endTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <input
                  type="text"
                  value={timetableForm.room || ''}
                  onChange={(e) => setTimetableForm({...timetableForm, room: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={timetableForm.type || 'Lecture'}
                  onChange={(e) => setTimetableForm({...timetableForm, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Lecture">Lecture</option>
                  <option value="Lab">Lab</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleTimetableSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>{editingTimetable ? 'Update' : 'Add'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTimetableForm(false);
                    setTimetableForm({
                      weekIndex: 0,
                      subject: '',
                      professor: '',
                      day: 'Monday',
                      startTime: '',
                      endTime: '',
                      room: '',
                      type: 'Lecture'
                    });
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableSection;