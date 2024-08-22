console.log("EARL Drsh");

/* -------- select teacher id from url {i have passed from page one} -------- */
(function(){
    var current_Url = new URL(window.location.href); 
    var selected_Id = current_Url.searchParams.get("id");
    // console.log(window.location.href);
    console.log("selected_Id for teacher :  >> " + selected_Id);

/* ----- */ fetch_Id(selected_Id) /* ------ */
})()


/* -------- fetch_Id function  fetch data for single teacher from api ------- */

function fetch_Id(selected_Id){
    async function single_Teacher(selected_Id)
    {
        let response = await fetch(`https://reqres.in/api/users?id=${selected_Id}`)
        let responseResult = await response.json();
        return responseResult
    }

/* ------------------------------------ */

async function fetch_Custom_data()
    {
        let response = await fetch(`Data.json`);
        let responseResult = await response.json()
        return responseResult
    }
/* ------------------------------------ */ /* call  fetch_All_Teachers , fetch_Custom_data , display_List_Teachers   function */

    (async function()
    {
        let single_Teacher_Result = await single_Teacher(selected_Id)
        let custom_data_Result = await fetch_Custom_data ()
        display_Teacher_data(single_Teacher_Result.data , custom_data_Result  , selected_Id )
    })() 
}


/* ---------------------- display_Teacher_data function --------------------- */

function display_Teacher_data(single_Teacher_Result_Data  , custom_data_Result_Data , selected_Id){
    var cartona = `
    <div class="container" id="show-single-teacher-data">
    <h1 id="teacher-name">${single_Teacher_Result_Data.first_name + " " +single_Teacher_Result_Data.last_name}</h1>
    <div class="row ">
        <div class="col-md-4 img teacher">
            <figure>
                <img src="${single_Teacher_Result_Data.avatar}" alt="${single_Teacher_Result_Data.first_name + " " +single_Teacher_Result_Data.last_name}">
            </figure>
        </div>
        
        <div class="offset-md-1 col-md-7 teacher ">
            <div class="about">
                <p class="pt-3 pt-md-0">
                    ${custom_data_Result_Data[selected_Id-1].about}
                </p>
                </div>
        <div class="info d-md-flex d-grid">
            <ul class="bg-warning0">
                <li><span>name :</span>${single_Teacher_Result_Data.first_name + " " +single_Teacher_Result_Data.last_name} </li>
                <li><span>ID :</span> 1 </li>
            </ul>
            <ul class="bg-info0">
                <li><span>job title :</span> ${custom_data_Result_Data[selected_Id-1].job_title} </li>
                <li><span>e-mail :</span> <a href="${single_Teacher_Result_Data.email}">${single_Teacher_Result_Data.email}</a> </li>
            </ul>
        </div>

            <div class="video">
                <h5>Get an overview of this topic</h5>
                <iframe id="custom-video"
                src="${custom_data_Result_Data[selected_Id-1].youtube_link}" 
                title="Teaching Methods for Inspiring the Students of the Future | Joe Ruhl | TEDxLafayette"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>
            </div>
        </div>
</div>
</div>
    `
    document.getElementById("show-single-teacher-data").innerHTML = cartona
}

/* ------------------------------ scroll_To_Up ------------------------------ */
let scroll_To_Up = document.getElementById("up-icon")

window.addEventListener("scroll", ()=>{
    if(scrollY >= 100)
    {
        scroll_To_Up.style.display = 'block' ;
        console.log("ok");
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
























