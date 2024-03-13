export const variants = {
  default: {
    mainContainer: {
      base: 'flex flex-col-reverse',
    },
    label: {
      base: 'ml-4 py-[3px] text-[0.75rem] font-medium leading-3 text-gray-900 hidden',
      stateful:
        'peer-focus-within:text-primary-500 peer-has-[*:not(:placeholder-shown)]:block peer-focus:peer-has-[*:not(:placeholder-shown)]:text-primary-500',
      error: 'text-system-error peer-focus-within:text-system-error',
    },
    inputContainer: {
      base: 'peer flex w-full items-center',
      style: 'gap-3 rounded-full border-[1px] border-gray-600 px-4 py-3 text-p4 md:text-p3',
      focusWithin: 'focus-within:border-primary-500',
      error: 'border-system-error focus-within:border-system-error',
    },
    input: {
      base: 'w-0 grow border-0 bg-other-white/0 p-0',
      focus: 'focus:ring-0 focus:ring-offset-0',
      style: 'caret-primary-500 placeholder:text-gray-500',
      error: 'caret-system-error',
    },
    errorIcon: {
      base: '*:fill-system-error',
    },
    errorParagraph: {
      base: 'mt-[4px] ml-4 text-system-error text-[12px] lg:text-p4 font-semibold',
    },
  },
};
