import React, { useState, useMemo } from 'react';
import {
  Home, Search, Calendar, MessageSquare, User, Settings, Bell, LogOut,
  Package, Clock, AlertTriangle, ChevronRight, Menu, X, Plus, Filter,
  MapPin, Image as ImageIcon, Edit, Trash2, Eye, CheckCircle, XCircle, Save, Upload
} from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar';
import DashboardSection from '../components/Dashboard/DashboardSection';
import LostAndFoundSection from '../components/Dashboard/LostAndFoundSection';
import TimetableSection from '../components/Dashboard/TimetableSection';
import ComplaintsSection from '../components/Dashboard/ComplaintsSection';
import ProfileSection from '../components/Dashboard/ProfileSection';
import SettingsSection from '../components/Dashboard/SettingsSection';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lost & Found State (unchanged)
  const [lostFoundItems, setLostFoundItems] = useState([
    {
      id: 1,
      type: 'lost',
      title: 'Black Laptop Bag',
      description: 'Black Dell laptop bag with charger inside',
      category: 'Electronics',
      location: 'Library 2nd Floor',
      date: '2025-07-23',
      status: 'active',
      contact: 'john@student.edu',
      image: null
    },
    {
      id: 2,
      type: 'found',
      title: 'Blue Water Bottle',
      description: 'Steel blue water bottle with university sticker',
      category: 'Personal Items',
      location: 'Cafeteria',
      date: '2025-07-22',
      status: 'claimed',
      contact: 'admin@university.edu',
      image: null
    }
  ]);

  const [lostFoundFilter, setLostFoundFilter] = useState({ type: 'all', category: 'all', status: 'all' });
  const [showLostFoundForm, setShowLostFoundForm] = useState(false);
  const [lostFoundForm, setLostFoundForm] = useState({
    type: 'lost',
    title: '',
    description: '',
    category: 'Electronics',
    location: '',
    contact: '',
    image: null
  });

  // Timetable State
  const [timetable, setTimetable] = useState([
    // Week 1 (July 7-13, 2025)
    {
      Monday: [
        { id: 1, subject: 'Data Structures', professor: 'Dr. Smith', startTime: '09:00', endTime: '10:30', room: 'CS-101', type: 'Lecture', date: '2025-07-07' },
        { id: 9, subject: 'Computer Networks', professor: 'Dr. Patel', startTime: '11:00', endTime: '12:30', room: 'CS-105', type: 'Lecture', date: '2025-07-07' },
        { id: 3, subject: 'Algorithms', professor: 'Dr. Brown', startTime: '10:00', endTime: '11:30', room: 'CS-103', type: 'Lecture', date: '2025-07-14' },
        { id: 4, subject: 'Database Systems', professor: 'Dr. Johnson', startTime: '11:00', endTime: '12:30', room: 'CS-102', type: 'Lab', date: '2025-07-15' }
      ],
      Tuesday: [{ id: 2, subject: 'Database Systems', professor: 'Dr. Johnson', startTime: '11:00', endTime: '12:30', room: 'CS-102', type: 'Lab', date: '2025-07-08' }],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    },
    // Week 2 (July 14-20, 2025)
    {
      Monday: [{ id: 3, subject: 'Algorithms', professor: 'Dr. Brown', startTime: '10:00', endTime: '11:30', room: 'CS-103', type: 'Lecture', date: '2025-07-14' }],
      Tuesday: [{ id: 4, subject: 'Database Systems', professor: 'Dr. Johnson', startTime: '11:00', endTime: '12:30', room: 'CS-102', type: 'Lab', date: '2025-07-15' }],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    },
    // Week 3 (July 21-27, 2025)
    {
      Monday: [{ id: 5, subject: 'Operating Systems', professor: 'Dr. Lee', startTime: '09:00', endTime: '10:30', room: 'CS-104', type: 'Lecture', date: '2025-07-21' }],
      Tuesday: [{ id: 6, subject: 'Database Systems', professor: 'Dr. Johnson', startTime: '11:00', endTime: '12:30', room: 'CS-102', type: 'Lab', date: '2025-07-22' }],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    },
    // Week 4 (July 28-August 3, 2025)
    {
      Monday: [{ id: 7, subject: 'Data Structures', professor: 'Dr. Smith', startTime: '09:00', endTime: '10:30', room: 'CS-101', type: 'Lecture', date: '2025-07-28' }],
      Tuesday: [{ id: 8, subject: 'Database Systems', professor: 'Dr. Johnson', startTime: '11:00', endTime: '12:30', room: 'CS-102', type: 'Lab', date: '2025-07-29' }],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    },
    // Week 5 (August 4-10, 2025)
    {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  ]);

  const [showTimetableForm, setShowTimetableForm] = useState(false);
  const [timetableForm, setTimetableForm] = useState({
    weekIndex: 0,
    subject: '',
    professor: '',
    day: 'Monday',
    startTime: '',
    endTime: '',
    room: '',
    type: 'Lecture'
  });
  const [editingTimetable, setEditingTimetable] = useState(null);
  const [currentDate] = useState(new Date(2025, 6, 1)); // Fixed to July 1, 2025 (month is 0-indexed)

  // Complaints State (unchanged)
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Water Supply Issue',
      category: 'Water',
      description: 'No water supply in Room 201 since morning',
      priority: 'High',
      status: 'In Progress',
      date: '2025-07-23',
      room: 'H-201',
      assignedTo: 'Maintenance Team A'
    },
    {
      id: 2,
      title: 'Electricity Problem',
      category: 'Electricity',
      description: 'Frequent power cuts in Block B',
      priority: 'Medium',
      status: 'Pending',
      date: '2025-07-22',
      room: 'H-B',
      assignedTo: 'Electrical Team'
    }
  ]);

  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    category: 'Water',
    description: '',
    priority: 'Medium',
    room: ''
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'lost-found', label: 'Lost & Found', icon: Search },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'complaints', label: 'Hostel Complaints', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const categories = ['Electronics', 'Books', 'Clothing', 'Personal Items', 'Accessories', 'Other'];
  const complaintCategories = ['Water', 'Electricity', 'Cleaning', 'Maintenance', 'Internet', 'Security', 'Other'];

  // Filtered Lost & Found Items (unchanged)
  const filteredLostFoundItems = useMemo(() => {
    return lostFoundItems.filter(item => {
      return (lostFoundFilter.type === 'all' || item.type === lostFoundFilter.type) &&
             (lostFoundFilter.category === 'all' || item.category === lostFoundFilter.category) &&
             (lostFoundFilter.status === 'all' || item.status === lostFoundFilter.status);
    });
  }, [lostFoundItems, lostFoundFilter]);

  // Quick Stats
  const quickStats = [
    { label: 'Active Complaints', value: complaints.filter(c => c.status !== 'Resolved').length, icon: AlertTriangle, color: 'text-orange-600 bg-orange-50' },
    { label: 'Lost Items Found', value: lostFoundItems.filter(i => i.type === 'found' && i.status === 'active').length, icon: Package, color: 'text-green-600 bg-green-50' },
    { label: 'Classes This Week', value: timetable[0] ? Object.values(timetable[0]).flat().length : 0, icon: Clock, color: 'text-blue-600 bg-blue-50' },
    { label: 'Lost Reports', value: lostFoundItems.filter(i => i.type === 'lost' && i.status === 'active').length, icon: Bell, color: 'text-purple-600 bg-purple-50' },
  ];

  // Calculate week date ranges for timetable validation (fixed to July 2025)
  const weekDateRanges = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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
  }, [currentDate]);

  // Handlers
  const handleLostFoundSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...lostFoundForm,
      date: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setLostFoundItems([...lostFoundItems, newItem]);
    setLostFoundForm({
      type: 'lost',
      title: '',
      description: '',
      category: 'Electronics',
      location: '',
      contact: '',
      image: null
    });
    setShowLostFoundForm(false);
  };

  const handleTimetableSubmit = (e) => {
    e.preventDefault();
    const { weekIndex, subject, professor, day, startTime, endTime, room, type } = timetableForm;

    // Calculate the exact date for the class
    const weekRange = weekDateRanges[weekIndex];
    if (!weekRange) {
      alert('Invalid week selected.');
      return;
    }
    const dayIndex = days.indexOf(day);
    const classDate = new Date(weekRange.start);
    classDate.setDate(weekRange.start.getDate() + dayIndex);
    
    // Validate that the date is in July 2025
    if (classDate.getMonth() !== 6 || classDate.getFullYear() !== 2025) { // July is month 6 (0-indexed)
      alert(`Selected date (${classDate.toLocaleDateString('en-US')}) is not in July 2025. Please choose a valid week and day.`);
      return;
    }

    // Ensure timetable has enough weeks
    const newTimetable = [...timetable];
    while (newTimetable.length <= weekIndex) {
      newTimetable.push({
        Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
      });
    }

    // Check for time conflicts
    const existingClasses = newTimetable[weekIndex][day] || [];
    const conflictingClass = existingClasses.find(item =>
      (startTime >= item.startTime && startTime < item.endTime) ||
      (endTime > item.startTime && endTime <= item.endTime) ||
      (startTime <= item.startTime && endTime >= item.endTime)
    );

    if (conflictingClass) {
      alert(`Time conflict detected with "${conflictingClass.subject}" (${conflictingClass.startTime} - ${conflictingClass.endTime}). Please choose a different time slot.`);
      return;
    }

    const newItem = { id: Date.now(), subject, professor, startTime, endTime, room, type, date: classDate.toISOString().split('T')[0] };

    if (editingTimetable) {
      setTimetable(newTimetable.map((week, idx) =>
        idx === editingTimetable.weekIndex
          ? {
              ...week,
              [editingTimetable.day]: week[editingTimetable.day].map(item =>
                item.id === editingTimetable.id ? newItem : item
              )
            }
          : week
      ));
      setEditingTimetable(null);
    } else {
      setTimetable(newTimetable.map((week, idx) =>
        idx === weekIndex
          ? { ...week, [day]: [...(week[day] || []), newItem] }
          : week
      ));
    }

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
    setShowTimetableForm(false);
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    const newComplaint = {
      id: Date.now(),
      ...complaintForm,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      assignedTo: 'Maintenance Team'
    };
    setComplaints([...complaints, newComplaint]);
    setComplaintForm({
      title: '',
      category: 'Water',
      description: '',
      priority: 'Medium',
      room: ''
    });
    setShowComplaintForm(false);
  };

  const deleteTimetableItem = (weekIndex, day, id) => {
    setTimetable(timetable.map((week, idx) =>
      idx === weekIndex
        ? { ...week, [day]: week[day].filter(item => item.id !== id) }
        : week
    ));
  };

  const editTimetableItem = (weekIndex, day, item) => {
    setTimetableForm({ ...item, weekIndex, day });
    setEditingTimetable({ ...item, weekIndex, day });
    setShowTimetableForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItems}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Menu size={24} />
          </button>
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === 'dashboard' && (
            <DashboardSection
              quickStats={quickStats}
              setActiveSection={setActiveSection}
            />
          )}
          {activeSection === 'lost-found' && (
            <LostAndFoundSection
              lostFoundItems={filteredLostFoundItems}
              lostFoundFilter={lostFoundFilter}
              setLostFoundFilter={setLostFoundFilter}
              showLostFoundForm={showLostFoundForm}
              setShowLostFoundForm={setShowLostFoundForm}
              lostFoundForm={lostFoundForm}
              setLostFoundForm={setLostFoundForm}
              handleLostFoundSubmit={handleLostFoundSubmit}
              categories={categories}
            />
          )}
          {activeSection === 'timetable' && (
            <TimetableSection
              timetable={timetable}
              showTimetableForm={showTimetableForm}
              setShowTimetableForm={setShowTimetableForm}
              timetableForm={timetableForm}
              setTimetableForm={setTimetableForm}
              editingTimetable={editingTimetable}
              handleTimetableSubmit={handleTimetableSubmit}
              deleteTimetableItem={deleteTimetableItem}
              editTimetableItem={editTimetableItem}
              days={days}
              currentDate={currentDate} // Fixed to July 2025
            />
          )}
          {activeSection === 'complaints' && (
            <ComplaintsSection
              complaints={complaints}
              showComplaintForm={showComplaintForm}
              setShowComplaintForm={setShowComplaintForm}
              complaintForm={complaintForm}
              setComplaintForm={setComplaintForm}
              handleComplaintSubmit={handleComplaintSubmit}
              complaintCategories={complaintCategories}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
            />
          )}
          {activeSection === 'profile' && (
            <ProfileSection />
          )}
          {activeSection === 'settings' && (
            <SettingsSection />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
