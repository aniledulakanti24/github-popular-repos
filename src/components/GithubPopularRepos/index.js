import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageFilterId: languageFiltersData[0].id,
    GithubRepos: [],
    apiStatus: apiStatusConstraints.initial,
  }

  componentDidMount() {
    this.getGithubRepos()
  }

  getGithubRepos = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const {activeLanguageFilterId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({
        apiStatus: apiStatusConstraints.success,
        GithubRepos: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  updateLanguageFiltersId = id => {
    this.setState({activeLanguageFilterId: id}, this.getGithubRepos)
  }

  renderGithubPopularReposList = () => {
    const {GithubRepos} = this.state
    return (
      <ul className="GithubRepos-list">
        {GithubRepos.map(repo => (
          <RepositoryItem repoData={repo} key={repo.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="githubpopularrepos-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <p className="failure-text">Something Went Wrong</p>
    </div>
  )

  renderGithubRepos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      case apiStatusConstraints.success:
        return this.renderGithubPopularReposList()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageFilterId, apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="githubpopularrepos-container">
        <h1 className="githubpopularrepos-heading">popular</h1>
        <ul className="languageFilters-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageFiltersDetails={each}
              key={each.id}
              updateLanguageFiltersId={this.updateLanguageFiltersId}
              isActive={each.id === activeLanguageFilterId}
            />
          ))}
        </ul>
        {this.renderGithubRepos()}
      </div>
    )
  }
}
export default GithubPopularRepos
