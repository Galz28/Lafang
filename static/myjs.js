function showLoadingSign() {
	var load = document.getElementById("load");
	load.style.display = "block";
}


// button arrow up
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("btn-arrowup").style.display = "block";
  } else {
    document.getElementById("btn-arrowup").style.display = "none";
  }
}

// scroll to top
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 