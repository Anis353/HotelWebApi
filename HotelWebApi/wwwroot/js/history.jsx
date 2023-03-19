class HotelHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.history };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <table>
            <tr>
                <td title="Клиент" >{this.state.data.client} </td>
                <td title="Паспорт">{this.state.data.passport}</td>
                <td title="Номер комнаты">{this.state.data.roomNumber}</td>
                <td title="Город">{this.state.data.city}</td>
                <td title="Дата регистрации">{this.state.data.registrationDate}</td>
                <td title="Продолжительность">{this.state.data.duration}</td>
            </tr>
        </table>
    }
}

class HistoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { histories: [] };
    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + "/get", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ histories: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
   
    render() {
        return <div>
            <h2 id="sub-title">История проживания</h2>

            <ul id="column-history">
                <li>Клиент</li>
                <li>Паспорт</li>
                <li id="three">Номер</li>
                <li id="four">Город</li>
                <li>Дата</li>
                <li>Длительность</li>
            </ul>
            <div>
                {
                    this.state.histories.map(function (history) {

                        return <HotelHistory key={history.id} history={history} />
                    })
                }
            </div>
        </div>;
    }
}

ReactDOM.render(
    <HistoryList apiUrl="/api/history" />,
    document.getElementById("content")
);