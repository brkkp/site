"use strict"
const body = document.body
const navbar = document.querySelector(".navbar")
const authBoxEl = document.querySelector(".auth")
const authButtonCloseEl = document.querySelector(".auth__button-close")
const formInputNickLo = document.getElementById("u-nickname--login")
const formInputPswLo = document.getElementById("u-password--login")
const formSingUp = document.querySelector(".form--sing-up")
const formLogin = document.querySelector(".form--login")
const formBtnSubmitLogin = document.querySelector(".form__button-submit--login")
const overlay = document.createElement("div")
overlay.classList.add("overlay")
//
// Time
const date = {
  month: "numeric",
  day: "numeric",
}
const getTime = new Intl.DateTimeFormat("it", date).format(new Date())

///////
//////////
const acc1 = {
  email: "brkgame@tuta.com",
  get _nick() {
    return this.email.split("@")[0]
  },

  set image(img) {
    this._image = img
  },
}

const acc2 = {
  email: "brksockets@tuta.com",
  get _nick() {
    return this.email.split("@")[0]
  },

  set image(img) {
    this._image = img
  },
}

const acc3 = {
  email: "brukaanony@tuta.com",
  get _nick() {
    return this.email.split("@")[0]
  },

  set image(img) {
    this._image = img
  },
}

const accounts = [acc1, acc2, acc3]
accounts.forEach((e) => {
  e._pw = e.email.split("@")[0].slice(0, 3)
  e.image = "./assets/icons8-user-60.png"
})

acc1.image = "./assets/photo-1.jpg"
acc2.image = "./assets/img-me1.jpg"
///
/////
let currentAcc
let accessLogin = 3
authBoxEl.addEventListener("click", function (e) {
  const id = e.target.closest(".button")
  if (!id) return
  if (id.classList.contains("auth__button-close")) {
    this.classList.remove("show")
  }
})

navbar.addEventListener("click", function (e) {
  this.classList.add("open")
  body.prepend(overlay)
  document.querySelector(".user--date").innerHTML = getTime
  //
  const id = e.target.closest(".button") || e.target.closest(".nav__link")
  if (!id) return
  if (id.classList.contains("button--login")) {
    navbar.classList.remove("open")
    authBoxEl.classList.add("show")
    overlay.remove()
  }
})

formBtnSubmitLogin.addEventListener("click", function (e) {
  e.preventDefault()
  // find account
  accounts.forEach((e) => {
    if (e._nick === formInputNickLo.value.trim().toLowerCase()) currentAcc = e
    else if (e.email === formInputNickLo.value.trim()) currentAcc = e
  })

  // check account
  if (!currentAcc) {
    formInputNickLo.value = formInputPswLo.value = ""
    formInputNickLo.focus()
    alert("Account non trovato")
    return
  }

  // check psw
  if (currentAcc._pw === formInputPswLo.value) {
    authBoxEl.remove()
    document.querySelector(".navbar").classList.add("open", "activated")
    body.prepend(overlay)
    document.querySelector(".user--nickname").innerHTML = currentAcc._nick
    document.querySelector(".user--img").src = currentAcc._image
  } else if (formInputPswLo.value === "") {
    return alert("Nessuna password inserita")
  } else {
    accessLogin--
    formInputPswLo.value = ""
    formInputPswLo.focus()
    alert("Password non corretta")
    if (accessLogin == 0) window.location.reload()
  }
})

///
//////
overlay.addEventListener("click", function (e) {
  e.currentTarget.remove()
  navbar.classList.remove("open")
})

document.addEventListener("keydown", function (e) {
  if (e.code === "Escape" && authBoxEl.classList.contains("show"))
    authBoxEl.classList.remove("show")
  //
  if (e.code === "Escape" && navbar.classList.contains("open")) {
    navbar.classList.remove("open")
    overlay.remove()
  }
})

//
// Request Data Country
// const request = function (alphaCountry) {
//   fetch(`https://restcountries.com/v3.1/alpha/${alphaCountry}`)
//     .then((response) => response.json())
//     .then((data) => {
//       const [obj] = data
//       console.log(obj)
//     })
// }
