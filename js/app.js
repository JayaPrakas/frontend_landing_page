/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sectionElements = document.getElementsByTagName("section");
const navList = document.querySelector("#navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function insertNavLink(navLinkName, sectionId) {
  // create a link
  const htmlTextToAdd = `<li><a href="#${sectionId}" class="menu__link">${navLinkName}</a></li>`;
  // add it to the nav
  navList.insertAdjacentHTML("beforeend", htmlTextToAdd);
}

function isTopSectionInViewport(el) {
  // get the coordinates of the element box from the viewport
  const rect = el.getBoundingClientRect();
  // return true if the element top is near the top of the viewport, false otherwise
  return (
    rect.top >= 0 &&
    // 0.4 to 0.7 works well across devices without overlapping sections
    rect.top <=
      0.7 * (window.innerHeight || document.documentElement.clientHeight)
  );
}

// simple and perfect helper function taken from https://muffinman.io/javascript-get-element-offset/
function getElementOffset(el) {
  // get the coordinates of the element box from the viewport
  const rect = el.getBoundingClientRect();
  // return element absolute top/left position as an object (element scroll in viewport + document scroll)
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav(sectionElements) {
  for (const section of sectionElements) {
    let navLinkName = section.getAttribute("data-nav");
    let sectionId = section.getAttribute("id");
    insertNavLink(navLinkName, sectionId);
  }
}

// Add class 'active' to section when near top of viewport
function setSectionIntoViewActive(sectionElements) {
  for (const section of sectionElements) {
    // detect the navigation link that matches the current section
    const activeLink = document.querySelector(
      `a[href="#${section.getAttribute("id")}"]`
    );
    // checks if the current section is near top of viewport
    if (isTopSectionInViewport(section)) {
      // if it is, highlight menu link and section with active styles
      section.classList.add("active");
      activeLink.classList.add("menu__link--active");
    } else {
      // if it is not, remove active styles
      section.classList.remove("active");
      activeLink.classList.remove("menu__link--active");
    }
  }
}

// Scroll to section anchor ID using smooth scrollTO event
function smoothScroll(el) {
  window.scrollTo({
    //scroll to element and account for sticky header offset
    top: getElementOffset(el).top - navList.offsetHeight,
    left: getElementOffset(el).left,
    behavior: "smooth"
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

document.addEventListener("DOMContentLoaded", function() {
  // Build menu
  buildNav(sectionElements);

  // Scroll to section on link click
  // using event Listener
  navList.addEventListener("click", function(e) {
    if (e.target.nodeName === "A") {
      e.preventDefault();
      // getting the clicked link
      const activeSection = document.querySelector(
        `section[id = ${e.target.getAttribute("href").slice(1)}]`
      );
      // smooth scrolling to the clicked link
      smoothScroll(activeSection);
    }
  });

  window.addEventListener("scroll", function() {
    
    setSectionIntoViewActive(sectionElements);
  
  })

});
