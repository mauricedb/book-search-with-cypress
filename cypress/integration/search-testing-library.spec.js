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
      name: "The Hitchhiker's Guide to the Galaxy: The Illustrated Edition",
    }).should('be.visible');
  });

  it('For The Hitchhikers Guide to the Galaxy', () => {
    cy.findByRole('textbox', { name: 'Query' }).type(
      'The Hitchhikers Guide to the Galaxy{enter}'
    );

    const name = 'The Salmon of Doubt';
    cy.findByRole('article', { name })
      .findByRole('heading', { name })
      .should('be.visible');
    cy.findByRole('article', { name })
      .findByRole('img', { name })
      .should('be.visible');
  });
});
