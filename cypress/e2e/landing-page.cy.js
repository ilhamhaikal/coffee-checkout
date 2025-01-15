/// <reference types="cypress" />

describe('Kopi Kuning Landing Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })

  it('should display main sections', () => {
    // Hero section
    cy.get('.hero').within(() => {
      cy.contains('Kenikmatan Kopi Kuning').should('be.visible')
    })

    // Introduction section
    cy.get('.intro-section').scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.contains('Kopi Kuning Arabica').should('be.visible')
      })

    // Product section
    cy.get('.product-section').scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.get('.feature-item').should('have.length', 4)
      })

    // Review section
    cy.get('.review-section').scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.get('.review-card').should('have.length', 5)
      })

    // Closing section
    cy.get('.closing-section').scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.get('.buy-button').should('be.visible')
      })
  })

  it('should handle order process', () => {
    // Open order form
    cy.contains('button', 'Beli Sekarang').click()
    
    // Fill order form
    cy.get('form').within(() => {
      cy.get('select').first().select('Wine')
      cy.get('select').eq(1).select('250')
      cy.get('input[type="number"]').type('1')
      cy.get('input[type="text"]').type('Test User')
      cy.get('input[type="tel"]').type('081234567890')
      cy.get('textarea').first().type('Test Address 123')
      cy.contains('button', 'Pesan Sekarang').click()
    })

    // Verify modal
    cy.get('.modal-content').should('be.visible')
  })

  it('should show WhatsApp button', () => {
    cy.get('.whatsapp-float')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'wa.me')
  })
})