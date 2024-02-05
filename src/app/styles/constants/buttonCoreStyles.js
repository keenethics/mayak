export const buttonCoreStyles = {
  coreStyle: 'rounded-[100px] gap-[8px]', // pill shape
  type: {
    filled: {
      blue: {
        regular: 'bg-[#006ED6] text-[#FFFFFF]',
        hover: 'hover:bg-[#4FAAFF]',
        focused: 'focus:outline-none focus:bg-[#00529E]',
        active: 'active:bg-[#003A71]',
        disabled: 'disabled:text-[#C0BFCE] disabled:bg-[#EDEDF4]',
      },
    },
    outlined: {
      blue: {
        regular:
          'bg-transparent border-[1px] border-solid border-[#504F53] text-[#006ED6]',
        hover: 'hover:bg-[#DFF0FF]',
        focused:
          'focus:outline-none focus:bg-[#DFF0FF] focus:text-[#00529E] focus:border-[#00529E]',
        active:
          'active:bg-[#DFF0FF] active:text-[#00529E] active:border-[#504F53]',
        disabled: 'disabled:text-[#C0BFCE] disabled:border-[#EDEDF4]',
      },
    },
    // text: {},
    // toned: {},
  },
};
