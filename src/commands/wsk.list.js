'use strict';

var vscode = require('vscode');
let util = require('./util.js');

let wskAction = require('./wsk.action.js');
let wskPackage = require('./wsk.package.js');
let wskTrigger = require('./wsk.trigger.js');
let wskRule = require('./wsk.rule.js');

var log;
var ow;
var props;

function register(_ow, context, _log, _props) {
	ow = _ow;
	log = _log;
	props = _props;


	var disposable = vscode.commands.registerCommand('extension.wsk.list', list);
	context.subscriptions.push(disposable);
}

function list() {

	log.appendLine('\n$ wsk list');

	if (!props.validate()){
		return;
	}

	wskPackage.list()
	.then(function(){
		return wskAction.list()
	})
	.then(function(){
		return wskTrigger.list()
	})
	.then(function(){
		return wskRule.list()
	})
}


module.exports = {
	register: register
};