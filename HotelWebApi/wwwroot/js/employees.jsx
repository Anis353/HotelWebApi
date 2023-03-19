class Employees extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.employees };
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
                <td title="Этаж">{this.state.data.floorNumber}</td>
                <td title="День недели">{this.state.data.dayOfWeek}</td>
                <td><button onClick={this.onClick}>Уволить</button></td>
            </tr>
        </table>
    }
}

class EmployeeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            surname: "", name: "", patronymic: "",
            floorNumber: "", dayOfWeek: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPatronymicChange = this.onPatronymicChange.bind(this);
        this.onFloorChange = this.onFloorChange.bind(this);
        this.onDayOfWeekChange = this.onDayOfWeekChange.bind(this);
 
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
    onFloorChange(e) {
        this.setState({ floorNumber: e.target.value });
    }
    onDayOfWeekChange(e) {
        this.setState({ dayOfWeek: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        var surname = this.state.surname.trim();
        var name = this.state.name.trim();
        var patronymic = this.state.patronymic.trim();
        var floorNumber = this.state.floorNumber.trim();
        var dayOfWeek = this.state.dayOfWeek.trim();


        if (!surname || !name || !patronymic || !floorNumber
            || !dayOfWeek) {
            alert("Все поля должны быть заполнены!")
            return;
        }
        this.props.onEmployeeSubmit({
            surname: surname, name: name,
            patronymic: patronymic, floorNumber: floorNumber,
            dayOfWeek: dayOfWeek
        });
        this.setState({
            surname: "", name: "", patronymic: "",
            floorNumber: "", dayOfWeek: ""
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
                        <input type="number"
                            placeholder="Этаж"
                            value={this.state.floorNumber}
                            onChange={this.onFloorChange} />
                    </p>
                    <p>
                        <select id="choice" name="choice"
                            value={this.state.dayOfWeek}
                            onChange={this.onDayOfWeekChange}>
                            <option value="">---День недели---</option>
                            <option>Понедельник</option>
                            <option>Вторник</option>
                            <option>Среда</option>
                            <option>Четверг</option>
                            <option>Пятница</option>
                            <option>Суббота</option>
                            <option>Воскресенье</option>
                        </select>
                    </p>
                  
                    <input type="submit" value="Сохранить" />
                    <a href="#" class="close">Закрыть окно</a>
                </form>
            </div>
        );
    }
}


class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { employees: [] };

        this.onAddEmployee = this.onAddEmployee.bind(this);
        this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + "/get", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ employees: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }

    // добавление объекта
    onAddEmployee(employee) {
        if (employee) {

            const data = new FormData();
            data.append("surname", employee.surname);
            data.append("name", employee.name);
            data.append("patronymic", employee.patronymic);
            data.append("floorNumber", employee.floorNumber);
            data.append("dayOfWeek", employee.dayOfWeek);

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
    onRemoveEmployee(employee) {

        if (employee) {
            var url = this.props.apiUrl + "/" + employee.id;

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
    render() {

        var remove = this.onRemoveEmployee;
        return <div>
            <a id="openForm" href="#addForm">Добавить сотрудника</a>
            <h2 id="sub-title">Расписание работы</h2>
            <EmployeeForm onEmployeeSubmit={this.onAddEmployee} />

            <ul id="column-employees">
                <li>Фамилия</li>
                <li>Имя</li>
                <li id="three">Отчество</li>
                <li>Этаж</li>
                <li>День недели</li>
            </ul>
            <div>
                {
                    this.state.employees.map(function (employee) {

                        return <Employees key={employee.id} employees={employee} onRemove={remove} />
                    })
                }
            </div>
        </div>
    }
}

ReactDOM.render(
    <EmployeeList apiUrl="/api/employees" />,
    document.getElementById("content")
);