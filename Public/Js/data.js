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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  

// TODO: hiện danh sách các khóa học ra trang chủ
var listCourse = document.querySelector('#list-course');

if(listCourse != undefined) {
    var data = firebase.database().ref().child('Course');

    data.on('value', (snap) => {
        var course = snap.val(); 
        for (const key in course) {
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

// TODO: chi tiết khóa học
var currentHref = window.location.href.split('atc=')[1];
let titleCourse = document.querySelector("#title-course");

if(titleCourse != undefined) {
    let idCourse = firebase.database().ref().child('Course');
    idCourse.on('value', (snap) => {
        let _intitle = snap.val();
        for (const key in _intitle) {
            if(currentHref == _intitle[key].ID) {
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
                            <div class="main-course-right-listCourse-boxCourse-contentLession-content-title">
                                ${arrayCourse[index].Video[i].LessonTitle}
                            </div>
                        </div>`
                        // console.log(arrayCourse[index].Video[i].VideoLesson);
                    }
                }

                // TODO: hiện thi video ra khi click vào bài học
                let iframeVideo = document.querySelector("#VideoLesson");

                // TODO hiện thị video đầu tiên khi click vào khóa học
                let firstVideo = elementCourse[0].firstChild.getAttribute("value");
                iframeVideo.src = firstVideo;
                
                for (let index = 0; index < elementCourse.length; index++) {
                    let arrayLesson = elementCourse[index].children;
                    for (let i = 0; i < arrayLesson.length; i++) {
                        arrayLesson[i].addEventListener('click', () => {
                            console.log(arrayLesson[i].getAttribute("value"));
                            iframeVideo.src = arrayLesson[i].getAttribute("value");
                        })
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
                        boxCourse[1].classList.toggle('hidden');
                        boxCourse[0].lastElementChild.classList.toggle('rote');
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