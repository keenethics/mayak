export const variants = {
  default: {
    container: {
      base: 'relative flex gap-[12px] p-[3px]',
    },
    checkBox: {
      base: 'peer h-[20px] w-[20px] rounded-[4px] border-gray-500 bg-other-white p-[2px]',
      disabled:
        'disabled:border-gray-300 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:border-gray-300',
      hover: 'hover:border-primary-500 hover:bg-primary-100',
      focus: 'focus:border-primary-400 focus:bg-other-white focus:hover:border-primary-500',
      focusRing: 'focus:ring-[4px] focus:ring-primary-300 focus:ring-offset-0',
      checked: 'checked:bg-primary-100 checked:border-primary-400',
      checkedFocus: 'checked:focus:bg-primary-100 checked:focus:border-primary-400',
      checkedHover: 'checked:hover:bg-primary-100 checked:hover:border-primary-500',
    },
    labelBefore: {
      layout: 'before:absolute before:left-[4px] before:top-[4px] before:block before:h-[18px]  before:w-[18px]',
      base: 'before:border-spacing-[1px] before:rounded-[4px] before:bg-other-white',
      peerChecked: `peer-checked:before:border-primary-400 peer-checked:before::bg-primary-100 
        peer-checked:before:hover:border-primary-500 peer-checked:before:hover:border-primary-500`,
      peerFocus: 'peer-focus:before:bg-other-white',
      peerDisabled: 'peer-disabled:before:bg-gray-200',
    },
    textContainer: {
      base: 'flex flex-col content-between',
      position: 'mt-0 lg:mt-[-2px]',
    },
    text: {
      base: 'text-p4 lg:text-p3',
      disabled: 'text-gray-400',
    },
    subText: {
      base: 'text-p4',
      disabled: 'text-gray-400',
    },
    tick: {
      position: 'absolute left-[7px] top-[9px]',
      base: '*:stroke-primary-500',
      disabled: '*:stroke-gray-300',
    },
  },
};
