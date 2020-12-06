import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { IArticle } from '../Interfaces.js';

import Article from './Article';

interface Props extends RouteComponentProps{
    articles: IArticle[];
    topic: string;
    className:  string;
    mainArticleClass?: string;
    favouriteClass?: string;
    topicClass: string;
    getCategory: (category: string) => void;
    getUrl: (url: string) => void;
    getArticle?: (articleUrl: string) => void;
}

class ArticlesContainer extends React.Component<Props>{
    render() {
        return(
            <div className={this.props.mainArticleClass}>{this.renderArticles()}</div>
        )
    }

    renderArticles = () => {
        return(
            this.props.articles.map((article, index) => {
                return(
                    <Article 
                        key={"main-article- " + index}
                        article={article}
                        topic={this.props.topic}
                        className={this.props.className}
                        favouriteClass={this.props.favouriteClass}
                        topicClass={this.props.topicClass}
                        getCategory={this.props.getCategory}
                        getUrl={this.props.getUrl}
                        getArticle={this.props.getArticle}
                    />
                )
            })
        )
    }
}


export default withRouter(ArticlesContainer);