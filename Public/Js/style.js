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