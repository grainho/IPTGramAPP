import React, { Component } from 'react'
import axios from 'axios'
import Imagem from './Imagem'
import ImagemSelec from './ImagemSelec';
import './Inicio.css'

class Inicio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            mostraPopup: false,
            mostraImg: {}

        }
        this.Click = this.Click.bind(this);
        this.closeImg = this.closeImg.bind(this);
    }

    async componentDidMount() {
        let resposta = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts');
        let listaPosts = resposta.data;

        this.setState({
            posts: listaPosts
        })
    }

    async Click(id) {
        let url = 'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id
        let resposta = await axios.get(url);

        let obj = {
            image: "" + url + "/image",
            user: resposta.data.user.name,
            date: resposta.data.postedAt,
            subtitle: resposta.data.caption,
            likes: resposta.data.likes

        }
        
        let commentsResposta = await axios.get(''+url+ '/comments');
        obj.comments = commentsResposta.data;

        this.setState({
            mostraImg: obj,
            mostraPopup: true
        })

    }

    closeImg() {
        this.setState({
            mostraImg: false
        })
    }

    render() {
        return (
            <div className="PaginaInicial">
                {
                    this.state.posts.map(function (p) {
                        return ([
                            <div className="Post">
                                <h1>{p.caption}</h1>
                                <h2>{p.user.name}</h2>
                                <Imagem id={p.id} Click={this.Click} className="foto" />
                                <h2>{p.postedAt.substring(0, p.postedAt.indexOf("T"))}</h2>
                                <h3>Likes: {p.likes}</h3>
                                <h3>Comments: {p.comments}</h3>
                            </div>
                        ])
                    }.bind(this)
                    )
                }
                {
                    // se for verdade e renderizado senao nao e
                    this.state.mostraImg &&
                    <ImagemSelec
                        image={this.state.mostraImg.imagem}
                        user={this.state.mostraImg.user}
                        date={this.state.mostraImg.date}
                        subtitle={this.state.mostraImg.subtitle}
                        likes={this.state.mostraImg.likes}
                    />

                }
            </div>
        );
    }

}
export default Inicio; 