import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

// IMPORTS FOR TESTING
import { Input } from '@/app/home/input';
import { AllTasks } from '@/app/home/allTasks';
import { Providers } from '@/_redux/provider'

const MockInput = () => {
    return (
        <Providers>
            <Input />
        </Providers>
    )
}
const MockAllTasks = () => {
    return (
        <Providers>
            <AllTasks />
        </Providers>
    )
}

describe('Input for new topics', () => {
    it ('Should render button properly', () => {
        render(<MockInput />);

        const button = screen.getByRole('button');
        const buttonText = 'Create';

        expect(button).toHaveTextContent(buttonText)
    })
    it ('Should create a new button with proper text', () => {
        // Render component
        render(<MockInput />)
        render(<MockAllTasks />)
        // Identify button to test
        const inputElement: HTMLElement = screen.getByPlaceholderText('Add Topic')
        const button: HTMLElement = screen.getByRole('button')
        // Simulate button click
        fireEvent.change(inputElement, { target: { value: 'React'}})
        fireEvent.click(button)
        // Check to see if a new element has been rendered
        const newButton = screen.getByTestId('button-test')
        expect(newButton).toBeInTheDocument()
        expect(newButton).toHaveTextContent('REACT')
        
    })
})