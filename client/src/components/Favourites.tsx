import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import Article from './Article';
import '../scss/Favourites.scss';
import {IArticlesData, IArticle} from '../Interfaces';

interface Props extends RouteComponentProps{
    favouriteClass: string;
    favouriteArticles: string;
    favouritesList: String[];
    articlesData: IArticlesData;
    topics: string[];
    getCategory: (category: string) => void;
    getUrl: (url: string) => void;
}

class Favourites extends React.Component<Props> {
    render() {
        return(
            <div className={this.props.favouriteClass}>
                {!this.props.favouritesList.length ? <p></p> : <p className="paragraph">Favourite articles</p>}
                <div className="favArticles">{this.renderFavourites()}</div>
            </div>
        )
    }

    filterFavourites = () => {
        var filteredArticles: IArticle[] = []

        if(Object.keys(this.props.articlesData).length < this.props.topics.length){
            return null
        }

        console.log(Object.keys(this.props.articlesData).length)
        console.log(this.props.articlesData)

        this.props.topics.forEach(topic => {
            this.props.favouritesList.forEach(articleUrl => {
                this.props.articlesData[topic].forEach(article => {
                    if(article.url === articleUrl) {
                        filteredArticles.push(article)
                    }
                })
            })
        })
        
        return filteredArticles;
    }

    renderFavourites = () => {
        var articles = this.filterFavourites()

        if(articles === null) {
            return null
        }

        return articles.map((article, index) => {
            return(
                <Article 
                    key={"main-article- " + index}
                    article={article}
                    topic="Favourite"
                    getCategory={this.props.getCategory}
                    getUrl={this.props.getUrl}
                    className={this.props.favouriteArticles}
                    topicClass="topicClass"
                />
            )
        })
    }
}

export default withRouter(Favourites);