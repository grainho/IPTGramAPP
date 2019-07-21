import React, { Component } from 'react'

class ImagemSelec extends Component {
    constructor(props) {
        super(props);
        this.statev= {
          
        }
        this.closeImg = this.closeImg.bind(this);
    }

    closeImg() {
        this.props.closeImg();
    }

    render() {

        return (
            <div className="ImagemSelec">
                <img src={this.props.image} />
                <h1>{this.props.user}</h1>
                <h3>{this.props.date}</h3>
                <h3>{this.props.likes}</h3>
                <h3>{this.props.subtitle}</h3>

                {/*
                    this.props.comments.map(function (c) {
                        return ([
                            <h4>{c.text}</h4>,
                            <h4>{c.user.name}</h4>,
                            <h4>{c.postedAt}</h4>
                        ])
                    }.bind(this)
                    )
                */}
                <button onClick={this.closePopup}>❌</button>

            </div>

        );

    }

}
export default ImagemSelec; 