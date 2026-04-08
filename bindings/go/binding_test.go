package tree_sitter_lc3asm_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_lc3asm "github.com/tree-sitter/tree-sitter-lc3asm/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_lc3asm.Language())
	if language == nil {
		t.Errorf("Error loading LC3 Assembly grammar")
	}
}
