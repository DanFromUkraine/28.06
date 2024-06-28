import headerTPL from "../templates/header.handlebars"

if (!document.querySelector("header")) {
    document.querySelector("body").insertAdjacentHTML("afterbegin", headerTPL());
} else {
    console.error("header is already existing in this file!");
}
