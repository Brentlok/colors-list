import React, { Component } from 'react';
import Form from '../Form';
import Input from '../Input';
import Submit from '../Submit';

interface State {
    color: string;
    showInfo: boolean;
}

class AddColor extends Component {
    state: State = {
        color: '',
        showInfo: false,
    };

    changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        let color: string = e.target.value.toUpperCase();

        if ((color[0] === '#' && color.length === 1) || color === '') {
            this.setState({ color });
            return;
        }

        if (color.length < 2) {
            color = '#' + color;
        }
        const colorRegExp: RegExp = /^#?([A-F0-9]){1,6}$/;

        if (colorRegExp.test(color)) {
            this.setState({ color });
        }
    };

    handleColorAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.state.color.length < 7) {
            this.setState({ showInfo: true });
            return;
        }
        this.setState({ showInfo: false, color: '' });
    };

    render() {
        return (
            <Form onSubmit={this.handleColorAdd}>
                <Input
                    placeholder="#FFFFFF"
                    value={this.state.color}
                    onChange={this.changeColor}
                />
                <Submit value="Add new color" />
                {this.state.showInfo && (
                    <p className="info">Please enter correct color</p>
                )}
            </Form>
        );
    }
}

export default AddColor;
