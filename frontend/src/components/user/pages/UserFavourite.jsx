import React, {useState, useContext, useEffect} from 'react'
import { UserContext } from '../UserContext'

export const UserFavourite = () => {
  const [view, setView] = useState('favs')
  const [favs, setFavs] = useState([])
  const [stock, setStock] = useState([])
  const {favourites, deleteFavourite} = useContext(UserContext)

  // class FavouriteNStockWatch(models.Model):
  // user = models.ForeignKey(User, on_delete=models.CASCADE)
  // url = models.CharField(max_length=100)
  // added = models.DateTimeField(auto_now_add=True)
  
  // is_favourite = models.BooleanField(default=False)
  // is_stockwatch = models.BooleanField(default=False)
  // stockwatch_notify = models.BooleanField(default=False)
  
  // def __str__(self):
  //     return self.user.username

  useEffect(() => {
    if (favourites) {
      setFavs(favourites.filter(fav => fav.is_favourite))
      setStock(favourites.filter(fav => fav.is_stockwatch))
    }
  }, [favourites])

  const handleDeleteFav = async (id) => {
    await deleteFavourite(id)
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
              className={"btn shrink-0 px-3 py-1 text-xs+ font-medium" + (view === 'favs' ? ' bg-white shadow dark:bg-navy-500 dark:text-navy-100' : ' hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100')}
              onClick={() => setView('favs')}
            >
              Favorites
            </button>
            <button
              // className="activeTab === 'tabAll' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100'"
              className={"btn shrink-0 px-3 py-1 text-xs+ font-medium" + (view === 'stock' ? ' bg-white shadow dark:bg-navy-500 dark:text-navy-100' : ' hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100')}
              onClick={() => setView('stock')}
            >
              Stock Watches
            </button>
          </div>

        </div>
      </div>
      <div>
        {view === 'favs' ? (
          <Favs favs={favs} handleDeleteFav={handleDeleteFav} />
        ) : (
          <Stock stock={stock} handleDeleteStock={handleDeleteFav} />
        )}
      </div>
    </div>
  )
}


const Favs = ({favs, handleDeleteFav}) => {
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
                            Added On
                        </th>
                        <th className="whitespace-nowrap rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {
                    favs.length === 0 ? <tr><td colSpan="8"><div className="text-center flex flex-col justify-center text-4xl font-semibold h-50">
                    No Favorites Found
                </div></td></tr> :
                    favs.map((fav, index) => <FavRow fav={fav} key={fav.id} index={index} handleDeleteFav={handleDeleteFav} />)
                  }
                </tbody>
            </table>
        </div>
  )
}

const FavRow = ({fav, index, handleDeleteFav}) => {
  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5">
        {index + 1}
      </td>
      {/* <td className="pt-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5 line-clamp-1">
        {fav.item}
      </td>
      <td className="text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5 text-center">
        {fav.price}
      </td> */}
      <td className="pt-4 text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5 line-clamp-1 max-w-40vw">
        <a
          href={fav.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {fav.url}
        </a>
      </td>
      <td className="text-sm font-medium text-slate-800 dark:text-navy-100 lg:px-5 text-center">
        { new Date(fav.added).toLocaleDateString() }
      </td>
      <td className="whitespace-nowrap px-4 py-3 sm:px-5 text-center">
                    <button onClick={() => handleDeleteFav(fav.id)}
                     className="btn h-8 w-8 p-0 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25">
                        <i className="fa fa-trash-alt"></i>
                    </button>
            </td>
    </tr>
  )
}

const Stock = ({stock, handleDeleteStock}) => {
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
                    stock.map((stock, index) => <StockRow stock={stock} key={stock.id} index={index} handleDeleteStock={handleDeleteStock} />)

                  }
                </tbody>
            </table>
        </div>
  )
}

const StockRow = ({stock, index, handleDeleteStock}) => {
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
        {stock.stockwatch_notify}
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