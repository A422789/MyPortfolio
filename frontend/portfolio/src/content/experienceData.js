import { certificationsData } from './certificationsData.js';

// Sources: identity-progress-en.pdf §§4, 6, 7, 13; approved Phase 2 roadmap;
// User Manual Tasks & Missing Assets Checklist.txt and the supplied certificate PDFs.
const internshipCertificate = certificationsData.find((item) => item.id === 'codealpha-fullstack');

const ibmMasterCertificate = {
  title: 'IBM Full-Stack JavaScript Developer Professional Certificate',
  documentUrl: '/certificates/ibm/courses/IBM%20Full-Stack%20JavaScript%20Developer.pdf',
  verifyLink: 'https://coursera.org/verify/professional-cert/MKM4CNVU86B9',
  completionDate: 'October 16, 2026',
};

const courseDescriptions = {
  'ibm-backend': 'Building backend applications with Node.js, Express, middleware, and REST APIs.',
  'ibm-frontend': 'Creating React interfaces with components, hooks, state, and routing.',
  'ibm-database': 'Connecting Node.js applications to MongoDB for data modeling and database operations.',
  'ibm-cloud-devops': 'Cloud-native development concepts, DevOps practices, Agile workflows, and NoSQL.',
  'ibm-js-essentials': 'JavaScript language foundations, asynchronous behavior, and core programming concepts.',
  'ibm-html-css-js': 'Building web interfaces with semantic HTML, responsive CSS, and JavaScript.',
  'ibm-git': 'Version control with Git, branches, pull requests, and GitHub collaboration.',
  'ibm-software-engineering': 'Software development lifecycles, architecture fundamentals, and engineering practices.',
  'ibm-containers': 'An introduction to containers and deployment concepts with Docker, Kubernetes, and OpenShift.',
  'ibm-microservices': 'Coursework exploring microservices and serverless application development.',
  'ibm-capstone': 'Applying full-stack JavaScript learning through the GiftLink capstone project.',
  'ibm-career-guide': 'Career planning, application materials, and software developer interview preparation.',
};

// Presentation priority for the backend-focused profile, not course completion order.
const coursePriority = [
  'ibm-backend',
  'ibm-database',
  'ibm-containers',
  'ibm-microservices',
  'ibm-cloud-devops',
  'ibm-capstone',
  'ibm-js-essentials',
  'ibm-software-engineering',
  'ibm-git',
  'ibm-frontend',
  'ibm-html-css-js',
  'ibm-career-guide',
];

const ibmCourseCertificates = certificationsData.filter((item) => item.issuer === 'IBM')
  .map((certificate) => ({ ...certificate, description: courseDescriptions[certificate.id] }))
  .sort((first, second) => coursePriority.indexOf(first.id) - coursePriority.indexOf(second.id));

