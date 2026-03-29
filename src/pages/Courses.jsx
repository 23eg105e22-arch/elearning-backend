import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import FormInput from '../components/FormInput';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import '../styles/Courses.css';

const COURSES_STORAGE_KEY = 'edulearn_courses';
const DEFAULT_COURSES = [
  { 
    id: 1, 
    title: 'React Fundamentals', 
    description: 'Master React basics', 
    level: 'Beginner', 
    duration: '4 weeks', 
    students: 1250,
    notes: [
      'Introduction to React components and JSX',
      'State management with useState hook',
      'Props and component communication',
      'Event handling in React',
      'Conditional rendering techniques'
    ],
    videos: [
      { title: 'React Setup and First Component', url: 'https://example.com/react-setup' },
      { title: 'Understanding JSX', url: 'https://example.com/react-jsx' },
      { title: 'State and Props Deep Dive', url: 'https://example.com/react-state-props' },
      { title: 'Event Handling', url: 'https://example.com/react-events' }
    ]
  },
  { 
    id: 2, 
    title: 'Advanced JavaScript', 
    description: 'Deep dive into JavaScript', 
    level: 'Advanced', 
    duration: '6 weeks', 
    students: 890,
    notes: [
      'ES6+ features and modern JavaScript',
      'Asynchronous programming with Promises and async/await',
      'Closures and scope in JavaScript',
      'Prototypal inheritance and classes',
      'Advanced array and object methods'
    ],
    videos: [
      { title: 'ES6 Features Overview', url: 'https://example.com/js-es6' },
      { title: 'Promises and Async Programming', url: 'https://example.com/js-promises' },
      { title: 'Closures Explained', url: 'https://example.com/js-closures' },
      { title: 'Modern JavaScript Patterns', url: 'https://example.com/js-patterns' }
    ]
  },
  { 
    id: 3, 
    title: 'Full Stack Development', 
    description: 'Complete web applications', 
    level: 'Intermediate', 
    duration: '8 weeks', 
    students: 2150,
    notes: [
      'Frontend-backend integration patterns',
      'RESTful API design principles',
      'Database relationships and queries',
      'Authentication and authorization',
      'Deployment strategies for full-stack apps'
    ],
    videos: [
      { title: 'Full Stack Architecture', url: 'https://example.com/fullstack-arch' },
      { title: 'API Design Best Practices', url: 'https://example.com/api-design' },
      { title: 'Database Integration', url: 'https://example.com/db-integration' },
      { title: 'Deployment and Scaling', url: 'https://example.com/deployment' }
    ]
  },
  { 
    id: 4, 
    title: 'Web Design Mastery', 
    description: 'Modern design principles', 
    level: 'Beginner', 
    duration: '5 weeks', 
    students: 1520,
    notes: [
      'Responsive design principles',
      'CSS Grid and Flexbox layouts',
      'Typography and color theory',
      'User experience design fundamentals',
      'Accessibility best practices'
    ],
    videos: [
      { title: 'Responsive Design Fundamentals', url: 'https://example.com/responsive-design' },
      { title: 'CSS Layout Techniques', url: 'https://example.com/css-layouts' },
      { title: 'Design Theory Basics', url: 'https://example.com/design-theory' },
      { title: 'Accessibility in Web Design', url: 'https://example.com/web-accessibility' }
    ]
  },
  { 
    id: 5, 
    title: 'Python for Beginners', 
    description: 'Learn Python programming from scratch', 
    level: 'Beginner', 
    duration: '6 weeks', 
    students: 980,
    notes: [
      'Python syntax and basic data types',
      'Control flow and loops',
      'Functions and modules',
      'File handling and I/O operations',
      'Error handling with try-except'
    ],
    videos: [
      { title: 'Python Installation and Setup', url: 'https://example.com/python-setup' },
      { title: 'Variables and Data Types', url: 'https://example.com/python-variables' },
      { title: 'Control Structures', url: 'https://example.com/python-control' },
      { title: 'Functions in Python', url: 'https://example.com/python-functions' }
    ]
  },
  { 
    id: 6, 
    title: 'Data Science with Python', 
    description: 'Analyze data and build predictive models', 
    level: 'Intermediate', 
    duration: '10 weeks', 
    students: 750,
    notes: [
      'Data manipulation with pandas',
      'Data visualization with matplotlib and seaborn',
      'Statistical analysis techniques',
      'Machine learning preprocessing',
      'Model evaluation metrics'
    ],
    videos: [
      { title: 'Data Science Workflow', url: 'https://example.com/data-workflow' },
      { title: 'Pandas for Data Analysis', url: 'https://example.com/pandas-intro' },
      { title: 'Data Visualization', url: 'https://example.com/data-viz' },
      { title: 'Statistical Analysis', url: 'https://example.com/statistics' }
    ]
  },
  { 
    id: 7, 
    title: 'Machine Learning Basics', 
    description: 'Introduction to machine learning algorithms', 
    level: 'Intermediate', 
    duration: '8 weeks', 
    students: 620,
    notes: [
      'Supervised vs unsupervised learning',
      'Linear regression and classification',
      'Decision trees and random forests',
      'Model validation techniques',
      'Overfitting and underfitting'
    ],
    videos: [
      { title: 'ML Fundamentals', url: 'https://example.com/ml-fundamentals' },
      { title: 'Linear Regression', url: 'https://example.com/linear-regression' },
      { title: 'Classification Algorithms', url: 'https://example.com/classification' },
      { title: 'Model Evaluation', url: 'https://example.com/model-evaluation' }
    ]
  },
  { 
    id: 8, 
    title: 'Node.js Backend Development', 
    description: 'Build scalable server-side applications', 
    level: 'Intermediate', 
    duration: '7 weeks', 
    students: 890,
    notes: [
      'Node.js runtime and npm',
      'Express.js framework basics',
      'Middleware and routing',
      'Database integration with MongoDB',
      'API authentication and security'
    ],
    videos: [
      { title: 'Node.js Introduction', url: 'https://example.com/nodejs-intro' },
      { title: 'Express.js Fundamentals', url: 'https://example.com/express-basics' },
      { title: 'Database Integration', url: 'https://example.com/nodejs-db' },
      { title: 'API Security', url: 'https://example.com/api-security' }
    ]
  },
  { 
    id: 9, 
    title: 'Database Design & SQL', 
    description: 'Master database design and SQL querying', 
    level: 'Beginner', 
    duration: '5 weeks', 
    students: 1100,
    notes: [
      'Relational database concepts',
      'SQL DDL and DML commands',
      'Database normalization',
      'Joins and complex queries',
      'Indexing and performance optimization'
    ],
    videos: [
      { title: 'Database Fundamentals', url: 'https://example.com/db-fundamentals' },
      { title: 'SQL Basics', url: 'https://example.com/sql-basics' },
      { title: 'Database Design', url: 'https://example.com/db-design' },
      { title: 'Query Optimization', url: 'https://example.com/query-optimization' }
    ]
  },
  { 
    id: 10, 
    title: 'Mobile App Development with React Native', 
    description: 'Create cross-platform mobile apps', 
    level: 'Intermediate', 
    duration: '9 weeks', 
    students: 580,
    notes: [
      'React Native components and APIs',
      'Navigation between screens',
      'Platform-specific code',
      'App store deployment',
      'Performance optimization'
    ],
    videos: [
      { title: 'React Native Setup', url: 'https://example.com/react-native-setup' },
      { title: 'Components and Navigation', url: 'https://example.com/rn-components' },
      { title: 'Platform Differences', url: 'https://example.com/rn-platforms' },
      { title: 'Publishing Apps', url: 'https://example.com/rn-deployment' }
    ]
  },
  { 
    id: 11, 
    title: 'DevOps & CI/CD', 
    description: 'Learn modern DevOps practices', 
    level: 'Advanced', 
    duration: '6 weeks', 
    students: 450,
    notes: [
      'Version control with Git',
      'Continuous integration pipelines',
      'Containerization with Docker',
      'Infrastructure as Code',
      'Monitoring and logging'
    ],
    videos: [
      { title: 'DevOps Principles', url: 'https://example.com/devops-principles' },
      { title: 'CI/CD Pipelines', url: 'https://example.com/ci-cd' },
      { title: 'Docker Fundamentals', url: 'https://example.com/docker-intro' },
      { title: 'Infrastructure Automation', url: 'https://example.com/iac' }
    ]
  },
  { 
    id: 12, 
    title: 'Cloud Computing with AWS', 
    description: 'Master Amazon Web Services', 
    level: 'Intermediate', 
    duration: '8 weeks', 
    students: 720,
    notes: [
      'AWS core services overview',
      'EC2 instances and scaling',
      'S3 storage and CDN',
      'Database services (RDS, DynamoDB)',
      'Serverless computing with Lambda'
    ],
    videos: [
      { title: 'AWS Fundamentals', url: 'https://example.com/aws-fundamentals' },
      { title: 'EC2 and Compute Services', url: 'https://example.com/aws-ec2' },
      { title: 'Storage Solutions', url: 'https://example.com/aws-storage' },
      { title: 'Serverless Architecture', url: 'https://example.com/aws-serverless' }
    ]
  },
  { 
    id: 13, 
    title: 'Cybersecurity Fundamentals', 
    description: 'Learn essential security principles', 
    level: 'Beginner', 
    duration: '7 weeks', 
    students: 680,
    notes: [
      'Information security principles',
      'Common cyber threats and attacks',
      'Encryption and cryptography',
      'Network security basics',
      'Security best practices'
    ],
    videos: [
      { title: 'Security Principles', url: 'https://example.com/security-principles' },
      { title: 'Threat Landscape', url: 'https://example.com/cyber-threats' },
      { title: 'Encryption Basics', url: 'https://example.com/encryption' },
      { title: 'Network Security', url: 'https://example.com/network-security' }
    ]
  },
  { 
    id: 14, 
    title: 'UI/UX Design Principles', 
    description: 'Create user-centered designs', 
    level: 'Beginner', 
    duration: '6 weeks', 
    students: 920,
    notes: [
      'User-centered design process',
      'Wireframing and prototyping',
      'Usability testing methods',
      'Design systems and consistency',
      'Accessibility guidelines'
    ],
    videos: [
      { title: 'Design Thinking', url: 'https://example.com/design-thinking' },
      { title: 'Wireframing Techniques', url: 'https://example.com/wireframing' },
      { title: 'Usability Testing', url: 'https://example.com/usability-testing' },
      { title: 'Design Systems', url: 'https://example.com/design-systems' }
    ]
  },
  { 
    id: 15, 
    title: 'Blockchain Technology', 
    description: 'Understanding blockchain and crypto', 
    level: 'Intermediate', 
    duration: '8 weeks', 
    students: 540,
    notes: [
      'Blockchain fundamentals and consensus',
      'Cryptocurrency concepts',
      'Smart contracts with Solidity',
      'Decentralized applications (dApps)',
      'Blockchain security considerations'
    ],
    videos: [
      { title: 'Blockchain Basics', url: 'https://example.com/blockchain-basics' },
      { title: 'Cryptocurrency Explained', url: 'https://example.com/crypto-concepts' },
      { title: 'Smart Contracts', url: 'https://example.com/smart-contracts' },
      { title: 'Building dApps', url: 'https://example.com/dapps' }
    ]
  },
  { 
    id: 16, 
    title: 'Artificial Intelligence', 
    description: 'Introduction to AI concepts and applications', 
    level: 'Advanced', 
    duration: '10 weeks', 
    students: 410,
    notes: [
      'AI fundamentals and applications',
      'Neural networks and deep learning',
      'Natural language processing',
      'Computer vision basics',
      'AI ethics and responsible AI'
    ],
    videos: [
      { title: 'AI Overview', url: 'https://example.com/ai-overview' },
      { title: 'Neural Networks', url: 'https://example.com/neural-networks' },
      { title: 'NLP Fundamentals', url: 'https://example.com/nlp-basics' },
      { title: 'Computer Vision', url: 'https://example.com/computer-vision' }
    ]
  }
];

