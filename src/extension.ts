

import * as vscode from "vscode";
import * as doKennings from "./doKennings";

export function activate(context: vscode.ExtensionContext) {
  const DoKennings = new doKennings.doKennings();
  context.subscriptions.push(vscode.commands.registerCommand(`extension.insertKenning`, (_) => {
      DoKennings.insertKenning(_);
  }));
  context.subscriptions.push(vscode.commands.registerCommand(`extension.refreshWorkspaceFiles`, () => {
      DoKennings.refreshWorkspaceFiles();
  }));
  DoKennings.initKennings(context);
  console.log(`Kennings activated`);
}


//
