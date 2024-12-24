import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../AdminContext'
import { ReplyEmailModal } from '../../components/elements/editor/ReplyEmailModal'

export const AdminStockWatch = () => {
    const [view, setView] = useState('unnotified')
      const [stocks, setStocks] = useState([])
      const [notifiedStocks, setNotifiedStocks] = useState([])
      const {users, stockwatches, deleteStockwatch} = useContext(AdminContext)
      const [allusers, setAllUsers] = useState([])
      const [showModal, setShowModal] = useState(false);
      const [replyStock, setReplyStock] = useState({});

    useEffect(() => {
        if (stockwatches) {
        stockwatches.sort((a, b) => b.id - a.id)
        setStocks(stockwatches.filter(stock => !stock.stockwatch_notify))
        setNotifiedStocks(stockwatches.filter(stock => stock.stockwatch_notify))
        }
        setAllUsers(users)
    }, [stockwatches, users])

    const handleReply = (stock) => {
      //use handleReply to open the modal but first assign name to the stock from first name and last name from allusers whose id matches the stock.user
      const user = allusers.find(user => user.id === stock.user)
      stock.name = user.first_name + ' ' + user.last_name
      setReplyStock(stock);
      setShowModal(true);
    }


  return (
    <div class="w-full px-[var(--margin-x)] pb-8">
      <div className="flex items-center justify-between py-5 lg:py-6">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="justify-center whitespace-nowrap mr-3">
            <span className='font-bold'>Showing Results : </span>{}</div>
          </div>
          <div className="tabs-list flex p-1  rounded-lg bg-slate-200 dark:bg-navy-800">
            <button
              // className="activeTab === 'tabAll' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100'"
              className={"btn shrink-0 px-3 py-1 text-xs+ font-medium" + (view === 'unnotified' ? ' bg-white shadow dark:bg-navy-500 dark:text-navy-100' : ' hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100')}
              onClick={() => setView('unnotified')}
            >
              Unnotified Stock Watches
            </button>
            <button
              // className="activeTab === 'tabAll' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100'"
              className={"btn shrink-0 px-3 py-1 text-xs+ font-medium" + (view === 'notified' ? ' bg-white shadow dark:bg-navy-500 dark:text-navy-100' : ' hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100')}
              onClick={() => setView('notified')}
            >
                Notified Stock Watches
            </button>
          </div>

        </div>
      </div>
      <div>
        {view === 'unnotified' ? (
            <Stock stock={stocks} handleDeleteStock={deleteStockwatch} handleReply={handleReply} />
        ) : (
            <Stock stock={notifiedStocks} handleDeleteStock={deleteStockwatch} handleReply={handleReply} />
        )}
      </div>
      <ReplyEmailModal
        showModal={showModal}
        setShowModal={setShowModal}
        contact={replyStock}
        setContact={setReplyStock}
        isStockReply={true}
      />
    </div>
  )
}


const Stock = ({stock, handleDeleteStock, handleReply}) => {
    return (
      <div className="">
              <table className="w-full text-left">
                  <thead>
                      <tr>
                          <th className="whitespace-nowrap rounded-tl-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                              #
                          </th>
                          {/* <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                              Product Name
                          </th>
                          <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                              Price
                          </th> */}
                          <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                              URL Link
                          </th>
                          <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                              Status
                          </th>
                          <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                              Email 
                          </th>
                          <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                              Added On
                          </th>
                          <th className="whitespace-nowrap rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                              Action
                          </th>
                          
                      </tr>
                  </thead>
                  <tbody>
                    {
                      stock.length === 0 ? <tr><td colSpan="8"><div className="text-center flex flex-col justify-center text-4xl font-semibold h-50">
                      No Stock Watches Found
                  </div></td></tr> :
                      stock.map((stock, index) => <StockRow stock={stock} key={stock.id} index={index} handleDeleteStock={handleDeleteStock} handleReply={handleReply} />)
  
                    }
                  </tbody>
              </table>
          </div>
    )
  }
  
  const StockRow = ({stock, index, handleDeleteStock, handleReply}) => {
    return (
      <tr>
        <td className="px-4 py-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5">
          {index + 1}
        </td>
        {/* <td className="pt-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5 line-clamp-1">
          {stock.item}
        </td>
        <td className="px-4 py-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5">
          {stock.price}
        </td> */}
        <td className="pt-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5 line-clamp-1 max-w-40vw">
          <a
            href={stock.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {stock.url}
          </a>
        </td>
        <td className="px-4 py-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5">
            {stock.stockwatch_notify ? 'Notified' : 'Unnotified'}
        </td>
        <td className="px-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5">
        <div className="flex space-x-1">
            {
              stock.stockwatch_notify?
              <span class=" btn cursor-default border border-slate-300 font-medium text-success">
                <i class="fa fa-reply mr-2"></i>
                Replied
              </span>:
            
            <button 
              
              onClick={() => handleReply(stock)}
              class=" btn border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
              <i class="fa fa-reply mr-2"></i>
              Reply
            </button>
            }
          </div>
        </td>

        <td className="px-4 py-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5 text-center">
          { new Date(stock.added).toLocaleDateString() }
        </td>
        <td className="whitespace-nowrap px-4 py-3 sm:px-5 text-center">
                      <button onClick={() => handleDeleteStock(stock.id)}
                       className="btn h-8 w-8 p-0 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25">
                          <i className="fa fa-trash-alt"></i>
                      </button>
              </td>
      </tr>
    )
  }