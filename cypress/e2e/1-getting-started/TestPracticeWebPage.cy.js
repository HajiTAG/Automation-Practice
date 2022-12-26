/// <reference types = "cypress" />

import DatePicker from "../../support/PageLibrary"
import '@4tw/cypress-drag-drop'

describe('Test Website', () => {
  before('Launch Website', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
  })

  it('Test New Window', () => {
    cy.get('#Wikipedia1_wikipedia-search-input').type('Hi')
    cy.get('.wikipedia-search-button').click()
    //cy.get('.wikipedia-search-results > div > a').eq(0).invoke('removeAttr', 'target').click()
    cy.get('.wikipedia-search-results > div > a').eq(0).should('have.attr', 'href').and('include', 'wiki')
      .then((href) => {
        cy.visit(href)
      })
    cy.origin('https://en.wikipedia.org', () => {
      //<commands targeting https://en.wikipedia.org go here>
      cy.get('.mw-page-title-main').should('contain', 'HI')
    })
    cy.go('back')
  })

  it('Test Alert OK', () => {
    cy.on('window:confirm', (alertTextOK) => {
      expect(alertTextOK).eq('Press a button!')
    })
    cy.get('#HTML9 > .widget-content > button').click()
    cy.get('.widget-content p#demo').invoke('text').then((alertOK) => {
      expect(alertOK).eq("You pressed OK!")
    })
  })

  it('Test Alert Cancel', () => {
    cy.on('window:confirm', (alertTextCancel) => {
      expect(alertTextCancel).eq('Press a button!')
      return false
    })
    cy.get('#HTML9 > .widget-content > button').click()
    cy.get('.widget-content p#demo').invoke('text').then((alertCancel) => {
      cy.log(alertCancel)
    })
  })

  it('Test Date Picker', function () {
    var datePicker = new DatePicker()

    datePicker.getDatePicker().click()
    datePicker.getCalendar().should('be.visible')

    cy.selectYear(2022)
    cy.selectMonth('October')
    cy.selectDay(15)
  })

  it('Test Dropdowns', () => {
    cy.get('select#speed').select('Fast')
    cy.get('select#files').select(2).should('contain.value', '3')
    cy.get('select#files').invoke('text').then((textValue) => {
      expect(textValue).contain("DOC file")
    })
    cy.get('select#number').select('5')
    cy.get('select#products').select('Apple').should('have.value', 'Apple')
    cy.get('select#animals').select('Baby Cat').should('have.value', 'babycat')
  })

  it('Test Lables', () => {
    //debugger
    cy.get('[style="font-family:Georgia, serif;"]').should('have.text', 'Message_12')
    cy.get('#Text1 .widget-content :nth-child(2)').should('have.text', 'Message-123')
    cy.contains('Message $ 1234').should('have.text', 'Message $ 1234')
    cy.contains('Message **** 12345').as('4thLabel').get('@4thLabel').should('have.text', 'Message **** 12345')
    cy.contains('123456').should('have.text', 'Message &&&123456')
    cy.contains('####').should('have.text', 'Message#### 1234567')
  })

  it('Test Lables', () => {
    cy.get('empinfo employee').each(($el, index, $list) => {
      var a = cy.log($el.text().split('\n')[2] + "'s employee ID is " + $el.text().split('\n')[1] + '. He is a ' + $el.text().split('\n')[3] + ' and his email ID is ' + $el.text().split('\n')[4])
    })
  })

  it('Test Sign up Form', () => {
    cy.get('#frame-one1434677811').then(function (iframe) {
      const iFrameContent = iframe.contents().find('body')
      cy.wrap(iFrameContent).find('#RESULT_TextField-1').type('Haji')
      cy.wrap(iFrameContent).find('#RESULT_TextField-2').type('TAG')
      cy.wrap(iFrameContent).find('#RESULT_TextField-3').type('000')
      cy.wrap(iFrameContent).find('#RESULT_TextField-4').type('AU')
      cy.wrap(iFrameContent).find('#RESULT_TextField-5').type('SYD')
      cy.wrap(iFrameContent).find('#RESULT_TextField-6').type('Haji@TAG.com')
      cy.wrap(iFrameContent).find('#RESULT_RadioButton-7_0').check({ force: true })
      cy.wrap(iFrameContent).find('#RESULT_CheckBox-8_1').siblings('label').should('contain', 'Monday')
      cy.wrap(iFrameContent).find('#RESULT_CheckBox-8_1').check({ force: true })
      cy.wrap(iFrameContent).find('#RESULT_CheckBox-8_2').check({ force: true })
      cy.wrap(iFrameContent).find('#RESULT_CheckBox-8_3').check({ force: true })
      cy.wrap(iFrameContent).find('#RESULT_RadioButton-9').should('contain', 'Morning').select('Morning')
      cy.wrap(iFrameContent).find('#RESULT_FileUpload-10').selectFile('cypress\\e2e\\1-getting-started\\RandomTest.cy.js')
    })
  })

  it('Test Duble Click', () => {
    const textToCopy = "Copy this text"
    cy.get('#field1').clear().type(textToCopy)
    cy.contains('Copy Text').dblclick()
    cy.get('#field2').should('have.value', textToCopy)
  })

  it('Test Drag and Drop', () => {
    cy.get("#draggable")
      .trigger("mousedown", { which: 1 })

    cy.get("#droppable")
      .trigger("mousemove")
      .trigger("mouseup", { force: true })
  })

  it('Test Drag and Drop Images', () => {
    cy.get(".gallery .ui-widget-header").each(($el, index, $list) => {
      cy.wrap($el).trigger("mousedown", { which: 1 })
      cy.get("#trash")
        .trigger("mousemove")
        .trigger("mouseup", { force: true })
    })
    cy.wait(1500)
    cy.get('[alt="The chalet at the Green mountain lake"]').trigger("mousedown", { which: 1 })
    cy.get("#gallery").trigger("mousemove").trigger("mouseup", { force: true })
    cy.get('#trash').click()
    cy.get('[alt="the peaks of high tatras"]').trigger("mousedown", { which: 1 })
    cy.get("#gallery").trigger("mousemove").trigger("mouseup", { force: true })
  })

  it('Test Slider', () => {
    const existingValue = "left: 0%;"
    const newValue = "left: 50%;"
    cy.get("#slider").children('span')
      .should('have.attr', 'style', existingValue)
      .invoke('attr', 'style', newValue)
      .should('have.attr', 'style', newValue)
  })

  it('Test Resizing element', () => {
    const newStyle = "height: 300px; width: 300px;"
    cy.get("#resizable")
      .invoke('attr', 'style', newStyle)
      .should('have.attr', 'style', newStyle)
  })

  it('Test HTML Table', () => {
    cy.get('[name="BookTable"]').find('tr').each(($row, index, $list) => {
      cy.wrap($row.children()).each(($cell) => {
        cy.wrap($cell).log($cell.text())
      })
    })
  })

  it('Test Tooltip', () => {
    cy.get('#age').invoke('mouseover')
    cy.get('.ui-tooltip').should('contain', 'We ask for your age only for statistical purposes.')
  })

  it('Test Bar/QR Codes', () => {

    // readCode is Custom commad - see commands.js
    cy.get('img[src*="barcode.gif"]')
    .readCode()
    .should('have.property', 'text', 'ABC-abc-123');

    cy.get('img[src*="barcode2.gif"]')
    .readCode()
    .should('have.property', 'text', 'Hi this is Pavan');
    
    cy.get('img[src*="qrcode.png"]')
    .readCode()
    .should('have.property', 'text', 'Welcome to Selenium');
  })

})//describe
