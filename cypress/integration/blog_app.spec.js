
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Martin Kakko',
      username: 'martik',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  it.only('login succeeds with right password', function() {
    cy.get('#username').type('MartinK')
    cy.get('#password').type('verysecret')
    cy.get('#login-button').click()
  })

  it.only('login fails with wrong password', function() {
    cy.get('#username').type('MartinK')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('wrong credentials')
  })



})

describe('When logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'martik', password: 'salainen' })
    cy.get('#username').type('martik')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  })

  it.only('a new blog can be created', function() {
    cy.get('#opencreatebutton').click()
    cy.get('#title-field').type('Tested blog')
    cy.get('#author-field').type('Tester')
    cy.get('#url-field').type('123exampleurl')
    cy.get('#create-button').click()

    cy.contains('Tested blog by Tester')
  })

  it.only('blog can be liked', function(){
    cy.contains('likes: 0')
    cy.contains('Like').click()
    cy.contains('likes: 1')
  })

  it.only('blog can be deleted', function(){
    cy.contains('Delete').click()
    cy.contains('Tested blog by Tester was deleted')
  })
})
