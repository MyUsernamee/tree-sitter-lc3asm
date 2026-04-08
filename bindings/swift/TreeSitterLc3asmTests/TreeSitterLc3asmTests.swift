import XCTest
import SwiftTreeSitter
import TreeSitterLc3asm

final class TreeSitterLc3asmTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_lc3asm())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading LC3 Assembly grammar")
    }
}
