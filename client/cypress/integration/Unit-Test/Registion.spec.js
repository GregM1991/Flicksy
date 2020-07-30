/// <reference types="cypress" />

context('Registion', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('can user create account', () => {
        cy.get('nav > div > :nth-child(1)').click()
        cy.get('[type="text"]').type("cypress@test.com")
        cy.get('[placeholder="Password"]').type("123456")
        cy.get('[placeholder="Confirm Password"]').type("123456")
        cy.get('[type="submit"]').click()
    })
  })