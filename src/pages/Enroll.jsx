import { useState, useEffect } from 'react';
import { UserCheck, Users, BookOpen, Trash2 } from 'lucide-react';
import FormInput from '../components/FormInput';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Enroll.css';

const ENROLLMENTS_STORAGE_KEY = 'edulearn_enrollments';

export default function Enroll() {
  const [enrollments, setEnrollments] = useState(() => loadFromStorage(ENROLLMENTS_STORAGE_KEY, []));
  const [formData, setFormData] = useState({ courseId: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    saveToStorage(ENROLLMENTS_STORAGE_KEY, enrollments);
  }, [enrollments]);

  const mockCourses = [
    { 
      id: 'CRS001', 
      name: 'React Fundamentals',
      notes: [
        { text: 'Introduction to React components and JSX', pdf: 'https://example.com/pdfs/react-fundamentals-intro.pdf' },
        { text: 'State management with useState hook', pdf: 'https://example.com/pdfs/react-state-management.pdf' },
        { text: 'Props and component communication', pdf: 'https://example.com/pdfs/react-props-communication.pdf' },
        { text: 'Event handling in React', pdf: 'https://example.com/pdfs/react-event-handling.pdf' },
        { text: 'Conditional rendering techniques', pdf: 'https://example.com/pdfs/react-conditional-rendering.pdf' }
      ],
      videos: [
        { title: 'React Setup and First Component', url: 'https://example.com/react-setup' },
        { title: 'Understanding JSX', url: 'https://example.com/react-jsx' },
        { title: 'State and Props Deep Dive', url: 'https://example.com/react-state-props' },
        { title: 'Event Handling', url: 'https://example.com/react-events' }
      ]
    },
    { 
      id: 'CRS002', 
      name: 'Advanced JavaScript',
      notes: [
        { text: 'ES6+ features and modern JavaScript', pdf: 'https://example.com/pdfs/js-es6-features.pdf' },
        { text: 'Asynchronous programming with Promises and async/await', pdf: 'https://example.com/pdfs/js-async-programming.pdf' },
        { text: 'Closures and scope in JavaScript', pdf: 'https://example.com/pdfs/js-closures-scope.pdf' },
        { text: 'Prototypal inheritance and classes', pdf: 'https://example.com/pdfs/js-prototypal-inheritance.pdf' },
        { text: 'Advanced array and object methods', pdf: 'https://example.com/pdfs/js-array-object-methods.pdf' }
      ],
      videos: [
        { title: 'ES6 Features Overview', url: 'https://example.com/js-es6' },
        { title: 'Promises and Async Programming', url: 'https://example.com/js-promises' },
        { title: 'Closures Explained', url: 'https://example.com/js-closures' },
        { title: 'Modern JavaScript Patterns', url: 'https://example.com/js-patterns' }
      ]
    },
    { 
      id: 'CRS003', 
      name: 'Full Stack Development',
      notes: [
        { text: 'Frontend-backend integration patterns', pdf: 'https://example.com/pdfs/fullstack-integration.pdf' },
        { text: 'RESTful API design principles', pdf: 'https://example.com/pdfs/restful-api-design.pdf' },
        { text: 'Database relationships and queries', pdf: 'https://example.com/pdfs/database-relationships.pdf' },
        { text: 'Authentication and authorization', pdf: 'https://example.com/pdfs/auth-authorization.pdf' },
        { text: 'Deployment strategies for full-stack apps', pdf: 'https://example.com/pdfs/deployment-strategies.pdf' }
      ],
      videos: [
        { title: 'Full Stack Architecture', url: 'https://example.com/fullstack-arch' },
        { title: 'API Design Best Practices', url: 'https://example.com/api-design' },
        { title: 'Database Integration', url: 'https://example.com/db-integration' },
        { title: 'Deployment and Scaling', url: 'https://example.com/deployment' }
      ]
    },
    { 
      id: 'CRS004', 
      name: 'Web Design Mastery',
      notes: [
        { text: 'Responsive design principles', pdf: 'https://example.com/pdfs/responsive-design.pdf' },
        { text: 'CSS Grid and Flexbox layouts', pdf: 'https://example.com/pdfs/css-grid-flexbox.pdf' },
        { text: 'Typography and color theory', pdf: 'https://example.com/pdfs/typography-color-theory.pdf' },
        { text: 'User experience design fundamentals', pdf: 'https://example.com/pdfs/ux-fundamentals.pdf' },
        { text: 'Accessibility best practices', pdf: 'https://example.com/pdfs/accessibility-best-practices.pdf' }
      ],
      videos: [
        { title: 'Responsive Design Fundamentals', url: 'https://example.com/responsive-design' },
        { title: 'CSS Layout Techniques', url: 'https://example.com/css-layouts' },
        { title: 'Design Theory Basics', url: 'https://example.com/design-theory' },
        { title: 'Accessibility in Web Design', url: 'https://example.com/web-accessibility' }
      ]
    },
    { 
      id: 'CRS005', 
      name: 'Python for Beginners',
      notes: [
        { text: 'Python syntax and basic data types', pdf: 'https://example.com/pdfs/python-syntax-datatypes.pdf' },
        { text: 'Control flow and loops', pdf: 'https://example.com/pdfs/python-control-flow.pdf' },
        { text: 'Functions and modules', pdf: 'https://example.com/pdfs/python-functions-modules.pdf' },
        { text: 'File handling and I/O operations', pdf: 'https://example.com/pdfs/python-file-handling.pdf' },
        { text: 'Error handling with try-except', pdf: 'https://example.com/pdfs/python-error-handling.pdf' }
      ],
      videos: [
        { title: 'Python Installation and Setup', url: 'https://example.com/python-setup' },
        { title: 'Variables and Data Types', url: 'https://example.com/python-variables' },
        { title: 'Control Structures', url: 'https://example.com/python-control' },
        { title: 'Functions in Python', url: 'https://example.com/python-functions' }
      ]
    },
    { 
      id: 'CRS006', 
      name: 'Data Science with Python',
      notes: [
        { text: 'Data manipulation with pandas', pdf: 'https://example.com/pdfs/pandas-data-manipulation.pdf' },
        { text: 'Data visualization with matplotlib and seaborn', pdf: 'https://example.com/pdfs/data-visualization.pdf' },
        { text: 'Statistical analysis techniques', pdf: 'https://example.com/pdfs/statistical-analysis.pdf' },
        { text: 'Machine learning preprocessing', pdf: 'https://example.com/pdfs/ml-preprocessing.pdf' },
        { text: 'Model evaluation metrics', pdf: 'https://example.com/pdfs/model-evaluation.pdf' }
      ],
      videos: [
        { title: 'Data Science Workflow', url: 'https://example.com/data-workflow' },
        { title: 'Pandas for Data Analysis', url: 'https://example.com/pandas-intro' },
        { title: 'Data Visualization', url: 'https://example.com/data-viz' },
        { title: 'Statistical Analysis', url: 'https://example.com/statistics' }
      ]
    },
    { 
      id: 'CRS007', 
      name: 'Machine Learning Basics',
      notes: [
        { text: 'Supervised vs unsupervised learning', pdf: 'https://example.com/pdfs/supervised-unsupervised.pdf' },
        { text: 'Linear regression and classification', pdf: 'https://example.com/pdfs/linear-regression-classification.pdf' },
        { text: 'Decision trees and random forests', pdf: 'https://example.com/pdfs/decision-trees-forests.pdf' },
        { text: 'Model validation techniques', pdf: 'https://example.com/pdfs/model-validation.pdf' },
        { text: 'Overfitting and underfitting', pdf: 'https://example.com/pdfs/overfitting-underfitting.pdf' }
      ],
      videos: [
        { title: 'ML Fundamentals', url: 'https://example.com/ml-fundamentals' },
        { title: 'Linear Regression', url: 'https://example.com/linear-regression' },
        { title: 'Classification Algorithms', url: 'https://example.com/classification' },
        { title: 'Model Evaluation', url: 'https://example.com/model-evaluation' }
      ]
    },
    { 
      id: 'CRS008', 
      name: 'Node.js Backend Development',
      notes: [
        { text: 'Node.js runtime and npm', pdf: 'https://example.com/pdfs/nodejs-runtime-npm.pdf' },
        { text: 'Express.js framework basics', pdf: 'https://example.com/pdfs/express-basics.pdf' },
        { text: 'Middleware and routing', pdf: 'https://example.com/pdfs/middleware-routing.pdf' },
        { text: 'Database integration with MongoDB', pdf: 'https://example.com/pdfs/mongodb-integration.pdf' },
        { text: 'API authentication and security', pdf: 'https://example.com/pdfs/api-auth-security.pdf' }
      ],
      videos: [
        { title: 'Node.js Introduction', url: 'https://example.com/nodejs-intro' },
        { title: 'Express.js Fundamentals', url: 'https://example.com/express-basics' },
        { title: 'Database Integration', url: 'https://example.com/nodejs-db' },
        { title: 'API Security', url: 'https://example.com/api-security' }
      ]
    },
    { 
      id: 'CRS009', 
      name: 'Database Design & SQL',
      notes: [
        { text: 'Relational database concepts', pdf: 'https://example.com/pdfs/relational-db-concepts.pdf' },
        { text: 'SQL DDL and DML commands', pdf: 'https://example.com/pdfs/sql-ddl-dml.pdf' },
        { text: 'Database normalization', pdf: 'https://example.com/pdfs/database-normalization.pdf' },
        { text: 'Joins and complex queries', pdf: 'https://example.com/pdfs/joins-complex-queries.pdf' },
        { text: 'Indexing and performance optimization', pdf: 'https://example.com/pdfs/indexing-performance.pdf' }
      ],
      videos: [
        { title: 'Database Fundamentals', url: 'https://example.com/db-fundamentals' },
        { title: 'SQL Basics', url: 'https://example.com/sql-basics' },
        { title: 'Database Design', url: 'https://example.com/db-design' },
        { title: 'Query Optimization', url: 'https://example.com/query-optimization' }
      ]
    },
    { 
      id: 'CRS010', 
      name: 'Mobile App Development with React Native',
      notes: [
        { text: 'React Native components and APIs', pdf: 'https://example.com/pdfs/react-native-components.pdf' },
        { text: 'Navigation between screens', pdf: 'https://example.com/pdfs/react-native-navigation.pdf' },
        { text: 'Platform-specific code', pdf: 'https://example.com/pdfs/platform-specific-code.pdf' },
        { text: 'App store deployment', pdf: 'https://example.com/pdfs/app-store-deployment.pdf' },
        { text: 'Performance optimization', pdf: 'https://example.com/pdfs/react-native-performance.pdf' }
      ],
      videos: [
        { title: 'React Native Setup', url: 'https://example.com/react-native-setup' },
        { title: 'Components and Navigation', url: 'https://example.com/rn-components' },
        { title: 'Platform Differences', url: 'https://example.com/rn-platforms' },
        { title: 'Publishing Apps', url: 'https://example.com/rn-deployment' }
      ]
    },
    { 
      id: 'CRS011', 
      name: 'DevOps & CI/CD',
      notes: [
        { text: 'Version control with Git', pdf: 'https://example.com/pdfs/git-version-control.pdf' },
        { text: 'Continuous integration pipelines', pdf: 'https://example.com/pdfs/ci-pipelines.pdf' },
        { text: 'Containerization with Docker', pdf: 'https://example.com/pdfs/docker-containerization.pdf' },
        { text: 'Infrastructure as Code', pdf: 'https://example.com/pdfs/infrastructure-as-code.pdf' },
        { text: 'Monitoring and logging', pdf: 'https://example.com/pdfs/monitoring-logging.pdf' }
      ],
      videos: [
        { title: 'DevOps Principles', url: 'https://example.com/devops-principles' },
        { title: 'CI/CD Pipelines', url: 'https://example.com/ci-cd' },
        { title: 'Docker Fundamentals', url: 'https://example.com/docker-intro' },
        { title: 'Infrastructure Automation', url: 'https://example.com/iac' }
      ]
    },
    { 
      id: 'CRS012', 
      name: 'Cloud Computing with AWS',
      notes: [
        { text: 'AWS core services overview', pdf: 'https://example.com/pdfs/aws-core-services.pdf' },
        { text: 'EC2 instances and scaling', pdf: 'https://example.com/pdfs/ec2-instances-scaling.pdf' },
        { text: 'S3 storage and CDN', pdf: 'https://example.com/pdfs/s3-storage-cdn.pdf' },
        { text: 'Database services (RDS, DynamoDB)', pdf: 'https://example.com/pdfs/aws-database-services.pdf' },
        { text: 'Serverless computing with Lambda', pdf: 'https://example.com/pdfs/serverless-lambda.pdf' }
      ],
      videos: [
        { title: 'AWS Fundamentals', url: 'https://example.com/aws-fundamentals' },
        { title: 'EC2 and Compute Services', url: 'https://example.com/aws-ec2' },
        { title: 'Storage Solutions', url: 'https://example.com/aws-storage' },
        { title: 'Serverless Architecture', url: 'https://example.com/aws-serverless' }
      ]
    },
    { 
      id: 'CRS013', 
      name: 'Cybersecurity Fundamentals',
      notes: [
        { text: 'Information security principles', pdf: 'https://example.com/pdfs/info-security-principles.pdf' },
        { text: 'Common cyber threats and attacks', pdf: 'https://example.com/pdfs/cyber-threats-attacks.pdf' },
        { text: 'Encryption and cryptography', pdf: 'https://example.com/pdfs/encryption-cryptography.pdf' },
        { text: 'Network security basics', pdf: 'https://example.com/pdfs/network-security-basics.pdf' },
        { text: 'Security best practices', pdf: 'https://example.com/pdfs/security-best-practices.pdf' }
      ],
      videos: [
        { title: 'Security Principles', url: 'https://example.com/security-principles' },
        { title: 'Threat Landscape', url: 'https://example.com/cyber-threats' },
        { title: 'Encryption Basics', url: 'https://example.com/encryption' },
        { title: 'Network Security', url: 'https://example.com/network-security' }
      ]
    },
    { 
      id: 'CRS014', 
      name: 'UI/UX Design Principles',
      notes: [
        { text: 'User-centered design process', pdf: 'https://example.com/pdfs/user-centered-design.pdf' },
        { text: 'Wireframing and prototyping', pdf: 'https://example.com/pdfs/wireframing-prototyping.pdf' },
        { text: 'Usability testing methods', pdf: 'https://example.com/pdfs/usability-testing.pdf' },
        { text: 'Design systems and consistency', pdf: 'https://example.com/pdfs/design-systems.pdf' },
        { text: 'Accessibility guidelines', pdf: 'https://example.com/pdfs/accessibility-guidelines.pdf' }
      ],
      videos: [
        { title: 'Design Thinking', url: 'https://example.com/design-thinking' },
        { title: 'Wireframing Techniques', url: 'https://example.com/wireframing' },
        { title: 'Usability Testing', url: 'https://example.com/usability-testing' },
        { title: 'Design Systems', url: 'https://example.com/design-systems' }
      ]
    },
    { 
      id: 'CRS015', 
      name: 'Blockchain Technology',
      notes: [
        { text: 'Blockchain fundamentals and consensus', pdf: 'https://example.com/pdfs/blockchain-fundamentals.pdf' },
        { text: 'Cryptocurrency concepts', pdf: 'https://example.com/pdfs/cryptocurrency-concepts.pdf' },
        { text: 'Smart contracts with Solidity', pdf: 'https://example.com/pdfs/smart-contracts-solidity.pdf' },
        { text: 'Decentralized applications (dApps)', pdf: 'https://example.com/pdfs/decentralized-apps.pdf' },
        { text: 'Blockchain security considerations', pdf: 'https://example.com/pdfs/blockchain-security.pdf' }
      ],
      videos: [
        { title: 'Blockchain Basics', url: 'https://example.com/blockchain-basics' },
        { title: 'Cryptocurrency Explained', url: 'https://example.com/crypto-concepts' },
        { title: 'Smart Contracts', url: 'https://example.com/smart-contracts' },
        { title: 'Building dApps', url: 'https://example.com/dapps' }
      ]
    },
    { 
      id: 'CRS016', 
      name: 'Artificial Intelligence',
      notes: [
        { text: 'AI fundamentals and applications', pdf: 'https://example.com/pdfs/ai-fundamentals.pdf' },
        { text: 'Neural networks and deep learning', pdf: 'https://example.com/pdfs/neural-networks-deep-learning.pdf' },
        { text: 'Natural language processing', pdf: 'https://example.com/pdfs/natural-language-processing.pdf' },
        { text: 'Computer vision basics', pdf: 'https://example.com/pdfs/computer-vision-basics.pdf' },
        { text: 'AI ethics and responsible AI', pdf: 'https://example.com/pdfs/ai-ethics.pdf' }
      ],
      videos: [
        { title: 'AI Overview', url: 'https://example.com/ai-overview' },
        { title: 'Neural Networks', url: 'https://example.com/neural-networks' },
        { title: 'NLP Fundamentals', url: 'https://example.com/nlp-basics' },
        { title: 'Computer Vision', url: 'https://example.com/computer-vision' }
      ]
    },
    { 
      id: 'CRS017', 
      name: 'Game Development with Unity',
      notes: [
        { text: 'Unity interface and workflow', pdf: 'https://example.com/pdfs/unity-interface-workflow.pdf' },
        { text: '3D modeling and animation', pdf: 'https://example.com/pdfs/3d-modeling-animation.pdf' },
        { text: 'Physics and collision detection', pdf: 'https://example.com/pdfs/physics-collision-detection.pdf' },
        { text: 'Game mechanics and scripting', pdf: 'https://example.com/pdfs/game-mechanics-scripting.pdf' },
        { text: 'Publishing games to platforms', pdf: 'https://example.com/pdfs/publishing-games.pdf' }
      ],
      videos: [
        { title: 'Unity Getting Started', url: 'https://example.com/unity-intro' },
        { title: '3D Game Development', url: 'https://example.com/unity-3d' },
        { title: 'Game Physics', url: 'https://example.com/game-physics' },
        { title: 'Publishing Games', url: 'https://example.com/game-publishing' }
      ]
    },
    { 
      id: 'CRS018', 
      name: 'Digital Marketing',
      notes: [
        { text: 'SEO and search engine optimization', pdf: 'https://example.com/pdfs/seo-optimization.pdf' },
        { text: 'Social media marketing strategies', pdf: 'https://example.com/pdfs/social-media-marketing.pdf' },
        { text: 'Content marketing fundamentals', pdf: 'https://example.com/pdfs/content-marketing.pdf' },
        { text: 'Email marketing campaigns', pdf: 'https://example.com/pdfs/email-marketing.pdf' },
        { text: 'Analytics and performance tracking', pdf: 'https://example.com/pdfs/analytics-tracking.pdf' }
      ],
      videos: [
        { title: 'Digital Marketing Overview', url: 'https://example.com/digital-marketing' },
        { title: 'SEO Strategies', url: 'https://example.com/seo-guide' },
        { title: 'Social Media Marketing', url: 'https://example.com/social-media' },
        { title: 'Content Marketing', url: 'https://example.com/content-marketing' }
      ]
    },
    { 
      id: 'CRS019', 
      name: 'Project Management',
      notes: [
        { text: 'Agile and Scrum methodologies', pdf: 'https://example.com/pdfs/agile-scrum-methodologies.pdf' },
        { text: 'Project planning and scheduling', pdf: 'https://example.com/pdfs/project-planning-scheduling.pdf' },
        { text: 'Risk management techniques', pdf: 'https://example.com/pdfs/risk-management.pdf' },
        { text: 'Team communication and collaboration', pdf: 'https://example.com/pdfs/team-communication.pdf' },
        { text: 'Project monitoring and control', pdf: 'https://example.com/pdfs/project-monitoring.pdf' }
      ],
      videos: [
        { title: 'Project Management Basics', url: 'https://example.com/pm-basics' },
        { title: 'Agile Methodology', url: 'https://example.com/agile-intro' },
        { title: 'Risk Management', url: 'https://example.com/risk-management' },
        { title: 'Team Leadership', url: 'https://example.com/team-leadership' }
      ]
    },
    { 
      id: 'CRS020', 
      name: 'Business Analytics',
      notes: [
        { text: 'Business intelligence concepts', pdf: 'https://example.com/pdfs/business-intelligence.pdf' },
        { text: 'Data-driven decision making', pdf: 'https://example.com/pdfs/data-driven-decisions.pdf' },
        { text: 'KPI development and tracking', pdf: 'https://example.com/pdfs/kpi-development.pdf' },
        { text: 'Business reporting techniques', pdf: 'https://example.com/pdfs/business-reporting.pdf' },
        { text: 'Predictive analytics basics', pdf: 'https://example.com/pdfs/predictive-analytics.pdf' }
      ],
      videos: [
        { title: 'Business Analytics Overview', url: 'https://example.com/business-analytics' },
        { title: 'Data-Driven Decisions', url: 'https://example.com/data-decisions' },
        { title: 'KPI Management', url: 'https://example.com/kpi-management' },
        { title: 'Business Intelligence', url: 'https://example.com/bi-concepts' }
      ]
    }
  ];

  const handleEnroll = (e) => {
    e.preventDefault();

    if (!formData.courseId) {
      setError('Please select a course.');
      return;
    }

    if (!user) {
      setError('You must be logged in to enroll in courses.');
      return;
    }

    const course = mockCourses.find((c) => c.id === formData.courseId);

    if (!course) {
      setError('Selected course is invalid.');
      return;
    }

    if (
      enrollments.some(
        (entry) => entry.studentId === user.id && entry.courseId === course.id
      )
    ) {
      setError(`You are already enrolled in ${course.name}.`);
      return;
    }

    setEnrollments([
      ...enrollments,
      {
        id: Date.now(),
        studentId: user.id,
        studentName: user.name,
        courseId: course.id,
        courseName: course.name,
        enrolledDate: new Date().toLocaleDateString()
      }
    ]);

    setMessage(`✓ Successfully enrolled in ${course.name}`);
    setFormData({ courseId: '' });
    setError('');

    setTimeout(() => setMessage(''), 3000);
  };

  const handleUnenroll = (enrollmentId) => {
    setEnrollments(enrollments.filter((entry) => entry.id !== enrollmentId));
  };

  return (
    <main className="enroll-page">
      <div className="container">
        <div className="enroll-header">
          <h1>Course Enrollment</h1>
          <p className="page-subtitle">Enroll in available courses</p>
        </div>

        <div className="enroll-content">
          {/* Enroll Form */}
          <div className="enroll-form-section">
            <div className="card">
              <div className="card-header">
                <UserCheck size={24} />
                <span>Enroll in Course</span>
              </div>
              <div className="card-body">
                {message && <div className="success-message">{message}</div>}
                {error && <div className="form-error-message">{error}</div>}

                {/* Current User Info */}
                <div className="current-user-info">
                  <h3>Enrolling as:</h3>
                  <div className="user-display">
                    <strong>{user?.name}</strong>
                    <span className="user-email">({user?.email})</span>
                  </div>
                </div>

                <form onSubmit={handleEnroll}>
                  <div className="form-group">
                    <label>Select Course *</label>
                    <select
                      value={formData.courseId}
                      onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                      required
                    >
                      <option value="">Choose a course...</option>
                      {mockCourses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.name} ({course.id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Enroll in Course
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Enrollments List */}
          <div className="enrollments-section">
            <div className="card">
              <div className="card-header">
                <BookOpen size={24} />
                <span>My Enrollments ({user ? enrollments.filter(e => e.studentId === user.id).length : 0})</span>
              </div>
              <div className="card-body">
                {user && enrollments.filter(e => e.studentId === user.id).length > 0 ? (
                  <div className="enrollments-list">
                    {enrollments.filter(e => e.studentId === user.id).map((enrollment) => (
                      <div key={enrollment.id} className="enrollment-item">
                        <div className="enrollment-info">
                          <h4>{enrollment.courseName}</h4>
                          <p>Course ID: {enrollment.courseId}</p>
                          <span className="enrollment-date">Enrolled: {enrollment.enrolledDate}</span>
                        </div>
                        <div className="enrollment-actions">
                          <span className="enrollment-badge">✓ Enrolled</span>
                          <button
                            type="button"
                            className="btn-icon btn-danger"
                            onClick={() => handleUnenroll(enrollment.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <BookOpen size={48} />
                    <h3>No Enrollments Yet</h3>
                    <p>Select a course above to get started with your learning journey</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
