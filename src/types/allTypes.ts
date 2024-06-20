export interface Joke {
    id: number;
    joke: string;
    rate: number;
}

export type IAction =
    | { type: 'ADD_JOKE'; joke: Joke }
    | { type: 'UPDATE_RATE'; id: number; rate: number }
    | { type: 'UPDATE_JOKE'; id: number; newJoke: string }
    | { type: 'DELETE_JOKE'; id: number };

export const reducerCount = (state: Joke[], action: IAction): Joke[] => {
    switch (action.type) {
        case 'ADD_JOKE':
            return [...state, action.joke];
        case 'UPDATE_RATE':
            return state.map(joke =>
                joke.id === action.id ? { ...joke, rate: action.rate } : joke
            );
        case 'UPDATE_JOKE':
            return state.map(joke =>
                joke.id === action.id ? { ...joke, joke: action.newJoke } : joke
            );
        case 'DELETE_JOKE':
            return state.filter(joke => joke.id !== action.id);
        default:
            return state;
    }
};
