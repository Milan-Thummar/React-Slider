/// <reference types="cypress" />

describe("Slider Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display the loading spinner initially", () => {
    cy.get(".spinner-container").should("be.visible");
  });

  it("should display the slider with products after loading", () => {
    cy.get(".spinner-container").should("not.exist");
    cy.get(".slider").should("be.visible");
    cy.get(".slider__slides img").should("have.length", 5);
  });

  it("should display the first product initially", () => {
    cy.get(".slider__slides img")
      .first()
      .should("have.css", "display", "block");
  });

  it("should change slides automatically every 3 seconds", () => {
    cy.wait(3000);
    cy.get(".slider__slides img").eq(1).should("have.css", "display", "block");
    cy.wait(3000);
    cy.get(".slider__slides img").eq(2).should("have.css", "display", "block");
  });

  it("should change slides when next button is clicked", () => {
    cy.get(".next").click();
    cy.get(".slider__slides img").eq(1).should("have.css", "display", "block");
  });

  it("should change slides when prev button is clicked", () => {
    cy.get(".prev").click();
    cy.get(".slider__slides img").last().should("have.css", "display", "block");
  });

  it("should show the correct slide content", () => {
    cy.get(".slide__content").within(() => {
      cy.get("h1").should("contain", "iPhone 9");
      cy.get("p").should(
        "contain",
        "An apple mobile which is nothing like apple"
      );
    });
  });

  it("should change content on next button click", () => {
    cy.get(".next").click();
    cy.get(".slide__content").within(() => {
      cy.get("h1").should("contain", "iPhone X");
      cy.get("p").should(
        "contain",
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ..."
      );
    });
  });
});
