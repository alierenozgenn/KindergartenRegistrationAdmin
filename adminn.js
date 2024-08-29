// Mevcut öğrencileri saklamak için bir liste
let students = [
    { id: '1', fullName: 'Ali Yılmaz', tcNo: '12345678901', birthday: { day: 10, month: 5, year: 2008 }, address: 'İstanbul', school: 'Okul 1', branch: 'A', score: 85 },
    { id: '2', fullName: 'Ayşe Demir', tcNo: '98765432101', birthday: { day: 20, month: 3, year: 2009 }, address: 'Ankara', school: 'Okul 2', branch: 'B', score: 92 }
];

// Başvuru yapan öğrencileri saklamak için bir liste
let applications = [
    { id: '1', fullName: 'Ali Yılmaz', tcNo: '12345678901', birthday: { day: 10, month: 5, year: 2008 }, address: 'İstanbul', school: '', branch: '', score: 85 },
    { id: '2', fullName: 'Ayşe Demir', tcNo: '98765432101', birthday: { day: 20, month: 3, year: 2009 }, address: 'Ankara', school: '', branch: '', score: 92 }
];

// Mevcut kreşleri saklamak için bir liste
let nurseries = [
    { id: '1', name: 'Kreş 1', branchCount: 5, capacity: 50 },
    { id: '2', name: 'Kreş 2', branchCount: 3, capacity: 40 }
];

// Mevcut şubeleri saklamak için bir liste
let branches = [
    { id: '1', name: 'Şube 1', location: 'İstanbul', staff: 20, teachers: [] },
    { id: '2', name: 'Şube 2', location: 'Ankara', staff: 15, teachers: [] }
];

// Öğretmenleri saklamak için bir liste
let teachers = [
    { id: '1', fullName: 'Mehmet Kaya' },
    { id: '2', fullName: 'Fatma Yurt' }
];

// Bölümleri gizleme işlevi
function hideAllSections() {
    const sections = document.querySelectorAll('.content > div');
    sections.forEach(section => section.classList.add('hidden'));
}

// Öğrencileri gösterme işlevi
function showStudents() {
    hideAllSections();
    document.getElementById('students').classList.remove('hidden');
    displayStudents();
}

// Başvuruları gösterme işlevi
function showApplications() {
    hideAllSections();
    document.getElementById('applications').classList.remove('hidden');
    displayApplications();
}

// Kreşleri gösterme işlevi
function showNurseries() {
    hideAllSections();
    document.getElementById('nurseries').classList.remove('hidden');
    displayNurseries();
}

// Şubeleri gösterme işlevi
function showBranches() {
    hideAllSections();
    document.getElementById('branches').classList.remove('hidden');
    displayBranches();
}

// Öğrencileri listeleme işlevi
function displayStudents() {
    const studentTableBody = document.getElementById('student-table-body');
    studentTableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.fullName}</td>
            <td>${student.tcNo}</td>
            <td>${student.birthday.day}/${student.birthday.month}/${student.birthday.year}</td>
            <td>${student.address}</td>
            <td>${student.school}</td>
            <td>${student.branch}</td>
            <td>
                <button onclick="editStudent(${index})">Düzenle</button>
                <button onclick="deleteStudent(${index})">Sil</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Başvuru yapan öğrencileri listeleme işlevi
function displayApplications() {
    const applicationTableBody = document.getElementById('application-table-body');
    applicationTableBody.innerHTML = '';

    applications.sort((a, b) => b.score - a.score);

    applications.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.fullName}</td>
            <td>${student.tcNo}</td>
            <td>${student.birthday.day}/${student.birthday.month}/${student.birthday.year}</td>
            <td>${student.address}</td>
            <td>${student.school || ''}</td>
            <td>${student.branch || ''}</td>
            <td>${student.score}</td>
            <td>
                <button onclick="selectStudent('${student.id}')">Seç</button>
            </td>
        `;
        applicationTableBody.appendChild(row);
    });
}

// Kreşleri listeleme işlevi
function displayNurseries() {
    const nurseryTableBody = document.getElementById('nursery-table-body');
    nurseryTableBody.innerHTML = '';

    nurseries.forEach((nursery, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nursery.id}</td>
            <td>${nursery.name}</td>
            <td>${nursery.branchCount}</td>
            <td>${nursery.capacity}</td>
            <td>
                <button onclick="editNursery(${index})">Düzenle</button>
                <button onclick="deleteNursery(${index})">Sil</button>
            </td>
        `;
        nurseryTableBody.appendChild(row);
    });
}

