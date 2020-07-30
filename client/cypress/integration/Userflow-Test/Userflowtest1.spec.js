/// <reference types="cypress" />

//This test is to test if the user can login, create a profile, return homepage and view a movie and logout.

context('Userflowtest1', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
function Login(){
    cy.get('nav > div > :nth-child(2)').click()
    cy.get('[type="text"]').type("cypress@test.com")
    cy.get('[type="password"]').type("123456")
    cy.get('[type="submit"]').click()
}

    it('user scenario 1', () => {
        Login()
        cy.wait(500)
        cy.get('nav > div > :nth-child(1)').click()
        cy.get('[type="text"]').type('Cypress Test')
        cy.get('[type="submit"]').click()
        cy.get('h1 > a').click()
        cy.get('[type="text"]').type('the lord of the rings')
        cy.get('[type="submit"]').click()
        cy.get('[href="/movie/121"] > div').click()
        cy.get('nav > div > :nth-child(2)').click()
    })
})