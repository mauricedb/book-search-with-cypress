/// <reference types='cypress' />

describe('Search using Cypress Testing Library', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('For books by Douglas Adams', () => {
    cy.findByRole('textbox', { name: 'Query' }).type('Douglas Adams');
    cy.findByRole('combobox', { name: 'Search where' }).select('inauthor');
    cy.findByRole('button', { name: 'Search' }).click();

    cy.findByRole('heading', {
      name: "The Hitchhiker's Guide to the Galaxy",
    }).should('be.visible');
  });
});
