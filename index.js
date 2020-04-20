class Select {
  /**
   * @param {object} param - param
   * @param {string} param.selector - root selector
   * @param {string} param.label - label
   * @param {string} param.url - utl date to select
   * @param {function} param.onSelect - function for on select
   */
  constructor(param) {
    this.rootElement = document.querySelector(param.selector)
    this.label = param.label
    this.countOpenSelect = 0;

    this.createElements()
    this.events()
  }

  createElements() {
    // create label
    let label = document.createElement('div')
    label.innerText = this.label
    label.classList.add('label')
    this.rootElement.append(label)

    // create select
    let select = document.createElement('div')
    select.classList.add('select')
    this.rootElement.append(select)

    //create arrow
    let arrow = document.createElement('div')
    arrow.classList.add('arrow')
    select.append(arrow)

    // create popup
    let popup = document.createElement('div')
    popup.classList.add('popup')
    this.rootElement.append(popup)

    // create loader
    let loader = document.createElement('div')
    loader.classList.add('option', 'loader')
    loader.innerText = '123'
    popup.append(loader)

    // save elements
    this.selectElement = select
    this.labelElement = label
    this.popupElement = popup
    this.arrowElement = arrow
  }

  events() {
    // click to label
    this.labelElement.onclick = () => {
      if (this.countOpenSelect === 0) {
        this.selectElement.click()
      }
    }
    // click to select
    this.selectElement.onclick = () => {
      if (this.countOpenSelect === 1) {
        this.closeSelect()
        return
      }
      this.openSelect()
    }
    // blur on select
    this.selectElement.onblur = () => {
      if (this.countOpenSelect === 1) {
        this.closeSelect()
      }
    }
  }

  openSelect() {
    this.countOpenSelect++
    this.labelElement.classList.add('topLabel')
    this.popupElement.classList.add('show')
    this.arrowElement.classList.add('top')
  }

  closeSelect() {
    this.countOpenSelect = 0
    this.labelElement.classList.remove('topLabel')
    this.popupElement.classList.remove('show')
    this.arrowElement.classList.remove('top')
  }
}

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  url: 'https://vladilen-dev.firebaseio.com/technologies.json',
  onSelect() {

  }
})

document.querySelector('#actions > li > button[data-type="open"]').onclick = function() {
  select.openSelect()
}

document.querySelector('#actions > li > button[data-type="close"]').onclick = function() {
  select.closeSelect()
}