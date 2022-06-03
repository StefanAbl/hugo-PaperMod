/*
 * highlight.js terraform syntax highlighting definition
 *
 * @see https://github.com/highlightjs/highlight.js
 *
 * :TODO:
 *
 * @package: highlightjs-terraform
 * @author:  Nikos Tsirmirakis <nikos.tsirmirakis@winopsdba.com>
 * @since:   2019-03-20
 *
 * Description: Terraform (HCL) language definition
 * Category: scripting
 */

var module = module ? module : {};     // shim for browser use

function hljsDefineTerraform(hljs) {
	var NUMBERS = {
		className: 'number',
		begin: '\\b\\d+(\\.\\d+)?',
		relevance: 0
	};
	var STRINGS = {
		className: 'string',
		begin: '"',
		end: '"',
		contains: [{
			className: 'variable',
			begin: '\\${',
			end: '\\}',
			relevance: 9,
			contains: [{
				className: 'string',
				begin: '"',
				end: '"'
			}, {
			className: 'meta',
			begin: '[A-Za-z_0-9]*' + '\\(',
			end: '\\)',
			contains: [
				NUMBERS, {
					className: 'string',
					begin: '"',
					end: '"',
					contains: [{
						className: 'variable',
						begin: '\\${',
						end: '\\}',
						contains: [{
							className: 'string',
							begin: '"',
							end: '"',
							contains: [{
								className: 'variable',
								begin: '\\${',
								end: '\\}'
							}]
						}, {
							className: 'meta',
							begin: '[A-Za-z_0-9]*' + '\\(',
							end: '\\)'
						}]
					}]
          		},
          	'self']
			}]
		}]
	};

return {
	aliases: ['tf', 'hcl'],
	keywords: 'resource variable provider output locals module data terraform|10',
	literal: 'false true null',
	contains: [
   		hljs.COMMENT('\\#', '$'),
   		NUMBERS,
		STRINGS
	]
}
}

module.exports = function(hljs) {
    hljs.registerLanguage('terraform', hljsDefineTerraform);
};

module.exports.definer = hljsDefineTerraform;

class CopyButtonPlugin{constructor(options={}){self.hook=options.hook;self.callback=options.callback}"after:highlightElement"({el,text}){let button=Object.assign(document.createElement("button"),{innerHTML:"Copy",className:"hljs-copy-button"});button.dataset.copied=false;el.parentElement.classList.add("hljs-copy-wrapper");el.parentElement.appendChild(button);el.parentElement.style.setProperty("--hljs-theme-background",window.getComputedStyle(el).backgroundColor);button.onclick=function(){if(!navigator.clipboard)return;let newText=text;if(hook&&typeof hook==="function"){newText=hook(text,el)||text}navigator.clipboard.writeText(newText).then(function(){button.innerHTML="Copied!";button.dataset.copied=true;let alert=Object.assign(document.createElement("div"),{role:"status",className:"hljs-copy-alert",innerHTML:"Copied to clipboard"});el.parentElement.appendChild(alert);setTimeout(()=>{button.innerHTML="Copy";button.dataset.copied=false;el.parentElement.removeChild(alert);alert=null},2e3)}).then(function(){if(typeof callback==="function")return callback(newText,el)})}}}