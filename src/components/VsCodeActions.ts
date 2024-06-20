import * as vscode from 'vscode';

const getFileNameInput = (prompt: string) => () => {
    return vscode.window.showInputBox({ prompt });
};

export {
    getFileNameInput
}