"use strict";

document.addEventListener("readystatechange", (e) => {
  switch (e.target.readyState) {
    case "interactive":
      beforeInitApp();
      getExperience();
      break;
    case "complete":
      initApp();
      break;
  }
});

function beforeInitApp() {
  document.getElementById("header-contact-btn").onclick = (e) => {
    pageScroller(e, document.body.offsetHeight);
  };
  document.getElementById("footer-top-btn").onclick = (e) => {
    pageScroller(e, 0);
  };
}

function initApp() {
  const hiddenElements = document.querySelectorAll(
    ".hidden, .background-hidden"
  );

  const getImageElements = document.querySelectorAll("img");
  getImageElements.forEach((img) => {
    img.oncontextmenu = (e) => {
      e.preventDefault();
    };
    img.ondragstart = (e) => {
      e.preventDefault();
    };
  });

  function setListener() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //background image
          if (entry.target.id === "background-image") {
            entry.target.classList.add("background-show");
          }
          // all other hidden elements
          if (!entry.target.id || entry.target.id !== "background-image") {
            entry.target.classList.add("show");
            setTimeout(() => {
              entry.target.classList.remove("hidden");
            }, 3000);
          }
          // pop-up
          if (entry.target.id === "popUp") {
            var date = new Date();
            var endDate = new Date(2026, 3, 2);
            if(date < endDate){
              var popUpPic = "images/popup/popupImage-1.jpg";
              var popUpUrl = "https://marathon-paris.dossards-solidaires.org/fundraisers/greg-roques?utm_campaign=dossards-solidaires&utm_content=new_action&utm_medium=email-auto&utm_source=kentaa";
              setTimeout(function(){
                var popUp = document.getElementById("popUp")
                popUp.innerHTML = `       
                <div id="popUp" class="popUpFrame">
                <div id="popUpCloseButton" class="popUpCloseButton" onClick="closePopUp()">X</div>
                <a href=${popUpUrl} target="_blank">
                  <img id="popUpImage" onload="imgFadeIn()" class="popUpImage" alt="Pop Up Message" src="${popUpPic}"/>
                </a>
                </div>
                `
              },1000)
            }
          }

          observer.unobserve(entry.target);
        }
      });
    });
    const observerElements = hiddenElements;
    observerElements.forEach((el) => {
      observer.observe(el);
    });
  }

  function scrollListener() {
    if (window.pageYOffset === 0 || window.scrollY === 0) {
      setListener();
      window.removeEventListener("scroll", scrollListener);
    }
  }

  if (window.pageYOffset === 0 || window.scrollY === 0) {
    setListener();
  } else {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", scrollListener);
  }
}

function getExperience() {
  const currYear = new Date();
  const experience = currYear.getFullYear() - 2019;
  document.getElementById("sn_years_experience").innerHTML =
    experience.toString();
}

function pageScroller(e, loc) {
  e.target.blur();
  window.scrollTo({
    top: loc,
    left: 0,
    behavior: "smooth",
  });
}

function closePopUp(){
  var popUp = document.getElementById('popUp')
  popUp.remove()
}

function imgFadeIn(el){
  var popImg = document.getElementById("popUpImage")
  popImg.classList.add("imgFadeIn")

  var popUp = document.getElementById("popUp")
  setTimeout(function(){
    popUp.remove()
  },11000)
}

window.onpageshow = () => {
  history.scrollRestoration = "manual";
};
