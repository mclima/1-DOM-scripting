import { makeNav } from './modules/nav.js';
import navItemsObject from './modules/navitems.js';

const root = document.querySelector('.site-wrap');
// const nytapi = 'KgGi6DjX1FRV8AlFewvDqQ8IYFGzAcHM'; // note this should be your API key
const nytapi = 'L9v8dHMjUlDAG1DtNjhBsiYyUO6VFhhC';
// const nytUrl = `https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=${nytapi}`;

makeNav();

const categories = navItemsObject.map(item => item.link);
const navItems = document.querySelectorAll('nav li');

for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', () => {
        let category = categories[i].substring(1);
        document.querySelector('#filter').dataset.filter = category;
        document.querySelector('#sort').dataset.sort = category;
        fetchArticles(category);
    });
}

function fetchArticles(section) {
    if (!localStorage.getItem(section)) {
        console.log('section not in local storage, fetching');
        fetch(
            `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`,
        )
            .then(response => response.json())
            .then(data => setLocalStorage(section, data.results))
            .catch(error => {
                console.warn(error);
            });
    } else {
        console.log('section in local storage');
        renderStories(section);
    }
}

function setLocalStorage(section, myJson) {
    //clear localStorage
    localStorage.removeItem(section);
    localStorage.setItem(section, JSON.stringify(myJson));
    renderStories(section);
}
// fetch(nytUrl)
//     .then(response => response.json()) //json() converts from JSON // returns a promise
//     .then(myJson => localStorage.setItem('stories', JSON.stringify(myJson))) //returns data
//     .then(renderStories);
function setActiveTab(section) {
    const activeTab = document.querySelector('a.active');
    if (activeTab) {
        activeTab.classList.remove('active');
    }
    const tab = document.querySelector(`nav li a[href="#${section}"]`);
    tab.classList.add('active');
}

function renderStories(section) {
    setActiveTab(section);
    let data = JSON.parse(localStorage.getItem(section));
    console.log(data);
    if (document.querySelectorAll('.entry')) {
        document.querySelectorAll('.entry').forEach(item => {
            item.remove();
        });
    }
    let storyEl = document.createElement('div');
    storyEl.className = 'entry';

    if (data && data.length !== 0) {
        console.log(data.length);
        data.forEach(story => {
            storyEl.innerHTML += `
    <img src="${story.multimedia ? story.multimedia[0].url : ''}" alt="${
                story.title
            }" />
      <div>
        <h3><a target="_blank" href="${story.url}">${story.title}</a></h3>
        <p>${story.abstract}</p>
      </div>
      `;
        });
    } else {
        if (data.length === 0) {
            storyEl.innerHTML = 'Articles not available';
        } else {
            storyEl.innerHTML = 'data not ready yet';
        }
    }

    root.prepend(storyEl);
}

function filterArticles(category) {
    let data = JSON.parse(localStorage.getItem(category));
    //create array with articles which belong to the section with the same name
    // console.log(data);
    let results = data.filter(item => {
        return item.section.toLowerCase() === category.toLowerCase();
    });
    console.log(results);
    setLocalStorage(category, results);
}

function sortArticles(category) {
    let data = JSON.parse(localStorage.getItem(category));
    //sort article by title
    const ordered = data.sort(function (a, b) {
        if (a.title > b.title) {
            return 1;
        } else {
            return -1;
        }
    });
    console.table(ordered);
    setLocalStorage(category, ordered);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#filter').addEventListener('click', () => {
        filterArticles(document.querySelector('#filter').dataset.filter);
    });
    document.querySelector('#sort').addEventListener('click', () => {
        sortArticles(document.querySelector('#sort').dataset.sort);
    });
});
