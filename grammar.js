/**
 * @file Assembly language for Little Computer 3
 * @author MyUsernamee
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "lc3asm",
  extras : $ => [/[ \t]/, $.comment],
  rules: {
    source_file: $ => repeat(seq(optional($.statement), /\n+/)),
    statement: $ => choice(
      $.identifier, 
      seq(
        optional($.identifier),
        choice(
          seq($.opcode, optional($._operand), optional(seq(',', $._operand)), optional(seq(',', $._operand))),
          seq($.directive, optional($._literal))
        )
      )
    ),
    directive: $ => /\.\w+/i, 
    comment: $ => /;[^\n]*/,
    _operand: $ => choice(
      $.register,
      $.identifier,
      $.base_literal,
    ),
    _literal: $ => choice($.base_literal, $.number_literal, $.string_literal),
    base_literal: $ => seq(/[x#]/, $.number_literal),
    number_literal: $ => /-?\d+/,
    string_literal: $ => token(choice(
      seq('"', repeat(choice('\\"', /[^"]/)), '"'),
      seq("'", repeat(choice("\\'", /[^']/)), "'"),
    )),
    register: $ => /R\d/i,
    opcode: $ => choice(
      /ADD/i,
      /AND/i,
      /NOT/i,
      /ST[IR]?/i,
      /LD[(EA)IR]?/i,
      /BR[ZNPznp]+?/i,
      /JSRR?/i,
      /TRAP/i,
      /HALT/i,
      /GETS/i,
      /PUTS/i,
      /JMP/i
    ),
    identifier: $ => /\w+/,
  }
});
// %%

