import { CaseStyleConverterBag } from "general-language-syntax";
import { Node, SourceFile, TypeChecker } from "typescript";

import { RootAliaser } from "../parsing/aliasers/rootAliaser";
import { TransformationsPrinter } from "../printing";
import { Transformation } from "../transformation";
import { VisitorContext } from "./context";
import { NodeVisitRouter } from "./router";
import { NodeVisitor } from "./visitor";
import { VisitorCreatorsBag } from "./visitorCreatorsBag";

export const visitSourceFile = (sourceFile: SourceFile, typeChecker: TypeChecker): Transformation[] => {
    const aliaser = new RootAliaser(sourceFile, typeChecker);
    const casing = new CaseStyleConverterBag();
    const printer = new TransformationsPrinter();
    const visitorContext = new VisitorContext();
    const visitorCreatorsBag = new VisitorCreatorsBag();

    const router = new NodeVisitRouter({
        aliaser, casing, printer, sourceFile, typeChecker, visitorContext, visitorCreatorsBag
    });

    const result = router.recurseIntoNode(sourceFile);

    return result === undefined
        ? []
        : result;
};