// Şubeleri listeleme işlevi
function displayBranches() {
    const branchTableBody = document.getElementById('branch-table-body');
    branchTableBody.innerHTML = '';

    branches.forEach((branch, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${branch.id}</td>
            <td>${branch.name}</td>
            <td>${branch.location}</td>
            <td>${branch.staff}</td>
            <td>${branch.teachers.map(teacherId => teachers.find(t => t.id === teacherId)?.fullName || 'Bilinmiyor').join(', ')}</td>
            <td>
                <button onclick="editBranch(${index})">Düzenle</button>
                <button onclick="deleteBranch(${index})">Sil</button>
            </td>
        `;
        branchTableBody.appendChild(row);
    });
}

// Öğrenciyi düzenleme işlevi
function editStudent(index) {
    const student = students[index];
    document.getElementById('student-id').value = student.id;
    document.getElementById('full-name').value = student.fullName;
    document.getElementById('tc-no').value = student.tcNo;
    document.getElementById('birth-day').value = student.birthday.day;
    document.getElementById('birth-month').value = student.birthday.month;
    document.getElementById('birth-year').value = student.birthday.year;
    document.getElementById('address').value = student.address;
    document.getElementById('school').value = student.school;
    document.getElementById('branch').value = student.branch;

    document.getElementById('add-student').innerText = 'Bilgileri Güncelle';
}

// Kreşi düzenleme işlevi
function editNursery(index) {
    const nursery = nurseries[index];
    document.getElementById('nursery-id').value = nursery.id;
    document.getElementById('nursery-name').value = nursery.name;
    document.getElementById('nursery-branch-count').value = nursery.branchCount;
    document.getElementById('nursery-capacity').value = nursery.capacity;

    document.getElementById('add-nursery').innerText = 'Bilgileri Güncelle';
}

// Şubeyi düzenleme işlevi
function editBranch(index) {
    const branch = branches[index];
    document.getElementById('branch-id').value = branch.id;
    document.getElementById('branch-name').value = branch.name;
    document.getElementById('branch-location').value = branch.location;
    document.getElementById('branch-staff').value = branch.staff;
    populateTeachers(branch.teachers);

    document.getElementById('add-branch').innerText = 'Bilgileri Güncelle';
}

// Öğrenciyi silme işlevi
function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

// Kreşi silme işlevi
function deleteNursery(index) {
    nurseries.splice(index, 1);
    displayNurseries();
}

// Şubeyi silme işlevi
function deleteBranch(index) {
    branches.splice(index, 1);
    displayBranches();
}

// Yeni öğrenci ekleme işlevi
function addStudent() {
    const student = {
        id: document.getElementById('student-id').value,
        fullName: document.getElementById('full-name').value,
        tcNo: document.getElementById('tc-no').value,
        birthday: {
            day: parseInt(document.getElementById('birth-day').value, 10),
            month: parseInt(document.getElementById('birth-month').value, 10),
            year: parseInt(document.getElementById('birth-year').value, 10)
        },
        address: document.getElementById('address').value,
        school: document.getElementById('school').value,
        branch: document.getElementById('branch').value,
        score: parseInt(document.getElementById('score').value, 10)
    };

    const existingStudentIndex = students.findIndex(s => s.id === student.id);

    if (existingStudentIndex >= 0) {
        students[existingStudentIndex] = student;
    } else {
        students.push(student);
    }

    document.getElementById('add-student').innerText = 'Öğrenci Ekle';
    displayStudents();
}

// Yeni kreş ekleme işlevi
function addNursery() {
    const nursery = {
        id: document.getElementById('nursery-id').value,
        name: document.getElementById('nursery-name').value,
        branchCount: parseInt(document.getElementById('nursery-branch-count').value, 10),
        capacity: parseInt(document.getElementById('nursery-capacity').value, 10)
    };

    const existingNurseryIndex = nurseries.findIndex(n => n.id === nursery.id);

    if (existingNurseryIndex >= 0) {
        nurseries[existingNurseryIndex] = nursery;
    } else {
        nurseries.push(nursery);
    }

    document.getElementById('add-nursery').innerText = 'Kreş Ekle';
    displayNurseries();
}

// Yeni şube ekleme işlevi
function addBranch() {
    const branch = {
        id: document.getElementById('branch-id').value,
        name: document.getElementById('branch-name').value,
        location: document.getElementById('branch-location').value,
        staff: parseInt(document.getElementById('branch-staff').value, 10),
        teachers: getSelectedTeacherIds()
    };

    const existingBranchIndex = branches.findIndex(b => b.id === branch.id);

    if (existingBranchIndex >= 0) {
        branches[existingBranchIndex] = branch;
    } else {
        branches.push(branch);
    }

    document.getElementById('add-branch').innerText = 'Şube Ekle';
    displayBranches();
}

// Seçilen öğretmen ID'lerini almak için işlev
function getSelectedTeacherIds() {
    const teacherCheckboxes = document.querySelectorAll('input[name="teachers"]:checked');
    return Array.from(teacherCheckboxes).map(cb => cb.value);
}

// Öğretmenleri listeleme işlevi
function populateTeachers(selectedTeacherIds) {
    const teacherContainer = document.getElementById('teacher-container');
    teacherContainer.innerHTML = '';

    teachers.forEach(teacher => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'teachers';
        checkbox.value = teacher.id;
        checkbox.checked = selectedTeacherIds.includes(teacher.id);
        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(teacher.fullName));
        teacherContainer.appendChild(label);
        teacherContainer.appendChild(document.createElement('br'));
    });
}

// Başvuru yapan öğrenci seçme işlevi
function selectStudent(id) {
    const student = applications.find(s => s.id === id);
    document.getElementById('school').value = student.school;
    document.getElementById('branch').value = student.branch;
    displayStudents();
}

// Sayfa yüklendiğinde yapılacak işlemler
document.addEventListener('DOMContentLoaded', function () {
    showStudents();
    populateTeachers([]);
});
