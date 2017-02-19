$(document).ready(function () {
  getUsers()
  let userName = localStorage.getItem('Username')
  $('#nav-username').text('Username: ' + userName)
})

$('#login-form').on('submit', (e) => {
  e.preventDefault()
  let usernameVal = $('input[name=username]').val()
  let passwordVal = $('input[name=password]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/users/login',
    data: {username: usernameVal, password: passwordVal},
    success: function (resp) {
      if (resp.token) {
        localStorage.setItem('Username', usernameVal)
        window.location.assign('http://localhost:8080/home.html')
      }else {
        $('#error-message').text(resp.message)
      }
    },
    error: function (err) {
      console.log('LOGIN Request Error')
      window.location.assign('http://localhost:8080/index.html')
    }
  })
})

$('#register-form').on('submit', (e) => {
  e.preventDefault()
  let usernameVal = $('input[name=username_reg]').val()
  let passwordVal = $('input[name=password_reg]').val()
  let emailVal = $('input[name=email_reg]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/users/register',
    data: {username: usernameVal, password: passwordVal, email: emailVal},
    success: function (resp) {
      if (resp.message) {
        $('#error-message').text(resp.message)
      }else {
        window.location.assign('http://localhost:8080/index.html')
      }
    },
    error: function (err) {
      console.log('REGISTER Request Error')
      window.location.assign('http://localhost:8080/register.html')
    }
  })
})

$('#logout').click(function () {
  window.localStorage.clear()
  window.location.assign('http://localhost:8080/index.html')
})

function getUsers () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/auth/users',
    success: function (resp) {
      for (var i = 0; i < resp.length; i++) {
        let users = resp[i]
        $('#posts').append(
          `<tr>
            <td>${users.username}</td>
            <td>${users.email}</td>
          </tr>`
        )
      }
    },
    error: function () {
      console.log('GET Eventss Response Error')
    }
  })
}
