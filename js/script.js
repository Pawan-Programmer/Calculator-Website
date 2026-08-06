console.log("JavaScript Connected Successfully!");
const display = document.getElementById("display");

console.log(display); /*here, consule is used to verify that given selector is selecting right element in console Area of Webpage */

const buttons = document.querySelectorAll(".btn");/*Select all buttons and make nodelist in which these buttons will be stored */
console.log(buttons);

const firstButton = document.querySelector(".btn");/*Select particular class in which JS will work */

firstButton.addEventListener("click", function () {
    console.log("Button Clicked!");
}); /*EventListener is used to see what events is occur in browser and set function which will run after event execution */ 

buttons.forEach(function(button) { /*this will work when page will load in browser*/
    button.addEventListener("click", function() { /*Observe Clicked Button*/
        display.textContent = button.textContent;/*It means show button-text in the display-text area*/
    });
});