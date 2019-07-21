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
            mostraImg: {},
            procura: "",

        }
        this.Click = this.Click.bind(this);
        this.closeImg = this.closeImg.bind(this);
        this.procurar = this.procurar.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            image: resposta.data.id,
            user: resposta.data.user.name,
            date: resposta.data.postedAt,
            subtitle: resposta.data.caption,
            likes: resposta.data.likes

        }

        let commentsResposta = await axios.get('' + url + '/comments');
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


    async procurar(evt) {
        evt.preventDefault();
        let resposta = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/?query=' + this.state.procura);
        let listaPosts = resposta.data;

        this.setState({
            posts: listaPosts,
            SearchTxt: ""
        })
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value

         })
    }

    render() {
        return (
            <div className="PaginaInicial">
                <form className="PaginaInicial-SearchForm" onSubmit={this.procurar} >

                    <input placeholder="Pesquisar" name="procura" onChange={this.handleChange} value={this.state.procura} />
                    <button type="submit" >🔍</button>

                </form>
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