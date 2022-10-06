// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
	commands,
	workspace,
	window,
	ExtensionContext,
	TextEditor,
	Uri,
} from "vscode";
import * as path from "path";
import * as cp from "child_process";



export function activate(context: ExtensionContext) {
	const disposable = commands.registerCommand('extension.helloWorld', () => {
		const openFiles = workspace.textDocuments;
		for (let i = 0; i < openFiles.length; i++) {
				const thisUri: string  = openFiles[i].uri.authority;
				console.log(openFiles[i]);
				// console.log(path.dirname(openFiles[i].fileName));
		}
	});
	context.subscriptions.push(disposable);
}

//		window.showInformationMessage("Hello World, don't be a trumpstrap yo!");
//		const uri = workspace.textDocuments[0].uri;
		// const openFiles = workspace.textDocuments;
		//for (let i = 0; i < openFiles.length; i++) {
		//		const thisUri: string  = openFiles[i].uri.authority;
		//		console.log("thisUri", thisUri);
		//		if (thisUri.substring(0,4) == "file:") {
		//			console.log(openFiles[i]);
		//			console.log(path.dirname(openFiles[i].fileName));
		//		}
		//}
//		const workspacePath = workspace.getWorkspaceFolder(uri)?.uri.fsPath;
//		console.log(workspacePath);

//	const disposableC = commands.registerCommand('extension.modeC', () => {doInertStart("modeC");});
//	context.subscriptions.push(disposableC);
//	const disposableD = commands.registerCommand('extension.modeC', () => {doInertStart("modeD");});
//	context.subscriptions.push(disposableD);
//	const disposableF = commands.registerCommand('extension.modeC', () => {doInertStart("modeF");});
//	context.subscriptions.push(disposableF);
//	const disposableP = commands.registerCommand('extension.modeC', () => {doInertStart("modeP");});
//	context.subscriptions.push(disposableP);
//}

