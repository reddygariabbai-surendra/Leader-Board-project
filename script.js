function updateDateTime() {
    const dt = new Date();
    const options = {  
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    const dateStr = dt.toLocaleDateString(undefined, options);

    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const timeStr = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')} ${ampm}`;

    const datetimeDiv = document.getElementById('datetime');
    if(datetimeDiv) {
        datetimeDiv.textContent = `${dateStr} | ${timeStr}`;
    }
}
// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime();

let data=[];

let fname=document.querySelector(".fname");
let lname=document.querySelector(".lname");
let country=document.querySelector(".country");
let pscore=document.querySelector(".score");
let button=document.querySelector(".submit");
let section2=document.querySelector(".section2");


section2.addEventListener("click", function (e) {
    const index = Array.from(section2.children).indexOf(e.target.closest(".innercode"));

    if (index === -1) return;

    if (e.target.classList.contains("add")) {
        data[index].pscore = parseInt(data[index].pscore) + 5;
        updateui();
    }

    if (e.target.classList.contains("subtract")) {
        data[index].pscore = parseInt(data[index].pscore) - 5;
        updateui();
    }

    if (e.target.classList.contains("delete")) {
        data.splice(index, 1);
        updateui();
    }
});

 
function updateui(){
    data.sort((a,b)=>{
        return b.pscore-a.pscore;
    })
    let show="";
    data.forEach((item)=>{
        show+=`
        <div class="innercode">
        <span>${item.fname}</span>
        <span>${item.lname}</span>
        <span>${item.country}</span>
        <span>${item.pscore}</span>
        <button class="delete">Delete</button>
        <button class="add">+5</button>
        <button class="subtract">-5</button>
        </div>`;
})
section2.innerHTML=show;
}
button.addEventListener("click",function(e){
    e.preventDefault();
    if(fname.value==="" || lname.value==="" || country.value==="" || pscore.value===""){
        alert("Please fill all the fields");
        return;
    }
    else{
    let obj={
    fname:fname.value,
    lname:lname.value,
    country:country.value,
    pscore:pscore.value
    };
    data.push(obj);
    updateui();
    fname.value="";
    lname.value="";
    country.value="";
    pscore.value="";
}
})
