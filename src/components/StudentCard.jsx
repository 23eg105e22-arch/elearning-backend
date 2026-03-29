import { Mail, User, Trash2 } from 'lucide-react';
import './StudentCard.css';

export default function StudentCard({ name, email, id, onDelete }) {
  return (
    <div className="student-card">
      <div className="student-avatar">
        <User size={32} />
      </div>

      <div className="student-info">
        <h4>{name}</h4>
        <div className="student-email">
          <Mail size={14} />
          <span>{email}</span>
        </div>
        <p className="student-id">ID: {id}</p>
      </div>

      <button className="btn-icon btn-danger" onClick={() => onDelete(id)}>
        <Trash2 size={18} />
      </button>
    </div>
  );
}
