let mybutton = document.getElementById("to_top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
    if (window.getComputedStyle(page).getPropertyValue("display") == "none") {
        showMenu();
    }
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function scrollToAboutUs() {
    if (window.getComputedStyle(page).getPropertyValue("display") == "none") {
        showMenu();
    }
    let about = document.getElementById("about_us");
    about.scrollIntoView({block: "center"})
};

function scrollToCars() {
    if (window.getComputedStyle(page).getPropertyValue("display") == "none") {
        showMenu();
    }
    let row = document.getElementById("model_row");
    row.scrollIntoView({block: "center"});
};

let tg = document.getElementById("tg")
let inst = document.getElementById("inst");
let vk = document.getElementById("vk");

tg.onmouseover = function() {
    tg.innerHTML = "@Devilstavrogim";
};

tg.onmouseout = function() {
    tg.innerHTML = "Telegram";
};

inst.onmouseover = function() {
    inst.innerHTML = "strigi_ovcu";
};

inst.onmouseout = function() {
    inst.innerHTML = "Instagram";
};

vk.onmouseover = function() {
    vk.innerHTML = "@grisharubitel";
};

vk.onmouseout = function() {
    vk.innerHTML = "VK";
};



function changeAndScroll() {
    console.log("DOM loaded!");
    document.location.href = "../index.html";
    addEventListener('DOMContentLoaded', function() {
        console.log("DOM loaded!");
        document.getElementById("model_row").scrollIntoView({block: "center"});
    });
};

function showMenu() {
    let page = document.getElementById("page")
    let nav_menu = document.getElementById("nav_menu")
    let but_lust = document.getElementById("button_list");
    if (window.getComputedStyle(page).getPropertyValue("display") == "block") {
        page.style.display = "none";
        nav_menu.style.display = "flex";
        but_lust.style.display = "block";
    }
    else {
        page.style.display = "block";
        nav_menu.style.display = "none";
        but_lust.style.display = "none";
    }
    console.log(window.getComputedStyle(page).getPropertyValue("display"));
    console.log(window.getComputedStyle(nav_menu).getPropertyValue("display"));
}

let site2 = document.getElementById("blick");

setInterval(function() {
    site2.style.boxShadow = "##2F4F4F 0px 0px 10px 5px";
    setTimeout(function() {
        site2.style.boxShadow = "transparent 0px 0px 10px 5px";
    }, 2000);
}, 4000);
