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
    menu[index].addEventListener('click', (e) => {
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