/**
 * @file Assembly language for Little Computer 3
 * @author MyUsernamee
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "lc3asm",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
