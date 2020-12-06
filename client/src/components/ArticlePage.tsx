import React from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom';

import ArticlesContainer from './ArticlesContainer'
import '../scss/ArticlePage.scss'
import { IArticlesData } from '../Interfaces';

interface Props extends RouteComponentProps {
    topics: string[];
    articlesData: IArticlesData;
    url: string;
    className: string;
    topicClass: string;
    getCategory: (category: string) => void;
    getUrl: (url: string) => void;
}

class ArticlePage extends React.Component<Props>{

    render() {
        return(
            <div className="main">
                <button className="toHome" onClick={this.toHome}>Home ⮞</button>
                <div className="article">{this.renderArticle()}</div>
            </div>
        )
    }
    
    findArticle = () => {
        var allFilteredArticles: IArticlesData = {}
        
        this.props.topics.forEach(topic => {
            const filteredArticles = this.props.articlesData[topic].filter((article, index) => {
                return article.url === this.props.url
            })
            allFilteredArticles[topic] = filteredArticles               
        })

        return allFilteredArticles
    }

    renderArticle = () => {
        const articles = this.findArticle();

        return Object.keys(articles).map((topic, index) => {
            return(
                <ArticlesContainer 
                    key={"main-article- " + index}
                    articles={articles[topic]}
                    topic={topic}
                    className={this.props.className}
                    topicClass={this.props.topicClass}
                    getCategory={this.props.getCategory}
                    getUrl={this.props.getUrl}
                />
            )
        })
    }

    toHome = () => {
        this.props.history.push("/")
    }
}

export default withRouter(ArticlePage);