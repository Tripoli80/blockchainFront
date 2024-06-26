import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { RotatingSquare } from 'react-loader-spinner';

import { Filter } from '../Filter/Filter';
import { Header } from '../Header/Header';
import Table from '../Table/Table';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';

function App() {
  const [data, setData] = useState(null);
  const [lastBlock, setLastBlock] = useState(null);
  const [total, setTotal] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Choose...');
  const [query, setQuery] = useState('');
  const [queryString, setQueryString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const size = 14;
  const server = "http://ec2-18-184-163-37.eu-central-1.compute.amazonaws.com:3009/api/transactions"
  useEffect(() => {
    axios
      .get(
        `${server}?size=${size}`
      )
      .then(response => {
        const { total, result, lastBlock } = response.data;
        setTotal(total);
        setLastBlock(lastBlock);
        setData(result ? result : []);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setData(null);

    axios
      .get(
        `${server}?size=${size}&page=${currentPage}${queryString}`
      )
      .then(response => {
        const { total, result, lastBlock } = response.data;
        setTotal(total);
        setData(result);
        setLastBlock(lastBlock);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentPage, queryString]);

  const getDataByQuery = () => {
    let selected = '';
    let search = '';
    switch (selectedItem.toLowerCase()) {
      case 'recipient':
        selected = 'to';
        break;
      case 'sender':
        selected = 'from';
        break;
      case 'transaction id':
        selected = 'hash';
        break;

      case 'block number':
        selected = 'blockNumber';
        break;
      default:
        selected = '';
    }
    if (query.length >= 2) {
      search = query;
      setCurrentPage(1);
    }

    if (search && selected) {
      if (selected === 'blockNumber') {
        search = Number(search).toString(16);
      }
      const toQueryString = `&filter=${selected}&search=${search}`;
      setQueryString(toQueryString);
    } else {
      setSelectedItem('Choose...');
      setQueryString('');
    }
  };

  const toReset = () => {
    setSelectedItem('Choose...')
    setCurrentPage(1);
    setQueryString('');
  }

  return (
    <div className="App">
      <Header toReset={toReset} />
      <Filter
        searchState={{ query, setQuery }}
        filterData={{ selectedItem, setSelectedItem }}
        getDataByQuery={getDataByQuery}
      />
      {data && (
        <Table
          data={data}
          size={size}
          total={total}
          currentBlockNumber={lastBlock}
          statePages={{ currentPage, setCurrentPage }}
        />
      )}
      {!data && (
        <div className="container">
          <RotatingSquare
            height="320"
            width="320"
            color="#3A80BA"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{}}
            wrapperClass="rotatingSquare"
            visible={true}
          />
        </div>
      )}
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
