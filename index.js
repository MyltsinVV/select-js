const data = {
  'aa': { label: 'JavaScript1' },
  'ff': { label: 'JavaScript2' },
  'bb': { label: 'JavaScript3' },
  'gg': { label: 'JavaScript4' },
  'tt': { label: 'JavaScript5' },
  'ss': { label: 'JavaScript6' },
  'qq': { label: 'JavaScript7' },
  'cc': { label: 'JavaScript8' },
}

class Select {
  /**
   * @param {object} param - param
   * @param {string} param.selector - root selector
   * @param {string} param.label - label
   * @param {function} param.onSelect - function for on select
   * @param {object[]} param.data - data
   */
  constructor(param) {
    this.rootElement = document.querySelector(param.selector)
    this.label = param.label
    this.data = param.data

    this.createElements()
    this.events()
    this.loadData()
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

    // save elements
    this.selectElement = select
    this.labelElement = label
    this.popupElement = popup
  }

  events() {
    // click to label
    this.labelElement.onclick = (event) => {
      if (!this.isOpen()) {
        event.stopPropagation()
        this.open()
      }
    }
    // click to select
    this.selectElement.onclick = (event) => {
      event.stopPropagation()
      if (!this.isOpen()) {
        this.open()
      } else {
        this.close()
      }
    }
    document.body.onclick = () => {
      if (this.isOpen()) {
        this.close()
      }
    }
  }

  isOpen() {
    return this.rootElement.classList.contains('open')
  }

  open() {
    this.rootElement.classList.add('open')
    this.rootElement.classList.remove('close')
  }

  close() {
    this.rootElement.classList.remove('open')
    this.rootElement.classList.add('close')
  }

  loadData() {
    for (let dataKey in this.data) {
      if (this.data.hasOwnProperty(dataKey)) {
        let option = document.createElement('div')
        option.classList.add('option')
        option.innerText = this.data[dataKey].label
        option.setAttribute('id', dataKey)
        option.onclick = (ev) => {
          let element = ev.target
          this.select(element.getAttribute('id'))
        }
        this.popupElement.append(option)
      }
    }
  }

  select(id) {
    console.log(id)
    console.log(this.data[id]);
  }
}

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  data,
  onSelect() {

  }
})

document.querySelector('#actions > li > button[data-type="open"]').onclick = function(event) {
  event.stopPropagation()
  select.open()
}

document.querySelector('#actions > li > button[data-type="close"]').onclick = function(event) {
  event.stopPropagation()
  select.close()
}