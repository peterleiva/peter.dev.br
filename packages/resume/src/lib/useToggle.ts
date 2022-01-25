import { useReducer } from 'react';

type State = {
  toggle: boolean;
  off: boolean;
};

type Action = { type: 'ON' } | { type: 'OFF' } | { type: 'TOGGLE' };

const initializer = (toggle: boolean): State => {
  return { toggle, off: !toggle };
};

const reducer = (state: State, { type }: Action): State => {
  switch (type) {
    case 'ON':
      return { toggle: true, off: false };

    case 'OFF': {
      return { toggle: false, off: true };
    }

    case 'TOGGLE': {
      const toggle = !state.toggle;

      return { toggle, off: !toggle };
    }

    default:
      return state;
  }
};

export default function useToggle(initial = false) {
  const [{ toggle: isOn, off: isOff }, setToggle] = useReducer(
    reducer,
    initial,
    initializer
  );

  const on = () => setToggle({ type: 'ON' });
  const off = () => setToggle({ type: 'OFF' });
  const toggle = () => setToggle({ type: 'TOGGLE' });

  return { on, off, isOn, isOff, toggle };
}
