import { readable } from 'svelte/store';

export const data = readable([
	{id: '0.0.0', text: 'Frontend', color: '#2379BF', textColor: '#ffffff'},
	{id: '0.-1.1', text: 'A11Y', color: '#20AC00', textColor: '#ffffff'},
	{id: '-1.0.1', text: 'CSS', color: '#FFBA3A'},
	{id: '-1.1.0', text: 'JS', color: '#FFE436'},
	{id: '1.-1.0', text: 'HTML', color: '#C40000', textColor: '#ffffff'},
	{id: '1.0.-1', text: 'Python', color: '#B62680', textColor: '#ffffff'},
	{id: '0.1.-1', text: 'Philosophie', color: '#757575', textColor: '#ffffff'}
]);