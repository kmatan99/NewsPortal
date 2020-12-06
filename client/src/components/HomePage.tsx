import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import '../scss/HomePage.scss';
import Header from './Header';
import ArticlesContainer from './ArticlesContainer';
import CategoryPage from './CategoryPage';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import ArticlePage from './ArticlePage';
import Favourites from './Favourites';

import {IArticle, IArticlesData} from '../Interfaces';


const topics = ['Bitcoin', 'Guitar', 'Intel', 'Nvidia'];
const apiKey = 'ae388ebe56684504b45f569edd198d0d';
//const allData = require('../articles.json')

interface State {
        articlesData: IArticlesData;
        category: string;
        searchValue: string;
        url: string;
        favouritesList: String[];
}

interface Props {}

class HomePage extends React.Component<Props, State> {
    state: State = {
        articlesData: {},
        category: "",
        searchValue: "",
        url: "string",
        favouritesList: []
    }
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/category">
                        {this.renderCategoryPage()}
                    </Route>

                    <Route path="/article">
                        <ArticlePage 
                            topics={topics}
                            articlesData={this.state.articlesData}
                            className="fullPageArticle"
                            topicClass="topic"
                            url={this.state.url}
                            getCategory={this.getCategory}
                            getUrl={this.getUrl}    
                        />
                    </Route>

                    <Route path="/searchResults">
                        <SearchResults 
                            topics={topics}
                            searchValue={this.state.searchValue}
                            articlesData={this.state.articlesData}
                            className="mainArticles"
                            topicClass="topic"
                            getCategory={this.getCategory}
                            getUrl={this.getUrl}    
                        />
                    </Route>

                    <Route path="/">
                        <div className="mainWrapper">
                            <Header />
                            <SearchBox 
                                getSearchValue={this.getSearchValue}/>
                                <Favourites 
                                    articlesData={this.state.articlesData}
                                    topics={topics}
                                    favouritesList={this.state.favouritesList}
                                    favouriteClass="favourites"
                                    favouriteArticles="favouriteArticles"
                                    getCategory={this.getCategory}
                                    getUrl={this.getUrl}
                                />
                            <div className="articleWrapper">
                                    <div className="mainContainer">
                                        {this.sendMainArticlesListToChild()}
                                    </div>
                    
                                    <div className="auxContainer">
                                        {this.sendAuxArticlesListToChild()}
                                    </div>
                            </div>
                        </div>   
                    </Route>
                </Switch>
            </Router>
        )
    }

    componentDidMount = () => {
        topics.forEach(topic => this.getData(topic, apiKey));
        this.getFavouritesList();
    }

    getData = (topic: string, apiKey: string) => {
        const qInTitle = topic;
    
        axios.get('https://newsapi.org/v2/everything', {
            params: {
                qInTitle,
                apiKey
            }})
            .then(response => this.setState({
                articlesData : {...this.state.articlesData, [topic]: this.sortArticles(response.data.articles)} 
            }, () => console.log(this.state.articlesData))
            )
    }
    
    sendMainArticlesListToChild = () => {
        return(
            topics.slice(0, 2).map((topic, index) => {  
                if (!this.state.articlesData[topic]) {
                    return null;
                }
                return (
                    <ArticlesContainer  
                        key={"main-article- " + index}
                        articles={this.state.articlesData[topic]}
                        topic={topic}
                        className="mainArticles"
                        favouriteClass="favouriteClass"
                        topicClass="topic"
                        getCategory={this.getCategory}
                        getUrl={this.getUrl}
                        getArticle={this.getArticle}
                    />
                )
            })
        )
    }

    sendAuxArticlesListToChild = () => {
        return(
            topics.slice(2, 4).map((topic, index) => {  
                if (!this.state.articlesData[topic]) {
                    return null;
                }
                
                return (
                    <ArticlesContainer  
                        key={"aux-article- " + index}
                        articles={this.state.articlesData[topic]}
                        topic={topic}
                        className="auxArticles"
                        favouriteClass="favouriteClass" 
                        topicClass="topic"
                        getCategory={this.getCategory}
                        getUrl={this.getUrl}
                        getArticle={this.getArticle}
                    />
                )
            })
        )
    }

    sortArticles = (articles: IArticle[]) => {
        articles.sort((a, b) => {return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()}).reverse();
        return articles;
    }

    getCategory = (category: string) => {
        this.setState({
            category: category
        })
    }

    renderCategoryPage = () => {
        if (!this.state.articlesData[this.state.category]) {
            return null;
        }
        return(
            <CategoryPage
                articles={this.state.articlesData[this.state.category]}
                topic={this.state.category}
                getCategory={this.getCategory}
                getUrl={this.getUrl}    
            />
        )
    }

    getSearchValue = (value: string) => {
        this.setState({
            searchValue: value
        })
    }

    getUrl = (targetURL: string) => {
        this.setState({
            url: targetURL
        })
    }

    getArticle = (articleData: string) => {
        this.addToFavourites(articleData)
    }

    addToFavourites = (articleUrl: string) => {
        axios.post('http://localhost:3001/addFavourite', {
            url: articleUrl
        })
        .then((response) => {
            this.setState({
                favouritesList: response.data
            })
        })
    }   

    getFavouritesList = () => {
        axios.get('http://localhost:3001/getFavourites')

        .then((response) => {
            this.setState({
                favouritesList: response.data
            })
        })
    }
}

export default HomePage;