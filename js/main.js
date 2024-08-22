console.log("EARL Drsh");


/* -------- select page numer  from url {if  frist time open site (page number = 1 )} -------- */

(function()
{
    let current_Url = new URL(window.location.href); 
    console.log("current_Url  : " + current_Url);
    let current_Page = current_Url.searchParams.get("page");
    
    let paginationBtn = document.querySelectorAll("#pagination-bar .btn")

    if(current_Page == null)
    {
        window.location.href = `index.html?`+ `page=${1}`
        fetch_Page(1)
        console.log(current_Page);
    }else{
        paginationBtn[current_Page-1].classList.add("pagination-button");
        fetch_Page(current_Page)
        console.log(current_Page);
    }
})()



/* ------------------------- when use pagination bar ------------------------ */

let paginationBtn = document.querySelectorAll("#pagination-bar .btn")
for (let i = 0; i < paginationBtn.length; i++) {
    paginationBtn[i].addEventListener("click" , (e)=>{
        let pageNumber = e.target.value
        console.log(pageNumber);

        fetch_Page(pageNumber)
        window.location.href = `index.html?`+ `page=${pageNumber}`

    })
}


/* -------- fetch_Page function  fetch data for list of teacher from api  ------- */
/* -------- fetch_Page function  fetch custom data for list of teacher from json file  ------- */

async function fetch_Page(pageNumber){

    async function fetch_All_Teachers(pageNumber)
        {
            let response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`);
            let responseResult = await response.json()
            return responseResult
        }
/* ------------------------- */
async function fetch_Custom_data()
{
    let response = await fetch(`Data.json`);
    let responseResult = await response.json()
    return responseResult
}
/* ------------------------- */ /* call  fetch_All_Teachers , fetch_Custom_data , display_List_Teachers   function */
    (async function()
        {
            let All_Teachers_Result = await fetch_All_Teachers(pageNumber)
            let custom_data_Result = await fetch_Custom_data ()
            display_List_Teachers(All_Teachers_Result , pageNumber ,custom_data_Result )
        })()
}

/* ---------------------------- fetch_custom_data  function --------------------------- */

    
    /* ---------------------- display_List_Teachers function ---------------------- */
    function display_List_Teachers(responseResult , pageNumber , custom_data_Result)
    {
        var cartona = ``
        for (let i = 0; i < responseResult.per_page; i++) {
            cartona += `
            <div class="col-md-4 item">
            <div class="item-content">
            
            <div class="item-up">
                <figure>
                <img src="${responseResult.data[i].avatar}" alt="${responseResult.data[i].first_name + " " + responseResult.data[i].last_name}">
                </figure>
                <h2>${responseResult.data[i].first_name + " " + responseResult.data[i].last_name}</h2>
                <p>${custom_data_Result[i + (responseResult.per_page * (pageNumber-1))].brief}</p>
                    
            </div>
                    
                    <div class="item-down">
                    <p>start now</p>
                    <p><i class="fa-solid fa-arrow-right"></i></p>
                    </div>
                    </div>
                    </div>
                    ` 
                    document.getElementById("show-teachers-list").innerHTML= cartona
                }
                select_Teacher(pageNumber)
            }
            
// <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias enim ea ut aliquam optio nihil inventore voluptatem tempore. Deserunt, corporis!.</p>
/* ---------------- select_Teacher function to send id to url --------------- */

function select_Teacher(pageNumber)
{
    console.log("pageNumber  :  " + pageNumber);
    let click_Specific_Teacher = document.querySelectorAll("#teacher .item")
    
    for (let index = 0; index < click_Specific_Teacher.length;  index++) {
        
        click_Specific_Teacher[index].addEventListener("click" , (e)=>{
        
            let current_Url = new URL(window.location.href); 
            let what_Current_Page = current_Url.searchParams.get("page");
            while (what_Current_Page) {
                let id = (index +1) + (6 *( what_Current_Page - 1)) 
                window.location.href = `teacher.html?id=${id}`;
                fetch_Id( id)
            }
        })
    }
}

/* ----------------------- statistics Counter Function ---------------------- */

(function(){
    let course_Counter = document.getElementById("course-counter")   // 265
    let teacher_Counter = document.getElementById("teacher-counter") // 52
    let student_Counter =  document.getElementById("student-counter") // 10568

    function runCounter(id , targetValue , duration_s)
    {
        let counts = setInterval(updated);
        let start_piont = 0; 
        let incrementValue = targetValue / (duration_s * 100) 
        function updated() {

            start_piont += incrementValue
            id.innerHTML = Math.floor(start_piont);
            if (start_piont >= targetValue) {
                clearInterval(counts);
            }
        }
    }

    runCounter(course_Counter , 265 , 4)
    runCounter(teacher_Counter , 52 , 4)
    runCounter(student_Counter , 10568 , 6)

})()


/* ------------------------------ scroll_To_Up ------------------------------ */
let scroll_To_Up = document.getElementById("up-icon")

window.addEventListener("scroll", ()=>{
    if(scrollY >= 100)
    {
        scroll_To_Up.style.display = 'block' ;
    }else{
        scroll_To_Up.style.display = 'none' ;
    }
})

scroll_To_Up.addEventListener("click", ()=>{
    scroll({
        left : 0,
        top : 0,
        behavior : "smooth",
    })
})


// let current_Url = new URL(window.location.href); 
// console.log("current_Url  : " + current_Url);
// let current_Page = current_Url.searchParams.get("page");
// console.log(current_Page);
// let paginationBtns = document.querySelectorAll("#pagination-bar .btn")
// paginationBtns[current_Page-1].classList.add("pagination-button");