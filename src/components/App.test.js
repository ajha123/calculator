import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Button from './Button';



Enzyme.configure({ adapter: new Adapter() });

describe('App component' ,() =>{
    test('renders properly' ,() =>{
       
        const wrapper =shallow(<App />);
        expect(wrapper.exists()).toBe(true);
    
    });

    test('finds child component', () =>{
        const displayfunction = jest.fn()
        const wrapper =shallow(<App />);
        expect (wrapper.contains(<Button handleClick = {displayfunction}/>));
    })

    
})