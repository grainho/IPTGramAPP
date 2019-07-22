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
            username: "",
            password: "",
            estaAutenticado: false,

        }
        this.Click = this.Click.bind(this);
        this.closeImg = this.closeImg.bind(this);
        this.procurar = this.procurar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Login = this.Login.bind(this);
        this.LogOut = this.LogOut.bind(this);
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
            imagem: ""+id,
            user: resposta.data.user.name,
            date: resposta.data.postedAt,
            subtitle: resposta.data.caption,
            likes: resposta.data.likes,
            comments: []

        }
        
        let commentsResposta = await axios.get(url + '/comments');
        obj.comments = commentsResposta.data;
        
        this.setState({
            mostraImg: obj,
            mostraPopup: true
        })

    }

    closeImg() {
        this.setState({
            mostraPopup: false
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


    async Login(evt) {
        evt.preventDefault();
        let obj = {
            "username": this.state.username,
            "password": this.state.password

        }

        let resposta = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/account/login', obj, {
            withCredentials: true,
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        //Se a auticação tiver exito
        if (resposta.status === 200) {
            console.log(resposta.status);
            this.setState({
                username: "",
                password: "",
                estaAutenticado: true
            }
            )
        } else {
            console.log(resposta.status);
        }
    }


    async LogOut(evt) {
        evt.preventDefault();



        let resposta = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/account/logout', null, {
            withCredentials: true,
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        this.setState({
            estaAutenticado: false
        })



    }

    render() {
        return (
            <div className="PaginaInicial">
                <div className="cabecalho">
                    <form className="PaginaInicial-SearchForm" onSubmit={this.procurar} >

                        <input placeholder="Pesquisar" name="procura" onChange={this.handleChange} value={this.state.procura} />
                        <button type="submit" >🔍</button>

                    </form>
                    {
                        (this.state.estaAutenticado) ?
                            <div className="LogOut">
                                <button  onClick={this.LogOut}>Logout</button>
                            </div>
                            :
                            <form className="PaginaInicial-LoginForm" onSubmit={this.Login}>
                                Login: <br />
                                <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} /> <br />
                                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} /> <br />
                                <button className="submeter" type="submit">Login</button>
                            </form>
                    }
                </div>




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
                   this.state.mostraPopup && 
                    <ImagemSelec
                        image={this.state.mostraImg.imagem}                
                        user={this.state.mostraImg.user}
                        date={this.state.mostraImg.date}
                        subtitle={this.state.mostraImg.subtitle}
                        likes={this.state.mostraImg.likes}
                        comments={this.state.mostraImg.comments}
                        closeImg={this.closeImg}
                    />
                    
                }
                
            </div>
            
        );
    }

}
export default Inicio; 