/**
 * @file Assembly language for Little Computer 3
 * @author MyUsernamee
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "lc3asm",
  extras : $ => [/[ \t]/],
  rules: {
    source_file: $ => repeat(seq(choice($.statement, $.comment), /\n+/)),
    statement: $ => choice(
      $.identifier, 
      seq(
        optional($.identifier),
        choice(
          seq($.opcode, optional($._operand), repeat(seq(',', $._operand))),
          seq($.directive, optional($._literal))
        )
      )
    ),
    directive: $ => /\.\w+/i, 
    comment: $ => /;[^\n]*/,
    _operand: $ => choice(
      $.register,
      $.identifier,
      $.number_literal,
    ),
    _literal: $ => choice($.number_literal, $.string),
    number_literal: $ => /[x#]\d+/,
    string: $ => choice(
      seq('"', repeat(choice('\\"', /[^"]/)), '"'),
      seq("'", repeat(choice("\\'", /[^']/)), "'"),
    ) ,
    register: $ => /R\d/i,
    opcode: $ => choice(
      /ADD/i,
      /AND/i,
      /NOT/i,
      /ST[IR]?/i,
      /LD[(EA)IR]?/i,
      /BR[ZNPznp]?/i,
      /JSRR?/i,
      /TRAP/i,
      /HALT/i,
      /GETS/i,
      /PUTS/i
    ),
    identifier: $ => /\w+/,
  }
});
// %%

