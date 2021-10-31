/// <reference types='cypress' />

describe('Random numbers', () => {
  beforeEach(() => {
    cy.visit('/random.html');

    cy.window().then((win) => {
      const randomQueue = [
        0.1750883340521796, 0.9007112009326497, 0.0019656171919002485,
        0.740324897488438, 0.555555555555555, 0.666666666666666,
      ];

      cy.stub(win.Math, 'random').callsFake(() => {
        const rnd = randomQueue.shift();
        randomQueue.push(rnd);
        return rnd;
      });
    });
  });

  it('Make sure they are there', () => {
    cy.get('#btn-generate').click();

    cy.contains('Random number 1: 0.1750883340521796').should('be.visible');
    cy.contains('Random number 2: 0.9007112009326497').should('be.visible');
  });
});
