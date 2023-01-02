/// <reference types="cypress" />

describe("toMatchImageSnapshot", () => {
  it("element", () => {
    cy.visit("/static/stub.html").then(() => {
      cy.get("[data-test=test]").toMatchImageSnapshot({
        threshold: 0.1
      })
    })
  })

  it("clipped element", () => {
    cy.visit("/static/stub2.html").then(() => {
      cy.get("[data-test=test]").toMatchImageSnapshot({
        threshold: 0.1,
        clip: {
          x: 0,
          y: 0,
          width: 100,
          height: 100
        }
      })
    })
  })

  it("whole page", () => {
    cy.visit("/static/stub.html").then(() => {
      cy.document().toMatchImageSnapshot({
        threshold: 0.1
      })
    })
  })

  it("no base snapshot", () => {
    cy.visit("/static/stub.html").then(() => {
      cy.document().toMatchImageSnapshot({
        threshold: 0.1
      })
    })
  })

  it("with custom name", () => {
    cy.visit("/static/stub.html").then(() => {
      cy.get("[data-test=test]").toMatchImageSnapshot({
        threshold: 0.1,
        name: "screenshot with custom name"
      })
    })
  })

  it("multiple in one test", () => {
    cy.visit("/static/stub.html").then(() => {
      cy.get("[data-test=test]").toMatchImageSnapshot({
        threshold: 0.1
      })

      cy.get("[data-test=test2]").toMatchImageSnapshot({
        threshold: 0.1
      })
    })
  })

  it("clipped element", () => {
    cy.visit("/static/stub2.html").then(() => {
      cy.wait(1000) // seems a bug with webfonts that requires this
      cy.get("[data-test=test]").toMatchImageSnapshot({
        threshold: 0.1,
        clip: { x: 0, y: 0, width: 100, height: 100 }
      })
    })
  })

  it("whole page", () => {
    cy.visit("/static/stub.html").then(() => {
      cy.wait(1000) // seems a bug with webfonts that requires this
      cy.document().toMatchImageSnapshot({
        threshold: 0.1
      })
    })
  })

  it("no base snapshot", () => {
    cy.visit("/static/stub.html").then(() => {
      cy.wait(1000) // seems a bug with webfonts that requires this
      cy.document().toMatchImageSnapshot({
        threshold: 0.1
      })
    })
  })

  it("with custom name", () => {
    cy.visit("/static/stub.html").then(() => {
      cy.wait(1000) // seems a bug with webfonts that requires this
      cy.get("[data-test=test]").toMatchImageSnapshot({
        threshold: 0.1,
        name: "screenshot with custom name"
      })
    })
  })

  it("failOnSnapshotDiff", () => {
    cy.visit("/static/stub3.html").then(win => {
      var html = Cypress.$(`<div style="background-color:${"#" + (((1 << 24) * Math.random()) | 0).toString(16)}">
          ${Date.now()}<br>${Date.now()}<br>${Date.now()}<br>
        </div>`)

      Cypress.$(win.document.body).html(html)

      cy.get("div").toMatchImageSnapshot({
        failOnSnapshotDiff: false,
        thresholdType: "pixel",
        threshold: 0
      })
    })
  })
})
