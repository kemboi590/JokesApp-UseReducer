import { useReducer } from 'react';
import './joke.scss'
import JokesData from "../jokeData/jokes.json"
import { Joke, reducerCount } from './../types/allTypes';

export const JokePage = () => {
    const [jokes, dispatch] = useReducer(reducerCount, JokesData);  // use reducer will take the reducer function and the initial state.

    const updateRate = (id: number, rate: number) => {
        dispatch({ type: 'UPDATE_RATE', id, rate });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newJoke: Joke = { id: jokes.length + 1, joke: e.target[0].value, rate: 0 };
        dispatch({ type: 'ADD_JOKE', joke: newJoke });
        e.target[0].value = '';
    };

    return (
        <div className='container'>
            <h2>JokesApp UseReducer 😀</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" placeholder='Add a joke' required />
                <button type='submit'>Add Joke</button>
            </form>

            <div className="jokes">
                {jokes && jokes.sort((a, b) => b.rate - a.rate).map((joke) => (
                    <div key={joke.id} className='joke'>
                        <div className='joke-text'>{joke.joke}</div>
                        <div className='text'>Rating: {joke.rate}</div>
                        <div className="joke-buttons">
                            <button onClick={() => updateRate(joke.id, joke.rate + 1)}>👍</button>
                            <button onClick={() => updateRate(joke.id, joke.rate - 1)}>👎</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
