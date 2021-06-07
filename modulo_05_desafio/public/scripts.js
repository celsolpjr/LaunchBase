const links = document.querySelectorAll(".links a");

for (link of links) {
    if (window.location.href.includes(link.href)) {
        link.classList.add("active");
    }
}