import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import StudentCard from '../components/StudentCard';
import FormInput from '../components/FormInput';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import '../styles/Students.css';

const STUDENTS_STORAGE_KEY = 'edulearn_students';
const DEFAULT_STUDENTS = [
  { id: 'STU001', name: 'John Doe', email: 'john@example.com' },
  { id: 'STU002', name: 'Jane Smith', email: 'jane@example.com' },
  { id: 'STU003', name: 'Mike Johnson', email: 'mike@example.com' },
  { id: 'STU004', name: 'Emily Brown', email: 'emily@example.com' }
];

export default function Students() {
  const [students, setStudents] = useState(() => {
    const storedStudents = loadFromStorage(STUDENTS_STORAGE_KEY, null);
    return storedStudents && storedStudents.length > 0 ? storedStudents : DEFAULT_STUDENTS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    saveToStorage(STUDENTS_STORAGE_KEY, students);
  }, [students]);

  const handleAddStudent = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (students.some((student) => student.email.toLowerCase() === email.toLowerCase())) {
      setError('This email is already registered.');
      return;
    }

    setStudents([
      ...students,
      {
        id: `STU${String(students.length + 1).padStart(3, '0')}`,
        name,
        email
      }
    ]);

    setFormData({ name: '', email: '' });
    setShowForm(false);
    setError('');
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = useMemo(
    () =>
      students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, students]
  );

  return (
    <main className="students-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Students</h1>
            <p className="page-subtitle">Manage student registrations</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>

        {/* Add Student Form */}
        {showForm && (
          <div className="form-section">
            <h3>Add New Student</h3>
            <form onSubmit={handleAddStudent}>
              <FormInput
                label="Student Name"
                placeholder="Enter student name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <FormInput
                label="Email Address"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              {error && <div className="form-error-message">{error}</div>}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Add Student
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowForm(false);
                    setError('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="search-section">
          <div className="search-input">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <p className="search-results">
              Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Students List */}
        <div className="students-list">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <StudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                email={student.email}
                onDelete={handleDeleteStudent}
              />
            ))
          ) : (
            <div className="empty-state">
              <Users size={48} />
              <h3>No Students Found</h3>
              <p>Add a new student to get started</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="students-stats">
          <div className="stat-card">
            <div className="stat-value">{students.length}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>
      </div>
    </main>
  );
}
