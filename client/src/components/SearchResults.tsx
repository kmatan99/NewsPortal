import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import ArticleContainer from './ArticlesContainer';
import '../scss/SearchResults.scss'
import { IArticlesData } from '../Interfaces';

interface Props extends RouteComponentProps{
    searchValue: string;
    topics: string[];
    articlesData: IArticlesData;
    topicClass: string;
    className: string;
    getCategory: (category: string) => void;
    getUrl: (url: string) => void;
}

class SearchResults extends React.Component<Props> {
    render() {
        return(
            <div className="main">
                 <div className="header">
                    <p className="selectedCategory">Showing results for: {this.props.searchValue}</p>
                    <button className="homeButton" onClick={this.toHome}>Home ⮞</button>
                </div>
                <div className="mainArticle">
                    {this.renderFilteredArticles()}
                </div>
            </div>
        )
    }

    filterRender = () => {
        var allFilteredArticles: IArticlesData = {}

        this.props.topics.forEach(topic => {
            const filteredArticles = this.props.articlesData[topic].filter((article, index) => {
                return article.title.toLowerCase().includes(this.props.searchValue.toLowerCase()) 
                        || article.description.toLowerCase().includes(this.props.searchValue.toLowerCase())
            })
            allFilteredArticles[topic] = filteredArticles
        })

        console.log(allFilteredArticles)
        return allFilteredArticles;
    }

    renderFilteredArticles = () => {
        const articles = this.filterRender();

        return Object.keys(articles).map((topic, index) => {
            return(
                <ArticleContainer 
                    key={"main-article- " + index}
                    articles={articles[topic]}
                    topic={topic}
                    className="articles"
                    mainArticleClass="mainArticle"
                    topicClass={this.props.topicClass}
                    getCategory={this.props.getCategory}
                    getUrl={this.props.getUrl}    
                />
            )
        })
    }

    toHome = () => {
        this.props.history.push("/value")
    }
}

export default withRouter(SearchResults);