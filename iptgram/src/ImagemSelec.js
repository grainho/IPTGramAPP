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

    closeImg() {
        this.props.closeImg();
    }

    handleMudancaComentario(evt){
        this.setState({
            comentario:evt.target.value
        })
    }

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
                <button onClick={this.closeImg} >❌</button>              
                <br /><br />
                <img src={'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + this.props.image + '/image'} />
                <br />
                <span>{this.props.user}: </span> 
                <span>{this.props.subtitle}</span>
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
                <h3>Likes: {this.props.likes}</h3>

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