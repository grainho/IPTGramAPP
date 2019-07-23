import React, { Component } from 'react'
import axios from 'axios'
import Imagem from './Imagem'
import ImagemSelec from './ImagemSelec';
import './Inicio.css'

class Inicio extends Component {
    constructor(props) {
        super(props);
        //criar um objeto state que contem os varios atributos que irão ser utilizados para a construção da app
        this.state = {
            //array com informação de cada post
            posts: [],
            //bol com a informação se mostra ou nao pop up
            mostraPopup: false,
            //objeto com informações sobre o post a mostrar no popup
            mostraImg: {},
            //string com o texto do procurar
            procura: "",
            //string com o username
            username: "",
            //string com a password
            password: "",
            //bol com a informção se se está autenticado ou não
            estaAutenticado: false,

        }
        //fazer com a cada chamada de cada uma destas funções se mantenha o contexto atraves da utilização do bind
        this.Click = this.Click.bind(this);
        this.closeImg = this.closeImg.bind(this);
        this.procurar = this.procurar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Login = this.Login.bind(this);
        this.LogOut = this.LogOut.bind(this);
        this.handleSubmicaoComentario = this.handleSubmicaoComentario.bind(this);

    }

    /**
     * Vai buscar à api os dados sobre os posts atraves do metodo axios.get() e coloca-os no atributo posts do objeto this.state
     * async/await: ajuda a escrever o codigo de forma assincrona de modo a que pareça que é sincrono
     */
    async componentDidMount() {
        let resposta = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts');
        let listaPosts = resposta.data;

        this.setState({
            posts: listaPosts
        })
    }

    /**
     * Coloca no atributo mostaImg do this.state os dados do post com o id indicado e passa o atributo mostraPopup a verdadeiro para que se mostre o popup
     * @param {*} id id ao qual se quer as informações do post
     */
    async Click(id) {
        let url = 'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id
        let resposta = await axios.get(url);


        let obj = {
            imagem: "" + id,
            user: resposta.data.user.name,
            date: resposta.data.postedAt,
            subtitle: resposta.data.caption,
            likes: resposta.data.likes,
            comments: [],
            isLiking: resposta.data.isLiking


        }

        let commentsResposta = await axios.get(url + '/comments');
        obj.comments = commentsResposta.data;

        this.setState({
            mostraImg: obj,
            mostraPopup: true
        })

    }

    /**
     * Coloca o atributo mostraPopup a false para que o popup seja fechado
     */
    closeImg() {
        this.setState({
            mostraPopup: false
        })
    }

    /**
     * Coloca no atributo posts os dados sobre os posts com ligação ao texto escrito na barra de pesquisa
     * @param {*} evt evento a ser realizado
     */
    async procurar(evt) {
        //Cancela o evt se for cancelável, sem parar a propagação do mesmo.
        evt.preventDefault();
        let resposta = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/?query=' + this.state.procura);
        let listaPosts = resposta.data;

        this.setState({
            posts: listaPosts,
            procura: ""
        })
    }

    /**
     * Faz altera o name do campo que está a sofrer o evento pelo seu valor
     * @param {*} evt evento a ser realizado
     */
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value

        })
    }


    /**
     * Faz o login do utilizador enviando por metodo post os dados do utilizador e se tiver sucesso altera o atributo estaAutenticado para true
     * @param {*} evt evento a ser realizado
     */
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

            this.setState({

                estaAutenticado: true
            }
            )
        } else {
            console.log(resposta.status);
        }
    }

    /**
     * Faz o logout do utilizador e coloca nos atributos username e password a string vazia e o atributo estaAutenticado a false
     * @param {*} evt 
     */
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
            username: "",
            password: "",
            estaAutenticado: false
        })



    }

    /**
     * Submete um comentario um comentario dado o comentario e o id do post
     * @param {*} comentario comentario a ser submetido
     * @param {*} id id do post a que se ta a submeter
     */
    async handleSubmicaoComentario(comentario, id) {
        let obj = {
            "postId": id,
            "text": comentario
        };
        let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/comments', obj, {
            withCredentials: true,
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        //faz um novo pedido pelos comentarios do post
        this.Click(id);


    }





    render() {
        return (
            <div className="PaginaInicial">
                <div className="cabecalho">
                    <div className="logo">
                        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9NgPW1x6JJ5-NUIToRl7Z09FEOwzWYiP8ZHuBb7Gt7EojftyNoA" />

                    </div>
                    <div className="nomeApp">
                        <h2>IPTGram</h2>
                    </div>

                    <form className="Pesquisa" onSubmit={this.procurar} >

                        <input className="caixaTextoPro" placeholder="Pesquisar" name="procura" onChange={this.handleChange} value={this.state.procura} />
                        <button type="submit" >🔍</button>

                    </form>
                    {
                        (this.state.estaAutenticado) ?


                            <div className="LogOut">
                                <div className="ola">
                                    <h2>Olá {this.state.username}</h2>
                                </div>
                                <button onClick={this.LogOut}>Logout</button>
                            </div>

                            :
                            <form id="Login" onSubmit={this.Login}>
                                Login: <br />
                                <input className="entrar" type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} /> <br />
                                <input className="entrar" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} /> <br />
                                <button className="submeter" type="submit">Login</button>
                            </form>
                    }
                </div>


                <br />
                <br />
                <br />
                <br />
                <br />
                <hr />

                {
                    this.state.posts.map(function (p) {
                        return ([
                            <div className="Post">
                                <h1>{p.caption}</h1>
                                <h2>{p.user.name}</h2>
                                <Imagem id={p.id} Click={this.Click} />
                                <h2>{p.postedAt.substring(0, p.postedAt.indexOf("T"))}</h2>
                                <h3>Likes: {p.likes}</h3>
                                <h3>Comments: {p.comments}</h3>
                                <hr />
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
                        isLiking={this.state.mostraImg.isLiking}
                        comments={this.state.mostraImg.comments}
                        closeImg={this.closeImg}
                        handleSubmicaoComentario={this.handleSubmicaoComentario}
                        autenticado={this.state.estaAutenticado}

                    />

                }

            </div>

        );
    }

}
export default Inicio; 