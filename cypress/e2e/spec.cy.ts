describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it('passes', () => {
    cy.contains('Réservations').click();
    cy.contains('Dix petits nègres').click();
    cy.url().should('contain', 'book/');
  })
})
