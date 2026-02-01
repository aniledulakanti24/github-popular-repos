// Write your code here
import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  render() {
    const {
      languageFiltersDetails,
      updateLanguageFiltersId,
      isActive,
    } = this.props
    const {id, language} = languageFiltersDetails
    const onClicklanguageFilter = () => {
      updateLanguageFiltersId(id)
    }
    const activeLanguageFilterClassName = isActive
      ? 'active-languageFilter-button'
      : ' '
    return (
      <li className="languageFilter-item-container">
        <button
          type="button"
          className={`languageFilter-button ${activeLanguageFilterClassName}`}
          onClick={onClicklanguageFilter}
        >
          {language}
        </button>
      </li>
    )
  }
}
export default LanguageFilterItem
