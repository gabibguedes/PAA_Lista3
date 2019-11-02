import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Activity, minimum_lateness} from './MinLat';
import {Button, Card, Container, Col, Row} from 'react-bootstrap';
import Forms from './components/Forms';
import Result from './components/Result';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const defaultTime = {
  formatted12: "12:00 pm",
  formatted24: "12:00",
  formattedSimple: "12:00",
  hour: 12,
  hour12: 12,
  meridiem: "pm",
  minute: 0,
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activities: [],
      answer: [],
      userList: [],
      name: '',
      execTime : 0,
      deadline: defaultTime,
      showForm: false,
      idCount: 0,
      color: 'white',
      showAnswer: false,
      isCorrect: false
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){    
    let field = e.target.name;
    let val = e.target.value;
    this.setState({[field]: val});
  }

  removeFromList(item){
    this.removeFromUserList(item);
    this.setState({answer: []});
    let index = this.state.activities.findIndex(x => x.id === item.id);
    let copy_arr = this.state.activities;
    copy_arr.splice(index,1);
    this.setState({ activities: copy_arr, answer: []});
  }

  removeFromUserList(item){
    this.setState({ answer: []});
    let index = this.state.userList.findIndex(x => x.id === item.id);
    let copy_arr = this.state.userList;
    copy_arr.splice(index,1);
    this.setState({userList: copy_arr, answer: []});
  }

  addToList(){
    let new_activity = new Activity(this.state.name, 
                                    this.state.execTime, 
                                    this.state.deadline, 
                                    this.state.idCount);

    this.setState({idCount: this.state.idCount + 1});
    let copy_list = this.state.activities;
    copy_list.push(new_activity);
    this.setState({
                  activities:copy_list,
                  name: '',
                  execTime: 0,
                  deadline: defaultTime,
                  answer: [],
                  showForm: false
                });
  }

  addToUserList(item){
    let index = this.state.userList.findIndex(x => x.id === item.id);    
    if(index === -1){
      let copy_list = this.state.userList;
      copy_list.push(item);
      this.setState({userList:copy_list, answer:[]});
    }
  }

  answer(){
    let result = minimum_lateness(this.state.activities);
    this.setState({answer: result, showAnswer: true, isCorrect: this.verifyAnswer(result)})
  }

  verifyAnswer(result){
    let equal = true;
    if(result.length !== this.state.userList.length){
      equal = false;

    }else{
      for(let i=0; i<result.length;i++){
        if(result[i].id !== this.state.userList[i].id){
          console.log('uai?');
          
          equal = false;
        }
      }
    }
    return equal;
  }

  renderOGList(){
    if(this.state.activities.length > 0){
      return(
          this.state.activities.map((item) => (
            <Card key={item.id} style={{padding: '20px', marginBottom: '10px'}}>
              <Col>
                <Card.Title>{item.name}</Card.Title>
                <div style={styles.buttondiv}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: 'blue', marginLeft: '10px' }}
                    onClick={()=> {this.addToUserList(item)}}
                    />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: 'red', marginLeft: '10px' }}
                    onClick={() => this.removeFromList(item)}
                    />
                </div>
              </Col>
              <Card.Text>
                Entrega: {item.deliveryTime.formatted12}<br/>
                Duração: {item.executionTime}h
              </Card.Text>
            </Card>
          ))
      )
    }else{
      return(
        <span>A lista está vazia :(</span>
      )
    }
  }
  renderUserList() {
    if (this.state.userList.length > 0) {
      return (
        this.state.userList.map((item) => (
          <Card key={item.id} style={{ padding: '20px', marginBottom: '10px', backgroundColor:this.state.color}}>
            <Col>
              <Card.Title>{item.name}</Card.Title>
              <div style={styles.buttondiv}>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: 'red', marginLeft: '10px' }}
                  onClick={() => this.removeFromUserList(item)}
                />
              </div>
            </Col>
            <Card.Text>
              Entrega: {item.deliveryTime.formatted12}<br />
              Duração: {item.executionTime}h
              </Card.Text>
          </Card>
        ))
      )
    } else {
      return (
        <span>Adicione aqui sua resposta!!</span>
      )
    }
  }
  
  render(){    
    return(
      <Container>  
        <h1 style={{marginTop: '20px'}}>Minimo de Atraso</h1>

        <Result
          answer={this.state.answer}
          show={this.state.showAnswer}
          cancel={() => this.setState({ showAnswer: false })}
          isCorrect={this.state.isCorrect}/>
        <Forms
          show={this.state.showForm}
          name={this.state.name}
          execTime={this.state.execTime}
          handleChange={this.handleChange}
          deadline={this.state.deadline}
          changeTime={(newTime) => this.setState({ deadline: newTime })}
          addActivity={() => this.addToList()}
          cancel={() => this.setState({showForm: false})}
        />

        <Col>
        <div style={styles.buttondiv}>
        <Button
          style={styles.leftButton}
          onClick={() => this.setState({showForm: true})}>
            Adiciona na Lista de Atividades
        </Button>
        <Button
          onClick={() => this.answer()}
          style={styles.rightButton}>
            Roda o algoritimo
        </Button>
        </div>
        </Col>

        <hr/>
        <Container>
        <Row>

          <Col>
            <h2>Lista de tarefas:</h2>
          </Col>
          <Col>
            <h2>Tentativa de ordem de mínimo atraso:</h2>
          </Col>
        </Row>
        <Row>
        <Col>
            {this.renderOGList(this.state.activities)}
        </Col>
        <Col>
            {this.renderUserList(this.state.answer)}
        </Col>
        </Row>
        </Container>
        

      </Container>
  );
  }
}

const styles={
  leftButton: {
    marginRight: 10,
    fontSize: 15,
  },
  rightButton: {
    fontSize: 15,
  },
  buttondiv: {
    textAlign: 'right',
    position: 'relative',
  }
}

export default App;
