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
    source_file: $ => repeat(seq(choice($.statement, $.comment), '\n')),
    statement: $ => choice(
      $.identifier, 
      seq(
        optional($.identifier),
        choice(
          seq($.opcode, $._operand, repeat(seq(',', $._operand))),
          seq($.directive, optional($._literal))
        )
      )
    ),
    directive: $ => /\.\w+/, 
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
    register: $ => /R\d/,
    opcode: $ => choice(
      'ADD',
      'AND',
      'NOT',
      /ST[IR]?/,
      /LD[(EA)IR]?/,
      /BR[ZNPznp]?/,
      /JSRR?/,
      'TRAP',
      'HALT',
      'GETS',
      'PUTS'
    ),
    identifier: $ => /\w+/,
  }
});
