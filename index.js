const data = [
  { id: 1, label: 'JavaScript1' },
  { id: 2, label: 'JavaScript2' },
  { id: 3, label: 'JavaScript3' },
  { id: 4, label: 'JavaScript4' },
  { id: 5, label: 'JavaScript5' },
  { id: 6, label: 'JavaScript6' },
  { id: 7, label: 'JavaScript7' }
]

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
    this.onSelect = param.onSelect
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

    // create selected
    let selected = document.createElement('div')
    selected.classList.add('selected')
    this.rootElement.append(selected)

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
    this.selectedElement = selected
  }

  events() {
    this.selectedElement.onclick = (event) => {
      if (!this.isOpen()) {
        event.stopPropagation()
        this.open()
      }
    }
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
    let index = 0
    for (let item of this.data) {
      let option = document.createElement('div')
      option.classList.add('option')
      option.innerText = item.label
      option.setAttribute('id', index.toString())
      option.onclick = (ev) => {
        this.selectedOptionElement && this.selectedOptionElement.classList.remove('selectedOption')
        let element = ev.target
        this.select(element.getAttribute('id'))
        element.classList.add('selectedOption')
        this.selectedOptionElement = element
      }
      this.popupElement.append(option)
      index++
    }
  }

  select(index) {
    const label = this.data[index].label

    this.rootElement.classList.add('select')
    this.selectedElement.innerText = label
    this.selectedElement.setAttribute('index', index.toString())

    this.onSelect && this.onSelect(label)
  }

  getSelected() {
    let index = this.selectedElement.getAttribute('index')
    if (index) {
      alert(JSON.stringify(this.data[index]))
    }
  }

  clear() {
    this.rootElement.classList.remove('select')
    this.selectedElement.innerText = ''
    this.selectedElement.removeAttribute('index')
    this.selectedOptionElement && this.selectedOptionElement.classList.remove('selectedOption')

    this.onSelect && this.onSelect('')
  }

  destroy() {
    this.rootElement.remove()
  }
}

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  data,
  onSelect(label) {
    let log = document.querySelector('#log')

    if (label) {
      log.innerText = `Выбранный элемент: ${label}`
    } else {
      log.innerText = ''
    }
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

document.querySelector('#actions > li > button[data-type="set"]').onclick = function(event) {
  event.stopPropagation()
  select.select(5)
}

document.querySelector('#actions > li > button[data-type="get"]').onclick = function(event) {
  event.stopPropagation()
  select.getSelected()
}

document.querySelector('#actions > li > button[data-type="clear"]').onclick = function(event) {
  event.stopPropagation()
  select.clear()
}

document.querySelector('#actions > li > button[data-type="destroy"]').onclick = function(event) {
  event.stopPropagation()
  select.destroy()
}