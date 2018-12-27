interface Confirm {
  (message: string): Promise<void>;
}

interface Callback {
  (ok: boolean): void;
}

const defaultConfirm: Confirm = message =>
  new Promise((resolve, reject) => {
    window.confirm(message) ? resolve() : reject();
  });

let confirm: Confirm = defaultConfirm;

const getConfirm = confirm ? confirm : defaultConfirm;

export const setConfirm = (c: Confirm) => (confirm = c);

export const getConfirmation = (message: string, callback: Callback) => {
  getConfirm(message).then(() => callback(true), () => callback(false));
};
