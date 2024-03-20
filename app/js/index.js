const nav = document.querySelector('.main-menu');
const navList = document.createElement('ul');

// navItemsArray.forEach(item => {
//     let listItem = document.createElement('li');
//     listItem.innerHTML = `<a href="#">${item}</a>`;
//     navList.appendChild(listItem);
// });

navItemsObject.forEach(function (item) {
    let listItem = document.createElement('li');
    listItem.innerHTML = `<a href="${item.link}">${item.label}</a>`;
    navList.appendChild(listItem);
});

nav.append(navList);
