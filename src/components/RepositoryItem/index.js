// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoData

  return (
    <li className="repository-item-container">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="name">{name}</h1>
      <div className="meta-data-container">
        <div className="meta-data-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="meta-data-image"
          />
          <p className="meta-data-value">{starsCount}</p>
          <p className="meta-data-value">stars</p>
        </div>
        <div className="meta-data-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="meta-data-image"
          />
          <p className="meta-data-value">{forksCount}</p>

          <p className="meta-data-value">open forks</p>
        </div>
        <div className="meta-data-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="meta-data-image"
          />
          <p className="meta-data-value">{issuesCount}</p>
          <p className="meta-data-value">issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
