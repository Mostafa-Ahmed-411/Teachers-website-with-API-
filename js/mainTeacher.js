/* -------- جلب ID المدرس من الرابط (URL) -------- */
(function () {
  const current_Url = new URL(window.location.href);
  const selected_Id = current_Url.searchParams.get("id");

  if (selected_Id) {
    startFetching(selected_Id);
  }
})();

async function startFetching(selected_Id) {
  try {
    // جلب بيانات المدرس من الـ API
    let response = await fetch(`https://reqres.in/api/users/${selected_Id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "free_user_3DYX2I0NYIxJQRpwctKlTF994Be",
        },
      });

    if (!response.ok) {
      throw new Error("Failed to fetch teachers");
    }
    let teacherApiData = await response.json();
    console.log("Teacher API Data:", teacherApiData);
    // جلب البيانات الإضافية من ملف JSON
    let responseJson = await fetch(`Data.json`);
    let customData = await responseJson.json();

    // تمرير البيانات للدالة التي تعرضها في الصفحة
    display_Teacher_data(teacherApiData.data, customData, selected_Id);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function display_Teacher_data(apiData, customData, selected_Id) {
  // البحث عن بيانات المدرس في ملف الـ JSON باستخدام الـ ID
  // ملاحظة: الـ id في المصفوفة يبدأ من 0، لذا نستخدم selected_Id - 1
  const extraInfo = customData[selected_Id - 1];

  const cartona = `
    <div class="container">
        <h1 id="teacher-name">${apiData.first_name } ${apiData.last_name}</h1>
        <div class="row">
            <div class="col-md-4 img teacher">
                <figure>
                    <img src="../imgs/1-image.jpg" class="w-100" alt="${apiData.first_name}">
                </figure>
            </div>
            
            <div class="offset-md-1 col-md-7 teacher">
                <div class="about">
                    <p class="pt-3 pt-md-0">${extraInfo ? extraInfo.about : "No info available."}</p>
                </div>
                <div class="info d-md-flex d-grid gap-3">
                    <ul>
                        <li><span>Name:</span> ${apiData.first_name} ${apiData.last_name}</li>
                        <li><span>ID:</span> ${selected_Id}</li>
                    </ul>
                    <ul>
                        <li><span>Job Title:</span> ${extraInfo ? extraInfo.job_title : "Teacher"}</li>
                        <li><span>E-mail:</span> <a href="mailto:${apiData.email}">${apiData.email}</a></li>
                    </ul>
                </div>

                <div class="video mt-4">
                    <h5>Get an overview of this topic</h5>
                    <iframe id="custom-video" width="100%" height="315"
                        src="${extraInfo ? extraInfo.youtube_link : ""}" 
                        frameborder="0" allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    </div>`;

  document.getElementById("show-single-teacher-data").innerHTML = cartona;
}

