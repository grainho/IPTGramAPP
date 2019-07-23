import React, { Component } from 'react'
import './Imagem.css'


class Imagem extends Component {

    constructor(props) {
        super(props);
        this.Click = this.Click.bind(this);
    }

    /**
     * faz referencia à função Click da classe Inicio
     */
    Click() {
        
        this.props.Click(this.props.id)
    }
    render() {

        return (
            <div>
                <img id="Imagem" src={'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + this.props.id + '/image'} onClick={this.Click} />
            </div>

        );
    }

}
export default Imagem; 