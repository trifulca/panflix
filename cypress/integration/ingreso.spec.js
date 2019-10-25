/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit("http://localhost:3000/");
});

it("Puede ingresar a la pantalla principal", () => {
  cy.get("#clave-panflix").type("123{enter}");
  cy.url().should("include", "videos");
});

it("No puede ingresar sin login", () => {
  cy.visit("http://localhost:3000/videos");
  cy.contains("No estás autorizado");
});
