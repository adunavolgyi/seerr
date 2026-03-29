import { withProperties } from '@app/utils/typeHelpers';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  Fragment,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';

interface DropdownItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  buttonType?: 'primary' | 'ghost';
}

const DropdownItem = ({
  children,
  buttonType = 'primary',
  ...props
}: DropdownItemProps) => {
  return (
    <Menu.Item>
      <a
        className={[
          'button-md flex cursor-pointer items-center rounded px-4 py-2 text-sm leading-5 text-white focus:text-white focus:outline-none',
          buttonType === 'ghost'
            ? 'bg-transparent from-amber-600 to-amber-500 hover:bg-gradient-to-br focus:border-border-light'
            : 'bg-amber-600 hover:bg-amber-500 focus:border-amber-700',
        ].join(' ')}
        {...props}
      >
        {children}
      </a>
    </Menu.Item>
  );
};

type DropdownItemsProps = HTMLAttributes<HTMLDivElement> & {
  dropdownType: 'primary' | 'ghost';
};

const DropdownItems = ({
  children,
  className,
  dropdownType,
  ...props
}: DropdownItemsProps) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Menu.Items
        className={[
          'absolute right-0 z-40 -mr-1 mt-2 w-56 origin-top-right rounded-md p-1 shadow-lg',
          dropdownType === 'ghost'
            ? 'border border-border bg-background-secondary/80 backdrop-blur'
            : 'bg-amber-600',
          className,
        ].join(' ')}
        {...props}
      >
        <div className="py-1">{children}</div>
      </Menu.Items>
    </Transition>
  );
};

interface DropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  buttonType?: 'primary' | 'ghost';
}

const Dropdown = ({
  text,
  children,
  dropdownIcon,
  className,
  buttonType = 'primary',
  ...props
}: DropdownProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Menu as="div" className="relative z-10">
      <Menu.Button
        type="button"
        className={[
          'button-md inline-flex h-full items-center space-x-2 rounded-md border px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:z-20 focus:z-20 focus:outline-none',
          buttonType === 'ghost'
            ? 'border-border-dark bg-transparent hover:border-text-secondary/50 focus:border-text-primary active:border-text-primary'
            : `focus:ring-amber border-amber-500 bg-amber-600/80 hover:border-amber-500 hover:bg-amber-600 active:border-amber-700 active:bg-amber-700`,
          className,
        ].join(' ')}
        ref={buttonRef}
        disabled={!children}
        {...props}
      >
        <span>{text}</span>
        {children && (dropdownIcon ? dropdownIcon : <ChevronDownIcon />)}
      </Menu.Button>
      {children && (
        <DropdownItems dropdownType={buttonType}>{children}</DropdownItems>
      )}
    </Menu>
  );
};
export default withProperties(Dropdown, {
  Item: DropdownItem,
  Items: DropdownItems,
});
