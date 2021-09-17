/// <reference types="cypress" />

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('For books by Douglas Adams', () => {
    cy.get('select').select('inauthor');
    cy.get('input').type('Douglas Adams{enter}');
    
    cy.contains('.card-title', "The Hitchhiker's Guide to the Galaxy").should('be.visible');
  });
});
