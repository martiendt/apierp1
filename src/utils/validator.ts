import Validatorjs from "validatorjs";

export function addCustomValidator() {
  Validatorjs.register(
    "number",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function (value, requirement, attribute) {
      return typeof value === "number";
    },
    "The :attribute is not number"
  );
}
