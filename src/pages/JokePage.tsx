import { useReducer, useState } from 'react';
import './joke.scss'
import JokesData from "../jokeData/jokes.json"
import { Joke, reducerCount } from './../types/allTypes';

export const JokePage = () => {
    const [jokes, dispatch] = useReducer(reducerCount, JokesData);
    const [editJoke, setEditJoke] = useState<{ id: number, joke: string } | null>(null);

    const updateRate = (id: number, rate: number) => {
        dispatch({ type: 'UPDATE_RATE', id, rate });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (editJoke) {
            dispatch({ type: 'UPDATE_JOKE', id: editJoke.id, newJoke: e.target[0].value });
            setEditJoke(null);
        } else {
            const newJoke: Joke = { id: jokes.length + 1, joke: e.target[0].value, rate: 0 };
            dispatch({ type: 'ADD_JOKE', joke: newJoke });
        }
        e.target[0].value = '';
    };

    const handleEdit = (joke: Joke) => {
        setEditJoke(joke);
    };

    const handleDelete = (id: number) => {
        dispatch({ type: 'DELETE_JOKE', id });
    };

    return (
        <div className='container'>
            <h2>JokesApp UseReducer 😀</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" placeholder='Add or edit a joke' defaultValue={editJoke?.joke} required />
                <button type='submit'>{editJoke ? 'Update Joke' : 'Add Joke'}</button>
            </form>

            <div className="jokes">
                {jokes && jokes.sort((a, b) => b.rate - a.rate).map((joke) => (
                    <div key={joke.id} className='joke'>
                        <div className='joke-text'>{joke.joke}</div>
                        <div className='text'>Rating: {joke.rate}</div>
                        <div className="joke-buttons">
                            <button onClick={() => updateRate(joke.id, joke.rate + 1)}>👍</button>
                            <button onClick={() => updateRate(joke.id, joke.rate - 1)}>👎</button>
                            <button onClick={() => handleEdit(joke)}>✏️</button>
                            <button onClick={() => handleDelete(joke.id)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
