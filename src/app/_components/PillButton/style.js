export const buttonColorVariant = {
  filled: {
    blue: {
      regular: 'bg-primary-500 text-other-white',
      hover: 'hover:bg-primary-400',
      focused: 'focus:outline-none focus:bg-primary-600',
      active: 'active:bg-primary-700',
      disabled: 'disabled:text-gray-400 disabled:bg-gray-200',
    },
  },
  outlined: {
    blue: {
      regular:
        'bg-transparent border-[1px] border-solid border-gray-700 text-primary-500',
      hover: 'hover:bg-primary-200',
      focused:
        'focus:outline-none focus:bg-primary-200 focus:text-primary-600 focus:border-primary-600',
      active:
        'active:bg-primary-200 active:text-primary-600 active:border-gray-700',
      disabled: 'disabled:text-gray-400 disabled:border-gray-200',
    },
  },
  close: {
    grey: {
      regular: 'text-[transparent]',
      hover: 'hover:text-other-white',
    },
  },
  // text: {},
  // tonal: {},
};

export const buttonType = {
  outlined: {
    icon: {
      buttonStyle: 'inline-flex justify-center align-middle flex-col text-p4',
      layoutStyle: `flex justify-center align-middle /
      gap-[8px] self-stretch h-[2.5rem] pt-[10px] pr-[24px] pb-[10px] pl-[16px]`,
    },
    regular: {
      buttonStyle:
        'inline-flex justify-center align-middle flex-col h-[2.5rem] flex-shrink-0 text-p4',
      layoutStyle: `flex justify-center align-middle /
      gap-[8px] self-stretch flex-grow flex-shrink-0 flex-basis-0 py-[10px] px-[24px]`,
    },
  },
  filledBold: {
    icon: {
      buttonStyle: 'inline-flex justify-center align-middle text-p3',
      layoutStyle:
        'flex justify-center align-middle gap-[8px] pt-[12px] pr-[24px] pb-[12px] pl-[16px]',
    },
    regular: {
      buttonStyle:
        'inline-flex justify-center align-middle py-[12px] px-[0px] text-p3',
      layoutStyle:
        'flex justify-center align-middle gap-[8px] py-[0px] px-[24px] self-stretch',
    },
  },
  close: {
    icon: {
      buttonStyle: `flex justify-center align-middle w-[1rem] h-[1rem] / 
      flex-shrink-0`,
    },
  },
};
