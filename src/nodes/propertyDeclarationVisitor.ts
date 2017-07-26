import { CommandNames } from "general-language-syntax";
import { hasModifier } from "tsutils";
import { Expression, PropertyDeclaration, SourceFile, SyntaxKind, TypeChecker } from "typescript";

import { GlsLine } from "../glsLine";
import { Transformation } from "../transformation";
import { visitNodes } from "./visitNode";
import { NodeVisitor } from "./visitor";

const getPrivacy = (node: PropertyDeclaration) => {
    if (hasModifier(node.modifiers, SyntaxKind.PrivateKeyword)) {
        return "private";
    }

    if (hasModifier(node.modifiers, SyntaxKind.ProtectedKeyword)) {
        return "protected";
    }

    return "public";
};

export class PropertyDeclarationVisitor extends NodeVisitor {
    public visit(node: PropertyDeclaration, sourceFile: SourceFile, typeChecker: TypeChecker) {
        const privacy = getPrivacy(node);
        const instanceName = node.name.getText(sourceFile);
        const value = this.getInitializerValue(node.initializer, sourceFile, typeChecker);

        const results: (string | GlsLine)[] = [privacy, instanceName];
        if (value !== undefined) {
            results.push(value);
        }

        return [
            Transformation.fromNode(
                node,
                sourceFile,
                [
                    new GlsLine(CommandNames.MemberVariable, ...results)
                ])
        ];
    }

    private getInitializerValue(initializer: Expression | undefined, sourceFile: SourceFile, typeChecker: TypeChecker) {
        if (initializer === undefined) {
            return undefined;
        }

        return this.recurseOnValue(initializer, sourceFile, typeChecker);
    }
}