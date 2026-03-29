import { ArrowRight, BookOpen, Users, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadFromStorage } from '../utils/storage';
import '../styles/Home.css';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert Courses',
      description: 'Learn from industry experts with hands-on projects and real-world experience'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with thousands of learners and grow together'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn recognized certifications upon course completion'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access courses anytime, anywhere with lifetime updates'
    }
  ];

  const stats = (() => {
    const loadedCourses = loadFromStorage('edulearn_courses', []);
    const loadedStudents = loadFromStorage('edulearn_students', []);
    const loadedEnrollments = loadFromStorage('edulearn_enrollments', []);

    return {
      courses: loadedCourses.length,
      students: loadedStudents.length,
      enrollments: loadedEnrollments.length
    };
  })();

  const courses = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Master the basics of React and modern web development',
      level: 'Beginner',
      duration: '4 weeks',
      students: 1250,
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
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript ES6+ features and patterns',
      level: 'Advanced',
      duration: '6 weeks',
      students: 890,
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
      id: 3,
      title: 'Full Stack Development',
      description: 'Build complete web applications from frontend to backend',
      level: 'Intermediate',
      duration: '8 weeks',
      students: 2150,
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
      id: 4,
      title: 'Web Design Mastery',
      description: 'Create beautiful, responsive websites with modern design principles',
      level: 'Beginner',
      duration: '5 weeks',
      students: 1520,
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
      id: 6,
      title: 'Data Science with Python',
      description: 'Analyze data and build predictive models using Python',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 750,
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
      id: 7,
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning algorithms and applications',
      level: 'Intermediate',
      duration: '8 weeks',
      students: 620,
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
      id: 8,
      title: 'Node.js Backend Development',
      description: 'Build scalable server-side applications with Node.js',
      level: 'Intermediate',
      duration: '7 weeks',
      students: 890,
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
      id: 9,
      title: 'Database Design & SQL',
      description: 'Master database design principles and SQL querying',
      level: 'Beginner',
      duration: '5 weeks',
      students: 1100,
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
      id: 10,
      title: 'Mobile App Development with React Native',
      description: 'Create cross-platform mobile apps with React Native',
      level: 'Intermediate',
      duration: '9 weeks',
      students: 580,
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
      id: 11,
      title: 'DevOps & CI/CD',
      description: 'Learn modern DevOps practices and continuous integration',
      level: 'Advanced',
      duration: '6 weeks',
      students: 450,
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
      id: 12,
      title: 'Cloud Computing with AWS',
      description: 'Master Amazon Web Services for cloud infrastructure',
      level: 'Intermediate',
      duration: '8 weeks',
      students: 720,
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
    }
  ];

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Learn, Grow, and Master New Skills</h1>
            <p>Unlock your potential with our comprehensive online courses and expert instruction</p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary btn-lg">
                Explore Courses
                <ArrowRight size={20} />
              </Link>
              <button className="btn btn-outline btn-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose EduLearn?</h2>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Courses</h2>
            <Link to="/courses" className="btn btn-outline btn-sm">
              View All Courses
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="courses-preview">
            {courses.map((course, index) => (
              <div key={index} className="course-preview-card">
                <div className="course-preview-icon">
                  <BookOpen size={40} />
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-preview-meta">
                  <span className="badge badge-primary">{course.level}</span>
                  <span className="course-preview-duration">{course.duration}</span>
                </div>
                <Link to={`/courses/${course.id}`} className="btn btn-outline btn-sm course-preview-link">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Realtime Stats */}
      <section className="quick-stats">
        <div className="container">
          <h2 className="section-title">Platform Snapshot</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.courses}</h3>
              <p>Available Courses</p>
            </div>
            <div className="stat-card">
              <h3>{stats.students}</h3>
              <p>Registered Students</p>
            </div>
            <div className="stat-card">
              <h3>{stats.enrollments}</h3>
              <p>Active Enrollments</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students already learning on EduLearn</p>
          <Link to="/courses" className="btn btn-primary btn-lg">
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  );
}
