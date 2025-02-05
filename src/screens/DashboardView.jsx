import React from 'react';
import { Bell, LogOut, Plus, Eye, Edit2, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db, useFirebase } from '../context/FirebaseProvider';
import { collection, addDoc, getDocs } from "firebase/firestore"; 

export const DashboardView = () => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [name, setName] = useState('');
  const [standard, setStandard] = useState('');
  const [id, setId] = useState('');
  const [section, setSection] = useState('');
  const [rollNo, setrollNo] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [time, setTime] = useState('');
  const [url, setUrl] = useState('');
  const [students, setStudents] = useState([]);
  const userDetails = useFirebase();

  const getStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsList = [];
      querySnapshot.forEach((doc) => {
        studentsList.push(doc.data());
      });
      setStudents(studentsList);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), {
        name, standard, id, section, rollNo, state,
        zip, course, semester, dateOfBirth, time, url,
      });
      alert("Successfully Added Student: " + name);
      setShowTicketModal(false);
      // Fetch updated list after adding new student
      getStudents();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getStudents();
  }, []); 

   return <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <img style={{height:"50px",width:"50px",backgroundSize:"cover"}} src='/images\logo.avif' />
          <h1 className="text-xl font-bold text-gray-800">Student Management System</h1>
          <p className="text-sm text-gray-500 mt-4">😀Welcome back, Admin</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-6 py-3 bg-blue-50 border-r-4 border-blue-500 flex items-center">
            <span className="text-blue-500 font-medium">Students</span>
          </div>
          <div className="px-6 py-3 flex items-center text-gray-500 hover:bg-gray-50 cursor-pointer" 
               onClick={() => {userDetails.logout()}}>
            <LogOut className="w-4 h-4 mr-3" />
            <span>Logout</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold">Student Management</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">All Students</h3>
              <p className="text-sm text-gray-500">Manage and track students details</p>
            </div>
            <button
              onClick={() => setShowTicketModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Student ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Class</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Section</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">rollNo</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
             { students.map((student, index) => 
                 { return  (<tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">{student.id}</td>
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">{student.standard}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.section === 'A' ? 'bg-red-100 text-red-700' :
                        student.section === 'B' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {student.section}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={'px-2 py-1 rounded-full text-xs'}>
                        {student.rollNo}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="p-1 hover:text-blue-500"><Eye className="w-4 h-4" /></button>
                        <button className="p-1 hover:text-green-500"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>)}
             )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* New Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Add New Student</h3>
              <button onClick={() => setShowTicketModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className='p-6'>
            <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name:
          <input className="w-full p-2 border rounded-lg"
            type="text"
           
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Class:
          <input className="w-full p-2 border rounded-lg"
            type="text"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Id:
          <input className="w-full p-2 border rounded-lg"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          section:
          <input className="w-full p-2 border rounded-lg"
            type="text"
            placeholder='A or B'
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          RollNo:
          <input className="w-full p-2 border rounded-lg"
            type="number"
            value={rollNo}
            onChange={(e) => setrollNo(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State:
          <input className="w-full p-2 border rounded-lg"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Zip:
          <input className="w-full p-2 border rounded-lg"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
  </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course:
          <input className="w-full p-2 border rounded-lg"
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Semester:
          <input className="w-full p-2 border rounded-lg"
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth:
          <input className="w-full p-2 border rounded-lg"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time:
          <input className="w-full p-2 border rounded-lg"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL: 
          <input className="w-full p-2 border rounded-lg"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <br />
      <button
        type="button"
        onClick={() => setShowTicketModal(false)}
        className="px-4 py-2 text-gray-600 hover:text-gray-800"
       >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Create Student
      </button>
      </form> 
    </div>
  
</div>
</div>
        
      )}
    </div>
}
