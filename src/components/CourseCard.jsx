import { Clock, Users, BookOpen, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

export default function CourseCard({ id, title, description, duration, students, level, onClick, onDelete }) {
  return (
    <div className="course-card">
      <div className="course-card-header">
        <div className="course-icon">
          <BookOpen size={28} />
        </div>
        <span className="badge badge-primary">{level || 'Beginner'}</span>
      </div>

      <div className="course-card-body">
        <h3>{title}</h3>
        <p className="course-description">{description}</p>

        <div className="course-meta">
          <div className="meta-item">
            <Clock size={16} />
            <span>{duration || '4 weeks'}</span>
          </div>
          <div className="meta-item">
            <Users size={16} />
            <span>{students || 0} students</span>
          </div>
        </div>
      </div>

      <div className="course-card-footer">
        <Link to={`/courses/${id}`} className="btn btn-outline btn-sm">
          <Eye size={14} />
          View Details
        </Link>
        <button className="btn btn-primary btn-sm" onClick={onClick}>
          Enroll Now
        </button>
        {onDelete && (
          <button className="btn btn-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
