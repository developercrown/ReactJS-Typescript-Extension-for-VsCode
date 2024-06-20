import * as vscode from 'vscode';
import { createFile, createFolder } from './FileActions';
import { sendMessage } from './PromptActions';
import { cssModuleContent, moduleContent, testContent } from './GeneratorContents';

const registerCommand = (commandId: string, action: Function = ()=>sendMessage("Welcome")) => {
    return vscode.commands.registerCommand(commandId, async (uri: vscode.Uri) => {
        action();
    });
}

const createDisposableCommand = (
    commandId: string,
    getFileName: () => Thenable<string | undefined>,
    fileExtension: string | undefined = "",
    contentGenerator: (fileName: string) => string,
    isModule: boolean = false
) => {
    return vscode.commands.registerCommand(commandId, async (uri: vscode.Uri) => {
        const fileName = await getFileName();
        if (fileName) {
            if (isModule) {
                const modulePath = await createFolder(uri, fileName);
                await createFile(modulePath, `${fileName}`, ".styles.css", cssModuleContent(fileName));
                await createFile(modulePath, 'index', ".tsx", moduleContent(fileName));
                await createFile(modulePath, `${fileName}`, ".test.tsx", testContent(fileName));
                await createFolder(modulePath, 'components');
            } else {
                const content = contentGenerator(fileName);
                createFile(uri, `${fileName}`, fileExtension, content);
            }
        }
    });
};

export {
    registerCommand,
    createDisposableCommand
}