import ReactDOM       from "react-dom";
import React          from "react";
import CM             from "codemirror";
import classNames     from "classnames";
import * as PropTypes from "prop-types";

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/continuelist';

import * as styles from "./styles.modules.css";

import Button from "../Button";

import { getCursorState, applyFormat } from '../format.js';

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

    state = {
        focused: false,
        cs:      {},
    };

    componentDidMount() {
        this.codeMirror = CM.fromTextArea(ReactDOM.findDOMNode(this.codeMirrorElement), {
            mode:           'markdown',
            lineNumbers:    false,
            indentWithTabs: true,
            tabSize:        '2',
            ...this.props.options,
        });
        this.codeMirror.on('change', this.codeMirrorValueChanged);
        this.codeMirror.on('focus', this.setFocusOn);
        this.codeMirror.on('blur', this.setFocusOff);
        this.codeMirror.on('cursorActivity', this.updateCursorState);
        this.currentCodeMirrorValue = this.props.value || "";
    }

    componentWillUnmount() {
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.codeMirror && this.currentCodeMirrorValue !== nextProps.value) {
            this.codeMirror.setValue(nextProps.value);
        }
    }

    focus = () => this.codeMirror ? this.codeMirror.focus() : null;

    setFocusOn = () => this.setState({ isFocused: true });


    setFocusOff = () => this.setState({ isFocused: false });

    updateCursorState = () => this.setState({ cs: getCursorState(this.codeMirror) });

    codeMirrorValueChanged = (doc) => {
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
        const { path, value } = this.props;
        return (
            <div className={styles.MDEditor}>
                <div className={styles.toolbar}>
                    <Button
                        formatKey={'h1'}
                        label={'h1'}
                        action={this.toggleH1}
                        pressed={this.state.cs.h1}
                    />
                    <Button
                        formatKey={'h2'}
                        label={'h2'}
                        action={this.toggleH2}
                        pressed={this.state.cs.h2}
                    />
                    <Button
                        formatKey={'h3'}
                        label={'h3'}
                        action={this.toggleH3}
                        pressed={this.state.cs.h3}
                    />
                    <Button
                        formatKey={'bold'}
                        label={'b'}
                        action={this.toggleBold}
                        pressed={this.state.cs.bold}
                    />
                    <Button
                        formatKey={'italic'}
                        label={'i'}
                        action={this.toggleItalic}
                        pressed={this.state.cs.italic}
                    />
                    <Button
                        formatKey={'oList'}
                        label={'ol'}
                        action={this.toggleOList}
                        pressed={this.state.cs.oList}
                    />
                    <Button
                        formatKey={'uList'}
                        label={'ul'}
                        action={this.toggleUList}
                        pressed={this.state.cs.uList}
                    />
                    <Button
                        formatKey={'quote'}
                        label={'q'}
                        action={this.toggleQuote}
                        pressed={this.state.cs.quote}
                    />
                </div>
                <div className={classNames(
                    styles.editor,
                    { [styles.focused]: this.state.isFocused }
                )}>
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
