import * as vscode from 'vscode';

const sendMessage = (message: string = "Hello World") => {
    vscode.window.showInformationMessage(message);
}

const sendInfoMessage = sendMessage;

const sendWarning = (message: string = "Hello World") => {
    vscode.window.showWarningMessage(message);
}

const sendError = (message: string = "Hello World") => {
    vscode.window.showErrorMessage(message);
}

const showPrompt = (message: string = "Ingresa un texto") => {
    vscode.window.showInputBox().then(value => {
        sendMessage(value);
    });
}

export {
    sendMessage,
    sendInfoMessage,
    sendWarning,
    sendError,
    showPrompt
}