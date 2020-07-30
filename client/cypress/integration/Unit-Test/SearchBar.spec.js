/// <reference types="cypress" />

context('SearchBar', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('can user search for movies', () => {
        cy.get('[type="text"]').type('harry potter')
        cy.get('[type="submit"]').click()
        cy.get('[href="/movie/671"] > div')
    })
})