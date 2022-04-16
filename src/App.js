import SearchInput from '@/components/SearchInput';
import SelectedLanguage from '@/components/SelectedLanguage';
import Suggestion from '@/components/Suggestion';
import Component from '@/core/Component';
import {localStorage} from '@/apis/storage';

const FULL_SIZE = 5;

export default class App extends Component {
  mounted() {
    const $main = this.target;
    const $searchInput = $main.querySelector('form.SearchInput');
    const $selectedLanguage = $main.querySelector('div.SelectedLanguage');
    const $suggestion = $main.querySelector('div.Suggestion');
    const {
      getInputValue,
      setInputValue,
      setSuggestionList,
      setSelectedIndex,
      removeSuggestionList,
      setSelectedList,
    } = this;

    this.searchInput = new SearchInput($searchInput, {
      inputValue: localStorage.get({key: 'inputValue'}) ?? '',
      setInputValue: setInputValue.bind(this),
      setSuggestionList: setSuggestionList.bind(this),
      removeSuggestionList: removeSuggestionList.bind(this),
      setSelectedIndex: setSelectedIndex.bind(this),
    });

    this.selectedLanguage = new SelectedLanguage($selectedLanguage, {
      selectedList: localStorage.get({key: 'selectedList'}) ?? [],
    });

    this.suggestion = new Suggestion($suggestion, {
      suggestionList: localStorage.get({key: 'suggestionList'}) ?? [],
      selectedIndex: localStorage.get({key: 'selectedIndex'}) ?? 0,
      getInputValue: getInputValue.bind(this),
      setInputValue: setInputValue.bind(this),
      setSelectedIndex: setSelectedIndex.bind(this),
      setSelectedList: setSelectedList.bind(this),
    });
  }

  getInputValue() {
    return this.searchInput.state.inputValue;
  }

  setInputValue(value) {
    this.searchInput.setState({inputValue: value});
    localStorage.set({key: 'inputValue', value});
  }

  setSuggestionList(items) {
    this.suggestion.setState({suggestionList: items});
    localStorage.set({key: 'suggestionList', value: items});
  }

  removeSuggestionList() {
    this.suggestion.setState({suggestionList: []});
    localStorage.set({key: 'suggestionList', value: []});
  }

  setSelectedIndex(index) {
    this.suggestion.setState({selectedIndex: index});
    localStorage.set({key: 'selectedIndex', value: index});
  }

  setSelectedList(value) {
    const setSelectedLanguage = value => {
      const {selectedLanguage} = this;
      const {selectedList} = selectedLanguage.state;

      if (selectedList.includes(value)) {
        const filteredList = selectedList.filter(item => item !== value);
        selectedLanguage.setState({
          selectedList: [...filteredList, value],
        });
        return;
      }

      if (selectedList.length === FULL_SIZE) {
        selectedLanguage.setState({
          selectedList: [...selectedList.slice(1), value],
        });
        return;
      }

      selectedLanguage.setState({
        selectedList: [...selectedList, value],
      });
    };

    setSelectedLanguage(value);
    localStorage.set({
      key: 'selectedList',
      value: this.selectedLanguage.state.selectedList,
    });
  }
}
