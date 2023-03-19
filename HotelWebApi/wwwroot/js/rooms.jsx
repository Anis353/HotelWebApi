class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.room };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <table>
            <tr>
                <td title="Тип комнаты" >{this.state.data.roomType} </td>
                <td title="Цена">{this.state.data.price}</td>
                <td title="Этаж">{this.state.data.floor}</td>
                <td title="Номер">{this.state.data.number}</td>
                <td title="State">{this.state.data.state}</td>
            </tr>
        </table>
    }
}

class RoomsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { rooms: [] };
    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + "/get", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ rooms: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    
    render() {
        return <div>
            <h2 id="sub-title">Список комнат</h2>
            <ul id="column-rooms">
                <li>Тип комнаты</li>
                <li>Цена</li>
                <li id="three">Этаж</li>
                <li>Номер</li>
                <li>Состояние</li>
            </ul>
            <div>
                {
                    this.state.rooms.map(function (room) {
                      
                        return <Room key={room.id} room={room}/>
                    })
                }
            </div>
        </div>;
    }
}

ReactDOM.render(
    <RoomsList apiUrl="/api/rooms" />,
    document.getElementById("content")
);

