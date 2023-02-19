import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { Pagination } from './Pagination';
import { nanoid } from 'nanoid';

export default function Table(props) {
  const { data, size, total, currentBlockNumber } = props;
  const { currentPage, setCurrentPage } = props.statePages;

  const currentTableData = useMemo(() => {
    return data;
  }, [data]);

  const handleCopyClick = text => {
    navigator.clipboard.writeText(text);
    toast(`'Copy to buffer!' ${text}`);
  };

  const genCell = txt => {
    const newTxt = txt.length > 15 ? txt.substring(0, 15) + '...' : txt;

    return (
      <span
        title={`Click to copy ${newTxt}`}
        key={nanoid()}
        style={{ cursor: 'help' }}
        onClick={() => handleCopyClick(txt)}
      >
        {newTxt}
      </span>
    );
  };
  const calcConfirmBlock = itemBlockNumber => {
    const confirm = parseInt(currentBlockNumber) - parseInt(itemBlockNumber);
    return confirm;
  };
  const genDate = time => {
    const timestamp = parseInt(time); // пример временной метки в 16-ричной системе (0x19118D78E80)
    const date = new Date(timestamp * 1000); // создаем объект Date из временной метки
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const formattedDate =
      monthNames[date.getMonth()] +
      '-' +
      date.getDate() +
      '-' +
      date.getFullYear(); // форматируем дату в нужном формате (например, "Mar-17-2021")
    // console.log(formattedDate);
    return formattedDate;
  };
  return (
    <>
      <div className="container">
        <table className="styled-table ">
          <thead>
            <tr>
              <th>Block number</th>
              <th>Transaction ID</th>
              <th>Sender address</th>
              <th>Recipient's address</th>
              <th>Block confirmations</th>
              <th>Date</th>
              <th>Value</th>
              <th>Transaction Fee</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map(item => {
              return (
                <tr key={item.id}>
                  <td key={nanoid()}>{parseInt(item.blockNumber)}</td>
                  <td key={nanoid()}>{genCell(item.hash)}</td>
                  <td key={nanoid()}>{genCell(item.from)}</td>
                  <td key={nanoid()}>{genCell(item.to)}</td>
                  <td key={nanoid()}>{calcConfirmBlock(item.blockNumber)}</td>
                  <td key={nanoid()}>{genDate(item.timestamp)}</td>
                  <td key={nanoid()}>{parseInt(item.value) / 10 ** 18}</td>
                  <td key={nanoid()}>{parseInt(item.totalfee) / 10 ** 18}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={total}
          pageSize={size}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
