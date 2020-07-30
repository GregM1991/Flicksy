/// <reference types="cypress" />

context('Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('can user log in', () => {
        cy.get('nav > div > :nth-child(2)').click()
        cy.get('[type="text"]').type("cypress@test.com")
        cy.get('[type="password"]').type("123456")
        cy.get('[type="submit"]').click()
        cy.contains('Log Out').click()
    })
})