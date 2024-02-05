export const buttonCoreStyles = {
  coreStyle: 'rounded-[100px] gap-[8px]', // pill shape
  type: {
    filled: {
      blue: {
        regular: 'bg-primary-500 text-gray-0',
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
    // text: {},
    // toned: {},
  },
};
