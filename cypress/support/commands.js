// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import DatePicker from "./PageLibrary"
import MonthConvert from "./DateUtils"
import { BrowserMultiFormatReader } from '@zxing/browser';


var datePicker = new DatePicker();
var monthConverter = new MonthConvert();
const reader = new BrowserMultiFormatReader();



Cypress.Commands.add('selectYear', (yearName) => {

    const currentYear = new Date().getFullYear()
   
    datePicker.getCalendarYear().then(($year) => {

        if ($year.text()==yearName){
            cy.log(yearName + ' year is selected');
            return
        }
        else {
            if ($year.text()>yearName){
            datePicker.getNavigationBack().click()
            }
            else if ($year.text()<yearName){
                datePicker.getNavigationForward().click()
            }
        }
        cy.selectYear(yearName)
    })
    
})

Cypress.Commands.add('selectMonth', (monthName) => { 

    let currentMonthNumber = new Date().getMonth()+1 
    let monthNumber = monthConverter.getMonthNumberFromName(monthName) 
   
    datePicker.getCalendarMonth().then(($month) => { 
        debugger;
        
        if ($month.text().includes(monthName)){ 
            cy.log(monthName + ' month is selected');
            return
        }
        else {     
            debugger;                                         
            if (monthNumber>currentMonthNumber){                   
            datePicker.getNavigationForward().click()
            }
            else if (monthNumber<currentMonthNumber){      
                debugger;        
                datePicker.getNavigationBack().click()
            }
        }
        cy.selectMonth(monthName)
    })
    
})

Cypress.Commands.add('selectDay', (dayName) => {
    datePicker.getCalendarDay().eq(dayName-1).click()
    cy.log(dayName + " day is selected")

})

Cypress.Commands.add('readCode', { prevSubject: true }, (subject) => {
  const img = subject[0];
  const image = new Image();
  image.width = img.width;
  image.height = img.height;
  image.src = img.src;
  image.crossOrigin = 'Anonymous';
  return reader.decodeFromImageElement(image);
});