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
    this.init()
    this.events()
  }

  /**
   * init select
   */
  init() {
    // create label
    let label = document.createElement('div')
    label.innerText = this.label
    label.classList.add('label')

    this.rootElement.append(label)
    this.labelElement = label



    // create select
    let select = document.createElement('div')
    select.classList.add('select')
    this.rootElement.append(select)
    this.selectElement = select

    this.countOpenSelect = 0;
    select.onclick = () => {
      if (this.countOpenSelect === 1) {
        this.closeSelect()
        return
      }

      this.openSelect()
    }
    select.onblur = () => {
      if (this.countOpenSelect === 1) {
        this.closeSelect()
      }
    }
  }

  events() {
    this.labelElement.onclick = () => {
      if (this.countOpenSelect === 0) {
        this.selectElement.click()
      }
    }
  }

  openSelect() {
    this.countOpenSelect++
    this.labelElement.classList.add('topLabel')
  }

  closeSelect() {
    this.countOpenSelect = 0
    this.labelElement.classList.remove('topLabel')
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