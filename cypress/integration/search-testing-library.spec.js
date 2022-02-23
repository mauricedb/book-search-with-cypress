/// <reference types='cypress' />

describe('Search using Cypress Testing Library', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it.only('For books by Douglas Adams', () => {
    cy.findByRole('textbox', { name: 'Query' }).type('Douglas Adams');
    cy.findByRole('combobox', { name: 'Search where' }).select('inauthor');
    cy.findByRole('button', { name: 'Search' }).click();

    cy.findByRole('heading', {
      name: "The Hitchhiker's Guide to the Galaxy: The Illustrated Edition",
    }).should('be.visible');

    cy.findByRole('button', {
      name: "The Hitchhiker's Guide to the Galaxy: The Illustrated Edition",
    }).should('not.exist');
  });

  describe('For The Hitchhikers Guide to the Galaxy', () => {
    beforeEach(() => {
      cy.findByRole('textbox', { name: 'Query' }).type(
        'The Hitchhikers Guide to the Galaxy{enter}'
      );
    });

    it('For The Hitchhikers Guide to the Galaxy', () => {
      const name = 'The Salmon of Doubt';
      cy.findByRole('article', { name })
        .findByRole('heading', { name })
        .should('be.visible');
      cy.findByRole('article', { name })
        .findByRole('img', { name })
        .should('be.visible');
    });

    it('For The Hitchhikers Guide to the Galaxy using as(@alias)', () => {
      const name = 'The Salmon of Doubt';
      cy.findByRole('article', { name }).as('book');
      cy.get('@book').findByRole('heading', { name }).should('be.visible');
      cy.get('@book').findByRole('img', { name }).should('be.visible');
    });

    it('For The Hitchhikers Guide to the Galaxy using within()', () => {
      const name = 'The Salmon of Doubt';
      cy.findByRole('article', { name }).within(() => {
        cy.findByRole('heading', { name }).should('be.visible');
        cy.findByRole('img', { name }).should('be.visible');
      });
    });
  });
});
