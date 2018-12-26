import ReactDOM       from "react-dom";
import React          from "react";
import CM             from "codemirror";
import classNames     from "classnames";
import * as PropTypes from "prop-types";
import * as Icons     from './icons';

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/continuelist';

import { getCursorState, applyFormat } from './format.js';

const Icon = ({ icon }) =>
    <span dangerouslySetInnerHTML={{ __html: icon }} className="MDEditor_toolbarButton_icon"/>;

const Button = ({ formatKey, label, action }) => {
    const isTextIcon = (formatKey === 'h1' || formatKey === 'h2' || formatKey === 'h3');
    const className = classNames('MDEditor_toolbarButton', {
        'MDEditor_toolbarButton--pressed': this.state.cs[formatKey]
    }, ('MDEditor_toolbarButton--' + formatKey));

    const labelClass = isTextIcon ? 'MDEditor_toolbarButton_label-icon' : 'MDEditor_toolbarButton_label';

    return (
        <button
            className={className}
            onClick={action}
            title={formatKey}
        >
            {
                isTextIcon ? null : <Icon icon={Icons[formatKey]}/>
            }
            <span className={labelClass}>
                {label}
            </span>
        </button>
    );
};

const toggleFormat = (codeMirror, formatKey, event) => {
    event.preventDefault();
    applyFormat(codeMirror, formatKey);
};

export class MarkdownEditor extends React.Component {
    static propTypes() {
        return {
            onChange: PropTypes.func,
            options:  PropTypes.object,
            path:     PropTypes.string,
            value:    PropTypes.string,
        };
    }

    componentDidMount() {
        this.codeMirror = CM.fromTextArea(ReactDOM.findDOMNode(this.codeMirrorElement), {
            mode:           'markdown',
            lineNumbers:    false,
            indentWithTabs: true,
            tabSize:        '2',
            ...this.props.options,
        });
        this.codeMirror.on('change', this.codemirrorValueChanged);
        this.codeMirror.on('focus', this.setFocusOn);
        this.codeMirror.on('blur', this.setFocusOff);
        this.codeMirror.on('cursorActivity', this.updateCursorState);
        this.currentCodeMirrorValue = this.props.value;
    }

    componentWillUnmount() {
        // todo: is there a lighter-weight way to remove the cm instance?
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.codeMirror && this.currentCodeMirrorValue !== nextProps.value) {
            this.codeMirror.setValue(nextProps.value);
        }
    }

    focus() {
        if (this.codeMirror) {
            this.codeMirror.focus();
        }
    }

    setFocusOn = () => {
        this.setState({ isFocused: true });
    };

    setFocusOff = () => {
        this.setState({ isFocused: false });
    };

    updateCursorState() {
        this.setState({ cs: getCursorState(this.codeMirror) });
    }

    codemirrorValueChanged = (doc) => {
        const newValue = doc.getValue();
        this.currentCodeMirrorValue = newValue;
        this.props.onChange && this.props.onChange(newValue);
    };

    toggleH1 = (event) => toggleFormat(this.codeMirror, 'h1', event);
    toggleH2 = (event) => toggleFormat(this.codeMirror, 'h2', event);
    toggleH3 = (event) => toggleFormat(this.codeMirror, 'h3', event);
    toggleBold = (event) => toggleFormat(this.codeMirror, 'bold', event);
    toggleItalic = (event) => toggleFormat(this.codeMirror, 'italic', event);
    toggleOList = (event) => toggleFormat(this.codeMirror, 'oList', event);
    toggleUList = (event) => toggleFormat(this.codeMirror, 'uList', event);
    toggleQuote = (event) => toggleFormat(this.codeMirror, 'quote', event);

    bindElement = codeMirrorElement => this.codeMirrorElement = codeMirrorElement;

    render() {
        const editorClassName = classNames('MDEditor_editor', { 'MDEditor_editor--focused': this.state.isFocused });
        const { path, value } = this.props;
        return (
            <div className="MDEditor">
                <div className="MDEditor_toolbar">
                    <Button
                        formatKey={'h1'}
                        label={'h1'}
                        action={this.toggleH1}
                    />
                    <Button
                        formatKey={'h2'}
                        label={'h2'}
                        action={this.toggleH2}
                    />
                    <Button
                        formatKey={'h3'}
                        label={'h3'}
                        action={this.toggleH3}
                    />
                    <Button
                        formatKey={'bold'}
                        label={'b'}
                        action={this.toggleBold}
                    />
                    <Button
                        formatKey={'italic'}
                        label={'i'}
                        action={this.toggleItalic}
                    />
                    <Button
                        formatKey={'oList'}
                        label={'ol'}
                        action={this.toggleOList}
                    />
                    <Button
                        formatKey={'uList'}
                        label={'ul'}
                        action={this.toggleUList}
                    />
                    <Button
                        formatKey={'quote'}
                        label={'q'}
                        action={this.toggleQuote}
                    />
                    {/*this.renderButton('link', 'a')*/}
                </div>
                <div className={editorClassName}>
                    <textarea
                        ref={this.bindElement}
                        name={path}
                        defaultValue={value}
                        autoComplete="off"
                    />
                </div>
            </div>
        );
    }

}

export default MarkdownEditor;
