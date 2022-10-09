// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
//import * as cp from "child_process";


export function activate(context: vscode.ExtensionContext) {

/*
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const window: any = vscode.window;
		const editor: any = window.activeTextEditor;
		const document = editor.document;
		const filename: string = editor?.document.fileName;
		console.log(filename);
		const filePath = path.dirname(filename);
		console.log(filePath);
		const theseSelections = editor?.selections;
		const numSelections = editor?.selections.length;
		console.log(numSelections);
		const uri = vscode.workspace.textDocuments[0].uri;
		const workspacePath = vscode.workspace.getWorkspaceFolder(uri)?.uri.fsPath;
		console.log(workspacePath);
		for (let i1 = 0; i1 < numSelections; i1++) {
			const thisIndex = i1;
			console.log(thisIndex);
			const thisSelection = theseSelections[thisIndex];
			console.log(thisSelection);
			const thisSelectedText = document.getText(thisSelection);
			console.log(thisSelectedText);
			const thisSelectedUpcaseText = thisSelectedText.toUpperCase();
			console.log(thisSelectedUpcaseText);
			// const selectionToReplace = thisIndex.toString + "  " + thisSelectedText;
			// console.log(selectionToReplace);
			// editor.edit(edit => edit.replace(thisSelection, thisSelectedUpcaseText));
			editor.edit(editme => editme.replace(thisSelection, thisSelectedUpcaseText));
		}
		// editor.selections = vscode.editor.selections.map( sel => new vscode.Selection(sel.start.translate(0,1), sel.end.translate(0,1)));
	});
	context.subscriptions.push(disposable);
*/

	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const window: any = vscode.window;
		const editor: any = window.activeTextEditor;
		const document = editor.document;
		const filename: string = editor?.document.fileName;
		// console.log(filename);
		const filePath = path.dirname(filename);
		// console.log(filePath);
		const thisSelection = editor?.selection;
    console.log(thisSelection);
		const thisSelectedText = document.getText(thisSelection);
		// console.log(thisSelectedText);
		const thisSelectedUpcaseText = thisSelectedText.toUpperCase();
		// console.log(thisSelectedUpcaseText);

		editor.edit((edit: string) => edit.replace(thisSelection, thisSelectedUpcaseText));

		const workspaceUri = vscode.workspace.textDocuments[0].uri;
		const workspacePath = vscode.workspace.getWorkspaceFolder(workspaceUri)?.uri.fsPath;
		//console.log(workspacePath);

    const extensionPath = context.asAbsolutePath("");
		//console.log(extensionPath);

    // editor.selections = vscode.editor.selections.map( sel => new vscode.Selection(sel.start.translate(0,1), sel.end.translate(0,1)));
	});
	context.subscriptions.push(disposable);
  context.subscriptions.push(vscode.commands.registerCommand('kennings.modeC', () => {doInsert("modeC");}));
  context.subscriptions.push(vscode.commands.registerCommand('kennings.modeD', () => {doInsert("modeD");}));
  context.subscriptions.push(vscode.commands.registerCommand('kennings.modeP', () => {doInsert("modeP");}));
}


function doInsert (mode: string) {
  console.log("");
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

