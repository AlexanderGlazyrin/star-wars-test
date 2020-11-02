import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Col, Row} from 'antd';
import FilmsList from './components/FilmsList';
import AddCommentForm from './components/AddCommentForm';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Row>
        <Col span={16} offset={4} className='container'>
          <Switch>
            <Route path='/film/:id' exact>
              <AddCommentForm/>
            </Route>
            <Route path='/' exact>
              <FilmsList/>
            </Route>
          </Switch>
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default App;
