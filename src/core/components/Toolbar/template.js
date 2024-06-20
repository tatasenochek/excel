function createButton(button) {
 return `
    <div 
      data-value='${JSON.stringify(button.value)}' 
      data-type="button"
      class="button ${button.active ? 'active' : ''}"
    >
      <span class="material-symbols-outlined">${button.icon}</span>
    </div>
 `
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_bold',
      active: state['fontWeght'] === 'bold',
      value: {fontWeght: state['fontWeght'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underlined',
      active: state['fontDecoration'] === 'underlined',
      value: {fontDecoration: state['fontDecoration'] === 'underlined' ? 'none' : 'underlined'}
    },
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'}
    }
  ]
	return buttons.map(createButton).join('')
}
