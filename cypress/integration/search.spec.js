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

  it('intercept and use the response', () => {
    cy.intercept('/books/v1/volumes?*').as('book-search');

    cy.get('select').select('inauthor');
    cy.get('input').type('Douglas Adams{enter}');

    cy.wait('@book-search').then((xhr) => {
      const books = xhr.response.body.items;

      books.forEach((book, index) => {
        cy.get('.card')
          .eq(index)
          .within(() => {
            cy.get('.card-title').should('have.text', book.volumeInfo.title);
            cy.get('.card-author').should(
              'have.text',
              book.volumeInfo.authors.join(', ')
            );
          });
      });
    });
  });

  [
    {
      name: 'Douglas Adams',
      books: [
        "The Hitchhiker's Guide to the Galaxy: The Illustrated Edition",
        'So Long, and Thanks for All the Fish',
      ],
    },
    // {
    //   name: 'James S. A. Corey',
    //   books: ['The Expanse', 'Leviathan Falls'],
    // },
  ].forEach((author) => {
    author.books.forEach((book) => {
      it(`Search for "${book}" by "${author.name}"`, () => {
        cy.searchForAuthor(author.name);

        cy.contains('.card-title', book)
          .should('be.visible')
          .checkSearchResultImage(book);
      });
    });
  });
});
