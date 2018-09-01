import { CommandNames } from "general-language-syntax";
import * as ts from "typescript";

import { GlsLine } from "../../output/glsLine";
import { Transformation } from "../../output/transformation";
import { NodeVisitor } from "../visitor";

export class InterfaceDeclarationVisitor extends NodeVisitor {
    public visit(node: ts.InterfaceDeclaration) {
        const bodyNodes = this.router.recurseIntoNodes(node.members);
        const name = node.name.text;
        const extensions: string[] = [];

        if (node.heritageClauses !== undefined) {
            for (const clause of node.heritageClauses) {
                for (const type of clause.types) {
                    extensions.push(type.expression.getText(this.sourceFile));
                }
            }
        }

        return [
            Transformation.fromNode(
                node,
                this.sourceFile,
                [
                    new GlsLine(CommandNames.InterfaceStart, name, ...extensions),
                    ...bodyNodes,
                    new GlsLine(CommandNames.InterfaceEnd)
                ])
        ];
    }
}
