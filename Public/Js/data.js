// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// TODO: kết nối firebase
const firebaseConfig = {
    apiKey: "AIzaSyDkyehVM8jsl_EUYoPnKavmvpNNJ9UmyUw",
    authDomain: "courseonline-3dbe5.firebaseapp.com",
    databaseURL: "https://courseonline-3dbe5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "courseonline-3dbe5",
    storageBucket: "courseonline-3dbe5.appspot.com",
    messagingSenderId: "1013138771970",
    appId: "1:1013138771970:web:a23fc0e45fcc053984971b"
};

const courseAPT = {}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  

// TODO: hiện danh sách các khóa học ra trang chủ
let listCourse = document.querySelector('#list-course');

if(listCourse != undefined) {
    var data = firebase.database().ref().child('Course');
    data.on('value', (snap) => {
        var course = snap.val(); 
        for (const key in course) {
            //TODO phần trang chủ
            listCourse.innerHTML += 
            `<div class="main-content_box-content-inContent-home-listCourse">
                <div class="main-content_box-content-inContent-home-listCourse-pic">
                    <img src="${course[key].img}" alt="">
                    <div class="main-content_box-content-inContent-home-listCourse-pic__button">
                        <a href="/Course online/Public/Page/course.html?atc=${course[key].ID}">    
                            <button onclick="check(this)">View Course</button>
                        </a>
                    </div>
                </div>
                <div class="main-content_box-content-inContent-home-listCourse-title">
                    ${course[key].nameCourse}
                </div>
                <div class="main-content_box-content-inContent-home-listCourse-user">
                    <div class="main-content_box-content-inContent-home-listCourse-user-icon">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path fill="currentColor" d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"></path>
                        </svg>
                    </div>
                    <span>${course[key].numberOfUser}</span>
                </div>
            </div>`;
        }
    });
}

// TODO: admin
let listCourseAdmin = document.querySelector("#contentTable");

if(listCourseAdmin != undefined) {
    var data = firebase.database().ref().child('Course');

    data.on('value', (snap) => {
        var course = snap.val(); 
        for (const key in course) {
            //TODO phần trang chủ
            listCourseAdmin.innerHTML += 
            `<tr>
                <td class="picture">
                    <img src="/Course online/${course[key].img}" alt="">
                </td>
                <td class="title">
                    <h3>${course[key].nameCourse}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit totam</p>
                </td>
                <td class="buttonTable">
                    <a href="?atc=${course[key].ID}">
                        <button class="buttonTable_detail">Chi tiết</button>
                    </a>
                    <button class="buttonTable_edit btn-edit">Chỉnh sửa</button>
                </td>
            </tr>`;
        }
    });
    //TODO: thêm dữ liệu vào firebase
    let btnCreate = document.querySelector('#createCourse');
    let valueName = document.querySelector("#nameCourse");
    let srcImg = document.querySelector('#filesCourseCreate');

    btnCreate.addEventListener('click', (e) => {
        e.preventDefault();
        let countCourse = 0;
        data.on('value', (snap) => {
            let = courseList = snap.val();
            for (const key in courseList) {
                countCourse = key;
            }
        })
        let idCourse = parseInt(countCourse) + 1
        var dataUpload = firebase.database().ref('Course/' + idCourse);
        if(valueName.value != undefined && srcImg.value.split('fakepath\\')[1] != undefined) {
            dataUpload.set({
                ID: "00" + (parseInt(idCourse) + 1),
                nameCourse: valueName.value,
                img: "Public/Picture/" + srcImg.value.split('fakepath\\')[1],
                numberOfUser: "96966"
            })
        }else {
            alert("Không thể tạo mới. vui lòng thử lại");
        }

        window.location.reload();
    });

    //TODO: xóa dữ liệu trên firebase
    let btnDeleteCourse = document.querySelector('#Delete');
    btnDeleteCourse.addEventListener('click', (e) => {
        e.preventDefault();
        let idCourse = btnDeleteCourse.value;
        firebase.database().ref('Course/' + idCourse).remove();
        window.location.reload();
    });

    //TODO: sửa dữ liệu trong firebase
    let btnUpdate = document.querySelector("#update");
    btnUpdate.addEventListener('click', (e) => {
        e.preventDefault();
        let idCourse = document.querySelector('.updateCourse').value;
        let nameCourse = document.querySelector("#titleCourse").value;
        let imgCourse = document.querySelector("#fileimg").value.split('fakepath\\')[1];

        var dataUpdate = firebase.database().ref('Course/' + idCourse);
        dataUpdate.set({
            ID: "00" + idCourse,
            nameCourse: nameCourse,
            img: imgCourse == undefined ? document.querySelector("#fileimg").dataset.customValue : "Public/Picture/" + imgCourse,
            numberOfUser: "96966"
        });

        alert("Chỉnh sửa thành công")
        window.location.reload();
    });
}

