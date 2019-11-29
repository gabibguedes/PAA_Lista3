import React from "react";
import { Button, Card, Modal, Col, Row } from 'react-bootstrap';


export default class Time extends React.Component {
    constructor(props) {
        super(props);
    }
    renderResultList() {
        if (this.props.answer.length > 0) {
            return (
                <div>
                    <b>Confira os atrasos de cada tarefa:</b>
                    {this.props.answer.map((item) => (
                        <Card key={item.id} style={{ padding: '20px', marginBottom: '10px' }}>
                            <Col>
                                <Card.Title>{item.name}</Card.Title>
                                <div style={styles.buttondiv}>
                                </div>
                            </Col>
                            <Card.Text>
                                Deadline: {item.deliveryTime.formatted12}<br/>
                                Duração: {item.executionTime}h <br />
                                Entrega: {item.realDeliveryTime.formatted12}<br />
                                <b style={{ color: 'red' }}>Atraso: {item.lateness}</b>
                            </Card.Text>
                        </Card>
                    ))}
                </div>
            )
        } else {
            return (
                <span>Não há nenhuma tarefa na lista!</span>
            )
        }
    }

    render() {
        return (
            <Modal
                style={{ justifyContent: 'center' }}
                show={this.props.show}
                size='lg'
            >
                {this.props.isCorrect?
                <Modal.Header>
                    <Modal.Title style={{color:'green'}}>Parabéns!! Você acertou a ordem!!</Modal.Title>
                </Modal.Header>
                :
                <Modal.Header>
                    <Modal.Title style={{ color: 'red' }}>Não foi dessa vez... :(</Modal.Title>
                </Modal.Header>
                }

                <Modal.Body>
                    {this.renderResultList()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={this.props.cancel}>Ok</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


const styles = {
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
