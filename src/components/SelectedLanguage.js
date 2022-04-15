import Component from '@/core/Component';

export default class SelectedLanguage extends Component {
  render() {
    const {selectedList} = this.state;

    this.target.innerHTML = `
      <ul>
        ${selectedList.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }
}
