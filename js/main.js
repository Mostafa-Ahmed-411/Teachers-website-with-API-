console.log("EARL Drsh");

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const API_URL = "https://reqres.in/api/users";

const teachersContainer = document.getElementById("show-teachers-list");
const paginationButtons = document.querySelectorAll("#pagination-bar .btn");
const scrollToUpButton = document.getElementById("up-icon");

/* -------------------------------------------------------------------------- */
/*                              Initialize App                                */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initializePage();
  initializePagination();
  initializeCounters();
  initializeScrollToTop();
});

/* -------------------------------------------------------------------------- */
/*                              Initialize Page                               */
/* -------------------------------------------------------------------------- */

async function initializePage() {
  const currentPage = getCurrentPage();

  setActivePaginationButton(currentPage);

  await fetchPage(currentPage);
}

/* -------------------------------------------------------------------------- */
/*                               URL Functions                                */
/* -------------------------------------------------------------------------- */

function getCurrentPage() {
  const currentUrl = new URL(window.location.href);

  return Number(currentUrl.searchParams.get("page")) || 1;
}

function updatePageInUrl(pageNumber) {
  const url = new URL(window.location.href);

  url.searchParams.set("page", pageNumber);

  window.history.replaceState({}, "", url);
}

/* -------------------------------------------------------------------------- */
/*                            Pagination Functions                            */
/* -------------------------------------------------------------------------- */

function initializePagination() {
  paginationButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const pageNumber = Number(event.target.value);

      updatePageInUrl(pageNumber);

      setActivePaginationButton(pageNumber);

      await fetchPage(pageNumber);
    });
  });
}

function setActivePaginationButton(pageNumber) {
  paginationButtons.forEach((button) => {
    button.classList.remove("pagination-button");
  });

  paginationButtons[pageNumber - 1]?.classList.add("pagination-button");
}

/* -------------------------------------------------------------------------- */
/*                               Fetch Functions                              */
/* -------------------------------------------------------------------------- */

async function fetchPage(pageNumber) {
  try {
    const [teachersResponse, customData] = await Promise.all([
      fetchAllTeachers(pageNumber),
      fetchCustomData(),
    ]);

    displayTeachers(teachersResponse, pageNumber, customData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchAllTeachers(pageNumber) {
  const response = await fetch(`${API_URL}?page=${pageNumber}`, {
    headers: {
      "x-api-key": "free_user_3DYX2I0NYIxJQRpwctKlTF994Be",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch teachers");
  }
  let data = await response.json();
  return data;
}

async function fetchCustomData() {
  const response = await fetch("Data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch custom data");
  }

  return await response.json();
}

/* -------------------------------------------------------------------------- */
/*                              Display Teachers                              */
/* -------------------------------------------------------------------------- */

function displayTeachers(responseData, pageNumber, customData) {
  const { data: teachers, per_page } = responseData;

  const teachersHTML = teachers
    .map((teacher, index) => {
      const teacherIndex = index + per_page * (pageNumber - 1);

      return `
        <div class="col-md-4 item" data-id="${teacherIndex + 1}">
          <div class="item-content">

            <div class="item-up">
              <figure>
                <img 
                  src="../imgs/1-image.jpg"
                 
                  alt="${teacher.first_name} ${teacher.last_name}"
                >
              </figure>

              <h2>${teacher.first_name} ${teacher.last_name}</h2>

              <p>
                ${customData[teacherIndex]?.brief || ""}
              </p>
            </div>

            <div class="item-down">
              <p>Start Now</p>
              <p>
                <i class="fa-solid fa-arrow-right"></i>
              </p>
            </div>

          </div>
        </div>
      `;
    })
    .join("");

  teachersContainer.innerHTML = teachersHTML;

  initializeTeacherSelection();
}

/* -------------------------------------------------------------------------- */
/*                            Teacher Selection                               */
/* -------------------------------------------------------------------------- */

function initializeTeacherSelection() {
  const teacherItems = document.querySelectorAll("#teacher .item");

  teacherItems.forEach((teacher) => {
    teacher.addEventListener("click", () => {
      const teacherId = teacher.dataset.id;

      window.location.href = `teacher.html?id=${teacherId}`;
    });
  });
}

/* -------------------------------------------------------------------------- */
/*                               Counter Section                              */
/* -------------------------------------------------------------------------- */

function initializeCounters() {
  runCounter("course-counter", 265, 4000);
  runCounter("teacher-counter", 52, 4000);
  runCounter("student-counter", 10568, 6000);
}

function runCounter(elementId, targetValue, duration) {
  const element = document.getElementById(elementId);

  let startValue = 0;

  const increment = targetValue / (duration / 10);

  const counter = setInterval(() => {
    startValue += increment;

    element.textContent = Math.floor(startValue);

    if (startValue >= targetValue) {
      element.textContent = targetValue;

      clearInterval(counter);
    }
  }, 10);
}

/* -------------------------------------------------------------------------- */
/*                              Scroll To Top                                 */
/* -------------------------------------------------------------------------- */

function initializeScrollToTop() {
  window.addEventListener("scroll", toggleScrollButton);

  scrollToUpButton.addEventListener("click", scrollToTop);
}

function toggleScrollButton() {
  scrollToUpButton.style.display = window.scrollY >= 100 ? "block" : "none";
}

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
