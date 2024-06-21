import {ExtensionContext} from 'vscode';
import { componentContent, cssContent, hookContent, interfaceContent, modelContent, moduleContent, typeContent, viewContent } from './components/GeneratorContents';
import { getFileNameInput } from './components/VsCodeActions';
import { sendMessage } from './components/PromptActions';
import { createDisposableCommand, registerCommand } from './components/CommandActions';

export function activate(context: ExtensionContext) {

	const disposableComponent = createDisposableCommand('myReactScripts.newComponent', getFileNameInput('Enter component name'), ".component.tsx", componentContent);
	const disposableInterface = createDisposableCommand('myReactScripts.newInterface', getFileNameInput('Enter interface name'), ".interface.ts", interfaceContent);
	const disposableModel = createDisposableCommand('myReactScripts.newModel', getFileNameInput('Enter model name'), ".model.ts", modelContent);
	const disposableHook = createDisposableCommand('myReactScripts.newHook', getFileNameInput('Enter hook name'), ".hook.ts", hookContent);
	const disposableCSS = createDisposableCommand('myReactScripts.newCSS', getFileNameInput('Enter CSS file name'), ".css", cssContent);
	const disposableView = createDisposableCommand('myReactScripts.newView', getFileNameInput('Enter view name'), ".view.tsx", viewContent);
	const disposableModule = createDisposableCommand('myReactScripts.newModule', getFileNameInput('Enter module name'), undefined, moduleContent, true);
	const disposableType = createDisposableCommand('myReactScripts.newType', getFileNameInput('Enter type name'), '.type.ts', typeContent, false);
	const disposableHello = registerCommand('myReactScripts.hello', ()=>sendMessage("Lol"));

	context.subscriptions.push(disposableComponent, disposableInterface, disposableModel, disposableHook, disposableCSS, disposableView, disposableModule, disposableHello, disposableType);
}

export function deactivate() { }
