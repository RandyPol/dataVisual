// document.addEventListener('DOMContentLoaded', function () {
//   const button = document.querySelector('#getMessage')

//   button.addEventListener('click', () => {
//     console.log("KLK")
//   })
// })

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('getMessage')

  button.onclick = function () {
    document.getElementsByClassName('message')[0].textContent =
      'Here is the message'

  }
})
