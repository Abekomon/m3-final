describe('Dashboard flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'urls.json'}).as('pageLoad')
    cy.visit('http://localhost:3000/')
    cy.wait('@pageLoad')
  })
  
  it('Should display a logo on page load', () => {
    cy.get('h1').contains('URL Shortener')
  })

  it('Should display existing shortened URLs on page load', () => {
    cy.get('.url').should('have.length', 2)
    cy.get('.url').should('be.visible')
    cy.get('.url:nth-child(1)').contains('Awesome photo')
    cy.get('.url:nth-child(1)').contains('http://localhost:3001/useshorturl/1')
    cy.get('.url:nth-child(1)').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('Should display a form on page load', () => {
    cy.get('form').should('be.visible')
    cy.get('input[name="title"]').should('be.visible')
    cy.get('input[name="urlToShorten"]').should('be.visible')
    cy.get('button').contains('Shorten Please!')
  })

  it('Should populate the correct fields when typing in the form', () => {
    cy.get('input[name="title"]').type('Hello World!').should('have.value', 'Hello World!')
    cy.get('input[name="urlToShorten"]').type('Hello World!').should('have.value', 'Hello World!')
  })

  it('Shouldn\'t allow a user to post a url without filling out both fields', () => {
    cy.get('input[name="title"]').type('Hello World!').should('have.value', 'Hello World!')
    cy.get('button').click()
    .get('.url').should('have.length', 2)
  })

  it('Should allow a user to add a url to the page when submitting the form', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {fixture: 'post.json'})
    cy.get('input[name="title"]').type('Hello World!')
    .get('input[name="urlToShorten"]').type('https://google.com')
    .get('button').click()
    cy.get('.url').should('have.length', 3)
    cy.get('.url:nth-child(3)').contains('Hello World!')
    cy.get('.url:nth-child(3)').contains('http://localhost:3001/useshorturl/3')
    cy.get('.url:nth-child(3)').contains('https://google.com')
  })
})