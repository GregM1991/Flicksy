/// <reference types="cypress" />

//This test is to test if the user can login, create a profile, return homepage and views watchlist and favorite 
//list movies and deletes them and then delete the profile which also deletes the user.

context('Userflowtest3', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
function Login(){
    cy.get('nav > div > :nth-child(2)').click()
    cy.get('[type="text"]').type("cypress@test.com")
    cy.get('[type="password"]').type("123456")
    cy.get('[type="submit"]').click()
}

    it('user scenario 2', () => {
        Login()
        cy.wait(500)
        cy.get('nav > div > :nth-child(1)').click()
        cy.get('[type="text"]').type('Cypress Test')
        cy.get('[type="submit"]').click()
        cy.get('.playlists-wrapper > :nth-child(1)').click()
        cy.get(':nth-child(1) > .button').click()
        cy.get('.navbar > div > :nth-child(1)').click()
        cy.get('.playlists-wrapper > :nth-child(2)').click()
        cy.get(':nth-child(1) > .button').click()
        cy.get('.navbar > div > :nth-child(1)').click()
        cy.get('.profile-container > .button').click()
    })
})