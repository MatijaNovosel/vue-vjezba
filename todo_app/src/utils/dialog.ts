import { reactive } from "vue";

interface State {
  type: string;
  active: boolean;
  message: string;
  title: string;
  okText: string;
  cancelText: string;
  html: boolean;
}

const state: State = reactive({
  type: "alert",
  active: false,
  message: "",
  title: "",
  okText: "Ok",
  cancelText: "Cancel",
  inputType: "text",
  html: false,
});

let close: Function;

const dialogPromise = () => new Promise((resolve) => (close = resolve));

const open = (message: string) => {
  state.message = message;
  state.active = true;
  return dialogPromise();
};

const reset = () => {
  state.active = false;
  setTimeout(() => {
    state.message = "";
    state.okText = "Ok";
    state.cancelText = "Cancel";
    state.html = false;
    state.title = "";
    state.type = "alert";
  }, 1000);
};
const dialog = {
  get state() {
    return state;
  },
  alert(message: string) {
    state.type = "alert";
    return open(message);
  },
  confirm(message: string) {
    state.type = "confirm";
    return open(message);
  },
  cancel() {
    close(false);
    reset();
  },
  ok(input: boolean = true) {
    close(input);
    reset();
  },
  title(title: string) {
    state.title = title;
    return this;
  },
  okText(text: string) {
    state.okText = text;
    return this;
  },
  cancelText(text: string) {
    state.cancelText = text;
    return this;
  },
  html(enabled: boolean = true) {
    state.html = enabled;
    return this;
  },
};

export default dialog;
