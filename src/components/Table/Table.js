import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { Pagination } from './Pagination';

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
    txt = txt || txt === 0 ? txt.toString() : 'no data';

    return (
      <span
        title={`Click to copy ${txt}`}
        className="tddots"
        onClick={() => handleCopyClick(txt)}
      >
        {txt}
      </span>
    );
  };
  const calcConfirmBlock = itemBlockNumber => {
    const confirm = parseInt(currentBlockNumber) - parseInt(itemBlockNumber);
    return confirm;
  };
  const genDate = time => {
    const timestamp = parseInt(time);
    const date = new Date(timestamp * 1000);
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
      date.getFullYear();
    return formattedDate;
  };
  return (
    <>
      <div className="container">
        <table className="styled-table ">
          <thead>
            <tr>
              <th scope="col">Block number</th>
              <th scope="col">Transaction ID</th>
              <th scope="col">Sender address</th>
              <th scope="col">Recipient's address</th>
              <th scope="col">Block confirmations</th>
              <th scope="col">Date</th>
              <th scope="col">Value</th>
              <th scope="col">Transaction Fee</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Block number">
                    {genCell(parseInt(item.blockNumber))}
                  </td>
                  <td data-label="Transaction ID">{genCell(item.hash)}</td>
                  <td data-label="Sender address">{genCell(item.from)}</td>
                  <td data-label="Recipient's address">{genCell(item.to)}</td>
                  <td data-label="Block confirmations">
                    {calcConfirmBlock(item.blockNumber)}
                  </td>
                  <td data-label="Date">{genDate(item.timestamp)}</td>
                  <td data-label="Value">
                    {genCell(parseInt(item.value) / 10 ** 18)}
                  </td>
                  <td data-label="Transaction Fee">
                    {genCell(parseInt(item.totalfee) / 10 ** 18)}
                  </td>
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
