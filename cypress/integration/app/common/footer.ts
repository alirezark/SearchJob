import { Customer } from '@/modules/core/data/types/Customer';

const baseUrl = Cypress.config().baseUrl;

describe('Common > Footer section', () => {
  /**
   * Visits the home page before any test.
   */
  before(() => {
    cy.visit('/en');
  });

  /**
   * Prepare aliases before each test. (they're destroyed at the end of each test)
   */
  beforeEach(() => {
    cy.prepareDOMAliases();
  });

  it('should have the Unly logos in the footer', () => {
    cy.get('#footer-logos-unly-brand').should('have.length', 1);
  });

  it('should have the customer logos in the footer', () => {
    cy.get('#footer-logos').should('have.length', 1);
  });

  it('should display the i18n button to change language', () => {
    cy.get<Customer>('@customer').then((customer: Customer) => {
      const availableLanguagesCount = 2;
      cy.log(`Available language(s): ${availableLanguagesCount}`);

      if (availableLanguagesCount > 1) {
        it('should have a button to change the language which changes the language upon click', () => {
          cy.get('#footer-btn-change-locale').should('have.length', 1).click({ force: true });
          cy.url().should('eq', `${baseUrl}/fr`);
        });
      } else {
        it('should not have a button to change the language', () => {
          cy.get('#footer-btn-change-locale').should('not.have.length', 1);
        });
      }
    });
  });

});

export {};
