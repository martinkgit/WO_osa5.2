Cypress.Commands.add('login', ({ username, password }) => {
  cy.visit('http://localhost:3000')
  cy.request('POST', 'http://localhost:3000/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
  })
})