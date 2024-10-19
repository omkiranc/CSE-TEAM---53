const coursesData = {
    theory: [
        { name: "JAVA", teachers: ["Dr. K Subba Reddy", " Dr. N Madhusudhana Reddy","Dr. M. Sravan Kumar Reddy"," Dr. K.Nageswara Reddy"] },
        { name: "PYTHON", teachers: ["Dr. R. Kaviarasan", "Dr. K.Narasimhulu","Mr. P Naveen Sundar Kumar","Mr. G Rajasekhar Reddy"] },
        { name: "C", teachers: ["Dr. K E Naresh Kumar", "Mr. C Hrishikesava Reddy","Mr. K R Harinath","Mr. Janardhan Komarolu"] },
        { name: "SQL", teachers: ["Ms. K.Jayasri", "Mrs.Y.Durgatejaswi","Mrs. D.Sravanthi","Mrs.G.Nagapavani"] }
    ],
    lab: [
        { name: "JAVA Lab", teachers: ["Mrs. S Rubia Parveen", "Ms. D.Karishma","Ms. S. Sai Sravya","Mrs.T. Suvarna"] },
        { name: "C Lab ", teachers: ["Mr. B.V.Chandra Sekhar", " Mrs. S PARIMALA","Mrs. Chaitanya Nukala","Ms. P.Sucharitha"] }
    ]
};

function populateCourses() {
    const theoryCoursesDiv = document.getElementById('theory-courses');
    const labCoursesDiv = document.getElementById('lab-courses');

    coursesData.theory.forEach((course, index) => {
        const courseItem = createCourseItem(course, 'theory', index);
        theoryCoursesDiv.appendChild(courseItem);
    });

    
    coursesData.lab.forEach((course, index) => {
        const courseItem = createCourseItem(course, 'lab', index);
        labCoursesDiv.appendChild(courseItem);
    });
}


function createCourseItem(course, type, index) {
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
        <h3>${course.name}</h3>
        <select id="${type}-course-${index}" class="teacher-select">
            ${course.teachers.map(teacher => `<option value="${teacher}">${teacher}</option>`).join('')}
        </select>
        <button onclick="viewTeacherProfile(document.getElementById('${type}-course-${index}').value)">View Profile</button>
    `;
    return courseItem;
}


function viewTeacherProfile(teacher) {
    const profileSection = document.getElementById('teacher-profile-content');
    const teacherProfiles = {
        "Dr. K Subba Reddy": { rating: 4.8, research: "java professor", patents: 3, background: "PhD" },
        " Dr. N Madhusudhana Reddy": { rating: 4.5, research: "java professor", patents: 2, background: "PhD" },
        "Dr. M. Sravan Kumar Reddy": { rating: 4.8, research: "java professor", patents: 3, background: "PhD" },
        " Dr. K.Nageswara Reddy": { rating: 4.5, research: "java professor", patents: 2, background: "PhD" },
        "Dr. R. Kaviarasan": { rating: 4.6, research: "python professor", patents: 1, background: "PhD" },
        "Dr. K.Narasimhulu": { rating: 4.7, research: "python professor", patents: 4, background: "PhD" },
        "Mr. P Naveen Sundar Kumar": { rating: 4.7, research: "python professor", patents: 4, background: "PhD" },
        "Mr. G Rajasekhar Reddy": { rating: 4.6, research: "python professor", patents: 1, background: "PhD" },
        "Dr. K E Naresh Kumar": { rating: 4.3, research: "c professor", patents: 1, background: "PhD in Chemistry" },
        "Mr. C Hrishikesava Reddy": { rating: 4.2, research: "c professor", patents: 2, background: "PhD" },
        "Mr. K R Harinath": { rating: 4.3, research: "c professor", patents: 1, background: "PhD in Chemistry" },
        "Mr. Janardhan Komarolu": { rating: 4.2, research: "c professor", patents: 2, background: "PhD" },
        "Ms. K.Jayasri": { rating: 4.9, research: "sql professor", patents: 0, background: "PhD" },
        "Mrs.Y.Durgatejaswi": { rating: 4.4, research: "sql professor", patents: 1, background: "PhD" },
        "Mrs. D.Sravanthi": { rating: 4.9, research: "sql professor", patents: 0, background: "PhD" },
        "Mrs.G.Nagapavani": { rating: 4.4, research: "sql professor", patents: 1, background: "PhD" },
    };

    const profile = teacherProfiles[teacher];

    
    if (profile) {
        profileSection.innerHTML = `
            <div class="teacher-profile">
                <h4>${teacher}</h4>
                <p><strong>Rating:</strong> ${profile.rating}</p>
                <p><strong>Research Projects:</strong> ${profile.research}</p>
                <p><strong>Patents:</strong> ${profile.patents}</p>
                <p><strong>Academic Background:</strong> ${profile.background}</p>
            </div>
        `;
    } else {
        profileSection.innerHTML = '<p>No profile available for this teacher.</p>';
    }
}


document.getElementById('submitCourses').addEventListener('click', async () => {
    const selectedTheoryCourses = Array.from(document.querySelectorAll('#theory-courses select'))
        .map(select => select.value);

    const selectedLabCourses = Array.from(document.querySelectorAll('#lab-courses select'))
        .map(select => select.value);

    const feedback = document.getElementById('feedback').value;

   
    const data = {
        theoryCourses: selectedTheoryCourses,
        labCourses: selectedLabCourses,
        feedback: feedback
    };

    
    const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);

    
    document.getElementById('feedback').value = '';
});


document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault(); 
    
});


window.onload = populateCourses; 
