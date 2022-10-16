

import * as vscode from "vscode";
import * as path from "path";
import * as FS from "fs";
import * as CP from "child_process";
// editor.edit((edit: string) => edit.replace(thisSelection, thisSelectedUpcaseText));
// editor.selections = vscode.editor.selections.map( sel => new vscode.Selection(sel.start.translate(0,1), sel.end.translate(0,1)));


export class doKennings {

  static activeDocument: any;
  static activeEditor: any;
  static activeFilename: any;
  static activeFilepath: any;
  static activeWindow: any;
  static extensionKenningsFiletypes : any;
  static extensionPath: any;
  static fileKenningsFiletypes: any;
  static inputItems: any;
  static isReady: boolean;
  static myArgs: any;
  static myContext: any;
  static myERR: any;
  static mySTDERR: any;
  static mySTDOUT: any;
  static RESULT: any;
  static theseSettings: any;
  static thisCharacterPosition: any;
  static thisIndent: any;
  static thisLanguage: any;
  static thisSelectedText: any;
  static thisSelection: any;
  static thisTabsize: any;
  static workspaceKenningsFiletypes: any;
  static workspaceName: any;
  static workspacePath: any;
  static workspaceUri: any;


  initKennings (context:vscode.ExtensionContext): void {
    doKennings.isReady = false;
    doKennings.extensionKenningsFiletypes = [];
    doKennings.fileKenningsFiletypes = [];
    doKennings.workspaceKenningsFiletypes = [];
    doKennings.mySTDOUT = ``;

    doKennings.myContext = context;
    doKennings.extensionPath = doKennings.myContext.asAbsolutePath(``);
    doKennings.activeWindow = vscode.window;
    doKennings.activeEditor = doKennings.activeWindow.activeTextEditor;
    doKennings.thisTabsize = doKennings.activeEditor.options.tabSize;
    doKennings.theseSettings = doKennings.activeEditor?.selections;
    doKennings.thisSelection = doKennings.activeEditor?.selection;
    // fix for multiple selections
    doKennings.activeDocument = doKennings.activeEditor.document;
    doKennings.activeFilename = doKennings.activeDocument.fileName;
    doKennings.thisLanguage = doKennings.activeDocument.languageId;
    doKennings.thisSelectedText = doKennings.activeDocument.getText(doKennings.thisSelection);
    doKennings.activeFilepath = path.dirname(doKennings.activeFilename);
    doKennings.thisCharacterPosition = doKennings.thisSelection.active.character;
    doKennings.thisIndent = doKennings.thisCharacterPosition; // Needs to actually count spaces at front of selected line.
    doKennings.workspaceUri = vscode.workspace.textDocuments[0].uri;
    doKennings.workspacePath = vscode.workspace.getWorkspaceFolder(doKennings.workspaceUri)?.uri.fsPath;
    doKennings.workspaceName = vscode.workspace.name;

    // Check global/extension files and directories.
    try {
      FS.accessSync(`${doKennings.extensionPath}/.vscode/kennings`);
    }
    catch (e) {
      FS.mkdirSync(`${doKennings.extensionPath}/.vscode/kennings`, {recursive: true});
    }
    try {
      FS.accessSync(`${doKennings.extensionPath}/.vscode/kennings.json`);
    }
    catch (e) {
      console.log(`make kennings.json file`);
      // in theory should never be here
    }

    // Check workspace files and directories.
    try {
      FS.accessSync(`${doKennings.workspacePath}/.vscode/kennings/.kenningsTemp`);
    }
    catch (e) {
      FS.mkdirSync(`${doKennings.workspacePath}/.vscode/kennings/.kenningsTemp`, {recursive: true});
    }
    try {
      FS.accessSync(`${doKennings.workspacePath}/.vscode/kennings.json`);
    }
    catch (e) {
      console.log(`make kennings.json file`);
    }

    this.refreshWorkspaceFiles();
    // create workspace folders if needed.
    // create workspace settings if needed.
    // subscribe to workspace and file changes.
  }


  insertKenning (keys: string): void {
    doKennings.myArgs = keys;
    console.log(`keys ${keys}`);
  }


  makeEmptyKenningsJsonFile(pathToUse: string): void {
    const dataToWrite = FS.readFileSync(`${doKennings.extensionPath}/.vscode/kennings/empty.kennings.json`);
    FS.writeFileSync(`${pathToUse}/kennings.json`, `${dataToWrite}`);
  }


  makeEmptyExtKenningsJsonFile(pathToUse: string, extensionToUse: string): void {
    const dataToWrite = FS.readFileSync(`${doKennings.extensionPath}/.vscode/kennings/empty.ZZZ.kennings.json`);
    FS.writeFileSync(`${pathToUse}/${extensionToUse}.kennings.json`, `${dataToWrite}`);
  }


  refreshWorkspaceFiles(): void {
    doKennings.isReady = false;
    CP.exec(``, (error, stdout, stderr) => {
      doKennings.myERR = error;
      doKennings.mySTDERR = stderr;
      doKennings.mySTDOUT = stdout;
      doKennings.isReady = true;
    });
  }


//
}
//
