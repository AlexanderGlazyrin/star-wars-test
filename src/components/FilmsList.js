import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Collapse} from 'antd';

const { Panel } = Collapse;

const FilmsList = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await (await fetch('https://swapi.dev/api/films/')).json();
      setFilms(response.results)
    }
    fetchData();
  }, [])

  return (
    <>
      <Collapse defaultActiveKey={['1']}>
        {films.length ?
          films.map((film, index) =>
            <Panel header={film.title} key={index + 1}>
              <div>{film.opening_crawl}
              </div>
              <Link to={`film/${index + 1}`}>
                <Button style={{marginTop: 10}}>
                  Add review
                </Button>
              </Link>
            </Panel>
          )
          : null}
      </Collapse>
    </>
  );
};

export default FilmsList;
