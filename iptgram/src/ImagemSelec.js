import React, { Component } from 'react'
import './ImagemSelec.css'

class ImagemSelec extends Component {
    constructor(props) {
        super(props);
        
        this.closeImg = this.closeImg.bind(this);
    }

    closeImg() {
        this.props.closeImg();
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
                

            </div>

        );

    }

}
export default ImagemSelec; 