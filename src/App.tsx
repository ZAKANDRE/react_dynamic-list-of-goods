import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { getAll, get5First, getRedGoods } from './api/goods';
import type { Good } from './types/Good';
// or
// import * as goodsAPI from './api/goods';



export const App: React.FC = () => {
  const [goodsAll, setGoodsAll] = useState<Good[]>([]);
  const [goodsFive, setGoodsFive] = useState<Good[]>([]);
  const [redGoods, setRedGoods] = useState<Good[]>([]);

  const [switchGoods, setSwitchGoods] = useState<string>('');

  useEffect(() => {
    getAll()
    .then((goodsFromServer)=>{
      setGoodsAll(goodsFromServer);
    })
    
    get5First().then((fiveGoodsFromServer) => {
      setGoodsFive(fiveGoodsFromServer);
    });

    getRedGoods().then((redsFromServer) => {
      setRedGoods(redsFromServer)
    })
  }, []);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" 
              data-cy="all-button"
              onClick={() => setSwitchGoods('all')}
      >
        Load all goods
      </button>

      <button type="button"
              data-cy="first-five-button"
              onClick={() => setSwitchGoods('five')}
      >
        Load 5 first goods
      </button>

      <button type="button" 
              data-cy="red-button"
              onClick={()=> setSwitchGoods('red')}
      >
        Load red goods
      </button>
      {switchGoods === 'all' 
        ? (
          <GoodsList goods={goodsAll} />
        ) : null
      }
      {switchGoods === 'five' 
        ? (
          <GoodsList goods={goodsFive} />
        ) : null
      }
      {switchGoods === 'red'
        ? (
          <GoodsList goods={redGoods}/>
        ): null

      }
    </div>
  );
}
