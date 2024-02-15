import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseCounter,
  fetchTodos,
  increaseCounter,
} from './store/counterReducer';
import { useEffect } from 'react';
import { Button, Spin } from 'antd';

function App() {
  const dispatch = useDispatch();
  const { counter, loading, todo } = useSelector((state) => state.counter);
  const fetchData = () => {
    try {
      dispatch(fetchTodos(counter));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [counter]);
  return (
    <div className='App'>
      <Button
        type='primary'
        onClick={() => {
          dispatch(increaseCounter());
        }}
        disabled={counter === 20 || loading}
      >
        Increase
      </Button>
      <div>Counter</div>
      <div>{counter}</div>
      <Button
        type='primary'
        onClick={() => {
          dispatch(decreaseCounter());
        }}
        disabled={counter === 1 || loading}
      >
        Decrease
      </Button>
      {loading ? (
        <div>
          <Spin />
        </div>
      ) : (
        <>
          {todo.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