// TODO: chi tiết khóa học
var currentHref = window.location.href.split('atc=')[1];
let titleCourse = document.querySelector("#title-course");
let CourseAdmin = document.querySelector("#listCourse");

if(titleCourse != undefined || CourseAdmin != undefined) {
    let idCourse = firebase.database().ref().child('Course');
    idCourse.on('value', (snap) => {
        let _intitle = snap.val();
        for (const key in _intitle) {
            if(currentHref == _intitle[key].ID && titleCourse) {
                titleCourse.innerHTML = _intitle[key].nameCourse;
            }
        }
    });

    // TODO: hiện thị danh sách các bài học 
    let lessonListData = firebase.database().ref().child('videoClassification');
    // let showCourse = document.querySelector(".listCourseShow");

    lessonListData.on('value', (snap) => {
        let valueListCourse = snap.val();
        for (let index = 0; index < valueListCourse.length; index++) {
            if(currentHref == valueListCourse[index].ID) {
                var arrayCourse = valueListCourse[index].ListCourse;
                let parentElemnt = document.querySelector("#Show-listCourse");
                let countTitle = -1;
                for (let index = 0; index < arrayCourse.length * 2; index++) {
                    if(index % 2 == 0) {
                        countTitle++
                        parentElemnt.innerHTML +=
                        `<div class="main-course-right-listCourse-boxCourse-boxLession">
                            <div class="main-course-right-listCourse-boxCourse-boxLession-title">
                                ${arrayCourse[countTitle].TitleSesion}
                            </div>
                            <i class="fa-solid fa-chevron-down iconDown"></i>
                        </div>`
                    }else {
                        parentElemnt.innerHTML +=
                        `<div class="main-course-right-listCourse-boxCourse-contentLession contentLession hidden"></div>`
                    }
                }
                let elementCourse = document.querySelectorAll('.contentLession');
                let count = -1;
                for (let index = 0; index < arrayCourse.length; index++) {
                    for (let i = 0; i < arrayCourse[index].Video.length; i++) {
                        // console.log(i);
                        if(i == 0) {
                            count++;
                        }
                        // console.log(elementCourse[count])
                        elementCourse[count].innerHTML +=
                        `<div class="main-course-right-listCourse-boxCourse-contentLession-content videoLesson" value="${arrayCourse[index].Video[i].VideoLesson}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 mr-2">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                            </svg>
                            <div class="main-course-right-listCourse-boxCourse-contentLession-content-title">${arrayCourse[index].Video[i].LessonTitle}</div>
                        </div>`
                        // console.log(arrayCourse[index].Video[i].VideoLesson);
                    }
                }

                if(titleCourse) {
                    // TODO: hiện thi video khi click vào bài học
                    let iframeVideo = document.querySelector("#VideoLesson");
                    let title = document.querySelector("#titleTextVideo");

                    // TODO hiện thị video và tiêu đề đầu tiên khi click vào khóa học
                    let firstVideo = elementCourse[0].firstChild.getAttribute("value");
                    let firstTitle = elementCourse[0].firstChild.innerText;
                    // console.log(elementCourse[0].firstChild.children[1].innerText);
                    
                    iframeVideo.src = firstVideo;
                    title.innerHTML = firstTitle;

                    for (let index = 0; index < elementCourse.length; index++) {
                        let arrayLesson = elementCourse[index].children;
                        for (let i = 0; i < arrayLesson.length; i++) {
                            arrayLesson[i].addEventListener('click', () => {
                                iframeVideo.src = arrayLesson[i].getAttribute("value");
                                title.innerText = arrayLesson[i].innerText;
                            })
                        }
                    }
                }

                // TODO: hiện thị các bài học trong mỗi section
                const boxCourse = document.querySelector('.listCourseShow').children;

                for (let index = 0; index < boxCourse.length; index++) {
                    if(index % 2 == 0) {
                        boxCourse[index].addEventListener('click', () => {
                            boxCourse[index + 1].classList.toggle('hidden');
                            boxCourse[index].lastElementChild.classList.toggle('rote');
                        })
                    }else if(index == 1) {
                        if(titleCourse) {
                            boxCourse[1].classList.toggle('hidden');
                            boxCourse[0].lastElementChild.classList.toggle('rote');
                        }
                    }
                };

                let menu = document.querySelectorAll(".btn-menu");

                for (let index = 0; index < menu.length; index++) {
                    menu[index].addEventListener('click', (e) => {
                        // xóa tất cả các class có active
                        let menuActive = document.querySelector('.active');
                        menuActive.classList.remove('active');
                        // thêm class active vào phần tử đã click 
                        menu[index].classList.add('active');
                    })
                }
            }
        }
    });
}

