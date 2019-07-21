import React, { Component } from 'react'


class Imagem extends Component {

    constructor(props) {
        super(props);
        this.Click = this.Click.bind(this);
    }

    Click() {
        //referncia o click que esta no ficheiro inicio
        this.props.Click(this.props.id)
    }
    render() {

        return (
            <div className="Image">
                <img src={'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + this.props.id + '/image'} onClick={this.Click} />
            </div>

        );
    }

}
export default Imagem; 