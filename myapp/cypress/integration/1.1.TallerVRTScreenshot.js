describe('VRT Screenshot', function() {
    it('Visit and take a screenshot', function() {
        cy.visit('https://jmartipu.github.io/palette.html');
        cy.wait(3000)
        let now = new Date();
        cy.get('button[id="generar"]').click();
        cy.wait(3000)
        let nombre1 = "Antes";
        cy.screenshot(nombre1);
      	cy.get('button[id="generar"]').click();
      	cy.wait(3000)
      	let nombre2 = "Despues";
		cy.screenshot(nombre2);
		cy.wait(1000)
    })
});

function getDate(fecha){
    let now = fecha;
    let date = now.toLocaleDateString().substr(5,4)
        + now.toLocaleDateString().substr(3,2).replace("/", "")
        + now.toLocaleDateString().substr(0,2)
        + "_" + now.toLocaleTimeString();
    return date;
}

