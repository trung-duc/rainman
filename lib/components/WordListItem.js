Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _jsxFileName='src/components/WordListItem.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _WordListItem=require('../styles/components/WordListItem');var _WordListItem2=_interopRequireDefault(_WordListItem);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var WordListItem=function(_React$Component){_inherits(WordListItem,_React$Component);function WordListItem(){_classCallCheck(this,WordListItem);return _possibleConstructorReturn(this,(WordListItem.__proto__||Object.getPrototypeOf(WordListItem)).apply(this,arguments));}_createClass(WordListItem,[{key:'render',value:function render(){return _react2.default.createElement(_reactNative.TouchableHighlight,{onPress:this.props.onPress,__source:{fileName:_jsxFileName,lineNumber:45}},_react2.default.createElement(_reactNative.View,{style:_WordListItem2.default.item_whole,__source:{fileName:_jsxFileName,lineNumber:46}},_react2.default.createElement(_reactNative.Text,{style:_WordListItem2.default.word,__source:{fileName:_jsxFileName,lineNumber:47}},this.props.word),_react2.default.createElement(_reactNative.Text,{style:_WordListItem2.default.def,__source:{fileName:_jsxFileName,lineNumber:48}},this.props.def)));}}]);return WordListItem;}(_react2.default.Component);exports.default=WordListItem;