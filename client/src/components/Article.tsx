import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import '../scss/Article.scss'
import {IArticle} from '../Interfaces'

interface Props extends RouteComponentProps {
    article: IArticle
    className: string;
    favouriteClass?: string;
    topicClass?: string;
    topic: string;
    getUrl: (url: string) => void;
    getCategory: (category: string) => void;
    getArticle? : (articleUrl: string) => void;
}

class Article extends React.Component<Props> {

    render() {
        const {article} = this.props;
        return (
        <div className={this.props.className}>
            <div className="title">
                <p className="titleText" onClick={this.toArticle}>{article.title}</p>
            </div>
            <img src={article.urlToImage} alt=""></img>
            <div className="articleContent">
                <p className="contentText">{article.content}</p>
            </div>
            <div className="dateTopic">
                {
                    !this.props.favouriteClass ? null 
                        : <button className={this.props.favouriteClass} onClick={this.getArticleData}>❤️</button>
                }
                <p className="timeStamp">{article.publishedAt}</p>
                {
                    !this.props.topicClass ? null 
                        : <button className={this.props.topicClass} onClick={this.toCategory}>{this.props.topic}</button>
                }
            </div>
        </div>
        )
    }

    toArticle = () => {
        this.props.getUrl(this.props.article.url)
        this.props.history.push("/article")
    }

    toCategory = (e:React.SyntheticEvent) => {
        const target = e.target as HTMLButtonElement;
        this.props.getCategory(target.innerHTML);
        if(target.innerHTML === "Favourite"){
            this.props.history.push("/")
        }

        else {
            this.props.history.push("/category")
        }
    }

    getArticleData = () => {
        this.props.getArticle?.(this.props.article.url)
    }
}

export default withRouter(Article);