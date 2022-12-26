/// <reference types="cypress" />

class DatePicker{

    getDatePicker(){
        return cy.get('input#datepicker')
    }

    getCalendar(){
        return cy.get('div#ui-datepicker-div')
    }

    getNavigationBack(){
        return cy.get('a.ui-datepicker-prev')
    }

    getNavigationForward(){
        return cy.get('a.ui-datepicker-next')
    }

    getCalendarDay(){
        return cy.get('table.ui-datepicker-calendar a.ui-state-default')
    }

    getCalendarMonth(){
        return cy.get('div.ui-datepicker-title span:nth-child(1)')
    }

    getCalendarYear(){
        return cy.get('div.ui-datepicker-title span:nth-child(2)')
    }
}
export default DatePicker;