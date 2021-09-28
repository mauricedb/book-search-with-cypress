/// <reference types='cypress' />

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('For books by Douglas Adams', () => {
    cy.get('select').select('inauthor');
    cy.get('input').type('Douglas Adams{enter}');

    cy.contains('.card-title', "The Hitchhiker's Guide to the Galaxy").should(
      'be.visible'
    );
  });

  it('intercept with a StringMatcher', () => {
    cy.intercept('/books/v1/volumes?*').as('book-search');

    cy.get('select').select('inauthor');
    cy.get('input').type('Douglas Adams{enter}');

    cy.contains('.card-title', "The Hitchhiker's Guide to the Galaxy").should(
      'be.visible'
    );
  });

  it('intercept with a RouteMatcher', () => {
    cy.intercept({ pathname: '/books/v1/volumes', method: 'get' }).as(
      'book-search'
    );

    cy.get('select').select('inauthor');
    cy.get('input').type('Douglas Adams{enter}');

    cy.contains('.card-title', "The Hitchhiker's Guide to the Galaxy").should(
      'be.visible'
    );
  });

  it('wait for fetch()', () => {
    cy.intercept('/books/v1/volumes?*').as('book-search');

    cy.get('select').select('inauthor');
    cy.get('input').type('Douglas Adams{enter}');

    cy.wait('@book-search', { timeout: 2000 });

    cy.contains('.card-title', "The Hitchhiker's Guide to the Galaxy").should(
      'be.visible'
    );
  });

  it('intercept and fake the response', () => {
    cy.intercept('/books/v1/volumes?*', { fixture: 'douglas-adams.json' }).as(
      'book-search'
    );

    cy.get('select').select('inauthor');
    cy.get('input').type('Douglas Adams{enter}');

    cy.contains('.card-title', 'Book two').should('be.visible');
  });
});
