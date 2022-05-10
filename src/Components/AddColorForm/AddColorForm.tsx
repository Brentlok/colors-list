import React, { Component } from 'react';
import Form from '../Form';
import Input from '../Input';
import Submit from '../Submit';

interface State {
    color: string;
    showInfo: boolean;
}

type colorList = string[] | null;

class AddColorForm extends Component {
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

        let oldColorList: string | null = localStorage.getItem('colorList');

        if (typeof oldColorList === 'string') {
            //if there are some colors already saved
            const newColorList = [
                ...JSON.parse(oldColorList),
                this.state.color,
            ];
            this.saveColorList(newColorList);
            return;
        }

        this.saveColorList([this.state.color]);
    };

    saveColorList = (colorList: colorList) => {
        localStorage.setItem('colorList', JSON.stringify(colorList));
        window.dispatchEvent(new Event('storage'));
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

export default AddColorForm;
