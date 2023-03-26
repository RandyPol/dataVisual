// document.addEventListener('DOMContentLoaded', function () {
//   const button = document.querySelector('#getMessage')

//   button.addEventListener('click', () => {
//     console.log("KLK")
//   })
// })

// document.addEventListener('DOMContentLoaded', function () {
//   const button = document.getElementById('getMessage')

//   button.onclick = function () {
//     const req = new XMLHttpRequest()
//     req.open('GET', '/json/cats.json', true)
//     req.send()
//     req.onload = function () {
//       const json = JSON.parse(req.responseText)
//       document.getElementsByClassName('message')[0].innerHTML = JSON.stringify(json)
//     }
//   }
// })

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('getMessage')

  button.onclick = function () {
    fetch('/json/cats.json')
      .then((response) => response.json())
      .then((json) => {
        let html = ''
        json = json.filter((val) => val.id !== 1)
        json.forEach(function (val) {
          const keys = Object.keys(val)
          html += "<div class = 'cat'>"
          keys.forEach(function (key) {
            html += '<strong>' + key + '</strong>: ' + val[key] + '<br>'
            html +=
              "<img src = '" +
              val.imageLink +
              "' " +
              "alt='" +
              val.altText +
              "'>"
          })
          html += '</div><br>'
        })
        document.getElementsByClassName('message')[0].innerHTML = html
      })
  }
})
