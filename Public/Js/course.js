let boxCourse = document.querySelector('#Show-listCourse').children;
// console.log(boxCourse);
for (let index = 0; index < boxCourse.length; index++) {
    if(index % 2 == 0) {
        boxCourse[index].addEventListener('click', () => {
            boxCourse[index + 1].classList.toggle('hidden');
            boxCourse[index].lastElementChild.classList.toggle('rote');
        })
    }
}