export default function Courses() {
  const [courses, setCourses] = useState(() => {
    const storedCourses = loadFromStorage(COURSES_STORAGE_KEY, null);
    return storedCourses && storedCourses.length > 0 ? storedCourses : DEFAULT_COURSES;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    saveToStorage(COURSES_STORAGE_KEY, courses);
  }, [courses]);

  const handleAddCourse = (e) => {
    e.preventDefault();

    const result = formData.title.trim();
    const description = formData.description.trim();

    if (!result || !description) {
      setError('Please provide title and description for the course.');
      return;
    }

    if (courses.some((course) => course.title.toLowerCase() === result.toLowerCase())) {
      setError('A course with this title already exists.');
      return;
    }

    setCourses([
      ...courses,
      {
        id: Date.now(),
        title: result,
        description,
        level: 'Beginner',
        duration: '4 weeks',
        students: 0
      }
    ]);

    setFormData({ title: '', description: '' });
    setShowForm(false);
    setError('');
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [courses, searchTerm]
  );

  return (
    <main className="courses-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Courses</h1>
            <p className="page-subtitle">Explore our comprehensive curriculum</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={20} />
            Add New Course
          </button>
        </div>

        {/* Add Course Form */}
        {showForm && (
          <div className="form-section">
            <h3>Add New Course</h3>
            <form onSubmit={handleAddCourse}>
              <FormInput
                label="Course Title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <FormInput
                label="Description"
                placeholder="Enter course description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              {error && <div className="form-error-message">{error}</div>}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Create Course
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
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <p className="search-results">
              Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                level={course.level}
                duration={course.duration}
                students={course.students}
                onClick={() => alert(`Enrolled in ${course.title}`)}
                onDelete={() => handleDeleteCourse(course.id)}
              />
            ))
          ) : (
            <div className="empty-state">
              <BookOpen size={48} />
              <h3>No Courses Found</h3>
              <p>Try adjusting your search or add a new course</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
