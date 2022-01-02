// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('searchForAuthor', (author) => {
  Cypress.log();

  cy.get('select', { log: false }).select('inauthor', { log: false });
  cy.get('input', { log: false })
    .clear({ log: false })
    .type(author, { log: false });
  cy.contains('button', 'Search', { log: false }).click({ log: false });
});

Cypress.Commands.add(
  'checkSearchResultImage',
  { prevSubject: ['element', 'optional'] },
  (subject, title) => {
    const props = {
      title,
      subject,
    };

    Cypress.log({
      type: subject ? 'child' : 'parent',
      consoleProps: () => props,
    });

    return (
      subject
        ? cy.wrap(subject, { log: false })
        : cy.contains('.card-title', title, { log: false })
    )
      .parents('.card', { log: false })
      .find('.card-img', { log: false })
      .then((el) => {
        props.yielded = el.toArray();
        return el;
      })
      .should('be.visible')
      .should('have.attr', 'alt', title);
  }
);

Cypress.Commands.add('readFileOrDefault', (filePath, defaultValue) => {
  Cypress.log();

  return cy.task(
    'readFileOrDefault',
    {
      filePath,
      defaultValue,
    },
    { log: false }
  );
});
