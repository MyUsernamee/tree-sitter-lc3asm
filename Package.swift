// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterLc3asm",
    products: [
        .library(name: "TreeSitterLc3asm", targets: ["TreeSitterLc3asm"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterLc3asm",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterLc3asmTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterLc3asm",
            ],
            path: "bindings/swift/TreeSitterLc3asmTests"
        )
    ],
    cLanguageStandard: .c11
)
