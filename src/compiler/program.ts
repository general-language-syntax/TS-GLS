import { CompilerHost, createProgram, createSourceFile, Program, ScriptTarget, SourceFile, TypeChecker } from "typescript";

import { StubCompilerHost } from "./stubCompilerHost";

export const createStubProgramForFiles = (sourceFiles: SourceFile[]) =>
    createProgram(
        sourceFiles.map((sourceFile) => sourceFile.fileName),
        {
            allowJs: false
        },
        new StubCompilerHost(sourceFiles));

export const createStubProgramForFile = (sourceFile: SourceFile) =>
    createStubProgramForFiles([sourceFile]);