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

// import * as path from 'path';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log("Congratulations, your extension 'kenningsVS' is now active!");

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		window.showInformationMessage("Hello World, don't be a trumpstrap yo!");
		const uri = workspace.textDocuments[0].uri;
		const openFiles = workspace.textDocuments;
		for (let i = 0; i < openFiles.length; i++) {
				const thisUri: string  = openFiles[i].uri.authority;
				console.log("thisUri", thisUri);
				if (thisUri.substring(0,4) == "file:") {
					console.log(openFiles[i]);
					console.log(path.dirname(openFiles[i].fileName));
				}
		}
		console.log();
		const workspacePath = workspace.getWorkspaceFolder(uri)?.uri.fsPath;
		//const newFilename = myFile.uri.fspath;
		//console.log(newFilename);
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		//console.log(TextEditor.document.);
	});

	context.subscriptions.push(disposable);


}
function sendToTerminal(stringToSend: string) {
	cp.exec("echo ${stringToSend}", (err, stdout, stderr) => {
    console.log("stdout: " + stdout);
    console.log("stderr: " + stderr);
    if (err) {
        console.log("error: " + err);
    }
});
}

