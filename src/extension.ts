import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const createFile = (uri: vscode.Uri, fileName: string, content: string) => {
		const newFilePath = vscode.Uri.joinPath(uri, fileName);
		const edit = new vscode.WorkspaceEdit();
		edit.createFile(newFilePath, { ignoreIfExists: true });
		edit.insert(newFilePath, new vscode.Position(0, 0), content);
		return vscode.workspace.applyEdit(edit).then(success => {
			if (success) {
				vscode.window.showTextDocument(newFilePath);
			} else {
				vscode.window.showInformationMessage('Error creating file.');
			}
		});
	};

	const createDisposableCommand = (commandId: string, getFileName: () => Promise<string | undefined>, fileExtension: string = "txt", contentGenerator: (fileName: string) => string) => {
		return vscode.commands.registerCommand(commandId, async (uri: vscode.Uri) => {
			const fileName = await getFileName();
			if (fileName) {
				const content = contentGenerator(fileName);
				createFile(uri, `${fileName}.${fileExtension}`, content);
			}
		});
	};

	const componentContent = (name: string) => `import React from 'react';
import PropTypes from 'prop-types';
import './${name}.css';

/**
 * ${name} properties interface
 */
interface ${name}Properties {
    children?: React.ReactNode;
}

/**
 * ${name} component
 * @param {${name}Properties} props - Component props
 * @returns {JSX.Element}
 */
const ${name} = (props: ${name}Properties): JSX.Element => {
    return <div className="${name.toLowerCase()}">{props.children}</div>;
};

${name}.propTypes = {
    children: PropTypes.node,
};

${name}.defaultProps = {
    children: null,
};

export default ${name};
`;
	const interfaceContent = (name: string) => `/** * ${name} interface
 */
export interface ${name} {
    id: string;
};
`;

	const modelContent = (name: string) => `/** * ${name} model
 */
export class ${name} {
    id: string;

    /**
     * Creates an instance of ${name}.
     * @param {string} id - The ID of the model
     */
    constructor(id: string, name: string, description?: string) {
        this.id = id;
    }
};
`;
	const hookContent = (name: string) => `import { useState, useEffect } from 'react';

/**
 * Custom hook ${name}
 * @returns {object} - The hook state and actions
 */
const use${name} = () => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Effect logic here
        return () => {
            // Cleanup logic here
        };
    }, []);

    return {
        state,
        setState,
    };
};

export default use${name};
`;

	const cssContent = (name: string) => `/* Styles for ${name} component */
.${name.toLowerCase()} {
    /* Add your styles here */
}
`;

	const viewContent = (name: string) => `import React from 'react';
import PropTypes from 'prop-types';
import './${name}.css';

/**
 * ${name} view
 * @param {object} props - View props
 * @returns {JSX.Element}
 */
const ${name} = (props) => {
    return <div className="${name.toLowerCase()}">{props.children}</div>;
};

${name}.propTypes = {
    children: PropTypes.node,
};

${name}.defaultProps = {
    children: null,
};

export default ${name};
`;

	const getFileNameInput = (prompt: string) => () => {
		return new Promise<string | undefined>((resolve) => {
			vscode.window.showInputBox({ prompt }).then(result => resolve(result));
		});
	};

	const disposableComponent = createDisposableCommand('myReactScripts.newComponent', getFileNameInput('Enter component name'), "component.tsx", componentContent);
	const disposableInterface = createDisposableCommand('myReactScripts.newInterface', getFileNameInput('Enter interface name'), "interface.ts", interfaceContent);
	const disposableModel = createDisposableCommand('myReactScripts.newModel', getFileNameInput('Enter model name'), "model.ts", modelContent);
	const disposableHook = createDisposableCommand('myReactScripts.newHook', getFileNameInput('Enter hook name'), "hook.ts", hookContent);
	const disposableCSS = createDisposableCommand('myReactScripts.newCSS', getFileNameInput('Enter CSS file name'), "css", cssContent);
	const disposableView = createDisposableCommand('myReactScripts.newView', getFileNameInput('Enter view name'), "view.tsx", viewContent);

	context.subscriptions.push(disposableComponent, disposableInterface, disposableModel, disposableHook, disposableCSS, disposableView);
}

export function deactivate() { }
