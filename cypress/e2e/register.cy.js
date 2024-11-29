import { errorMessages } from "../../components/Register"

describe('Register Page', () => {
  describe('Error Messages', () => {
    it('name input throws error for 2 chars', () => {
      //Arrange
      cy.visit("http://localhost:5173/")

      cy.get("[data-cy=ad-input]").type("em")

      //assert
      cy.contains(errorMessages.ad)
    })

    it('Surname input throws error for 2 chars', () => {
      //Arrange
      cy.visit("http://localhost:5173/")

      cy.get("[data-cy=soyad-input]").type("şa")

      //assert
      cy.contains(errorMessages.soyad);
    })
    it('Email input throws error for 2 chars', () => {
      //Arrange
      cy.visit("http://localhost:5173/")

      cy.get("[data-cy=email-input]").type("sasas")

      //assert
      cy.contains(errorMessages.email);
    })
    it("Password input throws error for 1234", () => {
      //Arrange
      cy.visit("http://localhost:5173/");
      //Act
      cy.get("[data-cy=password-input]").type("1234");
      //assert
      cy.contains(errorMessages.password)
    });
    it("button is disabled for unvalidated inputs", () => {
      //Arrange
      cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="password-input"]').type("1234");
      //assert
      cy.get("[data-cy=submit-button]").should("be.disabled")
    });
  })
  describe('Form inputs validated', () => {
    it("button enabled for validated inputs", () => {
      //Arrange
      cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="ad-input"]').type("İlayda");
      cy.get('[data-cy="soyad-input"]').type("Pasli");
      cy.get('[data-cy="email-input"]').type("ilayda@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("SuperStar12!");

      //assert
      cy.get('[data-cy="submit-button"]').should('not.be.disabled');
    });
    it("submits form on validated inputs", () => {
      //Arrange
      cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="ad-input"]').type("İlayda");
      cy.get('[data-cy="soyad-input"]').type("Pasli");
      cy.get('[data-cy="email-input"]').type("ilayda@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("SuperStar12!");

      //assert
      cy.get('[data-cy="submit-button"]').click()

      cy.get('[data-cy="response-message"]').should("be.visible")
    });
    
  });
  
})