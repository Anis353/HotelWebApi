class Client extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.client };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <table>
            <tr>
                <td title="Фамилия" >{this.state.data.surname}</td>
                <td title="Имя">{this.state.data.name}</td>
                <td title="Отчество">{this.state.data.patronymic}</td>
                <td title="Паспорт">{this.state.data.passport}</td>
                <td><button onClick={this.onClick}>Выселить</button></td>
            </tr>
        </table>
    }
}

class ClientSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passport: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onPassportSearch = this.onPassportSearch.bind(this);

    }
        onPassportSearch(e) {
            this.setState({ passport: e.target.value });
        }
    
        onSubmit(e) {
            e.preventDefault();
            var passport = this.state.passport.trim();

            if (!passport) {
                passport == "";
            }
            this.props.onSearchSubmit({
                passport: passport

            });
            this.setState({
                passport: ""
            });
        }

        render() {
            return (
                <div class="search">
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
                           placeholder="Паспорт"  
                           value={this.state.passport}
                           onChange={this.onPassportSearch} />
                    <input type="submit" value="Найти" />
                </form>
                </div>
            );
        }
}

class ClientForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            surname: "", name: "", patronymic: "",
            passport: "", roomNumber: "", city: "",
            duration: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPatronymicChange = this.onPatronymicChange.bind(this);
        this.onPassportChange = this.onPassportChange.bind(this);
        this.onRoomChange = this.onRoomChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onDurationChange = this.onDurationChange.bind(this);
    }

    onSurnameChange(e) {
        this.setState({ surname: e.target.value });
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onPatronymicChange(e) {
        this.setState({ patronymic: e.target.value });
    }
    onPassportChange(e) {
        this.setState({ passport: e.target.value });
    }
    onRoomChange(e) {
        this.setState({ roomNumber: e.target.value });
    }
    onCityChange(e) {
        this.setState({ city: e.target.value });
    }
    onDurationChange(e) {
        this.setState({ duration: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        var surname = this.state.surname.trim();
        var name = this.state.name.trim();
        var patronymic = this.state.patronymic.trim();
        var passport = this.state.passport.trim();
        var roomNumber = this.state.roomNumber.trim();
        var city = this.state.city.trim();
        var duration = this.state.duration.trim();

        if (!surname || !name || !patronymic || !passport
            || !roomNumber || !city || !duration) {
            alert("Все поля должны быть заполнены!")
            return;
        }
        this.props.onClientSubmit({
            surname: surname, name: name,
            patronymic: patronymic, passport: passport,
            roomNumber: roomNumber, city: city,
            duration: duration
        });
        this.setState({
            surname: "", name: "", patronymic: "",
            passport: "", roomNumber: "", city: "",
            duration: ""
        });
    }
    render() {
        return (
            <div id="addForm">
                <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Фамилия"
                        value={this.state.surname}
                        onChange={this.onSurnameChange} />
                </p>
                <p>
                    <input type="text"
                        placeholder="Имя"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="text"
                        placeholder="Отчество"
                        value={this.state.patronymic}
                        onChange={this.onPatronymicChange} />
                </p>
                <p>
                    <input type="text"
                        placeholder="Паспорт"
                        value={this.state.passport}
                        onChange={this.onPassportChange} />
              </p>
                <p>
                     <input type="number"
                        placeholder="Номер комнаты"
                        value={this.state.roomNumber}
                        onChange={this.onRoomChange} />
                </p>
                <p>
                    <input type="text"
                        placeholder="Город"
                        value={this.state.city}
                        onChange={this.onCityChange} />
                </p>
                <p>
                    <input type="number"
                        placeholder="Длительность"
                        value={this.state.duration}
                        onChange={this.onDurationChange} />
                </p>
                    <input type="submit" value="Сохранить" />
                    <a href="#" class="close">Закрыть окно</a>
                </form>
            </div>

        );
    }
}

class ClientsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { clients: [] };

        this.onAddClient = this.onAddClient.bind(this);
        this.onRemoveClient = this.onRemoveClient.bind(this);
        this.onSearchClient = this.onSearchClient.bind(this);
    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + "/get", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ clients: data });
           
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    // добавление объекта
    onAddClient(client) {
        if (client) {

            const data = new FormData();
            data.append("surname", client.surname);
            data.append("name", client.name);
            data.append("patronymic", client.patronymic);
            data.append("passport", client.passport);
            data.append("roomNumber", client.roomNumber);
            data.append("city", client.city);
            data.append("duration", client.duration);

            var xhr = new XMLHttpRequest();
            
            xhr.open("post", this.props.apiUrl, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    // удаление объекта
    onRemoveClient(client) {

        if (client) {
            var url = this.props.apiUrl + "/" + client.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    // Поиск обьекта по паспорту
    onSearchClient(client) {

        if (client) {
            var xhr = new XMLHttpRequest()
            xhr.open("get", this.props.apiUrl + "/search/" + client.passport, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var data = JSON.parse('[' + xhr.responseText + ']');
                    this.setState({ clients: data });
                }
                if (client.passport == "") { this.loadData(); }
             
            }.bind(this);
            xhr.send();
        }
    }

    render() {
        var remove = this.onRemoveClient;
        return <div>
            <a id="openForm" href="#addForm">Добавить клиента</a>
            <ClientForm onClientSubmit={this.onAddClient} />
            <ClientSearch onSearchSubmit={this.onSearchClient} />

            <h2 id="sub-title">Список клиентов</h2>
            <ul id="column-clients">
                <li>Фамилия</li>
                <li>Имя</li>
                <li id="three">Отчество</li>
                <li>Паспорт</li>
            </ul>
            <div>
                {
                    this.state.clients.map(function (client) {

                        return <Client key={client.id} client={client} onRemove={remove} />
                    })
                }
            </div>
        </div>
    }
}

ReactDOM.render(
    <ClientsList apiUrl="/api/clients" />,
    document.getElementById("content")
);