export const experienceData = [
  {
    slug: 'codealpha',
    actionLabel: 'View internship',
    organization: 'CodeAlpha',
    landingContext: 'Remote',
    landingDetail: 'Built commerce and project-management systems with authentication, testing, and cloud deployment.',
    category: 'Internship',
    title: 'Full-Stack Development Intern',
    summary: 'Remote full-stack development training, from backend architecture and authentication to React interfaces, testing, and cloud deployment.',
    metadata: [
      { label: 'Period', value: 'July 10, 2026 – August 10, 2026' },
      { label: 'Working mode', value: 'Remote · Independent development with mentor review' },
    ],
    primaryDocument: { ...internshipCertificate, verifyLabel: 'Verify with CodeAlpha' },
    documents: [
      {
        title: 'CodeAlpha Letter of Recommendation',
        documentUrl: '/certificates/codealpha/LOR_%D9%90Ahmed%20Ayyad.pdf',
        issueDate: 'August 11, 2026',
        verifyLink: '', // The letter contains issuer/contact links, not a document verification URL.
        showActions: false,
      },
    ],
    overview: 'The CodeAlpha internship brought together two complete full-stack projects: HE Skincare and a Collaborative Project Management Tool. I worked independently with mentor review and guidance, taking requirements through data modeling, API development, frontend integration, testing, and deployment.',
    sections: [
      {
        id: 'overview', title: 'Role & working context',
        paragraphs: ['The training required two or three projects against defined requirements, with room to extend their functionality. My main projects were HE Skincare and the Collaborative Project Management Tool.', 'HE Skincare was a training project connected to a real client. The work presented here focuses on the system and its engineering decisions without disclosing client information.'],
        bullets: ['Developed full-stack applications with Node.js, Express.js, MongoDB, Mongoose, and React.', 'Worked independently while receiving mentor review and guidance.', 'Used generative AI tools when needed to support the development workflow.'],
      },
      {
        id: 'deliverables', title: 'Engineering deliverables',
        rows: [
          { title: 'HE Skincare — one integrated commerce system', text: 'A bilingual storefront, admin dashboard, REST API, and WhatsApp gateway. Work covered data models, authentication, content and order management, testing, and deployment.' },
          { title: 'Collaborative Project Management Tool', text: 'Project, task, comment, and member workflows supported by protected API routes, role-based authorization, schema validation, optimistic UI, and data-integrity considerations.' },
          { title: 'Backend authentication & authorization', text: 'Short-lived access tokens, session refresh through HTTP-only cookies, and server-side permission checks. HE Skincare also documents a token blacklist with a MongoDB TTL index.' },
        ],
      },
      {
        id: 'testing', title: 'Testing & deployment evidence',
        paragraphs: ['The project documentation describes backend integration testing with Jest and Supertest, frontend testing with Vitest, and end-to-end flows with Cypress. Docker, Railway, and GitHub Actions form part of the deployment workflow.', 'The linked case studies explain the testing layers, authentication decisions, and deployment workflow for each system.'],
      },
      {
        id: 'lessons', title: 'Resource management — a practical lesson',
        paragraphs: ['In HE Skincare, a WhatsApp automation process left running in the background caused memory consumption and additional hosting cost. The incident highlighted the operational impact of long-running browser processes.', 'The lesson was to consider process lifecycles, resource monitoring, and testing backend services in an environment close to deployment conditions. No customer data or private operational details are shared here.'],
      },
      {
        id: 'outcomes', title: 'Outcomes & lessons learned',
        bullets: ['Completed the training projects and gained experience taking a full-stack system from requirements to deployment.', 'Improved the development workflow under time pressure and learned to explain architectural trade-offs.', 'Connected backend correctness with user-facing behavior, testing, and operational resource management.'],
      },
    ],
    projects: [
      { title: 'HE Skincare', description: 'Bilingual commerce, admin CMS, REST API, and WhatsApp automation.', to: '/work/he-skincare' },
      { title: 'Collaborative Project Management Tool', description: 'Authentication, authorization, and project collaboration workflows.', to: '/work/project-management' },
    ],
  },
  {
    slug: 'ibm', actionLabel: 'View program', organization: 'IBM', category: 'Professional certification',
    landingDetail: '12 courses covering backend services, MongoDB, containers, and cloud-native development.',
    title: 'Full-Stack JavaScript Developer Professional Certificate',
    summary: 'A completed 12-course learning program spanning JavaScript, React, backend services, databases, and cloud-native development.',
    metadata: [
      { label: 'Program', value: '12 course certificates' },
      { label: 'Learning context', value: 'Professional certification · Applied projects and labs' },
    ],
    primaryDocument: ibmMasterCertificate,
    overview: 'The IBM program provided a structured path across the JavaScript full stack: browser fundamentals, React interfaces, Node.js and Express services, MongoDB, version control, and cloud-native delivery. Practical coursework and the GiftLink capstone connect the learning to working applications.',
    sections: [
      {
        id: 'overview', title: 'Program scope & learning path',
        paragraphs: ['I completed the IBM Full-Stack JavaScript Developer Professional Certificate, a program comprising 12 course certificates. The master credential is presented separately from the individual course records below.'],
        rows: [
          { title: 'Backend services & data', text: 'Node.js, Express, REST APIs, middleware, and MongoDB-backed applications.' },
          { title: 'Containers & cloud deployment', text: 'Coursework in Docker containerization, Kubernetes and OpenShift deployment concepts, cloud-native development, and DevOps practices.' },
          { title: 'Microservices & serverless', text: 'Coursework exploring service-oriented application development, microservices, and serverless approaches.' },
          { title: 'Software delivery foundations', text: 'Git and GitHub, software engineering practices, and Agile workflows supporting application development and delivery.' },
          { title: 'Supporting frontend skills', text: 'JavaScript, HTML, CSS, and React interfaces to connect backend services with usable web applications.' },
        ],
      },
      {
        id: 'applied-learning', title: 'From coursework to practical work',
        paragraphs: ['GiftLink is the program capstone represented in the project archive. A separate containerization and Kubernetes project records cloud deployment learning. These are learning projects, distinct from the CodeAlpha internship and from employment at IBM.'],
        bullets: ['Build across the client, API, and database boundaries rather than treating each technology in isolation.', 'Use repository-based work to explain implementation choices and identify areas that need further practice.', 'Distinguish course completion from project-proven experience when presenting technical skills.'],
      },
    ],
    projects: [
      { title: 'GiftLink — full-stack capstone', description: 'A community gift-sharing application connecting frontend, API, and database work.', to: '/work/giftlink' },
      { title: 'Containerization & Kubernetes deployment', description: 'Container and cloud deployment coursework, documented as a learning project.', to: '/work/kubernetes-deployment' },
    ],
    courseCertificates: ibmCourseCertificates,
  },
  {
    slug: 'riphah', actionLabel: 'View education', organization: 'Riphah International University', category: 'University education',
    landingContext: 'Islamabad, Pakistan',
    landingDetail: 'Software engineering studies with practical data structures and object-oriented programming projects.',
    title: 'B.S. in Software Engineering',
    summary: 'Third-year Software Engineering student in Islamabad, connecting computer science foundations with practical software projects.',
    metadata: [
      { label: 'Academic status', value: 'Third-year undergraduate' },
      { label: 'Location', value: 'Islamabad, Pakistan' },
    ],
    overview: 'My Software Engineering studies at Riphah International University provide an academic foundation alongside full-stack development work. Data structures and object-oriented programming are represented by dedicated academic projects in the portfolio.',
    sections: [
      {
        id: 'education', title: 'Academic background',
        paragraphs: ['I am a third-year Bachelor of Science in Software Engineering student at Riphah International University in Islamabad. My academic work complements the backend-focused full-stack systems presented elsewhere in this portfolio.'],
      },
      {
        id: 'coursework', title: 'Computer science foundations',
        paragraphs: ['My academic foundation covers the following core areas. The related projects provide concrete examples of data-structure and object-oriented work.'],
        bullets: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Systems', 'Software Engineering', 'Operating Systems', 'Computer Networks'],
      },
      {
        id: 'applied-foundations', title: 'Applying the foundations',
        rows: [
          { title: 'C++ — data structures & algorithms', text: 'The Hospital Management System is presented as an academic project focused on data structures and algorithmic problem solving.' },
          { title: 'Java — object-oriented programming', text: 'The Java OOP project demonstrates object-oriented domain modeling and modular program structure.' },
        ],
      },
      {
        id: 'direction', title: 'Current professional direction',
        paragraphs: ['I am developing a backend-focused full-stack profile through academic study, independent projects, and practical training. My current interests include API design, authentication, system architecture, and cloud deployment.', 'I am open to hybrid internships in Islamabad and remote entry-level opportunities worldwide.'],
      },
    ],
    projects: [
      { title: 'Hospital Management System — C++', description: 'Academic data structures and algorithms project.', to: '/work/cpp-hospital-system' },
      { title: 'Java OOP system', description: 'Academic object-oriented programming project.', to: '/work/java-oop-system' },
    ],
  },
];
