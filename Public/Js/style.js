//TODO drop profiles user when user click avatar profiles 
let profilesUser = document.querySelector("#profiles-user");
let boxProfilesUser = document.querySelector("#profiles-drop");

profilesUser.addEventListener('click', () => {
    boxProfilesUser.classList.toggle("show");
});

//TODO when user click outside close profiles
window.onclick = (e) => {
    if(!e.target.matches('#profiles-user')) {
        boxProfilesUser.classList.remove("show");
    }
}

//TODO active on menu
let menu = document.querySelectorAll(".btn-menu");

for (let index = 0; index < menu.length; index++) {
    menu[index].addEventListener('click', () => {
        // xóa tất cả các class có active
        let menuActive = document.querySelector('.active');
        menuActive.classList.remove('active');
        // thêm class active vào phần tử đã click 
        menu[index].classList.add('active');
    })
}

//TODO Collapse the menu
let btnMenu = document.querySelector('#btn-menu');
let hiddenElement = document.querySelectorAll('.title-menu');

btnMenu.addEventListener('mouseup', () => {
    let menu = document.querySelector('.list-menu');

    hiddenElement.forEach((item) => {
        item.classList.toggle('hidden');
    });
    menu.classList.toggle('collapse-menu');

    if(menu.clientWidth == 293) {
        let avatarUserMenu = document.querySelectorAll('.img-avt');
        
        for (let index = 0; index < avatarUserMenu.length; index++) {
            avatarUserMenu[index].childNodes[1].style.width = '35px';
        }
    }
});

//TODO: model create
let modelCreate = document.querySelector('#model-cret');
let btnCreate = document.querySelector('#btn-create');
let bgModel = document.querySelector('.model-create');

if(btnCreate) {
    btnCreate.addEventListener('click', () => {
        //TODO hidden scroll body
        document.querySelector('body').style.overflow = 'hidden';
        //TODO show model create 
        modelCreate.classList.toggle('hidden');
    });
    
    bgModel.onclick = (e) => {
        if(e.target.matches('.model-create')) {
            document.querySelector('body').style.overflow = 'scroll';
            modelCreate.classList.add('hidden');
        }
    }
}

//TODO model edit 
//TODO wait for the element to finish loading
setTimeout(()=> {     
    let listButtonEdit = document.querySelectorAll('.btn-edit');
    let pictureElement = document.querySelector('#pictureCourse');
    let contentElement = document.querySelector("#titleCourse");
    let bannerElement = document.querySelector('#fileimg');

    //TODO add event click button
    for (let index = 0; index < listButtonEdit.length; index++) {
        listButtonEdit[index].addEventListener('click', (e) => {
            // console.log(index);
            let parentElementCourse = e.target.parentElement.parentElement;
            let firstLinkPicture = parentElementCourse.children[0].children[0].src;
            let titleCourse = parentElementCourse.children[1].children[0].innerText;
            let pictureCourse =  firstLinkPicture.split('Course%20online/')[1];
  
            //TODO: change picture and content course
            pictureElement.src = "/Course online/" + pictureCourse;
            contentElement.value = titleCourse;
            bannerElement.dataset.customValue = pictureCourse;

            //TODO show from edit
            let modelEdit = document.querySelector('#model-edit');

            var valueScroll = window.scrollY;
            // console.log(valueScroll);
            modelEdit.style.marginTop = valueScroll + "px";

            //TODO hidden scroll body
            document.querySelector('body').style.overflow = 'hidden';
            
            //TODO show model create 
            modelEdit.classList.toggle('hidden');

            //TODO add id value input
            let id = document.querySelector('#Delete');
            let idUpdate = document.querySelector('#update');
            id.value = index
            idUpdate.value = index
        })
    }

    //TODO when click outside from eidt then hidden from
    let bgEdit = document.querySelector('#model-edit');
    if(bgEdit) {
        bgEdit.onclick = (e) => {
            if(e.target.matches('#model-edit')) {
                document.querySelector('body').style.overflow = 'scroll';
                bgEdit.classList.add('hidden');
            }
        }
    }
}, 1000)

//TODO: show from admin
let listFrom = document.querySelectorAll('.create-sesion');
let btnCreateSesion = document.querySelector('.btn-admin-create');

// console.log(listFrom);
if(btnCreateSesion) {
    btnCreateSesion.addEventListener('click', () => {
        listFrom[0].classList.remove('hidden');
        listFrom[1].classList.add('hidden');
        listFrom[2].classList.add('hidden');
    })
}

setTimeout(() => {
    let btnAddCourse = document.querySelectorAll('.btn-editCourse');
    for (let index = 0; index < btnAddCourse.length; index++) {
        btnAddCourse[index].addEventListener('click', () => {
            listFrom[1].classList.remove('hidden');
            listFrom[0].classList.add('hidden');
            listFrom[2].classList.add('hidden');
        })
    }
    
    let btnEditCourse = document.querySelectorAll('.editCourseAdmin');
    for (let index = 0; index < btnEditCourse.length; index++) {
        btnEditCourse[index].addEventListener('click', () => {
            listFrom[2].classList.remove('hidden');
            listFrom[1].classList.add('hidden');
            listFrom[0].classList.add('hidden');
        })
    }
}, 1000)