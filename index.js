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

    this.createHtml()

    this.popupElement = this.rootElement.querySelector('.popup')
    this.selectedElement = this.rootElement.querySelector('.selected')
    this.containerElement = this.rootElement.querySelector('.container')

    this.addEvents()
    this.loadData()
  }

  createHtml() {
    const html = `
      <div class="container">
        <div class="label">
          ${ this.label }
        </div>
        <div class="selected"></div>
        <div class="select">
          <div class="arrow"></div>
        </div>
        <div class="popup"></div>
      </div>
    `
    this.rootElement.insertAdjacentHTML('afterbegin', html)
  }

  addEvents() {
    this.containerElement.addEventListener('click', () => {
      !this.isOpen() ? this.open() : this.close()
    })

    document.body.addEventListener('click', (event) => {
      !event.path.some(item => item === this.rootElement) && this.close()
    })
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
    this.data.forEach((item, index) => {
      const htmlOption = `
        <div class="option" index="${ index }">
          ${ item.label }
        </div>
      `

      this.popupElement.insertAdjacentHTML('beforeend', htmlOption)
    })

    this.popupElement.addEventListener('click', (ev) => {
      const option = ev.target

      this.select(option.getAttribute('index'))
    })
  }

  select(index) {
    const option = this.rootElement.querySelector(`.option[index = "${index}"]`)

    this?.selectedOptionElement?.classList.remove('selectedOption')
    this.selectedOptionElement = option

    option.classList.add('selectedOption')

    const label = this.data[index].label

    this.rootElement.classList.add('select')
    this.selectedElement.innerText = label
    this.selectedElement.setAttribute('index', index.toString())

    this?.onSelect(label)
  }

  getSelected() {
    const index = this.selectedElement.getAttribute('index')

    index && alert(JSON.stringify(this.data[index]))
  }

  clear() {
    this.rootElement.classList.remove('select')
    this.selectedElement.innerText = ''
    this.selectedElement.removeAttribute('index')
    this?.selectedOptionElement?.classList.remove('selectedOption')
    this?.onSelect('')
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
    document.querySelector('#log').innerText = label ? `Выбранный элемент: ${ label }` : ''
  }
})

document.querySelector('button[data-type="open"]').addEventListener('click', (event) => {
  event.stopPropagation()
  select.open()
})

document.querySelector('button[data-type="close"]').addEventListener('click', () => {
  select.close()
})

document.querySelector('button[data-type="set"]').addEventListener('click', () => {
  select.select(5)
})

document.querySelector('button[data-type="get"]').addEventListener('click', () => {
  select.getSelected()
})

document.querySelector('button[data-type="clear"]').addEventListener('click', () => {
  select.clear()
})

document.querySelector('button[data-type="destroy"]').addEventListener('click', () => {
  select.destroy()
})
