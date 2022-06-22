import React from 'react';
import './App.css';

console.log("Node environment:", process.env.NODE_ENV);

class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <h1>Header</h1>
            </header>
        );
    }
}

// Test this.props.value
function H1(props) {
    return <h1>{props.value}</h1> 
}
function H2(props) {
    return <h2>{props.value}</h2> 
}
function H3(props) {
    return <h3>{props.value}</h3> 
}
function H4(props) {
    return <h4>{props.value}</h4> 
}
function H5(props) {
    return <h5>{props.value}</h5> 
}
function H6(props) {
    return <h6>{props.value}</h6> 
}
function P1(props) {
    return <p>{props.value}</p> 
}
function SPAN1(props) {
    return <span>{props.value}</span> 
}

// Test props
class TestProps extends React.Component {
    render() {
        return (
            <article className=''>
                <SPAN1 value="This block is test for props." />
            </article>
        )
    }
}

// Test state
class TestState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "This block is test for state.",
        };
    }
    render() {
        return (
            <article className=''>
                {this.state.value}
            </article>
        )
    }
}

// Test setState()
class TestSetState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        // #1
        // const self = this;
        // this.timer = setInterval(function() {
        //     self.setTIme();
        // }, 1000);

        // #2
        this.timer = setInterval(
            () => this.setTime(),
            1000
        );
    }
  
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // method
    setTime() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <article>
                This block is test for update state.
                {
                    " " +
                    String(this.state.date.getHours()).padStart(2, 0) + ":" +
                    String(this.state.date.getMinutes()).padStart(2, 0) + ":" +
                    String(this.state.date.getSeconds()).padStart(2, 0)
                }
            </article>
        )
    }
}

// Test onClick event
function CountButton(props) {
    return <button onClick={props.onClick}>
        Count
    </button>
}
function ResetButton(props) {
    return <button onClick={props.onClick}>
        Reset
    </button>
}
class TestOnClick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.click = this.click.bind(this); // #1 for use "this" in callback
        this.reset = this.reset.bind(this); // #1 for use "this" in callback
    }

    click() {
        // bound "this" from #1
        this.setState(function(state, props) {
            return {
                value: state.value + 1
            }

            // # right
            // return {
            //     value: ++state.value
            // }

            // # wrong
            // return {
            //     value: state.value++
            // }
        });
    }

    reset() {
        this.setState({
            value: 0
        });
    }

    render() {
        return (
            <article className=''>
                This block is test for onClick() event.
                <CountButton onClick={this.click} />
                <span>
                   {"\n"+ this.state.value + "\n"}
                </span>
                <ResetButton onClick={this.reset} />
            </article>
        )
    }
}

// Test bind in event handler
// <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
class TestBindInEventHandler extends React.Component {
    getIndex(element) {
        var table = element.closest("table");
        if (!table) {
            return false;
        }
        
        var index = -1;
        var rows = table.rows;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].isSameNode(element)) {
                index = i;
                break;
            }
        }
        return index;
    }

    deleteRow(id, e) {
        console.log("React event", e);
        var element = document.getElementById(id);
        var table = element.closest("table");
        var index = this.getIndex(element);

        if (index !== -1) {
            table.deleteRow(index);
        }
    }

    render() {
        return (
            <article className=''>
                This block is test for event binding.
                <table>
                    <caption>
                        Table
                    </caption>
                    <tbody>
                        <tr id='row-1'>
                            <td>Row 1</td>
                            <td>
                                <button onClick={(e) => this.deleteRow("row-1", e)}>
                                    X
                                </button>
                            </td>
                        </tr>
                        <tr id='row-2'>
                            <td>Row 2</td>
                            <td>
                                <button onClick={this.deleteRow.bind(this, "row-2")}>
                                    X
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>
        )
    }
}

// Test render from function & props chaining
function IsMember(props) {
    return <article>Welcome back! {props.button}</article>;
}
function IsGuest(props) {
    return <article>Please sign up. {props.button}</article>;
}
function IsAuthonized(props) {
    const isLoggedIn = props.isLoggedIn;
    const button = props.button; // #2
    if (isLoggedIn) {
        return <IsMember button={button} />;
    } else {
        return <IsGuest button={button} />;
    }
}
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}
class TestRenderFromFunction extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {isLoggedIn: false};
    }
    login() {
        this.setState({isLoggedIn: true});
    }
    logout() {
        this.setState({isLoggedIn: false});
    }
    render() {
        let button = this.state.isLoggedIn ? <LogoutButton onClick={this.logout} /> : <LoginButton onClick={this.login} />;
        return (
            <IsAuthonized isLoggedIn={this.state.isLoggedIn} button={button}/>
        )
    }
}

// Test array
function ListItem(props) {
    // wrong => return <span key={props.number}>{props.value}, </span>
    return <span>{props.value}, </span>
}
function TestList(props) {
    const arr = props.arr;
    // #1
    const elements = arr.map(function(n) {
        return <ListItem key={n.toString()} value={n} />
    });

    // #2
    // const elements = arr.map(function(n) {
    //     return <span kye={n.toSTring()}>{n}, </span>
    // });

    return (
        <article>
            Array: [{elements}]
        </article>
    )
}
class TestArray extends React.Component {
    render() {
        return (
            <TestList arr={[1,2,3,4,5,6,7,8,9]} />
        )
    }
}

// Main component
class Main extends React.Component {
    render() {
        return (
            <main className='body'>
                <TestProps date={new Date()}></TestProps>
                <TestState></TestState>
                <TestSetState></TestSetState>
                <TestOnClick></TestOnClick>
                <TestBindInEventHandler></TestBindInEventHandler>
                <TestRenderFromFunction></TestRenderFromFunction>
                <TestArray></TestArray>
            </main>
        );
    }
}

// Test render from JSX
class Footer extends React.Component {
    render() {
        return React.createElement("footer",
            {className: "footer"},
            React.createElement("h1", {}, "Footer from JSX"),
        );
    }
}

// App
class App extends React.Component {
  render() {
	return (
	  <div className="App">
		<Header></Header>
		<Main></Main>
		<Footer></Footer>
	  </div>
	);
  }
}

export default App;
