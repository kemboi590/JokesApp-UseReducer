
export interface Joke {
    id: number;
    joke: string;
    rate: number;
}

export type IAction =
    | { type: 'ADD_JOKE'; joke: Joke }
    | { type: 'UPDATE_RATE'; id: number; rate: number };



export const reducerCount = (state: Joke[], action: IAction): Joke[] => {
    switch (action.type) {
        case 'ADD_JOKE':
            return [...state, action.joke];
        case 'UPDATE_RATE':
            return state.map(joke =>
                joke.id === action.id ? { ...joke, rate: action.rate } : joke
            );
        default:
            return state;
    }
};