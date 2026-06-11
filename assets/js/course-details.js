/**
 * COURSE DETAILS LOGIC
 * Fetches course data based on URL parameter and populates the page.
 */

const COURSE_DATA = {

  'GCP Cloud': {
    title: 'GCP Cloud Mastery',
    duration: '4 Weeks',
    price: '₹5,999',
    syllabus: [
    ]
  },

  'Python': {
    title: 'Python Mastery',
    duration: '5 Weeks',
    price: '₹7,999',
    syllabus: [
    ]
  },

  'SQL': {
    title: 'SQL Mastery',
    duration: '6 Weeks',
    price: '₹6,999',
    syllabus: [
      
    ]
  },

  'Big Data': {
    title: 'Big Data Mastery',
    duration: '6 Weeks',
    price: '₹8,999',
    syllabus: [
    ]
  },

  'PySpark': {
    title: 'PySpark Mastery',
    duration: '5 Weeks',
    price: '₹7,999',
    syllabus: [
    ]
  },

  'Linux Basics': {
    title: 'Linux Basics Mastery',
    duration: '4 Weeks',
    price: '₹4,999',
    syllabus: [
    ]
  },

  'Git': {
    title: 'Git Mastery',
    duration: '4 Weeks',
    price: '₹4,999',
    syllabus: [
    ]
  },

  'Jira': {
    title: 'Jira Mastery',
    duration: '5 Weeks',
    price: '₹7,999',
    syllabus: [
    ]
  },

  'IT Skills': {
    title: 'IT Skills Mastery',
    duration: '4 Weeks',
    price: '₹4,999',
    syllabus: [
    ]
  },
  
  'Data Modelling': {
    title: 'Data Modelling Mastery',
    duration: '5 Weeks',
    price: '₹7,999',
    syllabus: [
    ]
  },

  'Real Time Projects': {
    title: 'Real Time Projects Mastery',
    duration: '6 Weeks',
    price: '₹8,999',
    syllabus: [
    ]
  },

  'Job Profile Building': {
    title: 'Job Profile Building Mastery',
    duration: '5 Weeks',
    price: '₹7,999',
    syllabus: [
    ]
  },

};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');

  const titleEl = document.getElementById('courseTitle');
  const durationEl = document.getElementById('duration');
  const priceEl = document.getElementById('price');
  const syllabusEl = document.getElementById('syllabus');

  if (courseId && COURSE_DATA[courseId]) {

    const data = COURSE_DATA[courseId];

    // Set Course Details
    if (titleEl) titleEl.innerText = data.title;
    if (durationEl) durationEl.innerText = `Duration: ${data.duration}`;
    if (priceEl) priceEl.innerText = `Course Fee: ${data.price}`;

    // Courses with mindmap images
    const imageCourses = ['GCP Cloud', 'Python', 'SQL', 'Big Data', 'PySpark', 'Linux Basics', 'Git', 'Jira', 'IT Skills', 'Data Modelling', 'Real Time Projects', 'Job Profile Building'];

    if (syllabusEl) {

      if (imageCourses.includes(courseId)) {

        syllabusEl.style.display = 'none';

        renderMindMap(courseId);

      } else {

        const mindmapContainer = document.getElementById('mindmap-container');

        if (mindmapContainer) {
          mindmapContainer.style.display = 'none';
        }

        syllabusEl.style.display = 'block';

        syllabusEl.innerHTML = data.syllabus
          .map(item => `<li>${item}</li>`)
          .join('');
      }
    }

  } else {

    // Fallback
    if (titleEl) {
      titleEl.innerText = "Course Not Found";
    }

    if (syllabusEl) {
      syllabusEl.innerHTML = `
        <li>Please select a valid course from our catalog.</li>
      `;
    }
  }
});

/**
 * Render MindMap Image
 */
function renderMindMap(courseId) {

  const container = document.getElementById('mindmap-container');

  if (!container) return;

  container.style.display = 'block';

  let imgSrc = '';
  let altText = '';

  switch(courseId) {

    case 'GCP Cloud':
      imgSrc = 'assets/images/gcp.webp';
      altText = 'GCP Cloud Mindmap';
      break;

    case 'Python':
      imgSrc = 'assets/images/python.webp';
      altText = 'Python Mindmap';
      break;

    case 'SQL':
      imgSrc = 'assets/images/sql.webp';
      altText = 'SQL Mindmap';
      break;

    case 'Big Data':
      imgSrc = 'assets/images/bigdata.webp';
      altText = 'Big Data Mindmap';
      break;

    case 'PySpark':
      imgSrc = 'assets/images/pyspark.webp';
      altText = 'PySpark Mindmap';
      break;

    case 'Linux Basics':
      imgSrc = 'assets/images/linux.webp';
      altText = 'Linux Basics Mindmap';
      break;

    case 'Git':
      imgSrc = 'assets/images/git.webp';
      altText = 'Git Mindmap';
      break;

    case 'Jira':
      imgSrc = 'assets/images/jira.webp';
      altText = 'Jira Mindmap';
      break;

    case 'IT Skills':
      imgSrc = 'assets/images/itskills.webp';
      altText = 'IT Skills Mindmap';
      break;

    case 'Data Modelling':
      imgSrc = 'assets/images/datamodelling.webp';
      altText = 'Data Modelling Mindmap';
      break;

    case 'Real Time Projects':
      imgSrc = 'assets/images/realtimeprojects.webp';
      altText = 'Real Time Projects Mindmap';
      break;

    case 'Job Profile Building':
      imgSrc = 'assets/images/jobprofilebuilding.webp';
      altText = 'Job Profile Building Mindmap';
      break;

    default:
      container.innerHTML = '';
      return;
  }

  container.innerHTML = `
    <div class="mindmap-wrapper">
      <img 
        src="${imgSrc}" 
        alt="${altText}" 
        class="mindmap-img"
      >
    </div>
  `;
}