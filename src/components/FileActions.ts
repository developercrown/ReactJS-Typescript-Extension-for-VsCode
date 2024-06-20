import { Uri, workspace, window, WorkspaceEdit} from 'vscode';
import { sendError, sendMessage } from './PromptActions';

const createFile = async (uri?: Uri | null, fileName: string = "", fileExtension: string | undefined = "", content: string = "", show: boolean = false): Promise<boolean> => {
    if (uri) {
        const newFilePath = Uri.joinPath(uri, fileName + fileExtension);

        try {
            // Verificar si el archivo ya existe
            await workspace.fs.stat(newFilePath);
            // Si no lanza error, significa que el archivo ya existe
            sendMessage('El archivo ya existe, no se puede continuar.');
            return false;
        } catch (error: any) {
            if (error.code === 'FileNotFound') {
                try {
                    const edit = new WorkspaceEdit();
                    edit.createFile(newFilePath, { ignoreIfExists: true });
                    await workspace.applyEdit(edit);
                } catch (creationError: any) {
                    sendError('Error creating file: ' + creationError.message);
                    return false;
                }

                try {
                    // Escribir contenido en el archivo
                    await workspace.fs.writeFile(newFilePath, Buffer.from(content));
                } catch (writeError: any) {
                    sendError('Error writing to file: ' + writeError.message);
                    return false;
                }

                if (show) {
                    window.showTextDocument(newFilePath);
                }

                return true;
            } else {
                sendError('Error checking file existence: ' + error.message);
                return false;
            }
        }
    }
    return false;
};

const createFolder = async (uri?: Uri | null, folderName: string = "") => {
    if (uri) {
        const newFolderPath = Uri.joinPath(uri, folderName);

        try {
            // Verificar si la carpeta ya existe
            await workspace.fs.stat(newFolderPath);
            // Si no lanza error, significa que la carpeta ya existe
            window.showInformationMessage('La carpeta ya existe, no se puede continuar.');
        } catch (error: any) {
            if (error.code === 'FileNotFound') {
                // Crear la carpeta si no existe
                await workspace.fs.createDirectory(newFolderPath);
                return newFolderPath;
            } else {
                window.showErrorMessage('Error checking folder existence: ' + error.message);
            }
        }
        return null; // Devuelve null si la carpeta ya existe o si hubo un error
    }
};

export {
    createFile,
    createFolder
}