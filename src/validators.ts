import rules from "@vee-validate/rules";
import { defineRule } from "vee-validate";

Object.keys(rules).forEach((rule) => {
  if (rule != "default") {
    defineRule(rule, rules[rule]);
  }
});
