import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { IArticle } from '../Interfaces.js';

import Article from './Article';
import '../scss/CategoryPage.scss'

interface Props extends RouteComponentProps{
    topic: string;
    articles: IArticle[];
    getCategory: (category: string) => void;
    getUrl: (url: string) => void;
}

class CategoryPage extends React.Component<Props> {
    render() {
        return(
            <div className="main">
                <div className="header">
                    <p className="selectedCategory">Selected category: {this.props.topic}</p>
                    <button className="homeButton" onClick={this.toHome}>Home ⮞</button>
                </div>
                <div className="mainArticle">
                    {this.renderArticles()}
                </div>
            </div>
        )
    }

    renderArticles = () => {
        return(
            this.props.articles.map((article, index) => {
                return(
                    <Article 
                        key={"main-article-" + index}
                        article={article}
                        topic={this.props.topic}
                        className="articles"
                        getCategory={this.props.getCategory}
                        getUrl={this.props.getUrl}    
                    />
                )
            })
        )
    }

    toHome = () => {
        this.props.history.push("/")
    }
}

export default withRouter(CategoryPage);