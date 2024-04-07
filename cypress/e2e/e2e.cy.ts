describe('e2e', () => {
  it('should render the main layout, and home page with 100 podcasts', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Podcaster');
    cy.get('[data-testid^="podcast-"]', { timeout: 20000 }).should('have.length', 100);
    cy.contains('100');
  });
  it('should show just 1 result on search by title "THE JOE BUDDEN PODCAST"', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[type="text"]').type('THE JOE BUDDEN PODCAST');
    cy.get('[data-testid^="podcast-"]', { timeout: 20000 }).should('have.length', 1);
    cy.contains('1');
  });
  it('should show just 3 result on search by author "NPR"', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[type="text"]').type('NPR');
    cy.get('[data-testid^="podcast-"]', { timeout: 20000 }).should('have.length', 3); // WARNING: sometimes the api return 3, and sometimes 4
    cy.contains('3');
  });
  it('should enter in a sigle podcast and show his description "ALL SONGS CONSIDERED"', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[type="text"]').type('ALL SONGS CONSIDERED');
    cy.get('[data-testid^="podcast-"]', { timeout: 20000 }).should('have.length', 1);
    cy.get('[data-testid^="podcast-"]').click();

    // find the description
    cy.get(
      "Since launching in 2000, All Songs Considered has been NPR's flagship program for music discovery, artist interviews and conversations with friends and fellow music lovers about the really big questions, like what was the best decade for music, are there albums everyone can agree on, and what do you put on when you need a good cry? Weekly, with host Robin Hilton and the NPR Music family",
      { timeout: 60000 }
    );

    // i will cut the test here bcs the service is too slowly
  });
});
