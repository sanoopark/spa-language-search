import Component from "../core/Component.js";

export default class Suggestion extends Component {
  render() {
    const { suggestionList } = this.state;

    if (suggestionList.length === 0) {
      document.querySelector(".Suggestion").style.visibility = "hidden";
    } else {
      document.querySelector(".Suggestion").style.visibility = "visible";
    }

    this.target.innerHTML = `
      <ul>
        ${suggestionList
          .map(
            (item, index) => `
            <li class="${this.addSelectedClass(
              index
            )}" data-id="${index}">${this.highlightKeyword(item)}</li>
          `
          )
          .join("")}
      </ul>
    `;
  }

  addSelectedClass(index) {
    const { selectedIndex } = this.state;
    if (index === selectedIndex) return "Suggestion__item--selected";
    return "";
  }

  highlightKeyword(item) {
    const { getInputValue } = this.state;
    const inputValue = getInputValue();
    const regex = new RegExp(`(${inputValue})`, "gi");

    return item.replace(
      regex,
      `<span class="Suggestion__item--matched">$1</span>`
    );
  }

  mounted() {
    const keyUpHandler = this.handleListSelect.bind(this);
    document.addEventListener("keyup", keyUpHandler);
  }

  handleListSelect(e) {
    const { suggestionList, selectedIndex, setSelectedIndex, setSelectedList } =
      this.state;

    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex(this.moveSelectedIndex(selectedIndex + 1));
        break;
      case "ArrowUp":
        setSelectedIndex(this.moveSelectedIndex(selectedIndex - 1));
        break;
      case "Enter":
        const selectedValue = suggestionList[selectedIndex];
        alert(selectedValue);
        setSelectedList(selectedValue);
      default:
        return;
    }
  }

  setEvent() {
    this.addEvent({
      eventType: "click",
      selector: "ul",
      callback: this.handleListClick,
    });
  }

  handleListClick(e) {
    const { textContent: keyword, dataset } = e.target;
    const { setSelectedIndex, setSelectedList } = this.state;
    const selectedIndex = Number(dataset.id);
    alert(keyword);
    setSelectedIndex(selectedIndex);
    setSelectedList(keyword);
  }

  moveSelectedIndex(movedIndex) {
    const { suggestionList } = this.state;
    const suggestionListLength = suggestionList.length;

    switch (movedIndex) {
      case suggestionListLength:
        return 0;
      case -1:
        return suggestionListLength - 1;
      default:
        return movedIndex;
    }
  }
}
