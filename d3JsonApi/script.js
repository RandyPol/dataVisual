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

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('sendMessage').onclick = function () {
    const userName = document.getElementById('name').value
    const url = 'https://jsonplaceholder.typicode.com/posts'
    // Add your code below this line
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 201) {
        const serverResponse = JSON.parse(xhr.response)
        document.getElementsByClassName('message')[0].textContent =
          serverResponse.userName + serverResponse.suffix
      }
    }
    const body = JSON.stringify({ userName: userName, suffix: ' loves cats!' })
    xhr.send(body)
    // Add your code above this line
  }
})
