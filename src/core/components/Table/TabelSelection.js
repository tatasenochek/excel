export class TableSelection {
  static selected = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.selected)
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.selected))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()

    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.selected))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }

  get selectCellIds() {
    return this.group.map($el => $el.id())
  }
}
