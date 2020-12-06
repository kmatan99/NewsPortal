import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import '../scss/SearchBox.scss'

interface Props extends RouteComponentProps{
    getSearchValue: (searchValue: string) => void
}

class SearchBox extends React.Component<Props> {
    state = {
        inputValue: '',
    }
    
    render() {
        return(
            <div className="searchBox">
                <input className="inputText" placeholder="Search.." 
                    onChange={this.getInput}></input>
                <button className="searchButton" onClick={this.toSearchResults}>Go!</button>
            </div>
        )
    }

    getInput = (e:React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        this.setState({
            inputValue: target.value
        })
    }

    toSearchResults = () => {
        this.props.getSearchValue(this.state.inputValue);
        this.props.history.push("/searchResults")
    }
}

export default withRouter(SearchBox);