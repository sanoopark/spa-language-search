import Component from "../core/Component.js";
import { api } from "../apis/fetch.js";

export default class SearchInput extends Component {
  render() {
    this.target.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state.inputValue}"/>
    `;

    const inputElement = this.target.querySelector(".SearchInput__input");
    const inputLength = this.state.inputValue.length;
    inputElement.focus();
    inputElement.setSelectionRange(inputLength, inputLength);
  }

  setEvent() {
    const { debounce, handleInputChange } = this;

    this.addEvent({
      eventType: "input",
      selector: ".SearchInput__input",
      callback: debounce(handleInputChange.bind(this)),
    });
  }

  async handleInputChange(e) {
    const keyword = e.target.value;
    const {
      setInputValue,
      setSuggestionList,
      removeSuggestionList,
      setSelectedIndex,
    } = this.state;

    setInputValue(keyword);

    if (!keyword.trim()) {
      removeSuggestionList();
      return;
    }

    const response = await api.fetchLanguages(keyword);

    if (response.isError) {
      alert("Error");
      return;
    }

    setSuggestionList(response.data);
    setSelectedIndex(0);
  }
}
