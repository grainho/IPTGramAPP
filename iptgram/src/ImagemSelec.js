import React, { Component } from 'react'
import './ImagemSelec.css'

class ImagemSelec extends Component {
    constructor(props) {

        super(props);

        this.state={
            comentario:""
        }
        
        this.closeImg = this.closeImg.bind(this);
        this.handleMudancaComentario = this.handleMudancaComentario.bind(this);
        this.handleSubmicaoComentario = this.handleSubmicaoComentario.bind(this);
       
    }

    /**
     * faz referencia à função closeImg da classe Inicio
     */
    closeImg() {
        this.props.closeImg();
    }

    /**
     * Coloca no atributo comentario o valor na caixa de texto
     * @param {*} evt evento a ser ralizado
     */
    handleMudancaComentario(evt){
        this.setState({
            comentario:evt.target.value
        })
    }

    /**
     * faz referencia à função handleSubmicaoComentario da classe Inicio e coloca uma string vazia no atributo comentario
     * @param {*} evt evento a ser ralizado
     */
    handleSubmicaoComentario(evt){
        evt.preventDefault();
        this.props.handleSubmicaoComentario(this.state.comentario, this.props.image);
        this.setState({
            comentario:""
        })
    }

    

    render() {

        return (
            
            <div className="ImagemSelec">
                <button className="fechar" onClick={this.closeImg} >❌</button>              
                <br /><br />
                <img src={'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + this.props.image + '/image'} />
                <br />
                <span>{this.props.user}: {this.props.subtitle}</span>                 
                <br />              
                <span>Postado em: {this.props.date.substring(0, this.props.date.indexOf("T"))}</span>
                <br /><br />
                
                

                {
                    this.props.comments.map(function (c) {
                        return ([
                            
                            <span>{c.user.name}: </span>,
                            <span>{c.text}</span>,
                            <br />,
                            <span>Postado em: {c.postedAt.substring(0, c.postedAt.indexOf("T"))}</span>, 
                            <br />
                        ])
                    }.bind(this)
                    )
                }

               

                <span>Likes: {this.props.likes}</span>
                <br />

                {
                this.props.autenticado &&
                <form onSubmit ={this.handleSubmicaoComentario}>
                    <input id="subCom" type="text" value={this.state.comentario} onChange={this.handleMudancaComentario} placeholder="Deixe aqui o seu comentário"/>
                </form>
                }

            </div>

        );

    }

}
export default ImagemSelec; 