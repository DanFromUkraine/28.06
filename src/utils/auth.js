import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { log } from "handlebars";

let user_data;

const firebaseConfig = {
  apiKey: "AIzaSyAqbTsHSvGCjduaP2gyY1SaRpYdBkwEyZ0",
  authDomain: "musiccar-14c2b.firebaseapp.com",
  projectId: "musiccar-14c2b",
  storageBucket: "musiccar-14c2b.appspot.com",
  messagingSenderId: "560343045770",
  appId: "1:560343045770:web:6fefb326f35dc592fc7f73",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// отримуємо посилання на елементи авторизації

const loginButton = document.querySelector("#login"),
  logoutButton = document.querySelector("#logout"),
  user_icon = document.querySelector("#user_icon");

// подія кліку по кнопці логін
loginButton.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  console.log(provider);

  signInWithPopup(auth, provider)
    .then((resp) => {
      const user = resp.user;
      console.log("user has been logged");

      localStorage.setItem("user", JSON.stringify(user));
    })
    .catch((err) => {
      throw err;
    });
});

logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User has been logged out");
      localStorage.clear();
    })
    .catch((err) => {
      throw err;
    });
});

// отримати стан авторизації юзера

auth.onAuthStateChanged((user) => {
  if (user) {
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      user_data = JSON.parse(savedUserData);
    }
    loginButton.style.display = "none"
    logoutButton.style.display = "block"
    user_icon.style.display = "block"
    console.log(user_icon);
    user_icon.src = user_data.photoURL

    console.log(user_data);
  } else {
    loginButton.style.display = "block"
    logoutButton.style.display = "none"
    user_icon.style.display = "none"
    // console.log(user_icon);
    // user_icon.src = user_data.photoURL
  }
});


// перевірити наявність даних користувача в LocalStorage при завантаженні сторінки