//TODO phần login register
if(window.location.href.split('Page/')[1] == 'login.html') {

    //TODO: chuyển tab login và register
    let blockButton = document.querySelector("#blockbutton").children;

    for (let index = 0; index < blockButton.length; index++) {
        blockButton[index].addEventListener('click', (e) => {
            e.preventDefault();
            let blockForm = document.querySelector('.blockFrom');
            if(e.target.innerText == 'Login') {
                blockForm.children[0].classList.remove('hidden');
                blockForm.children[1].classList.add('hidden');
            }else {
                blockForm.children[1].classList.remove('hidden');
                blockForm.children[0].classList.add('hidden');
            }
        });
    }

    //TODO: xữ lý from login và register
    let blockFrom = document.querySelectorAll('.blockFrom-infrom');
    blockFrom.forEach(blockELement => {
        let buttonFrom = blockELement.lastElementChild;
        // console.log(buttonFrom);
        buttonFrom.addEventListener('click', (e) => {
            e.preventDefault();
            // console.log(buttonFrom);
            checkValueInput(buttonFrom.parentElement, e);
        })
    });

    function checkValueInput(element) {
        let typeFrom = element.children[0].innerText;
        if(typeFrom == "Login") {
            let userName = element.children[2].children[1].value;
            let password = element.children[3].children[1].value;
            
            //TODO: switch page Admin
            if(userName == "admin" && password == '123') {
                console.log("Login Succesfull");
                window.location = '/Course online/Admin/admin.html'
            }else {
                checkValueFrom(userName, password);
            }
        }else {
            let userNameRegister = element.children[2].children[1].value;
            let accountRegister = element.children[3].children[1].value;
            let emailRegister = element.children[4].children[1].value;
            let passwordRegister = element.children[5].children[1].value;
            let cfpasswordRegister = element.children[6].children[1].value;
            checkValueRegister(userNameRegister, accountRegister, emailRegister, passwordRegister, cfpasswordRegister);
        }
    }

    //TODO: check value input from Login user 
    function checkValueFrom(account, password) {
        let dataQueryUser = firebase.database().ref().child('user');
        dataQueryUser.on('value', (snap) => {
            let arrayUser = snap.val();
            for (let index = 0; index < arrayUser.length; index++) {
                let notificationFrom = document.querySelector('#noti-from');
                let dataAccount = arrayUser[index].account;
                let dataPassword = arrayUser[index].password;
                notificationFrom.classList.add('hidden');
                if(account == dataAccount && password == dataPassword) {
                    window.location = '/Course online/index.html';
                    break;
                }else if(account != dataAccount) {
                    notfiError(notificationFrom, "Incorrect account. Please try again");
                }else if(password != dataPassword) {
                    notfiError(notificationFrom, "Incorrect password. Please try again");
                }
            }
        })
    }

    function checkValueRegister(userName, account, email, password, cfpassword) {
        let dataQueryUser = firebase.database().ref().child('user');
        dataQueryUser.on('value', (snap) => {
            let arrayUser = snap.val();
            for (let index = 0; index < arrayUser.length; index++) {
                let notifFromRegister = document.querySelector('#notiFromRegister');
                let dataAccRegister = arrayUser[index].account;
                let dataPassRegister = arrayUser[index].password;
            }
        })
    }

    //TODO: noti error from
    function notfiError(element, noti) {
        element.classList.remove('hidden');
        return element.children[0].innerText = noti;
    }
}