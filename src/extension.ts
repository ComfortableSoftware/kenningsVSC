

import * as vscode from "vscode";
import * as doKennings from "./doKennings";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
    console.log("hello");
	}));
  const DoKennings = new doKennings.doKennings();
  context.subscriptions.push(vscode.commands.registerCommand('extension.doKenning', (_) => {
      DoKennings.insertKennings(_, context);
  }));
  console.log("Kennings activated");
}


//
