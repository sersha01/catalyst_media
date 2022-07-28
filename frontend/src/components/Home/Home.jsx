import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import AuthContext from '../../context/AuthContext'
import { useEffect } from 'react';

function Home() {
  const { balance, history, retrieve, update } = useContext(AuthContext);

  const [action, setAction] = useState('');

  function handleUpdate(e) {
    e.preventDefault();
    if (e.target.amount.value >= 0) {
      update({status: action, amount: e.target.amount.value});
    }
  }

  useEffect(() => {
    retrieve()
  }, []);
  return (
    <>
      <Header />
      <div className='container'>
        <div className='row m-0'>
          <div className='col-12'>
          </div>
          <div className='col-12 row justify-content-center'>
            <div className='col-12 col-sm-8 col-md-4 p-5 p-md-0 p-lg-5'>
              <p className='fs-5'>Available Funds</p>
              <p className='fs-5'>Rs. {balance}.00</p>

              <p className='fs-6'>Manage Funds</p>
              <form onSubmit={handleUpdate}>
                <input type='number' className='form-control py-3' placeholder='Enter Amount' name='amount'/>
                <div className='row justify-content-around mt-3'>
                  <button className='btn col-5 py-3' type='submit' onClick={()=>{setAction('Credit')}}>Add</button>
                  <button className='btn col-5 py-3' type='submit' onClick={()=>{setAction('Debit')}}>Remove</button>
                </div>
              </form>
            </div>
              <div className='col-12 col-md-8'>
                <div className='row col-12 p-5 p-md-2 p-lg-5'>
                  <div className='row m-0 w-100'>
                  <div className='col-5 my-3'>
                    Date & Time
                  </div>
                  <div className='col-3 my-3'>
                    Amount
                  </div>
                  <div className='col-4 my-3'>
                    Added By
                  </div>
                  </div>
                  {history.map((item) => (
                      <div className='row m-0 w-100' key={item.id}>
                        <div className='col-5 my-3'>
                          {item.date}
                        </div>
                        <div className='col-3 my-3'>
                          {item.amount}
                        </div>
                        <div className='col-4 my-3'>
                          {item.wallet}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home