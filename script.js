/* ==========================================
   JOBHUB PRO - HOME PAGE JAVASCRIPT
========================================== */

/* =========================
   STICKY NAVBAR
========================= */

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background = "#ffffff";
        navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";

    } else {

        navbar.style.background = "rgba(255,255,255,.95)";
        navbar.style.boxShadow = "none";

    }

});


/* =========================
   SEARCH BUTTON
========================= */

const searchButton = document.querySelector(".search-box button");

if(searchButton){

searchButton.addEventListener("click",function(){

    const job=document.querySelector(".search-box input:nth-child(1)").value;

    const location=document.querySelector(".search-box input:nth-child(2)").value;

    const category=document.querySelector(".search-box select").value;

    if(job==="" && location===""){

        alert("Please enter Job Title or Location");

        return;

    }

    alert(
        "Searching...\n\nJob : "+job+
        "\nLocation : "+location+
        "\nCategory : "+category
    );

});

}


/* =========================
   HERO BUTTONS
========================= */

const primary=document.querySelector(".primary-btn");

if(primary){

primary.addEventListener("click",function(){

    alert("Opening Jobs Page...");

});

}

const secondary=document.querySelector(".secondary-btn");

if(secondary){

secondary.addEventListener("click",function(){

    alert("Redirect to Job Posting");

});

}


/* =========================
   COUNTER ANIMATION
========================= */

const counters=document.querySelectorAll(".counter");

const speed=150;

function startCounter(){

counters.forEach(counter=>{

const target=+counter.getAttribute("data-target");

const update=()=>{

const current=+counter.innerText;

const increment=Math.ceil(target/speed);

if(current<target){

counter.innerText=current+increment;

setTimeout(update,20);

}
else{

counter.innerText=target+"+";

}

};

update();

});

}

window.addEventListener("load",startCounter);


/* =========================
   SCROLL TO TOP BUTTON
========================= */

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.className="top-btn";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topButton.style.display="block";

}else{

topButton.style.display="none";

}

});

topButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});


/* =========================
   DARK MODE
========================= */

const darkButton=document.createElement("button");

darkButton.innerHTML="🌙";

darkButton.className="dark-mode-btn";

document.body.appendChild(darkButton);

darkButton.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});


/* =========================
   HERO IMAGE FLOAT
========================= */

const heroImage=document.querySelector(".hero-right img");

if(heroImage){

let angle=0;

setInterval(()=>{

angle+=0.02;

heroImage.style.transform=

"translateY("+

Math.sin(angle)*10+

"px)";

},20);

}


/* =========================
   ACTIVE MENU
========================= */

const links=document.querySelectorAll(".nav-links a");

links.forEach(link=>{

link.addEventListener("click",function(){

links.forEach(item=>{

item.classList.remove("active");

});

this.classList.add("active");

});

});


/* =========================
   SIMPLE FADE ANIMATION
========================= */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(section=>{

observer.observe(section);

});


/* =========================
   PAGE LOADED
========================= */

window.onload=function(){

console.log("JobHub Pro Loaded Successfully");

};